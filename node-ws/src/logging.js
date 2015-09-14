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

	var currentLevel = Level[config.logging.level];

	module.exports = {
		isLoggable : function (key) {
			return currentLevel <= Level[key];
		},
		error : function(message, ex) {
			if (currentLevel <= Level.ERROR) {
				console.log.apply(this, arguments);
			}
		},
		warn : function(message, ex) {
			if (currentLevel <= Level.WARN) {
				console.log.apply(this, arguments);
			}
		},
		info : function(message, ex) {
			if (currentLevel <= Level.INFO) {
				console.log.apply(this, arguments);
			}
		},
		debug : function(message, ex) {
			if (currentLevel <= Level.DEBUG) {
				console.log.apply(this, arguments);
			}
		}
	}
})();