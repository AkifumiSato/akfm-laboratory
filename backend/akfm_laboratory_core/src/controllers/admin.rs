use loco_rs::prelude::*;

use crate::models::{_entities::users, users::Model};

async fn list(State(ctx): State<AppContext>) -> Result<Json<Vec<Model>>> {
    format::json(users::Entity::find().all(&ctx.db).await?)
}

async fn load_user(ctx: &AppContext, id: i32) -> Result<Model> {
    let item = users::Entity::find_by_id(id).one(&ctx.db).await?;
    item.ok_or_else(|| Error::NotFound)
}

async fn remove(Path(id): Path<i32>, State(ctx): State<AppContext>) -> Result<()> {
    load_user(&ctx, id).await?.delete(&ctx.db).await?;
    format::empty()
}

pub fn routes() -> Routes {
    Routes::new()
        .prefix("/admin")
        .add("/users", get(list))
        .add("/users/:id", delete(remove))
}
