(function () {
	"use strict";

	var config = require("./config");

	var resources = [];
	for (var i = 0; i < config.resources.length; i++) {
		resources[i] = require(config.resources[i]);
	}

	var api = {};
	for (var i = 0; i < resources.length; i++) {
		api[resources[i].id] = resources[i].resource;
	}

	var requestMappings = {};
	for (var i = 0; i < resources.length; i++) {
		requestMappings[resources[i].resource.href] = resources[i].resource.methods;
	}

	module.exports = {
		api : api,
		requestMappings: requestMappings
	};
})();
