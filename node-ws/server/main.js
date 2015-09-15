(function () {
	"use strict";

	var http = require("http");
	var url  = require("url");

	var config    = require("./config");
	var resources = require("./resources");
	var log       = require("./logging");

	function handleError(request, response, status, e) {
		response.statusCode = status;
		log.error("%s %s : %s %s", request.method, request.url, response.statusCode, response.statusMessage);
		if (e !== undefined) {
			log.error(e.stack);
		}
		resources.requestMappings["/error"]["GET"].service(request, response);
	}

	http.createServer(function (request, response) {
		try {
			var uri = url.parse(request.url);

			log.debug("Request: %j", request.headers);

			var resourceHandler = resources.requestMappings[uri.pathname];
			if (resourceHandler) {
				var methodHandler = resourceHandler[request.method];
				if (!methodHandler) {
					methodHandler = resourceHandler["*"];
					if (!methodHandler) {
						handleError(request, response, "405"); // Method Not Allowed
					}
				}
				try {
					methodHandler && methodHandler.service(request, response);
				} catch (e) {
					handleError(request, response, "500", e); // Internal Server Error
				}
			} else {
				handleError(request, response, "404"); // Not Found
			}
		} catch (e) {
			handleError(request, response, "500", e); // Internal Server Error
		}
	}).listen(config.server.port);

	console.log("Server running on port " + config.server.port);
})();
