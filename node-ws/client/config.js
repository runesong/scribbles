(function () {
	"use strict";

	// TODO Read configuration from a json file

	/**
	 * Configuration properties.
	 */
	module.exports = {
		logging: {
			level: "INFO"
		},
		http:    {
			services: {
				"demo-ws@1.0": {
					url: "http://localhost:3000/demo-ws/v1.0"
				}
			}
		}
	};
})();

