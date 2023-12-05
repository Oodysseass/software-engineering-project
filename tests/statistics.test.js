// getting the required libraries
const http = require('http');
const test = require('ava');
const listen = require('test-listen');
const got = require('got');

// importing the server that was created in another module and exported there
const app = require('../index.js');
const { getStatistics } = require('../service/UserService.js')

// before testing, intializing the server and the request making
test.before(async (t) => {
    t.context.server = http.createServer(app);
    t.context.prefixUrl = await listen(t.context.server); 
    t.context.got = got.extend({ prefixUrl: t.context.prefixUrl, responseType: 'json' }); 
});

// always closing the server after any test in the statistics section
test.after.always((t) => {
    t.context.server.close(); 
});

// test for /user/{userId}/team/{teamId}/statistics GET
test('GET Statistics', async (t) =>{
    const {body,statusCode} = await t.context.got("user/1/team/2/statistics");

    // expected keys response should have 
    const expectedKeys = {
        statfile: 'string'
    }

    // check if the response is truthy
    t.assert(body);

    // check if all the expected keys are in the response object
    for (let key of Object.keys(expectedKeys))
        t.true(key in body);


    // check if values are the expected type
    for (let [key, type] of Object.entries(expectedKeys))
        t.is(typeof body[key], type);

    // checking the statusCode
    t.is(statusCode,200);

    // Checking if the statFile value is as expected for the particular team example
    t.is(body.statfile,"U3RhdGlzdGljc0ZpbGU=");

    // checking bad request
    const error = await t.throwsAsync(async () => await t.context.got('user/asdas/team/rand/statistics'), {instanceOf: got.HTTPError});
    t.is(error.message, "Response code 400 (Bad Request)");
});

test('GET Statistics by function', async (t) =>{
    const res = await getStatistics(1,2);

    // expected keys response should have 
    const expectedKeys = {
        statfile: 'string'
    }

    // check if the response is truthy
    t.assert(res);

    // check if all the expected keys are in the response object
    for (let key of Object.keys(expectedKeys))
        t.true(key in res);


    // check if values are the expected type
    for (let [key, type] of Object.entries(expectedKeys))
        t.is(typeof res[key], type);
});

