use akfm_laboratory_core::{app::App, models::users};
use insta::{assert_debug_snapshot, with_settings};
use loco_rs::testing;
use rstest::rstest;
use serial_test::serial;

use super::prepare_data;
use crate::cleanup_user_model;

// TODO: see how to dedup / extract this to app-local test utils
// not to framework, because that would require a runtime dep on insta
macro_rules! configure_insta {
    ($($expr:expr),*) => {
        let mut settings = insta::Settings::clone_current();
        settings.set_prepend_module_to_snapshot(false);
        settings.set_snapshot_suffix("auth_request");
        let _guard = settings.bind_to_scope();
    };
}

#[tokio::test]
#[serial]
async fn can_register() {
    configure_insta!();

    testing::request::<App, _, _>(|request, ctx| async move {
        let email = "test@loco.com";
        let payload = serde_json::json!({
            "name": "loco",
            "email": email,
            "password": "12341234"
        });

        let _response = request.post("/api/auth/register").json(&payload).await;
        let saved_user = users::Model::find_by_email(&ctx.db, email).await;

        with_settings!({
            filters => cleanup_user_model(true)
        }, {
            assert_debug_snapshot!(saved_user);
        });

        with_settings!({
            filters => testing::cleanup_email()
        }, {
            assert_debug_snapshot!(ctx.mailer.unwrap().deliveries());
        });
    })
    .await;
}

#[tokio::test]
#[serial]
async fn can_register_with_github() {
    configure_insta!();

    testing::request::<App, _, _>(|request, ctx| async move {
        let email = "test@loco.com";
        let payload = serde_json::json!({
            "name": "loco",
            "email": email,
            "github_id": 1234
        });

        let _response = request
            .post("/api/auth/register/github")
            .json(&payload)
            .await;
        let saved_user = users::Model::find_by_email(&ctx.db, email).await;

        with_settings!({
            filters => cleanup_user_model(true)
        }, {
            assert_debug_snapshot!(saved_user);
        });

        with_settings!({
            filters => testing::cleanup_email()
        }, {
            assert_debug_snapshot!(ctx.mailer.unwrap().deliveries());
        });
    })
    .await;
}

#[tokio::test]
#[serial]
async fn can_re_register_with_github() {
    configure_insta!();

    testing::request::<App, _, _>(|request, ctx| async move {
        let name = "loco";
        let email = "test@loco.com";
        let payload = serde_json::json!({
            "name": name,
            "email": email,
            "password": "12341234"
        });
        // registering with email
        let response = request.post("/api/auth/register").json(&payload).await;
        assert_eq!(response.status_code(), 200);
        // re registering with github
        let payload = serde_json::json!({
            "name": name,
            "email": email,
            "github_id": 1234
        });
        let response = request
            .post("/api/auth/register/github")
            .json(&payload)
            .await;
        assert_eq!(response.status_code(), 200);

        let saved_user = users::Model::find_by_email(&ctx.db, email).await;

        with_settings!({
            filters => cleanup_user_model(true)
        }, {
            assert_debug_snapshot!(saved_user);
        });

        with_settings!({
            filters => testing::cleanup_email()
        }, {
            assert_debug_snapshot!(ctx.mailer.unwrap().deliveries());
        });
    })
    .await;
}

#[tokio::test]
#[serial]
async fn already_register_error() {
    configure_insta!();

    testing::request::<App, _, _>(|request, ctx| async move {
        let email = "test@loco.com";
        let payload = serde_json::json!({
            "name": "loco",
            "email": email,
            "password": "12341234"
        });

        let response = request.post("/api/auth/register").json(&payload).await;
        let _saved_user = users::Model::find_by_email(&ctx.db, email).await;

        assert_eq!(response.status_code(), 200);

        // already registered
        let response = request.post("/api/auth/register").json(&payload).await;

        with_settings!({
            filters => testing::cleanup_user_model()
        }, {
            assert_debug_snapshot!((response.status_code(), response.text()));
        });
    })
    .await;
}

#[rstest]
#[case("login_with_valid_password", "12341234")]
#[case("login_with_invalid_password", "invalid-password")]
#[tokio::test]
#[serial]
async fn can_login_with_verify(#[case] test_name: &str, #[case] password: &str) {
    configure_insta!();

    testing::request::<App, _, _>(|request, ctx| async move {
        let email = "test@loco.com";
        let register_payload = serde_json::json!({
            "name": "loco",
            "email": email,
            "password": "12341234"
        });

        //Creating a new user
        _ = request
            .post("/api/auth/register")
            .json(&register_payload)
            .await;

        let user = users::Model::find_by_email(&ctx.db, email).await.unwrap();
        let verify_payload = serde_json::json!({
            "token": user.email_verification_token,
        });
        request.post("/api/auth/verify").json(&verify_payload).await;
        // Make sure email_verified_at is set
        assert!(users::Model::find_by_email(&ctx.db, email)
            .await
            .unwrap()
            .email_verified_at
            .is_some());

        //verify user request
        let response = request
            .post("/api/auth/login")
            .json(&serde_json::json!({
                "email": email,
                "password": password
            }))
            .await;

        with_settings!({
            filters => testing::cleanup_user_model()
        }, {
            assert_debug_snapshot!(test_name, (response.status_code(), response.text()));
        });
    })
    .await;
}

