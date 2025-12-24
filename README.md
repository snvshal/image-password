# ImagePass

ImagePass is a deterministic image-based password generator.

It derives secure passwords from image contents using cryptographic hashing.
The same image always produces the same password.

Images are processed in memory and are never stored.

---

## Architecture

- **Frontend**: Next.js (App Router)
- **Backend**: Rust (Axum, SHA-256)
- **Password model**: Deterministic derivation from image hash

```

image-password/
├─ frontend  → UI (Next.js)
└─ backend   → API + password logic (Rust)

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

### Backend
```bash
cd backend
cargo run
````

### Frontend

```bash
cd frontend
bun install
bun dev
```

## Quick Start (Docker)

```bash
docker-compose up --build
```

Frontend runs on `http://localhost:3000`
Backend runs on `http://localhost:8080`

---

## Security notes

* Passwords are derived from SHA-256 hashes
* This is hashing, not encryption
* Fingerprints are identifiers, not secrets
* Anyone with the same image can reproduce the password

---

## License

MIT
