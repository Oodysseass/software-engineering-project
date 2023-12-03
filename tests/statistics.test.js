// getting the required libraries
const http = require('http');
const test = require('ava');
const listen = require('test-listen');
const got = require('got');

// importing the server that was created in another module and exported there
const app = require('../index.js');

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

// test for /user/{userId}/team/{teamId}/statistics GET
test('GET Statistics returns a successful response with the correct data', async (t) =>{
    const {body,statusCode} = await t.context.got("user/1/team/2/statistics");
    // checking the statusCode
    t.is(statusCode,200);
    // Checking if the statFile value is as expected for the particular team example
    const expectedFile = "U3RhdGlzdGljc0ZpbGU=";
    // checking if the statfile is actually a string as expected
    // and the statFile for an example team
    if (t.true(body.hasOwnProperty('statfile')) & typeof body.statfile ==='string'){
        t.is(body.statfile,expectedFile);
    }else{
        t.fail('The provided file is corrupted');
    };
});

// test for /user/{userId}/team/{teamId}/statistics PUT

