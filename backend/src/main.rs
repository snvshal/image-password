mod api;
mod password_lib;

use axum::http::{HeaderValue, Method};
use axum::{
    Router,
    http::Request,
    middleware::{self, Next},
};
use tower_http::{
    cors::{Any, CorsLayer},
    services::ServeDir,
};

async fn log_requests(req: Request<axum::body::Body>, next: Next) -> axum::response::Response {
    println!("➡️  {} {}", req.method(), req.uri().path());
    next.run(req).await
}

#[tokio::main]
async fn main() {
    dotenvy::dotenv().ok();

    let frontend_origin = std::env::var("FRONTEND_ORIGIN").expect("FRONTEND_ORIGIN not set");

    let cors = CorsLayer::new()
        .allow_origin(frontend_origin.parse::<HeaderValue>().unwrap())
        .allow_methods([Method::POST, Method::OPTIONS])
        .allow_headers(Any);

    let app = Router::new()
        .merge(api::routes())
        .fallback_service(ServeDir::new("static"))
        .layer(middleware::from_fn(log_requests))
        .layer(cors);

    let port = std::env::var("PORT").unwrap_or_else(|_| "8080".into());
    let addr = format!("0.0.0.0:{port}");

    println!("Listening on {addr}");

    let listener = tokio::net::TcpListener::bind(&addr).await.unwrap();
    axum::serve(listener, app).await.unwrap();
}
