(function () {
	"use strict";

	var log = require("./logging");
	var resources = require("./resources");

	/**
	 * Error handlers mappings.
	 *
	 * @type {{404: {service: Function}, 405: {service: Function}, 500: {service: Function}}}
	 */
	module.exports = {

		/**
		 * 404 Not Found
		 */
		404 : {
			/**
			 * Error handler for "404 Not Found" errors.
			 *
			 * @param request  the web service request
			 * @param response the web service response
			 */
			service: function (request, response) {
				var reason = "Not Found";
				log.error(request.method + " " + request.url + " : " + reason);
				resources["/error"]["*"].service(request, response, 404, reason);
			}
		},

		/**
		 * 404 Method Not Allowed
		 */
		405 : {
			/**
			 * Error handler for "404 Not Found" errors.
			 *
			 * @param request  the web service request
			 * @param response the web service response
			 */
			service: function (request, response) {
				var reason = "Method Not Allowed";
				log.error(request.method + " " + request.url + " : " + reason);
				resources["/error"]["*"].service(request, response, 405, reason);
			}
		},

		/**
		 * 500 Internal Server Error
		 */
		500: {
			/**
			 * Error handler for "404 Not Found" errors.
			 *
			 * @param request  the web service request
			 * @param response the web service response
			 */
			service: function (request, response, error) {
				var reason = "Internal Server Error";
				log.error(request.method + " " + request.url + " : " + reason);
				log.error(error.stack);
				resources["/error"]["*"].service(request, response, 500, reason);
			}
		}
	};
})();
