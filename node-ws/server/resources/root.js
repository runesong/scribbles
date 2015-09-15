(function () {
	"use strict";

	var apiPath = require("./api-root").resource.href;
	var api = require("../api");

	module.exports = api.resource("root", "/").
		get(function (request, response) {
			response.writeHead("301", {
				"Content-Type": "application/json",
				"Location": apiPath
			});
			response.end();
		});
})();
