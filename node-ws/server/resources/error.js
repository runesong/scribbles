(function () {
	"use strict";

	function _service(request, response) {
		response.writeHead(response.statusCode, {
			"Content-Type": "application/json"
		});
		response.write(JSON.stringify({
			status: response.statusCode,
			reason: response.statusMessage,
			path: request.url
		}));
		response.end();
	}

	module.exports = {
		"id" : "error",
		"resource": {
			"href": "/error",
			"methods" : {
				"GET" : {
					produces : "application/json",
					service: _service
				}
			}
		}
	}
})();
