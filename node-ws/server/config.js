(function () {
	"use strict";

	// TODO Read configuration from a json file

	var config = {
		logging: {
			level: "INFO"
		},
		server: {
			address : "localhost",
			port : 3000
		},
		resources: [
			"./resources/root",
			"./resources/api",
			"./resources/error"
		]
	};

	/**
	 * Configuration properties.
	 */
	module.exports = config;
})();