# Scribbles

## Node.js Web Service

A barebones starter project for a Node.js web service and web service client.

This project consists of two applications:

- [server](./node-ws/server) the web service application
- [client](./node-ws/client) the web service client application

### Getting Started

To run the [web service](./node-ws/server/):

```sh
node node-ws/server/main.js
```

The server will start up on `localhost` at port `3000`.

To run the web service [client](./node-ws/client/):

```sh
node node-ws/client/main.js
```
The client will connect to `localhost` on port `3000` and issue a series of requests against the server.

### Resource API

API resource modules can be defined as illustrated by the [example](./node-ws/server/resources/example.js) module.
New modules can then be added as `resources` in the [config](./node-ws/server/config.js) module.

The web service resource API is published at `http://localhost:3000/demo-ws/v1.0`:

```json
{
    "root": {
        "href": "http://localhost:3000/",
        "methods": {
            "GET": {
                "produces": "application/json"
            }
        }
    },
    "api": {
        "href": "http://localhost:3000/demo-ws/v1.0",
        "methods": {
            "GET": {
                "produces": "application/json"
            }
        }
    },
    "error": {
        "href": "http://localhost:3000/error",
        "methods": {
            "GET": {
                "produces": "application/json"
            }
        }
    },
    "example": {
        "href": "http://localhost:3000/demo-ws/v1.0/example",
        "methods": {
            "GET": {
                "produces": "application/json"
            },
            "HEAD": {},
            "PUT": {
                "consumes": "application/json",
                "produces": "application/json"
            },
            "PATCH": {
                "consumes": "application/json",
                "produces": "application/json"
            },
            "POST": {
                "consumes": "application/json",
                "produces": "application/json"
            },
            "DELETE": {}
        }
    }
}
```

