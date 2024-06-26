use axum::http::StatusCode;
use loco_rs::{controller::ErrorDetail, prelude::*};
use serde::{Deserialize, Serialize};

use crate::{
    mailers::auth::AuthMailer,
    models::{
        _entities::users,
        users::{LoginParams, LoginParamsWithGitHub, RegisterParams, RegisterParamsWithGitHub},
    },
    views::auth::LoginResponse,
};

#[derive(Debug, Deserialize, Serialize)]
pub struct VerifyParams {
    pub token: String,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct ForgotParams {
    pub email: String,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct ResetParams {
    pub token: String,
    pub password: String,
}

/// Register function creates a new user with the given parameters and sends a
/// welcome email to the user
async fn register(
    State(ctx): State<AppContext>,
    Json(params): Json<RegisterParams>,
) -> Result<(StatusCode, Json<()>)> {
    let res = users::Model::create_with_password(&ctx.db, &params).await;

    let user = match res {
        Ok(user) => user,
        Err(err) => {
            tracing::info!(
                message = err.to_string(),
                user_email = &params.email,
                "could not register user",
            );
            return Err(Error::CustomError(
                StatusCode::CONFLICT,
                ErrorDetail::new(" could not register user", &err.to_string()),
            ));
        }
    };

    let user = user
        .into_active_model()
        .set_email_verification_sent(&ctx.db)
        .await
        .or(Err(Error::InternalServerError));

    AuthMailer::send_welcome(&ctx, &user.unwrap()).await?;

    // todo: fix status code to CREATED
    Ok((StatusCode::OK, Json(())))
}

/// Register function creates a new user with the given parameters and sends a
/// welcome email to the user
async fn register_with_github(
    State(ctx): State<AppContext>,
    Json(params): Json<RegisterParamsWithGitHub>,
) -> Result<(StatusCode, Json<()>)> {
    let res = users::Model::create_with_github_id(&ctx.db, &params).await;

    let user = match res {
        Ok(user) => user,
        Err(err) => {
            tracing::info!(
                message = err.to_string(),
                user_email = &params.email,
                "could not register user",
            );
            return Err(Error::CustomError(
                StatusCode::CONFLICT,
                ErrorDetail::new(" could not register user", &err.to_string()),
            ));
        }
    };

    let user = user
        .into_active_model()
        .set_email_verification_sent(&ctx.db)
        .await
        .or(Err(Error::InternalServerError));

    AuthMailer::send_welcome(&ctx, &user.unwrap()).await?;

    Ok((StatusCode::OK, Json(())))
}

/// Verify register user. if the user not verified his email, he can't login to
/// the system.
async fn verify(
    State(ctx): State<AppContext>,
    Json(params): Json<VerifyParams>,
) -> Result<Json<()>> {
    let user = users::Model::find_by_verification_token(&ctx.db, &params.token).await?;

    if user.email_verified_at.is_some() {
        tracing::info!(pid = user.pid.to_string(), "user already verified");
    } else {
        let active_model = user.into_active_model();
        let user = active_model.verified(&ctx.db).await?;
        tracing::info!(pid = user.pid.to_string(), "user verified");
    }

    format::json(())
}

/// In case the user forgot his password  this endpoints generate a forgot token
/// and send email to the user. In case the email not found in our DB, we are
/// returning a valid request for for security reasons (not exposing users DB
/// list).
async fn forgot(
    State(ctx): State<AppContext>,
    Json(params): Json<ForgotParams>,
) -> Result<Json<()>> {
    let Ok(user) = users::Model::find_by_email(&ctx.db, &params.email).await else {
        // we don't want to expose our users email. if the email is invalid we still
        // return success to the caller
        return format::json(());
    };

    let user = user
        .into_active_model()
        .set_forgot_password_sent(&ctx.db)
        .await?;

    AuthMailer::forgot_password(&ctx, &user).await?;

    format::json(())
}

/// reset user password by the given parameters
async fn reset(State(ctx): State<AppContext>, Json(params): Json<ResetParams>) -> Result<Json<()>> {
    let Ok(user) = users::Model::find_by_reset_token(&ctx.db, &params.token).await else {
        // we don't want to expose our users email. if the email is invalid we still
        // returning success to the caller
        tracing::info!("reset token not found");

        return format::json(());
    };
    user.into_active_model()
        .reset_password(&ctx.db, &params.password)
        .await?;

    format::json(())
}

/// User login and returns a token
async fn login(
    State(ctx): State<AppContext>,
    Json(params): Json<LoginParams>,
) -> Result<Json<LoginResponse>> {
    let user = users::Model::find_by_email(&ctx.db, &params.email).await?;

    let valid = user.verify_password(&params.password);

    if !valid {
        return unauthorized("unauthorized!");
    }

    let jwt_secret = ctx.config.get_jwt_config()?;

    let token = user
        .generate_jwt(&jwt_secret.secret, &jwt_secret.expiration)
        .or_else(|_| unauthorized("unauthorized!"))?;

    format::json(LoginResponse::new(&user, &token))
}

/// User login and returns a token
async fn login_github(
    State(ctx): State<AppContext>,
    Json(params): Json<LoginParamsWithGitHub>,
) -> Result<Json<LoginResponse>> {
    let user = users::Model::find_by_email(&ctx.db, &params.email).await?;

    let valid = user.verify_github(&params.github_id);

    if !valid {
        return unauthorized("unauthorized!");
    }

    let jwt_secret = ctx.config.get_jwt_config()?;

    let token = user
        .generate_jwt(&jwt_secret.secret, &jwt_secret.expiration)
        .or_else(|_| unauthorized("unauthorized!"))?;

    format::json(LoginResponse::new(&user, &token))
}

pub fn routes() -> Routes {
    Routes::new()
        .prefix("auth")
        .add("/register", post(register))
        .add("/register/github", post(register_with_github))
        .add("/verify", post(verify))
        .add("/login", post(login))
        .add("/login/github", post(login_github))
        .add("/forgot", post(forgot))
        .add("/reset", post(reset))
}
