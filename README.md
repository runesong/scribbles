# scribbles

## Node Web Service

A barebones starter project for a Node.js web service and web service client.

### Running

To run the server:

```sh
node node-ws/server/main.js
```
to run the client:

```sh
node node-ws/client/main.js
```

### Resource API

The base resource API is published at `http://localhost:3000/demo-ws/v1.0`.

Additional resource modules can be defined as illustrated by the the [example](./node-ws/server/resources/example.js)
module, and then added to the configuration.

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

