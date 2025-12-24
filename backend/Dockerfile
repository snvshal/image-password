FROM rust:1.92

WORKDIR /app

COPY . .
RUN cargo build --release

EXPOSE 8080
CMD ["./target/release/image-password-backend"]