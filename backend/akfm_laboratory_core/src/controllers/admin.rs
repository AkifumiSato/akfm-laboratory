use loco_rs::prelude::*;

use crate::models::_entities::users;
use crate::models::users::Model;

async fn list(State(ctx): State<AppContext>) -> Result<Json<Vec<Model>>> {
    format::json(users::Entity::find().all(&ctx.db).await?)
}

pub fn routes() -> Routes {
    Routes::new().prefix("/admin").add("/users", get(list))
}
