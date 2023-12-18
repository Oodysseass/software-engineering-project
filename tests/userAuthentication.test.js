const test = require('ava');

const { setupServer } = require('../utils/testServer.js')
const { createUser } = require('../service/UnregisterService.js')
const { loginUser } = require('../service/UserService.js');
const { createTeam } = require('../service/UserService.js');

test.before(async (t) => {
    t.context = await setupServer()
});

test.after.always((t) => {
    t.context.server.close();
})

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

test('PUT user login 200', async (t) => {

    // a body for Put request 
    const requestBody={
        "email" : "Testing@mpeltes.gr",
        "password" : "testpassword"
    }

    // expected key response should have
    const expectedKey={
        "token" : 'string'
    }

    const {body , statusCode} = await t.context.got.put("user/login", {
        json: requestBody,
        responseType: 'json', 
    })

    //check if response is truthy
    t.assert(body)
    //check statuscode==200
    t.is(statusCode,200)
    //check the values 
    t.is(body.token,'000001')

    // check if all the expected keys are in the response object
    for (let key of Object.keys(expectedKey))
        t.true(key in body)

    // check if values are the expected type
    for (let [key, type] of Object.entries(expectedKey))
        t.is(typeof body[key], type)
});

test('PUT user login 400', async (t) => {
    // empty password
    let error = await t.throwsAsync(async () => {
        await t.context.got.put('user/login', {
            json: {
                email: "oasif"
            }
        })
    })

    // check message and statuscode
    t.is(error.response.statusCode, 400)
    t.is(error.message, 'Response code 400 (Bad Request)')

    // empty email
    error = await t.throwsAsync(async () => {
        await t.context.got.put('user/login', {
            json: {
                password: "oasif"
            }
        })
    })

    // check message and statuscode
    t.is(error.response.statusCode, 400)
    t.is(error.message, 'Response code 400 (Bad Request)')

    // empty body
    error = await t.throwsAsync(async () => {
        await t.context.got.put('user/login', {
            json: {}
        })
    })

    // check message and statuscode
    t.is(error.response.statusCode, 400)
    t.is(error.message, 'Response code 400 (Bad Request)')
});

// keys of user object
const userKeys = {
    password: 'string',
    teamdId: 'number',
    isAdmin: 'boolean',
    userId: 'number',
    BasicInformation: 'object',
}

const expectedUser = {
    password: 'test1233',
    teamdId: 2,
    isAdmin: true,
    userId: 1,
    BasicInformation: {
      phone: '6932112312',
      surname: 'Beltes',
      name: 'Anastasis',
      weight: 80.5,
      profileimage: '101010111',
      age: 22,
      email: 'tasoulis@example.com',
      height: 185.5
    }
}

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

test('POST user 200', async (t) => {
    const { body, statusCode } = await t.context.got.post('user', {
                                    json: expectedUser,
                                });

    // check if response is truthy
    t.assert(body)

    // check if all the expected keys are in the response object
    for (let key of Object.keys(userKeys))
        t.true(key in body)

    // check if values are the expected type
    for (let [key, type] of Object.entries(userKeys))
        t.is(typeof body[key], type)

    // check if the created user is the expected user
    t.deepEqual(body, expectedUser)
    t.is(statusCode, 200)
})

test('POST user 400', async (t) => {
    // wrong type of input
    error = await t.throwsAsync(async () => {
        await t.context.got.post('user', {
            json: {
                password: 'test1233',
                teamdId: 2,
                isAdmin: true,
                userId: "lol",
                BasicInformation: {
                    phone: '6932112312',
                    surname: 'Beltes',
                    name: 'Anastasis',
                    weight: 80.5,
                    profileimage: '101010111',
                    age: 22,
                    email: 'tasoulis@example.com',
                    height: 185.5
                }
            }
        })
    })

    // check message and statuscode
    t.is(error.response.statusCode, 400)
    t.is(error.message, 'Response code 400 (Bad Request)')

    // wrong not all user info
    error = await t.throwsAsync(async () => {
        await t.context.got.post('user', {
            json: {
                teamdId: 2,
                isAdmin: true,
                userId: 1,
                BasicInformation: {
                    phone: '6932112312',
                    surname: 'Beltes',
                    name: 'Anastasis',
                    weight: 80.5,
                    profileimage: '101010111',
                    age: 22,
                    email: 'tasoulis@example.com',
                    height: 185.5
                }
            }
        })
    })

    // check message and statuscode
    t.is(error.response.statusCode, 400)
    t.is(error.message, 'Response code 400 (Bad Request)')

    // missing request body
    error = await t.throwsAsync(async () => {
        await t.context.got.post('user', {
            json: {}
        })
    })

    // check message and statuscode
    t.is(error.response.statusCode, 400)
    t.is(error.message, 'Response code 400 (Bad Request)')
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

test('POST create team 200', async (t) => {
    const { body, statusCode } = await t.context.got.post('user/1/createTeam', {
        json: {
            TeamName: "Omadara",
        },
    });

    // check if response is truthy
    t.assert(body)

    // check if all the expected keys are in the response object
    t.assert(body.TeamName)

    // check if values are the expected type
    t.is(typeof body.TeamName, 'string')

    // check if the created team is the expected team
    t.is(body.TeamName, 'Omadara')

    // checking the statusCode
    t.is(statusCode, 200);
})

test('POST create team 400', async (t) => {
    // wrong request body
    error = await t.throwsAsync(async () => {
        await t.context.got.post('user/1/createTeam', {
            json: {
                "whatever": "whatevs"
            }
        })
    })

    // check message and statuscode
    t.is(error.response.statusCode, 400)
    t.is(error.message, 'Response code 400 (Bad Request)')

    // missing request body
    error = await t.throwsAsync(async () => {
        await t.context.got.post('user/1/createTeam', {
            json: {}
        })
    })

    // check message and statuscode
    t.is(error.response.statusCode, 400)
    t.is(error.message, 'Response code 400 (Bad Request)')
})
