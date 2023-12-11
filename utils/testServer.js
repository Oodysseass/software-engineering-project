const http = require('http');
const listen = require('test-listen');
const got = require('got');

const app = require('../index.js');

module.exports.setupServer = async function setupServer(){
    const server = http.createServer(app);
    const prefixUrl = await listen(server);
    const gotInstance = got.extend({ prefixUrl, responseType: 'json' });

    return { server, prefixUrl, got: gotInstance };
}
