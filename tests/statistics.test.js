// getting the required libraries
const http = require('http');
const test = require('ava');
const listen = require('test-listen');
const got = require('got');

// importing the server that was created in another module and exported there
const app = require('../index.js');
const { getStatistics, getTeammateInfo } = require('../service/UserService.js');
const { editStatistics, sendInvitation, getCalendar } = require('../service/AdminService.js');

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

    // check the keys of return
    const Keys= ['name', 'surname','profileimage']
    Keys.forEach((x)=>{t.true(firstelemnt.hasOwnProperty(x))})


})

test("Test for get WorkOut 200", async (t) =>{
    const {body,statusCode} = await t.context.got("user/1/team/2/workout");
    expectedKeys=['workoutfile']

    t.assert(body)
    //check the keys of body
    expectedKeys.forEach((x)=>{t.true(body.hasOwnProperty(x))})
    //check the value
    t.is(body.workoutfile,'V29ya091dEZpbGU=')
    //check type
    t.is(typeof(body.workoutfile),'string')
    //check statusCode
    t.is(statusCode,200)

})

test("Test for get WorkOut 400", async (t)=>{
    const error = await t.throwsAsync(async () => {
        const res = await t.context.got('user/randomid/team/randomid/workout');
    });
    //check message and statuscode
    t.is(error.response.statusCode,400)
    t.is(error.message,'Response code 400 (Bad Request)')

})

// test for /user/{userId}/team/{teamId}/sendInvitation PUT
test("PUT SendInvitation by function", async (t) =>{
    // construct the input of the function for clarity
    const invitation = {
        "teamId" : "2",
        "userId" : "6",
        "invitedUserEmail" : "randomuser@example.com"
    };
    const res = await sendInvitation(invitation.teamId,invitation.userId,invitation.invitedUserEmail);

    // expected keys response should have 
    const expectedKeys = {
        "teamId" : 'number',
        "userId" : 'number',
        "invitedUserEmail" : 'string'
    };

    // check if the response is truthy
    t.assert(res);

    // check if all the expected keys are in the response object
    for (let key of Object.keys(expectedKeys))
        t.true(key in res);

    // check if values are the expected type
    for (let [key, type] of Object.entries(expectedKeys))
        t.is(typeof res[key], type);
});

