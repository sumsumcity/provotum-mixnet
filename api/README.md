# API

This project enables interaction with the Provotum mixnet via HTTP requests. 
The API communicates with the CLI of the mixnet, which is defined in the client. 

## Local Development

Follow these steps to prepare a local development environment :hammer_and_wrench:

### Setup

Install all the required dependencies by running the following commands.

```bash
sudo apt install nodejs
sudo apt install npm
```

### Build

Run the following command to build the project.

```bash
npm run build
```

### Build docker image

Run the following command to build the api-cli docker image.
This image builds a container where the cli (defined in the client) and the api is running and communicating with the multi-node network and the randomizer.

```bash
npm run build
cd ..
docker build -t sumsumcity/api-cli:latest -f api/Dockerfile .
```

## Run

Run the following command to build the package and run in dev mode.

```bash
npm run dev
```

## Usage

To use the api locally you should run the docker containers which are defined in the docker-compose.yml in the api folder.

```bash
docker-compose up
```

After that you can run the api and test it with HTTP requests. 

```bash
npm run dev
```

In order to setup the demo, the api folder contains a Postman collection. For instructions on how to import the collection into Postman visit https://learning.postman.com/docs/getting-started/importing-and-exporting-data/#importing-data-into-postman. The collection includes three folders: 1) Pre-Voting Phase, 2) Voting Phase, and 3) Post-Voting Phase.

### Usage via Docker

To be able to use the API also via a docker container, a Dockerfile is defined. 
In this docker container runs not only the api but also the CLI, which is defined in client. 
So you can also use the API if you use the docker-compose.yml file in the provotum-mixnet folder.  

```bash
cd ..
docker-compose up
```

## Note

To use the API locally, it must run on Linux. To ensure compatibility, it is recommended to use Ubuntu version 20.04.
