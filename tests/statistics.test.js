// getting the required libraries
const test = require('ava');
const got = require('got');

// importing the server that was created in another module and exported there
const { setupServer } = require('../utils/testServer.js');
const { getStatistics } = require('../service/UserService.js');
const {editStatistics} = require('../service/AdminService.js');

// before testing, intializing the server and the request making
test.before(async (t) => {
    t.context = await setupServer();
});

// always closing the server after any test in the statistics section
test.after.always((t) => {
    t.context.server.close(); 
});

// expected keys response should have 
const statisticsKeys = {
    statfile: 'string'
};

// test for /user/{userId}/team/{teamId}/statistics GET - Good Request(200)
test('GET Statistics - Good Request', async (t) =>{
    const {body,statusCode} = await t.context.got("user/1/team/2/statistics");

    // check if the response is truthy
    t.assert(body);

    // check if all the expected keys are in the response object
    for (let key of Object.keys(statisticsKeys))
        t.true(key in body);


    // check if values are the expected type
    for (let [key, type] of Object.entries(statisticsKeys))
        t.is(typeof body[key], type);

    // checking the statusCode
    t.is(statusCode,200);

    // Checking if the statFile value is as expected for the particular team example
    t.is(body.statfile,"U3RhdGlzdGljc0ZpbGU=");
});

// test for /user/{userId}/team/{teamId}/statistics GET - Bad Request(400)
test('GET Statistics - Bad Request', async (t) =>{
    const error = await t.throwsAsync(async () => await t.context.got('user/asdas/team/rand/statistics'), {instanceOf: got.HTTPError});
    t.is(error.response.statusCode, 400);
    t.is(error.message, "Response code 400 (Bad Request)");
});

// test for /user/{userId}/team/{teamId}/statistics GET
test('GET Statistics by function', async (t) =>{
    const res = await getStatistics(1,2);

    // check if the response is truthy
    t.assert(res);

    // check if all the expected keys are in the response object
    for (let key of Object.keys(statisticsKeys))
        t.true(key in res);


    // check if values are the expected type
    for (let [key, type] of Object.entries(statisticsKeys))
        t.is(typeof res[key], type);
});

// test for /user/{userId}/team/{teamId}/statistics PUT
test('PUT Statistics by function', async (t) =>{
    const statisticsFile = {
        "statfile" : "randomstatisticsfile"
    }
    const res = await editStatistics(statisticsFile,1,2);

    // check if the response is truthy
    t.assert(res);

    // check if all the expected keys are in the response object
    for (let key of Object.keys(statisticsKeys))
        t.true(key in res);

    // check if values are the expected type
    for (let [key, type] of Object.entries(statisticsKeys))
        t.is(typeof res[key], type);
});


// test for /user/{userId}/team/{teamId}/statistics PUT - Good Request (200)
test('PUT Statistics - Good Request', async (t) =>{
    const {body,statusCode} = await t.context.got.put('user/1/team/2/statistics', {
        // Options for the PUT request
        body: JSON.stringify({
            statfile: 'randomstatisticsfile'
        }),
        headers: {
            'Content-Type': 'application/json',
        },
        responseType: 'json', 
    });

    // check if the response is truthy
    t.assert(body);

    // check if all the expected keys are in the response object
    for (let key of Object.keys(statisticsKeys))
        t.true(key in body);


    // check if values are the expected type
    for (let [key, type] of Object.entries(statisticsKeys))
        t.is(typeof body[key], type);

    // checking the statusCode
    t.is(statusCode,200);
});

// test for /user/{userId}/team/{teamId}/statistics PUT - Bad Request (400)
test('PUT Statistics - Bad Request', async (t) =>{
    const error = await t.throwsAsync(async () => {
        const res = await t.context.got.put('user/randomid/team/randomid/statistics', {
            body: JSON.stringify({
                1: "random"
            }),
            headers: {
                'Content-Type': 'application/json',
            },
            responseType: 'json',
        });
    });

    // Access the properties of the caught error
    t.is(error.response.statusCode, 400);
    t.is(error.message, 'Response code 400 (Bad Request)');
});
