const http = require('http');
const test = require('ava');
const listen = require('test-listen');
const got = require('got');

const app = require('../index.js');

test.before(async (t) => {
    t.context.server = http.createServer(app);
    t.context.prefixUrl = await listen(t.context.server);
    t.context.got = got.extend({ prefixUrl: t.context.prefixUrl, responseType: 'json' });
});

test.after.always((t) => {
    t.context.server.close();
})

test('GET user', async (t) => {
    const { body, statusCode} = await t.context.got('user/1');

    t.is(body.userId, 1)
    t.is(statusCode, 200)
})
