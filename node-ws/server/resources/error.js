(function () {
	"use strict";

	var api = require("../api");

	module.exports = api.resource("error", "/error").
		get(function _service(request, response) {
			response.writeHead(response.statusCode, {
				"Content-Type": "application/json"
			});
			response.write(JSON.stringify({
				status: response.statusCode,
				reason: response.statusMessage,
				path: request.url
			}));
			response.end();
		});
})();
