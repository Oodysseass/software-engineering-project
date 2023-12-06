// getting the required libraries
const http = require('http');
const test = require('ava');
const listen = require('test-listen');
const got = require('got');

// importing the server that was created in another module and exported there
const app = require('../index.js');
const { getStatistics } = require('../service/UserService.js');
const { editStatistics } = require('../service/AdminService.js')

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

// test for /user/{userId}/team/{teamId}/statistics GET - Good Request(200)
test('GET Statistics - Good Request', async (t) =>{
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
});

// test for /user/{userId}/team/{teamId}/statistics GET - Bad Request(400)
test('GET Statistics - Bad Request', async (t) =>{
    const error = await t.throwsAsync(async () => await t.context.got('user/asdas/team/rand/statistics'), {instanceOf: got.HTTPError});
    t.is(error.response.statusCode, 400);
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

// test for /user/{userId}/team/{teamId}/statistics PUT
test('PUT Statistics by function', async (t) =>{
    const statisticsFile = {
        "statfile" : "randomstatisticsfile"
    }
    const res = await editStatistics(statisticsFile,1,2);

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


test('Get team contacts', async(t) =>{
    const { body , statusCode }=await t.context.got('user/1/team/2/contacts')
    // check status code
    t.is(statusCode,200)

    // getting the first contract
    const firstelemnt = body[0]

    // check the info 
    t.is(firstelemnt.name,'tasos')
    t.is(firstelemnt.surname,'karakoul')
    t.is(firstelemnt.profileimage,'1111111')

    // getting the second contract
    const second = body[1]

    // check the info 
    t.is(second.name,'giwrgos')
    t.is(second.surname,'gkyzis')
    t.is(second.profileimage,'0000001')

    // check the type 
    const Keys= ['name', 'surname','profileimage']
    Keys.forEach((x)=>{t.true(firstelemnt.hasOwnProperty(x))})


})

