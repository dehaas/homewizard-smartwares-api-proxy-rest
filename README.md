# homewizard-smartwares-api-proxy-rest

> 🛰 REST Proxy API for Homewizard Lite (Smartwares) equipment to work outside of the iOS/Android Application

## Installation

```console
$ git clone https://github.com/thibmaek/homewizard-smartwares-api-proxy-rest
$ npm install
$ npm run dev
```

Starting the server requires the envs `HOMEWIZARD_USER, HOMEWIZARD_PASS` to be defined.
You can define them on your server or create an `.env` file in the project root with those credentials.

## Deploying

This works perfectly on its own in your local network just with `npm run dev`.
You could also run this in a Docker container, systemd service, launchd service, screen etc.

If you want to deploy this to be accessible to the outside world (e.g cloud function, microservice) you need to run the `npm start` run-task instead. This will run as a production env and require you to set an additional env var `X_PROXY_API_TOKEN` and fill it with a random token.
The request then needs to send an additional header `x-proxy-api-token` with that same token.

## API

__GET /plugs__
Retrieve the list of plugs registered to your account

__GET /plugs/:id__
Get the status of a specific plug.

__GET /plugs/:id/location__
Get a latitude, longitude coordinate for your plug.

__GET /plugs/:id/isAvailable__
Request availability of a plug.

__GET /plugs/:id/devices__
Get all devices linked to your plug. These can be switches, remote controls etc.

__POST /state/:id__
Change the state of a device to ON/OFF. You can toggle this for the main plug (`:id`) or supply a device id in your request to toggle a device linked to the main plug.

```console
$ curl --request POST --url http://localhost:3000/state/49003... \
  --header 'content-type: application/json' \
  --data '{ "toggledAction": "ON", "deviceId": "84905..." }'
```

__GET /token__
Request a new token to use in requests to the Homewizard API. Every request in this proxy API automatically fetches a new token to send along with the request. You should only use this endpoint if you plan on extending or adding functionality to this repo.
