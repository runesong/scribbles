(function () {
    "use strict";

    // TODO Read configuration from a json file

    var config = {
        logging: {
            level: "INFO"
        },
        server: {
            address: "localhost",
            port: 3000
        },
        resources: [
            "./resources/root",
            "./resources/api-root",
            "./resources/error",
            "./resources/example"
        ]
    };

    /**
     * Configuration properties.
     */
    module.exports = config;
})();
