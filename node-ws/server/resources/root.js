(function () {
	"use strict";

	var api = require("./api");

	function _service(request, response) {
		response.writeHead("301", {
			"Content-Type": "application/json",
			"Location": api.resource.href
		});
		response.end();
	}

	module.exports = {
		"id" : "root",
		"resource": {
			"href": "/",
			"methods" : {
				"GET" : {
					produces : "application/json",
					service: _service
				}
			}
		}
	}
})();
