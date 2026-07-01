# ImagePass

ImagePass is a deterministic image-based password generator.

It derives secure passwords from image contents using cryptographic hashing.
The same image always produces the same password.

Images are processed in memory and are never stored.

---

## Architecture

- **Frontend**: Next.js (static export), served by the Rust server
- **Backend**: Rust (Axum, SHA-256) — serves both API and static files
- **Password model**: Deterministic derivation from image hash

```

image-password/
├─ frontend  → UI (Next.js static export)
└─ backend   → API + password logic + static file serving (Rust)

````

---

## Features

- Deterministic image → password generation
- Server-side processing
- No image storage
- Strong password composition (upper/lower/digits/symbols)
- Image fingerprint for verification
- GIF images explicitly blocked

---

## Quick Start (Local)

### 1. Build frontend
```bash
cd frontend
bun install
bun run build
```

### 2. Start server
```bash
cd backend
cargo run
```

Open http://localhost:8080

## Quick Start (Docker)

```bash
docker build -t image-password .
docker run -p 8080:8080 image-password
```

Open http://localhost:8080

---

## Security notes

* Passwords are derived from SHA-256 hashes
* This is hashing, not encryption
* Fingerprints are identifiers, not secrets
* Anyone with the same image can reproduce the password

---

## License

MIT
