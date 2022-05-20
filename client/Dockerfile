FROM debian:stretch-slim AS builder

WORKDIR /client

RUN apt-get -y update && \
  apt-get install -y \
  software-properties-common curl git file binutils binutils-dev \
  make cmake ca-certificates gcc g++ zip dpkg-dev python openssl gettext \
  build-essential pkg-config libssl-dev libudev-dev time clang llvm-dev

# install rustup
RUN curl https://sh.rustup.rs -sSf | sh -s -- -y

# rustup directory
ENV PATH /root/.cargo/bin:$PATH
ENV CARGO_TERM_COLOR=always

# setup rust nightly channel
RUN rustup update
RUN rustup toolchain install nightly

# Copy code to build directory, instead of only using .dockerignore, we copy elements
# explicitly. This lets us cache build results while iterating on scripts.
# Currently, the docker image can only be built from the root folder because the crypto crate needs to be copied manually.
# TODO: remove as soon as project is public + change the way dependency is referenced (remove path, add Github).

COPY client/src ./src
COPY client/Cargo.toml ./
COPY client/Cargo.lock ./
COPY client/target ./target
COPY crypto ../crypto
COPY node/pallets/mixnet ../node/pallets/mixnet

# Build node.
RUN cargo build --release 
RUN cargo +nightly run --release -- va help