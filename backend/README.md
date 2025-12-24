# ImagePass Backend

Rust backend responsible for:
- Receiving image uploads
- Validating image formats
- Hashing image bytes
- Deriving deterministic passwords

---

## Tech stack

- Rust (edition 2024)
- Axum
- Tokio
- SHA-256

---

## API

### POST `/api/v1/generate`

**Request**
- multipart/form-data
- field name: `image`

**Supported formats**
- PNG
- JPEG / JPG
- WEBP
- SVG
- ❌ GIF (explicitly blocked)

**Limits**
- Max size: 10 MB

---

## Response (success)

```json
{
  "success": true,
  "password": "A9$kP2x...",
  "fingerprint": "img:3fa92c1e..."
}
````

---

## Response (error)

```json
{
  "success": false,
  "error": "Unsupported image format"
}
```

---

## Environment variables

```env
PORT=8080
```

---

## Run locally

```bash
cargo run
```

---

## Notes

* Images are processed in memory only
* No files are saved to disk
* Password derivation is deterministic