(function () {
	"use strict";

	var HTTP = require("http");
	var URL = require("url");

	var config = require("./config");
	var log    = require("./logging");

	var uri = URL.parse(config.http.services["demo-ws@1.0"].url);

	module.exports = {
		get : function (pathname, callback) {
			var apiResource = {
				protocol: uri.protocol,
				hostname: uri.hostname,
				port:     uri.port,
				path:     pathname || uri.pathname,
				method:   "GET",
				headers:  {"Accept": "application/*+json"}
			};

			var request = HTTP.request(apiResource, function (response) {
				var body = "";
				response.on("data", function(chunk) {
					body += chunk;
				}).on("end", function() {
					var data;
					if (body.length > 0) {
						data = JSON.parse(body);
					}
					callback(response.statusCode, response.statusMessage, response.headers, data);
				});
			});
			request.end();
		},
		post : function (pathname, callback) {
			var apiResource = {
				protocol: uri.protocol,
				hostname: uri.hostname,
				port:     uri.port,
				path:     pathname || uri.pathname,
				method:   "POST",
				headers:  {"Accept": "application/*+json"}
			};

			var request = HTTP.request(apiResource, function (response) {
				var body = "";
				response.on("data", function(chunk) {
					body += chunk;
				}).on("end", function() {
					var data;
					if (body.length > 0) {
						data = JSON.parse(body);
					}
					callback(response.statusCode, response.statusMessage, response.headers, data);
				});
			});
			request.end();
		}
	};
})();
