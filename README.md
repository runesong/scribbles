# scribbles

## Node Web Service

A barebones starter project for a Node.js web service and web service client.

This project consists of two applications:

- [server](./node-ws/server) the web service application
- [client](./node-ws/client) the web service client application

### Running

To run the [web service](./node-ws/server/):

```sh
node node-ws/server/main.js
```
To run the web service [client](./node-ws/client/):

```sh
node node-ws/client/main.js
```
The client runs a series of tests against the server and then exits.

### Resource API

API resource modules can be defined as illustrated by the the [example](./node-ws/server/resources/example.js) module.
New modules can then be added to the configuration.

The base resource API is published at `http://localhost:3000/demo-ws/v1.0`:

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

