# Provotum Mixnet

The project is structured into four different packages:

- `node`: The Provotum Mixnet implemented using Substrate
- `crypto`: A cryptographic library implementing all algorithms and proofs
- `randomizer`: A service to randomizes the voters ballots'
- `client`: A CLI to interact with the randomizer and the node
- `api`: An API to interact with client which interacts with randomizer and the node
- `gui`: A GUI which enables monotoring, management and visualization of the voting system from a voting-authority, sealer or voter perspective. It is communicating with the api. 

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

A CLI sevice where you can make `client` CLI commands with "docker exec -it sumsumciy/cli-mixnet:latest [command]". A simple API which enable to make `client` CLI commands via HTTP requests. (You can also find some predefined requests which you can test with Postman):
- **API-CLI**

A MongoDB, which is necessary to store some data that is needed in the GUIs but cannot be taken out of the blockchain:
- **MongoDB**

The three graphical user interfaces with which you can interact with the `api-cli`:
- **VA**, as a voting authority on port 3000, which you can use to administarte votes
- **Sealer1**, as sealer `bob` on port 3001, which you can use to generate/decrypt keys
- **Sealer2**, as sealer `charlie` on port 3002, which you can use to generate/decrypt keys
- **Voter**, as voter on port 8000, which you can use to fill out the ballots. To log-in you have to read the chapter `Identity Provider Mock` below.


### Identity Provider Mock

When the API is launched for the first time, it directly creates twenty users who are allowed to vote on the voter gui. The `username` and `password` is always "user" with a number between 1 and twenty (for example `user1`).

### Note
The version of the `docker-compose.yml` file is 3.8, which means that you need at least docker-compose version 1.25.5. To install docker-compose version 1.26.0 on Ubuntu, please follow the instructions below:

```bash
sudo curl -L "https://github.com/docker/compose/releases/download/1.26.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/bin/docker-compose

sudo chmod +x /usr/bin/docker-compose
```
or

```bash
sudo curl -L "https://github.com/docker/compose/releases/download/1.26.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose


sudo chmod +x /usr/local/bin/docker-compose
```
You also need a personal access token (PAT) from GitHub. Create a PAT in the developer settings on GitHub and then run the following command in the terminal:

```bash
echo '<my_token>' | docker login ghcr.io -u <my_username> --password-stdin
```
