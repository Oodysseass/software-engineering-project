const test = require('ava');
const got = require('got');

const { setupServer } = require('../utils/testServer.js')
const { userUserIdGET } = require('../service/UserService.js')

test.before(async (t) => {
    t.context = await setupServer()
});

test.after.always((t) => {
    t.context.server.close();
})

// keys of user object
const userKeys = {
    password: 'string',
    teamdId: 'number',
    isAdmin: 'boolean',
    userId: 'number',
    BasicInformation: 'object',
}

test('GET user by function', async (t) => {
    const res  = await userUserIdGET(1)

    // check if response is truthy
    t.assert(res)

    // check if all the expected keys are in the response object
    for (let key of Object.keys(userKeys))
        t.true(key in res)

    // check if values are the expected type
    for (let [key, type] of Object.entries(userKeys))
        t.is(typeof res[key], type)

    // check if the retrieved user is the expected user
    t.is(res.isAdmin, true)
    t.is(res.userId, 1)
})

test('GET user 200', async (t) => {
    const { body, statusCode} = await t.context.got('user/1');

    // check if response is truthy
    t.assert(body)

    // check if all the expected keys are in the response object
    for (let key of Object.keys(userKeys))
        t.true(key in body)

    // check if values are the expected type
    for (let [key, type] of Object.entries(userKeys))
        t.is(typeof body[key], type)

    // check if the retrieved user is the expected user
    t.is(body.isAdmin, true)
    t.is(body.userId, 1)

    // check status code
    t.is(statusCode, 200)

})

test('GET user 400', async (t) => {
    // check bad request
    const error = await t.throwsAsync(async () => await t.context.got('user/asdas'), {instanceOf: got.HTTPError})
    t.is(error.message, 'Response code 400 (Bad Request)')
})

test("Put user 200", async (t) =>{
    // a body for Put request 
    const requestBody={
        "password" : "ChangedPassword",
        "teamdId" : 2,
        "isAdmin" : true,
        "userId" : 1,
        "BasicInformation" : {
            "phone" : "6932112312",
            "surname" : "Beltes",
            "name" : "Anastasis",
            "weight" : 80.5,
            "profileimage" : "101010111",
            "age" : 22,
            "email" : "tasoulis@example.com",
            "height" : 185.5
         }
    }
    const {body , statusCode} = await t.context.got.put("user/1", {
        json: requestBody,
        responseType: 'json', 
      })

    //check if response is truthy
    t.assert(body)
    //check statuscode==200
    t.is(statusCode,200)
    //check the values 
    t.is(body.password,'test1233')
    t.is(body.isAdmin,true)
    t.is(body.BasicInformation.name,'Anastasis')

    //check the keys that i am getting as respones
    for (let key of Object.keys(requestBody))
        t.true(key in body)
})

test("Put user 400" ,async (t)=>{
        // a body for Put request 
        const requestBody={
            "password" : "ChangedPassword",
            "teamdId" : 2,
            "isAdmin" : true,
            "userId" : 1,
            "BasicInformation" : {
                "phone" : "6932112312",
                "surname" : "Beltes",
                "name" : "Anastasis",
                "weight" : 80.5,
                "profileimage" : "101010111",
                "age" : 22,
                "email" : "tasoulis@example.com",
                "height" : 185.5
             }
        }
    const error = await t.throwsAsync(async () => {
        const res = await t.context.got.put('user/randomid',{
            json: requestBody,
            responseType: 'json', 
          });
    });

    // Access the properties of the caught error
    t.is(error.response.statusCode, 400);
    t.is(error.message, 'Response code 400 (Bad Request)');
});