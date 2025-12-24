use axum::{Router, extract::Multipart, http::StatusCode, response::Json, routing::post};
use serde_json::json;

use crate::password_lib::{
    derive_password, fingerprint, image_to_hash_bytes, is_raster_image, is_svg,
};

pub fn routes() -> Router {
    Router::new().route("/api/v1/generate", post(generate))
}

async fn generate(mut multipart: Multipart) -> (StatusCode, Json<serde_json::Value>) {
    println!("Generating hash and password...");

    let mut image_bytes: Vec<u8> = Vec::new();

    loop {
        let field = match multipart.next_field().await {
            Ok(Some(field)) => field,
            Ok(None) => break,
            Err(_) => {
                return (
                    StatusCode::BAD_REQUEST,
                    Json(json!({
                        "success": false,
                        "error": "Failed to read upload"
                    })),
                );
            }
        };

        if field.name() != Some("image") {
            continue;
        }

        // 🚫 IMMEDIATE GIF BLOCK
        if let Some(ct) = field.content_type() {
            if ct == "image/gif" {
                return (
                    StatusCode::UNSUPPORTED_MEDIA_TYPE,
                    Json(json!({
                        "success": false,
                        "error": "GIF images are not allowed"
                    })),
                );
            }
        }

        let bytes = match field.bytes().await {
            Ok(b) => b,
            Err(_) => {
                return (
                    StatusCode::BAD_REQUEST,
                    Json(json!({
                        "success": false,
                        "error": "Failed to read image bytes"
                    })),
                );
            }
        };

        image_bytes = bytes.to_vec();
        break;
    }

    // 2️⃣ Validate presence
    if image_bytes.is_empty() {
        return (
            StatusCode::BAD_REQUEST,
            Json(json!({
                "success": false,
                "error": "No image uploaded"
            })),
        );
    }

    // 3️⃣ Size limit (10MB)
    if image_bytes.len() > 10 * 1024 * 1024 {
        return (
            StatusCode::PAYLOAD_TOO_LARGE,
            Json(json!({
                "success": false,
                "error": "Image too large"
            })),
        );
    }

    // 4️⃣ Format validation (FAST, NON-BLOCKING)
    if !(is_raster_image(&image_bytes) || is_svg(&image_bytes)) {
        return (
            StatusCode::BAD_REQUEST,
            Json(json!({
                "success": false,
                "error": "Unsupported image format"
            })),
        );
    }

    // 5️⃣ Hash → password → fingerprint
    let hash_bytes = image_to_hash_bytes(&image_bytes);
    let password = derive_password(&hash_bytes, 16);
    let fingerprint = fingerprint(&hash_bytes);

    (
        StatusCode::OK,
        Json(json!({
            "success": true,
            "password": password,
            "fingerprint": fingerprint
        })),
    )
}
