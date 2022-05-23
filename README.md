# Provotum Mixnet

The project is structured into four different packages:

- `node`: The Provotum Mixnet implemented using Substrate
- `crypto`: A cryptographic library implementing all algorithms and proofs
- `randomizer`: A service to randomizes the voters ballots'
- `client`: A CLI to interact with the randomizer and the node

For more information have a look at the individual packages.

## Demo Setup

### Start Up

To start a multi-node local test network, the `docker-compose.yml` file can be used.

```bash
docker-compose up
```

This starts 

A three-node local test network with:
- **Alice**, as voting-authority (cannot author blocks, but is the voting admin)
- **Bob** and **Charlie**, as sealers and PoA-authorities (can author blocks)

A randomizer service for ballot re-encryption:
- **Randomizer**

A CLI sevice where you can make `client` CLI commands with "docker exec -it sumsumciy/cli-mixnet:latest [command]"
- **CLI**

A simple API which enable to make `client` CLI commands via HTTP requests. You can also find some predefined requests which you can test with Postman.
- **API**

### Interact

To interact with the test setup use the `client` CLI or the `api`.
Have a look at the **README** of the `client` or `api` package on how to build the CLI and use it.
