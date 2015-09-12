(function () {
	"use strict";

	var HTTP = require("http");
	var URL = require("url");
	var resources = require("./resources");
	var errors = require("./errors");
	var log = require("./logging");

	HTTP.createServer(function (request, response) {
		try {
			var uri = URL.parse(request.url);

			if (log.isLoggable("DEBUG")) {
				log.debug(JSON.stringify(request.headers));
			}

			var resourceHandler = resources.find(uri.pathname);
			if (resourceHandler) {
				try {
					var methodHandler = resourceHandler[request.method];
					if (!methodHandler) {
						methodHandler = resourceHandler["*"];
					}
					methodHandler.service(request, response);
				} catch (e) {
					errors.find(405).service(request, response, e);
				}
			} else {
				errors.find(404).service(request, response);
			}
		} catch (e) {
			errors.find(500).service(request, response, e);
		}
	}).listen(3000);

	console.log("Server running on port " + 3000);
})();
