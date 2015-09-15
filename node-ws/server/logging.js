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

	/**
	 * Filterable logging support.
	 *
	 * @type {{isLoggable: Function, error: Function, warn: Function, info: Function, debug: Function}}
	 */
	module.exports = {

		/**
		 * Tests whether a message can be written at the supplied log level.
		 *
		 * @param level the log level key ("ERROR", "WARN", "INFO", "DEBUG")
		 *
		 * @returns {boolean} true if the level is loggable
		 */
		isLoggable : function (level) {
			return currentLevel <= Level[level];
		},

		/**
		 * Logs a message to standard output at the "ERROR" log level.
		 *
		 * @param message the message to be logged
		 * @param ex      an exception to be logged (if any)
		 */
		error : function(message, ex) {
			if (currentLevel <= Level.ERROR) {
				console.error.apply(this, arguments);
			}
		},

		/**
		 * Logs a message to standard output at the "WARN" log level.
		 *
		 * @param message the message to be logged
		 * @param ex      an exception to be logged (if any)
		 */
		warn : function(message, ex) {
			if (currentLevel <= Level.WARN) {
				console.warn.apply(this, arguments);
			}
		},

		/**
		 * Logs a message to standard output at the "INFO" log level.
		 *
		 * @param message the message to be logged
		 * @param ex      an exception to be logged (if any)
		 */
		info : function(message, ex) {
			if (currentLevel <= Level.INFO) {
				console.log.apply(this, arguments);
			}
		},

		/**
		 * Logs a message to standard output at the "DEBUG" log level.
		 *
		 * @param message the message to be logged
		 * @param ex      an exception to be logged (if any)
		 */
		debug : function(message, ex) {
			if (currentLevel <= Level.DEBUG) {
				console.log.apply(this, arguments);
			}
		}
	}
})();