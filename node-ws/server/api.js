(function () {
    "use strict";

    var Resource = {
        resource: function (id, href) {
            this.id = id;
            this.resource = {
                href: href,
                methods: {}
            };
            return this;
        },
        head: function (callback) {
            this.resource.methods["HEAD"] = {
                service: callback
            };
            return this;
        },
        get: function (callback) {
            this.resource.methods["GET"] = {
                produces: "application/json",
                service: callback
            };
            return this;
        },
        put: function (callback) {
            this.resource.methods["PUT"] = {
                consumes: "application/json",
                produces: "application/json",
                service: callback
            };
            return this;
        },
        patch: function (callback) {
            this.resource.methods["PATCH"] = {
                consumes: "application/json",
                produces: "application/json",
                service: callback
            };
            return this;
        },
        post: function (callback) {
            this.resource.methods["POST"] = {
                consumes: "application/json",
                produces: "application/json",
                service: callback
            };
            return this;
        },
        delete: function (callback) {
            this.resource.methods["DELETE"] = {
                service: callback
            };
            return this;
        }
    };

    /**
     * Utilities for constructing API resources.
     */
    module.exports = {
        resource: function (id, href) {
            return Object.create(Resource).resource(id, href);
        }
    };
})();
