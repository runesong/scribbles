(function () {
	"use strict";

	var config = require("../config");

	function _baseuri(request) {
		var host = request.headers["host"].split(/:/);
		var serverAddr = host[0] || config.server.address;
		var serverPort = host[1] || config.server.port;

		var protocol = request.headers['x-forwarded-proto'] || "http";
		var hostname = request.headers['x-forwarded-for']   || serverAddr;
		var port     = request.headers['x-forwarded-port']  || serverPort;

		return protocol + "://" + hostname + (port ? ":" + port : "");
	}

	function _service(request, response) {
		var resources = require("../resources");
		response.writeHead("300", {
			"Content-Type": "application/json"
		});
		response.write(JSON.stringify(resources.api, function (key, value) {
			if (key == "href") {
				return _baseuri(request) + value;
			}
			return value;
		}));
		response.end();
	}

	module.exports = {
		"id" : "api",
		"resource": {
			"href": "/demo-ws/v1.0",
			"methods" : {
				"GET" : {
					produces : "application/json",
					service: _service
				}
			}
		}
	}
})();
