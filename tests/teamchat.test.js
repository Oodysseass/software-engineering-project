const test = require('ava');
const got = require('got');

const { setupServer } = require('../utils/testServer.js')

test.before(async (t) => {
    t.context = await setupServer()
});

test.after.always((t) => {
    t.context.server.close();
})

test("Get TeamChat 200", async (t)=>{
    const {body , statusCode} = await t.context.got("user/1/team/2/teamChat")
    //checks body
    t.assert(body)
    //checks status code 200
    t.is(statusCode,200)
    expectedType="object"

    t.is(typeof(body[0]),expectedType)
    t.is(typeof(body[1]),expectedType)
    
    const message1=body[0]
    const message2=body[1]
    const JsonMessage ={
        "message" : "string",
        "senderId": "number"
    }
    // check keys in my messages
    for(let key of Object.keys(JsonMessage)){
        t.true(key in message1)
        t.true(key in message2)
    }
    //check the type in message's object
    for(let [key,type] of Object.entries(JsonMessage)){
        t.is(typeof(message1[key]), type)
        t.is(typeof(message2[key]), type)
    }

})

test("Get TeamChat 400 " , async (t)=>{
    //check bad request
    const error = await t.throwsAsync(async () => await t.context.got('user/randomID/team/randomTeamID/teamChat'), {instanceOf: got.HTTPError})
    t.is(error.message, 'Response code 400 (Bad Request)')
})