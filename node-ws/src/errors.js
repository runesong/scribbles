(function () {
	"use strict";

	var log = require("./logging");
	var resources = require("./resources");

	var errors = {
		404 : {
			service: function (request, response) {
				var reason = "Not Found";
				log.error(request.method + " " + request.url + " : " + reason);
				resources.find("/error")["*"].service(request, response, 404, reason);
			}
		},
		405 : {
			service: function (request, response) {
				var reason = "Method Not Allowed";
				log.error(request.method + " " + request.url + " : " + reason);
				resources.find("/error")["*"].service(request, response, 405, reason);
			}
		},
		500: {
			service: function (request, response, error) {
				var reason = "Internal Server Error";
				log.error(request.method + " " + request.url + " : " + reason);
				log.error(error.stack);
				resources.find("/error")["*"].service(request, response, 500, reason);
			}
		}
	};

	module.exports.find = function (errorCode) {
		return errors[errorCode];
	}
})();
