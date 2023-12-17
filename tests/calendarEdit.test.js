const test = require('ava');
const got = require('got');

// importing the server that was created in another module and exported there
const { setupServer } = require('../utils/testServer.js');
const { getCalendar, editCalendar } = require('../service/AdminService.js');

// before testing, intializing the server and the request making
test.before(async (t) => {
    t.context = await setupServer();
});

// always closing the server after any test in the statistics section
test.after.always((t) => {
    t.context.server.close(); 
});

// expected keys response should have 
const calendarKeys = [{
    "location" : 'string',
    "time" : 'string',
    "practice" : 'string'
    }];

// test for /user/{userId}/team/{teamId}/calendarEdit GET
test("GET CalendarEdit by function", async (t) =>{
    const calendar_params = {
        "teamid" : 2,
        "userid" : 6,
    };
    const res = await getCalendar(calendar_params.userid,calendar_params.teamid);

    // check if the response is truthy
    t.assert(res);

    // in the following loops I check if all of the items that can be found in
    // the calendar and returned with the get request are of the expected form

    // Check if all the expected keys are in the response object
    for (let key of Object.keys(calendarKeys)){
        for (let i; i < res.length; i++) {
            t.true(key in res[i]);
        }
    };
    
    // Check if values are the expected type
    for (let [key, type] of Object.entries(calendarKeys)){
        for (let i; i < res.length; i++) {
            t.is(typeof res[i][key],type);
        }
    };
});

// test for /user/{userId}/team/{teamId}/calendarEdit GET - Good Request(200)
test("GET CalendarEdit - Good Request", async (t) =>{
    const {body,statusCode} = await t.context.got("user/1/team/2/calendarEdit");

    // check if the response is truthy
    t.assert(body);
    // checking the statusCode
    t.is(statusCode,200);

    // in the following loops I check if all of the items that can be found in
    // the calendar and returned with the get request are of the expected form

    // Check if all the expected keys are in the response object
    for (let key of Object.keys(calendarKeys)){
        for (let i; i < body.length; i++) {
            t.true(key in body[i]);
        }
    };
    
    // Check if values are the expected type
    for (let [key, type] of Object.entries(calendarKeys)){
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

const calendarFile = [{
    "location": "gym",
    "time": "13.30",
    "practice": "Weight"
}, {
    "location": "court",
    "time": "19.30",
    "practice": "Basketball"
}
]

test("Edit calendar by function", async (t) => {
    const res = await editCalendar(calendarFile)

    // check if response is truthy
    t.assert(res)

    // check if res is the expected length
    t.is(res.length, calendarFile.length)

    // check if all the expected keys are in the response object
    for (let item in calendarFile) {
        for (let key of Object.keys(calendarFile[item]))
            t.true(key in res[item])
    }

    // check if values are the expected type
    for (let item in calendarFile) {
        for (let [key, value] of Object.entries(calendarFile[item]))
            t.is(typeof res[item][key], typeof value)
    }

    // check if the calander is the expected calander
    t.deepEqual(res, calendarFile)
})

test("PUT calendar 200", async (t) => {
    const { body, statusCode } = await t.context.got.put("user/1/team/2/calendarEdit",
        {
            json: calendarFile
        })

    // check if response is truthy
    t.assert(body)

    // check if res is the expected length
    t.is(body.length, calendarFile.length)

    // check if all the expected keys are in the response object
    for (let item in calendarFile) {
        for (let key of Object.keys(calendarFile[item]))
            t.true(key in body[item])
    }

    // check if values are the expected type
    for (let item in calendarFile) {
        for (let [key, value] of Object.entries(calendarFile[item]))
            t.is(typeof body[item][key], typeof value)
    }

    // check if the calander is the expected calander
    t.deepEqual(body, calendarFile)

    // check if response code is correct
    t.is(statusCode, 200)
})

test("PUT calendar 400", async (t) => {
    // wrong teamid
    let error = await t.throwsAsync(async () => {
        await t.context.got.put('user/1/team/randomid/calendarEdit', {
            json: calendarFile
        })
    })

    // check message and statuscode
    t.is(error.response.statusCode, 400)
    t.is(error.message, 'Response code 400 (Bad Request)')

    // wrong userid
    error = await t.throwsAsync(async () => {
        await t.context.got.put('user/randomid/team/2/calendarEdit', {
            json: calendarFile
        })
    })

    // check message and statuscode
    t.is(error.response.statusCode, 400)
    t.is(error.message, 'Response code 400 (Bad Request)')

    // wrong both ids
    error = await t.throwsAsync(async () => {
        await t.context.got.put('user/randomid/team/randomid/calendarEdit', {
            json: calendarFile
        })
    })

    // check message and statuscode
    t.is(error.response.statusCode, 400)
    t.is(error.message, 'Response code 400 (Bad Request)')

    // missing request body
    error = await t.throwsAsync(async () => {
        await t.context.got.put('user/1/team/2/calendarEdit', {
            json: {}
        })
    })

    // check message and statuscode
    t.is(error.response.statusCode, 400)
    t.is(error.message, 'Response code 400 (Bad Request)')
})
