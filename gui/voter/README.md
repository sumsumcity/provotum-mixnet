# Voter GUI

With this GUI, users are able to cast their votes

## Local Development

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). Follow these steps to prepare a local development environment :hammer_and_wrench:

### Setup

Install all the required dependencies by running the following commands.

```bash
sudo apt install nodejs
sudo apt install npm
```

### Build

Installs all project dependencies that are important for running the project. It is important that you run this command in the same folder as package.json.  

```bash
npm install
```

### Build docker image

Run the following command to build the gui_va docker image.

```bash
docker build -t sumsumcity/gui_voter:latest -f Dockerfile .
```

## Run

Run the following command to start the GUI locally.

```bash
npm start
```

This runs the app in the development mode.\
Open [http://localhost:8000](http://localhost:8000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.
