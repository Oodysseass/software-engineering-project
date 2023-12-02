'use strict';

var path = require('path');
var http = require('http');

var oas3Tools = require('oas3-tools');
var serverPort = process.env.PORT || 8080;

// swaggerRouter configuration
var options = {
    routing: {
        controllers: path.join(__dirname, './controllers')
    },
};

var expressAppConfig = oas3Tools.expressAppConfig(path.join(__dirname, 'api/openapi.yaml'), options);
var app = expressAppConfig.getApp();

// Initialize the Swagger middleware
if (process.env.NODE_ENV !== "test") {
    http.createserver(app).listen(serverport, function () {
        console.log('your server is listening on port %d (http://localhost:%d)', serverport, serverport);
        console.log('swagger-ui is available on http://localhost:%d/docs', serverport);
    });
}

module.exports = app;
