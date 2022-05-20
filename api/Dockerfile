FROM node:latest

WORKDIR /usr/src/app

COPY api/package.json ./

RUN npm install

COPY api /usr/src/app/

RUN mkdir /usr/src/client
RUN mkdir /usr/src/node
RUN mkdir /usr/src/crypto
RUN cd /usr/src/client
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

COPY client/src /usr/src/client/src
COPY client/Cargo.toml /usr/src/client/
COPY client/Cargo.lock /usr/src/client/
COPY client/target /usr/src/client/target
COPY crypto /usr/src/crypto
COPY node/pallets/mixnet /usr/src/node/pallets/mixnet

WORKDIR /usr/src/client

# Build node.
RUN cargo build --release 
RUN cargo +nightly run --release -- va help

WORKDIR /usr/src/app

EXPOSE 4000

CMD ["npm", "start"]




