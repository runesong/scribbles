(function () {
	"use strict";

	var HTTP = require("http");
	var URL  = require("url");

	var config    = require("./config");
	var resources = require("./resources");
	var log       = require("./logging");

	function handleError(request, response, status, e) {
		response.statusCode = status;
		response.statusMessage = HTTP.STATUS_CODES[response.statusCode];
		log.error(request.method + " " + request.url + " : " + response.statusCode + " " + response.statusMessage);
		if (e !== undefined) {
			log.error(e.stack);
		}
		resources.requestMappings["/error"]["GET"].service(request, response);
	}

	HTTP.createServer(function (request, response) {
		try {
			var uri = URL.parse(request.url);

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
