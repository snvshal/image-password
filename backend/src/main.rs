mod api;
mod password_lib;

use axum::{
    Router,
    http::Request,
    middleware::{self, Next},
};
use tower_http::services::ServeDir;

async fn log_requests(req: Request<axum::body::Body>, next: Next) -> axum::response::Response {
    println!("➡️  {} {}", req.method(), req.uri().path());
    next.run(req).await
}

#[tokio::main]
async fn main() {
    dotenvy::dotenv().ok();

    let static_dir =
        std::env::var("STATIC_DIR").unwrap_or_else(|_| "../frontend/out".into());

    let app = Router::new()
        .merge(api::routes())
        .fallback_service(ServeDir::new(&static_dir))
        .layer(middleware::from_fn(log_requests));

    let port = std::env::var("PORT").unwrap_or_else(|_| "8080".into());
    let addr = format!("0.0.0.0:{port}");

    println!("Listening on {addr}");

    let listener = tokio::net::TcpListener::bind(&addr).await.unwrap();
    axum::serve(listener, app).await.unwrap();
}
