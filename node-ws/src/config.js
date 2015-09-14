(function () {
	"use strict";

	// TODO Read configuration from a json file

	/**
	 * Configuration properties.
	 *
	 * @type {{logging: {level: string}, server: {port: number}}}
	 */
	module.exports = {
		logging: {
			level: "INFO"
		},
		server: {
			port : 3000
		}
	};
})();