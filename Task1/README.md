<h1 align="center">
    <a href="https://chat-bot-bd.herokuapp.com/" target="_blank">
        ChatBot
    </a>
</h1>

<p align="center">
  <a href="https://chat-bot-bd.herokuapp.com/" target="_blank">
    <img src="https://raw.githubusercontent.com/IamMohaiminul/Respond.io/master/Task1/src/public/images/logo.png" width="128" alt="ChatBot Logo" />
  </a>
</p>

## Before You Begin

Before we begin, recommend to read about the basic building blocks that assemble a ChatBot app:

- Node.js - Start by going through [Node.js Official Website](http://nodejs.org/) which should get you going with the Node.js platform in no time.
- Express - The best way to understand express is through its [Official Website](http://expressjs.com/), which has a [Getting Started](http://expressjs.com/starter/installing.html) guide, as well as an [ExpressJS](http://expressjs.com/en/guide/routing.html) guide for general express topics.
- MongoDB - Go through [MongoDB Official Website](http://mongodb.org/) and proceed to their [Official Manual](http://docs.mongodb.org/manual/), which should help you understand NoSQL and MongoDB better.

## Prerequisites

Make sure we have installed all of the following prerequisites on our development machine:

- Git - [Download & Install Git](https://git-scm.com/downloads). OSX and Linux machines typically have this already installed.
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager. If you encounter any problems, you can also use this [GitHub Gist](https://gist.github.com/isaacs/579814) to install Node.js.
- MongoDB - [Download & Install MongoDB](http://www.mongodb.org/downloads), and make sure it's running on the default port (27017).

## Getting Started

#### Install the dependencies:

```
$ npm install
```

#### Build the App:

```
$ npm run build
```

#### Run the App:

```
$ npm start
```

#### Hot Reload the App:

```
$ npm run watch
```

_Note: Set the environment variables in `.env` file and make sure the **MongoDB** server is running._

<h3 align="center">
  To Test the ChatBot App, kindly visit this link:
  <a href="https://chat-bot-bd.herokuapp.com/" target="_blank">https://chat-bot-bd.herokuapp.com/</a>
</h3>

### Test the webhooks

```
curl -X GET "https://chat-bot-bd.herokuapp.com/webhook?hub.verify_token=<VERIFY_TOKEN>&hub.challenge=CHALLENGE_ACCEPTED&hub.mode=subscribe"

curl -H "Content-Type: application/json" -X POST "https://chat-bot-bd.herokuapp.com/webhook" -d '{"object": "page", "entry": [{"messaging": [{"message": "TEST_MESSAGE"}]}]}'
```
