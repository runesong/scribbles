(function () {
	var assert = require("assert");
	var client = require("./client");

	function prettyprint(o) {
		return JSON.stringify(o, null, "    ");
	}

	client.get("/", function (statusCode, statusMessage, headers) {
		console.log("%s %s", statusCode, statusMessage);
		console.log("%j", headers);

		assert.equal(statusCode, 301);
		assert.equal(statusMessage, "Moved Permanently");
		assert.equal(headers["location"], "/demo-ws/v1.0");
	});

	client.get("/error", function (statusCode, statusMessage, headers, data) {
		console.log("%j", headers);
		console.log(prettyprint(data));

		assert.equal(statusCode, 200);
		assert.equal(statusMessage, "OK");
		assert.equal(headers["content-type"], "application/json");

		assert.equal(data.status, 200);
		assert.equal(data.reason, "OK");
		assert.equal(data.path,   "/error");
	});

	client.get("/foo/diddle/dee", function (statusCode, statusMessage, headers, data) {
		console.log("%j", headers);
		console.log(prettyprint(data));

		assert.equal(statusCode, 404);
		assert.equal(statusMessage, "Not Found");
		assert.equal(headers["content-type"], "application/json");

		assert.equal(data.status, 404);
		assert.equal(data.reason, "Not Found");
		assert.equal(data.path,   "/foo/diddle/dee");
	});

	client.post("/demo-ws/v1.0", function (statusCode, statusMessage, headers, data) {
		console.log("%j", headers);
		console.log(prettyprint(data));

		assert.equal(statusCode, 405);
		assert.equal(statusMessage, "Method Not Allowed");
		assert.equal(headers["content-type"], "application/json");

		assert.equal(data.status, 405);
		assert.equal(data.reason, "Method Not Allowed");
		assert.equal(data.path,   "/demo-ws/v1.0");
	});

	client.get("/demo-ws/v1.0", function (statusCode, statusMessage, headers, data) {
		console.log("%j", headers);
		console.log(prettyprint(data));

		assert.equal(statusCode, 300);
		assert.equal(statusMessage, "Multiple Choices");
		assert.equal(headers["content-type"], "application/json");

		assert.equal(data.root.href, "http://localhost:3000/");
		assert.equal(data.root.methods.GET.produces, "application/json");

		assert.equal(data.api.href, "http://localhost:3000/demo-ws/v1.0");
		assert.equal(data.api.methods.GET.produces, "application/json");

		assert.equal(data.error.href, "http://localhost:3000/error");
		assert.equal(data.error.methods.GET.produces, "application/json");
	});
})();
