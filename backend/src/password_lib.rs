use sha2::{Digest, Sha256};

pub fn image_to_hash_bytes(bytes: &[u8]) -> [u8; 32] {
    let mut hasher = Sha256::new();
    hasher.update(bytes);
    hasher.finalize().into()
}

const UPPER: &[u8] = b"ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWER: &[u8] = b"abcdefghijklmnopqrstuvwxyz";
const DIGIT: &[u8] = b"0123456789";
const SPECIAL: &[u8] = b"!@#$%^&*()-_=+[]{}";

pub fn derive_password(hash: &[u8], length: usize) -> String {
    let mut password = Vec::with_capacity(length);
    let all: Vec<u8> = [UPPER, LOWER, DIGIT, SPECIAL].concat();

    password.push(UPPER[hash[0] as usize % UPPER.len()]);
    password.push(LOWER[hash[1] as usize % LOWER.len()]);
    password.push(DIGIT[hash[2] as usize % DIGIT.len()]);
    password.push(SPECIAL[hash[3] as usize % SPECIAL.len()]);

    for i in 4..length {
        let idx = hash[i % hash.len()] as usize % all.len();
        password.push(all[idx]);
    }

    for i in 0..password.len() {
        let j = hash[i % hash.len()] as usize % password.len();
        password.swap(i, j);
    }

    String::from_utf8(password).unwrap()
}

pub fn fingerprint(hash: &[u8]) -> String {
    format!("img:{}...", hex::encode(&hash[..10]))
}

pub fn is_svg(bytes: &[u8]) -> bool {
    std::str::from_utf8(bytes)
        .ok()
        .map(|s| s.trim_start().starts_with("<svg"))
        .unwrap_or(false)
}

pub fn is_raster_image(bytes: &[u8]) -> bool {
    infer::get(bytes)
        .map(|t| matches!(t.mime_type(), "image/png" | "image/jpeg" | "image/webp"))
        .unwrap_or(false)
}
