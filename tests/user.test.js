const http = require('http');
const test = require('ava');
const listen = require('test-listen');
const got = require('got');

const app = require('../index.js');
const { userUserIdGET } = require('../service/UserService.js')

test.before(async (t) => {
    t.context.server = http.createServer(app);
    t.context.prefixUrl = await listen(t.context.server);
    t.context.got = got.extend({ prefixUrl: t.context.prefixUrl, responseType: 'json' });
});

test.after.always((t) => {
    t.context.server.close();
})

test('GET user by function', async (t) => {
    const res  = await userUserIdGET(1)

    // expected keys response should have
    const expectedKeys = {
        password: 'string',
        teamdId: 'number',
        isAdmin: 'boolean',
        userId: 'number',
        BasicInformation: 'object',
    }

    // check if response is truthy
    t.assert(res)

    // check if all the expected keys are in the response object
    for (let key of Object.keys(expectedKeys))
        t.true(key in res)

    // check if values are the expected type
    for (let [key, type] of Object.entries(expectedKeys))
        t.is(typeof res[key], type)

    // check if the retrieved user is the expected user
    t.is(res.isAdmin, true)
    t.is(res.userId, 1)
})

test('GET user 200', async (t) => {
    const { body, statusCode} = await t.context.got('user/1');

    // expected keys response should have
    const expectedKeys = {
        password: 'string',
        teamdId: 'number',
        isAdmin: 'boolean',
        userId: 'number',
        BasicInformation: 'object',
    }

    // check if response is truthy
    t.assert(body)

    // check if all the expected keys are in the response object
    for (let key of Object.keys(expectedKeys))
        t.true(key in body)

    // check if values are the expected type
    for (let [key, type] of Object.entries(expectedKeys))
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