// test for /user/{userId}/team/{teamId}/sendInvitation PUT - Good Request(200)
test("PUT SendInvitation - Good Request", async (t) =>{
    const {body,statusCode} = await t.context.got.put('user/6/team/2/sendInvitation', {
        // Options for the PUT request
        searchParams: {
            invitedUserEmail: 'randomuser@example.com',
        },
        headers: {
            'Content-Type': 'application/json',
        },
        responseType: 'json', 
    });

    // expected keys response should have 
    const expectedKeys = {
        "teamId" : 'number',
        "userId" : 'number',
        "invitedUserEmail" : 'string'
    };

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

// test for /user/{userId}/team/{teamId}/sendInvitation PUT - Bad Request(200)
test("PUT SendInvitation - Bad Request", async (t) =>{
    // creating an error by specifying wrong path parameters
    const error1 = await t.throwsAsync(async () => {
        const res1 = await t.context.got.put('user/randomid/team/randomid/sendInvitation', {
            // Options for the PUT request
            searchParams: {
                invitedUserEmail: 'randomuser@example.com',
            },
            headers: {
                'Content-Type': 'application/json',
            },
            responseType: 'json',
        });
    });

    // Access the properties of the caught error
    t.is(error1.response.statusCode, 400);
    t.is(error1.message, 'Response code 400 (Bad Request)');

    //creating a second way of error -> no provided email as a query parameter
    const error2 = await t.throwsAsync(async () => {
        const res2 = await t.context.got.put('user/6/team/1/sendInvitation', {
            headers: {
                'Content-Type': 'application/json',
            },
            responseType: 'json',
        });
    });

    // Access the properties of the caught error
    t.is(error2.response.statusCode, 400);
    t.is(error2.message, 'Response code 400 (Bad Request)');

    //creating a second way of error -> no provided email as a query parameter
    const error3 = await t.throwsAsync(async () => {
        const res3 = await t.context.got.put('user/6/team/1/sendInvitation', {
            // Options for the PUT request
            searchParams: {
                wrongField: 'randomuser@example.com',
            },
            headers: {
                'Content-Type': 'application/json',
            },
            responseType: 'json',
        });
    });

    // Access the properties of the caught error
    t.is(error3.response.statusCode, 400);
    t.is(error3.message, 'Response code 400 (Bad Request)');
});

// test for /user/{userId}/team/{teamId}/calendarEdit GET
test("GET CalendarEdit by function", async (t) =>{
    const calendar_params = {
        "teamid" : 2,
        "userid" : 6,
    };
    const res = await getCalendar(calendar_params.userid,calendar_params.teamid);

    // expected keys response should have 
    const expectedKeys = [{
        "location" : 'string',
        "time" : 'string',
        "practice" : 'string'
        }];

    // check if the response is truthy
    t.assert(res);

    // in the following loops I check if all of the items that can be found in
    // the calendar and returned with the get request are of the expected form

    // Check if all the expected keys are in the response object
    for (let key of Object.keys(expectedKeys)){
        for (let i; i < res.length; i++) {
            t.true(key in res[i]);
        }
    };
    
    // Check if values are the expected type
    for (let [key, type] of Object.entries(expectedKeys)){
        for (let i; i < res.length; i++) {
            t.is(typeof res[i][key],type);
        }
    };
});

// test for /user/{userId}/team/{teamId}/calendarEdit GET - Good Request(200)
test("GET CalendarEdit - Good Request", async (t) =>{
    const {body,statusCode} = await t.context.got("user/1/team/2/calendarEdit");

    // expected keys response should have 
    const expectedKeys = [{
        "location" : 'string',
        "time" : 'string',
        "practice" : 'string'
        }];

    // check if the response is truthy
    t.assert(body);
    // checking the statusCode
    t.is(statusCode,200);

    // in the following loops I check if all of the items that can be found in
    // the calendar and returned with the get request are of the expected form

    // Check if all the expected keys are in the response object
    for (let key of Object.keys(expectedKeys)){
        for (let i; i < body.length; i++) {
            t.true(key in body[i]);
        }
    };
    
    // Check if values are the expected type
    for (let [key, type] of Object.entries(expectedKeys)){
        for (let i; i < body.length; i++) {
            t.is(typeof body[i][key],type);
        }
    };
});

// test for /user/{userId}/team/{teamId}/calendarEdit GET - Bad Request(400)
test('GET CalendarEdit - Bad Request', async (t) =>{
    const error = await t.throwsAsync(async () => await t.context.got('user/random/team/random/calendarEdit'), {instanceOf: got.HTTPError});
    // check message and status code
    t.is(error.response.statusCode, 400);
    t.is(error.message, "Response code 400 (Bad Request)");
});


// test for /user/{userId}/team/{teamId}/contacts/{teammateUserId}
test('GET TeammateInfo by function', async (t) =>{
    // concentrated the path parameters when call by function
    const getInfo = {
        'usedId' : 2,
        'teamId' : 6,
        'teammateUserId':12
    };
    const res = await getTeammateInfo(getInfo.usedId,getInfo.teamId,getInfo.teammateUserId);

    // expected keys response should have 
    const expectedKeys = {
        "phone" : 'string',
        "surname" : 'string',
        "name" : 'string',
        "weight" : 'number',
        "profileimage" : 'string',
        "age" : 'number',
        "email" : 'string',
        "height" : 'number'
      };

    // check if the response is truthy
    t.assert(res);

    // check if all the expected keys are in the response object
    for (let key of Object.keys(expectedKeys))
        t.true(key in res);


    // check if values are the expected type
    for (let [key, type] of Object.entries(expectedKeys))
        t.is(typeof res[key], type);
});

// test for /user/{userId}/team/{teamId}/contacts/{teammateUserId} GET - Good Request(200)
test('GET TeammateInfo - Good Request', async (t) =>{
    const {body,statusCode} = await t.context.got("user/2/team/6/contacts/12");

    // expected keys response should have 
    const expectedKeys =  {
        "phone" : 'string',
        "surname" : 'string',
        "name" : 'string',
        "weight" : 'number',
        "profileimage" : 'string',
        "age" : 'number',
        "email" : 'string',
        "height" : 'number'
      };

    // check if the response is truthy
    t.assert(body);

    // checking the statusCode
    t.is(statusCode,200);

    // check if all the expected keys are in the response object
    for (let key of Object.keys(expectedKeys))
        t.true(key in body);


    // check if values are the expected type
    for (let [key, type] of Object.entries(expectedKeys))
        t.is(typeof body[key], type);
});

// test for /user/{userId}/team/{teamId}/contacts/{teammateUserId} GET - Bad Request(400)
test('GET TeammateInfo - Bad Request', async (t) =>{
    const error = await t.throwsAsync(async () => await t.context.got('user/random/team/random/contacts/random'), {instanceOf: got.HTTPError});
    // check message and status code
    t.is(error.response.statusCode, 400);
    t.is(error.message, "Response code 400 (Bad Request)");
});