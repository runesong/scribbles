(function () {
	"use strict";

	function getBaseUri(request) {
		var protocol = v(request.headers['x-forwarded-proto'], "http");
		var host = v(request.headers['x-forwarded-for'], v(request.headers['host'].split(":"), 0, "localhost"));
		var port = v(request.headers['x-forwarded-port'], v(request.headers['host'].split(":"), 1, undefined));
		return protocol + "://" + host + (port ? ":" + port : "");
	}

	function v() {
		if (arguments.length >= 2 && arguments[0] instanceof Array && typeof arguments[1] === 'number') {
			return arguments[0][arguments[1]];
		}
		for (var i = 0; i < arguments.length; i++) {
			if (arguments[i] !== undefined) {
				return arguments[i];
			}
		}
		return undefined;
	}

	var resources = module.exports = {
		"/": {
			GET: {
				service: function (request, response) {
					response.writeHead(301, "Moved Permanently", {
						"Content-Type": "application/json",
						"Location": "/demo-ws/v1.0"});
					response.end();
				},
				"produces" : "application/json"
			}
		},
		"/demo-ws/v1.0": {
			"GET": {
				service: function (request, response) {
					response.writeHead(300, "Multiple Choices", {
						"Content-Type": "application/json"});
					response.write(JSON.stringify(resources).replace(/"\//g, "\"" + getBaseUri(request) + "/"));
					response.end();
				},
				"produces" : "application/json"
			}
		},
		"/error": {
			"*": {
				service: function (request, response, status, reason) {
					if (!status) {
						status = 999;
						reason = "No Error";
					}
					response.writeHead(status, reason, {
						"Content-Type": "application/json"});
					response.write(JSON.stringify({
						status: status,
						reason: reason,
						path: request.url
					}));
					response.end();
				},
				"produces" : "application/json"
			}
		}
	}
})();