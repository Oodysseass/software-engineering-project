const http = require('http');
const test = require('ava');
const listen = require('test-listen');
const got = require('got');

const app = require('../index.js')
const { userUserIdGET } = require('../service/UserService.js')

test.before(async (t) => {
    t.context.server = http.createServer(app);
    t.context.prefixUrl = await listen(t.context.server);
    t.context.got = got.extend({ prefixUrl: t.context.prefixUrl, responseType: 'json' });
});

test.after.always((t) => {
    t.context.server.close();
})

test('GET user by function', async (t) => {
    const res  = await userUserIdGET(1)

    // expected keys response should have
    const expectedKeys = {
        password: 'string',
        teamdId: 'number',
        isAdmin: 'boolean',
        userId: 'number',
        BasicInformation: 'object',
    }

    // check if response is truthy
    t.assert(res)

    // check if all the expected keys are in the response object
    for (let key of Object.keys(expectedKeys))
        t.true(key in res)

    // check if values are the expected type
    for (let [key, type] of Object.entries(expectedKeys))
        t.is(typeof res[key], type)

    // check if the retrieved user is the expected user
    t.is(res.isAdmin, true)
    t.is(res.userId, 1)
})

test('GET user', async (t) => {
    const { body, statusCode} = await t.context.got('user/1');

    t.is(body.userId, 1)
    t.is(statusCode, 200)
})
