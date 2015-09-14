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

	/**
	 * Resource request handler mapping.
	 *
	 * @type {{/: {GET: {service: Function, produces: string}}, /demo-ws/v1.0: {GET: {service: Function, produces: string}}, /error: {*: {service: Function, produces: string}}}}
	 */
	var resources = module.exports = {

		/**
		 * The root web resource (forwards to the API resource endpoint)
		 */
		"/": {
			GET: {
				/**
				 * Handles GET requests for the root resource and forwards to the API resource.
				 *
				 * @param request  the web service request
				 * @param response the web service response
				 */
				service: function (request, response) {
					response.writeHead(301, "Moved Permanently", {
						"Content-Type": "application/json",
						"Location": "/demo-ws/v1.0"});
					response.end();
				},
				"produces" : "application/json"
			}
		},

		/**
		 * The API resource.
		 */
		"/demo-ws/v1.0": {
			"GET": {
				/**
				 * Handles GET requests for the API resource.
				 *
				 * @param request  the web service request
				 * @param response the web service response
				 */
				service: function (request, response) {
					response.writeHead(300, "Multiple Choices", {
						"Content-Type": "application/json"});
					response.write(JSON.stringify(resources).replace(/"\//g, "\"" + getBaseUri(request) + "/"));
					response.end();
				},
				"produces" : "application/json"
			}
		},

		/**
		 * The error page resource.
		 */
		"/error": {
			"*": {
				/**
				 * Handles forwarded requests to the error resource.
				 *
				 * @param request  the web service request
				 * @param response the web service response
				 */
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