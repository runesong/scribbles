(function () {
	"use strict";

	// Core Node.js modules
	var HTTP = require("http");
	var URL = require("url");

	// My modules
	var config    = require("./config");
	var resources = require("./resources");
	var errors    = require("./errors");
	var log       = require("./logging");

	HTTP.createServer(function (request, response) {
		try {
			var uri = URL.parse(request.url);

			if (log.isLoggable("DEBUG")) {
				log.debug(JSON.stringify(request.headers));
			}

			var resourceHandler = resources[uri.pathname];
			if (resourceHandler) {
				try {
					var methodHandler = resourceHandler[request.method];
					if (!methodHandler) {
						methodHandler = resourceHandler["*"];
					}
					methodHandler.service(request, response);
				} catch (e) {
					errors[405].service(request, response, e);
				}
			} else {
				errors[404].service(request, response);
			}
		} catch (e) {
			errors[500].service(request, response, e);
		}
	}).listen(config.server.port);

	console.log("Server running on port " + config.server.port);
})();
