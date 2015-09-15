(function () {
    "use strict";

    var api = require("../api");

    var resourcePath = require("./api-root").resource.href + "/example";

    module.exports = api.resource("example", resourcePath).
        get(function (request, response) {
            var body = {
                message: "Hello, World!"
            };
            response.writeHead("200", { "Content-Type": "application/json" });
            response.write(JSON.stringify(body));
            response.end();
        }).
        head(function (request, response) {
            response.writeHead("200", { "Content-Type": "application/json" });
            response.end();
        }).
        put(function (request, response) {
            response.writeHead("201");
            response.end();
        }).
        patch(function (request, response) {
            response.writeHead("204");
            response.end();
        }).
        post(function (request, response) {
            response.writeHead("204");
            response.end();
        }).
        delete(function (request, response) {
            response.writeHead("204");
            response.end();
        });
})();