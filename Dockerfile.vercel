FROM oven/bun:latest AS frontend
WORKDIR /app
COPY frontend/package*.json ./
RUN bun install
COPY frontend/ ./
RUN bun run build

FROM rust:1.92 AS backend
WORKDIR /app
COPY backend/ ./
RUN cargo build --release

FROM debian:bookworm-slim
WORKDIR /app
COPY --from=backend /app/target/release/image-password-backend ./
COPY --from=frontend /app/out ./out
ENV STATIC_DIR=out
EXPOSE 8080
CMD ["./image-password-backend"]
