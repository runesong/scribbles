(function () {
	"use strict";

	var config = require("./config");

	var Level = {
		OFF: Number.MAX_VALUE,
		ERROR: 10000,
		WARN: 1000,
		INFO: 0,
		DEBUG: -1000,
		ALL: Number.MIN_VALUE
	};

	var currentLevel = Level[config.get().logging.level];

	module.exports.isLoggable = function (key) {
		return currentLevel <= Level[key];
	};

	module.exports.error = function(message, ex) {
		if (currentLevel <= Level.ERROR) {
			console.log.apply(this, arguments);
		}
	};
	module.exports.warn = function(message, ex) {
		if (currentLevel <= Level.WARN) {
			console.log.apply(this, arguments);
		}
	};
	module.exports.info = function(message, ex) {
		if (currentLevel <= Level.INFO) {
			console.log.apply(this, arguments);
		}
	};
	module.exports.debug = function(message, ex) {
		if (currentLevel <= Level.DEBUG) {
			console.log.apply(this, arguments);
		}
	};
})();