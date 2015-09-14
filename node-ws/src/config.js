(function () {
	"use strict";

	var config = {
		logging: {
			level: "INFO"
		}
	};

	module.exports.get = function () {
		return config;
	};
})();