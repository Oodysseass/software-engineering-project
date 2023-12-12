const test = require('ava');
const got = require('got');

// importing the server that was created in another module and exported there
const { setupServer } = require('../utils/testServer.js');
const {sendInvitation} = require('../service/AdminService.js');

// before testing, intializing the server and the request making
test.before(async (t) => {
    t.context = await setupServer();
});

// always closing the server after any test in the statistics section
test.after.always((t) => {
    t.context.server.close(); 
});

// expected keys response should have 
const invitationKeys = {
    "teamId" : 'number',
    "userId" : 'number',
    "invitedUserEmail" : 'string'
};

// test for /user/{userId}/team/{teamId}/sendInvitation PUT
test("PUT SendInvitation by function", async (t) =>{
    // construct the input of the function for clarity
    const invitation = {
        "teamId" : "2",
        "userId" : "6",
        "invitedUserEmail" : "randomuser@example.com"
    };
    const res = await sendInvitation(invitation.teamId,invitation.userId,invitation.invitedUserEmail);

    // check if the response is truthy
    t.assert(res);

    // check if all the expected keys are in the response object
    for (let key of Object.keys(invitationKeys))
        t.true(key in res);

    // check if values are the expected type
    for (let [key, type] of Object.entries(invitationKeys))
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

    // check if the response is truthy
    t.assert(body);

    // check if all the expected keys are in the response object
    for (let key of Object.keys(invitationKeys))
        t.true(key in body);


    // check if values are the expected type
    for (let [key, type] of Object.entries(invitationKeys))
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
