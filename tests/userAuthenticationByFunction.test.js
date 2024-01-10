const test = require('ava');

const { setupServer } = require('../utils/testServer.js');
const { createUser } = require('../service/UnregisterService.js');
const { loginUser } = require('../service/UserService.js');
const { createTeam } = require('../service/UserService.js');

const { userKeys, expectedUser } = require('../utils/schemas.js');

// before testing, intializing the server and the request making
test.before(async (t) => {
    t.context = await setupServer();
});

// always closing the server after any test in the statistics section
test.after.always((t) => {
    t.context.server.close(); 
});

test('PUT user login call by function', async(t) =>{
    // a body for Put request 
    const requestBody={
        "email" : "Testing@mpeltes.gr",
        "password" : "testpassword"
    }
    
    const res = await loginUser(requestBody);
    // check if response is truthy
    t.assert(res)
    // expected key response should have
    const expectedKey={
        "token" : 'string'
    }
    //check the values 
    t.is(res.token,'000001')

    // check if all the expected keys are in the response object
    for (let key of Object.keys(expectedKey))
        t.true(key in res)

    // check if values are the expected type
    for (let [key, type] of Object.entries(expectedKey))
        t.is(typeof res[key], type)
});

test('Create user by function', async (t) => {
    const res = await createUser(expectedUser)

    // check if response is truthy
    t.assert(res)

    // check if all the expected keys are in the response object
    for (let key of Object.keys(userKeys))
        t.true(key in res)

    // check if values are the expected type
    for (let [key, type] of Object.entries(userKeys))
        t.is(typeof res[key], type)

    // check if the created user is the expected user
    t.deepEqual(res, expectedUser)
})

test('POST create team by function', async (t) => {
    const res = await createTeam({ TeamName: "Omadara" }, 1)

    // check if response is truthy
    t.assert(res)

    // check if all the expected keys are in the response object
    t.assert(res.TeamName)

    // check if values are the expected type
    t.is(typeof res.TeamName, 'string')

    // check if the created team is the expected team
    t.is(res.TeamName, 'Omadara')
})
