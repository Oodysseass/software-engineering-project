const test = require('ava');
const got = require('got');

// importing the server that was created in another module and exported there
const { setupServer } = require('../utils/testServer.js');
const { getTeammateInfo } = require('../service/UserService.js');
const { getContacts } = require('../service/UserService.js');
const { kickTeammate} = require('../service/AdminService.js');

// before testing, intializing the server and the request making
test.before(async (t) => {
    t.context = await setupServer();
});

// always closing the server after any test in the statistics section
test.after.always((t) => {
    t.context.server.close(); 
});

// expected keys response should have 
const teamContactKeys = {
    "phone" : 'string',
    "surname" : 'string',
    "name" : 'string',
    "weight" : 'number',
    "profileimage" : 'string',
    "age" : 'number',
    "email" : 'string',
    "height" : 'number'
    };


test("Get contacts by function  ", async(t)=>{
    const res = await getContacts(1,2)

    // getting the first contract
    const firstelemnt = res[0]

    // check the info 
    t.is(firstelemnt.name,'tasos')
    t.is(firstelemnt.surname,'karakoul')
    t.is(firstelemnt.profileimage,'1111111')

    // getting the second contract
    const second = res[1]

    // check the info 
    t.is(second.name,'giwrgos')
    t.is(second.surname,'gkyzis')
    t.is(second.profileimage,'0000001')

    // check the keys of return
    const Keys= ['name', 'surname','profileimage']
    Keys.forEach((x)=>{t.true(firstelemnt.hasOwnProperty(x))})
})

// test for /user/{userId}/team/{teamId}/contacts GET - Good Request(200)
test('Get team contacts', async(t) =>{
    const { body , statusCode }=await t.context.got('user/1/team/2/contacts')
    // check status code
    t.is(statusCode,200)

    // getting the first contract
    const firstelement = body[0]

    // check the info 
    t.is(firstelement.name,'tasos')
    t.is(firstelement.surname,'karakoul')
    t.is(firstelement.profileimage,'1111111')

    // getting the second contract
    const second = body[1]

    // check the info 
    t.is(second.name,'giwrgos')
    t.is(second.surname,'gkyzis')
    t.is(second.profileimage,'0000001')

    // check the keys of return
    const Keys= ['name', 'surname','profileimage']
    Keys.forEach((x)=>{t.true(firstelement.hasOwnProperty(x))})


});

test('GET team contacts 400', async(t) =>{
    const error = await t.throwsAsync(async () => await t.context.got('user/random/team/random/contacts'), {instanceOf: got.HTTPError});
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

    // check if the response is truthy
    t.assert(res);

    // check if all the expected keys are in the response object
    for (let key of Object.keys(teamContactKeys))
        t.true(key in res);


    // check if values are the expected type
    for (let [key, type] of Object.entries(teamContactKeys))
        t.is(typeof res[key], type);
});

// test for /user/{userId}/team/{teamId}/contacts/{teammateUserId} GET - Good Request(200)
test('GET TeammateInfo - Good Request', async (t) =>{
    const {body,statusCode} = await t.context.got("user/2/team/6/contacts/12");

    // check if the response is truthy
    t.assert(body);

    // checking the statusCode
    t.is(statusCode,200);

    // check if all the expected keys are in the response object
    for (let key of Object.keys(teamContactKeys))
        t.true(key in body);


    // check if values are the expected type
    for (let [key, type] of Object.entries(teamContactKeys))
        t.is(typeof body[key], type);
});

// test for /user/{userId}/team/{teamId}/contacts/{teammateUserId} GET - Bad Request(400)
test('GET TeammateInfo - Bad Request', async (t) =>{
    const error = await t.throwsAsync(async () => await t.context.got('user/random/team/random/contacts/random'), {instanceOf: got.HTTPError});
    // check message and status code
    t.is(error.response.statusCode, 400);
    t.is(error.message, "Response code 400 (Bad Request)");
});

const deleteKeys = {
    message: 'string'
};

test('DELETE Teammate call by function', async(t) =>{

    const adminInfo = {
        'adminId' : 1,
        'teamId' : 1,
        'teammateId' : 4
    }

    const expectedRes = {
        message: 'Successful operation'
    }

    const res = await kickTeammate(adminInfo.adminId,adminInfo.teamId,adminInfo.teammateId);

    // check if the response is truthy
    t.assert(res)

    // check if all the expected keys are in the response object
    for (let key of Object.keys(deleteKeys))
        t.true(key in res);


    // check if values are the expected type
    for (let [key, type] of Object.entries(deleteKeys))
        t.is(typeof res[key], type);

    //check if its the expected response
    t.deepEqual(res,expectedRes)

});

test('DELETE Teammate 200', async(t) =>{

    const expectedRes = {
        message: 'Successful operation'
    }

    const {body, statusCode} = await t.context.got.delete('user/1/team/1/contacts/4');

    // check if the response is truthy
    t.assert(body);

    // checking the statusCode
    t.is(statusCode,200);
    
    // check if all the expected keys are in the response object
    for (let key of Object.keys(deleteKeys))
        t.true(key in body);

    // check if values are the expected type
    for (let [key, type] of Object.entries(deleteKeys))
        t.is(typeof body[key], type);

    //check if its the expected response
    t.deepEqual(body,expectedRes)
})