#[tokio::test]
#[serial]
async fn can_github_login_with_verify() {
    configure_insta!();

    testing::request::<App, _, _>(|request, ctx| async move {
        let github_id = 1234;
        let email = "test@loco.com";
        let register_payload = serde_json::json!({
            "name": "loco",
            "email": email,
            "github_id": github_id
        });

        //Creating a new user
        let response = request
            .post("/api/auth/register/github")
            .json(&register_payload)
            .await;
        assert_eq!(response.status_code(), 200);

        let user = users::Model::find_by_email(&ctx.db, email).await.unwrap();
        let verify_payload = serde_json::json!({
            "token": user.email_verification_token,
        });
        request.post("/api/auth/verify").json(&verify_payload).await;
        // Make sure email_verified_at is set
        assert!(users::Model::find_by_email(&ctx.db, email)
            .await
            .unwrap()
            .email_verified_at
            .is_some());

        //verify user request
        let response = request
            .post("/api/auth/login/github")
            .json(&serde_json::json!({
                "email": email,
                "github_id": github_id
            }))
            .await;
        assert_eq!(response.status_code(), 200);

        with_settings!({
            filters => testing::cleanup_user_model()
        }, {
            assert_debug_snapshot!((response.status_code(), response.text()));
        });
    })
    .await;
}

#[tokio::test]
#[serial]
async fn can_not_github_login_with_verify() {
    configure_insta!();

    testing::request::<App, _, _>(|request, ctx| async move {
        let github_id = 1234;
        let github_id_2 = 1235;
        let email = "test@loco.com";
        let register_payload = serde_json::json!({
            "name": "loco",
            "email": email,
            "github_id": github_id
        });

        //Creating a new user
        let response = request
            .post("/api/auth/register/github")
            .json(&register_payload)
            .await;
        assert_eq!(response.status_code(), 200);

        let user = users::Model::find_by_email(&ctx.db, email).await.unwrap();
        let verify_payload = serde_json::json!({
            "token": user.email_verification_token,
        });
        request.post("/api/auth/verify").json(&verify_payload).await;
        // Make sure email_verified_at is set
        assert!(users::Model::find_by_email(&ctx.db, email)
            .await
            .unwrap()
            .email_verified_at
            .is_some());

        //verify user request
        let response = request
            .post("/api/auth/login/github")
            .json(&serde_json::json!({
                "email": email,
                "github_id": github_id_2
            }))
            .await;
        assert_eq!(response.status_code(), 401);
    })
    .await;
}

#[tokio::test]
#[serial]
async fn can_login_without_verify() {
    configure_insta!();

    testing::request::<App, _, _>(|request, _ctx| async move {
        let email = "test@loco.com";
        let password = "12341234";
        let register_payload = serde_json::json!({
            "name": "loco",
            "email": email,
            "password": password
        });

        //Creating a new user
        _ = request
            .post("/api/auth/register")
            .json(&register_payload)
            .await;

        //verify user request
        let response = request
            .post("/api/auth/login")
            .json(&serde_json::json!({
                "email": email,
                "password": password
            }))
            .await;

        with_settings!({
            filters => testing::cleanup_user_model()
        }, {
            assert_debug_snapshot!((response.status_code(), response.text()));
        });
    })
    .await;
}

#[tokio::test]
#[serial]
async fn can_reset_password() {
    configure_insta!();

    testing::request::<App, _, _>(|request, ctx| async move {
        let login_data = prepare_data::init_user_login(&request, &ctx).await;

        let forgot_payload = serde_json::json!({
            "email": login_data.user.email,
        });
        _ = request.post("/api/auth/forgot").json(&forgot_payload).await;

        let user = users::Model::find_by_email(&ctx.db, &login_data.user.email)
            .await
            .unwrap();
        assert!(user.reset_token.is_some());

        let new_password = "new-password";
        let reset_payload = serde_json::json!({
            "token": user.reset_token,
            "password": new_password,
        });

        let reset_response = request.post("/api/auth/reset").json(&reset_payload).await;

        let user = users::Model::find_by_email(&ctx.db, &user.email)
            .await
            .unwrap();
        assert!(user.reset_sent_at.is_some());

        assert_debug_snapshot!((reset_response.status_code(), reset_response.text()));

        let response = request
            .post("/api/auth/login")
            .json(&serde_json::json!({
                "email": user.email,
                "password": new_password
            }))
            .await;

        assert_eq!(response.status_code(), 200);

        with_settings!({
            filters => testing::cleanup_email()
        }, {
            assert_debug_snapshot!(ctx.mailer.unwrap().deliveries());
        });
    })
    .await;
}
