const test = require('ava');
const got = require('got');

// importing the server that was created in another module and exported there
const { setupServer } = require('../utils/testServer.js');
const { editWorkout } = require('../service/AdminService.js')

// before testing, intializing the server and the request making
test.before(async (t) => {
    t.context = await setupServer();
});

// always closing the server after any test in the statistics section
test.after.always((t) => {
    t.context.server.close(); 
});

// test for /user/{userId}/team/{teamId}/workout GET - Good Request(200)
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

});

// test for /user/{userId}/team/{teamId}/workout GET - Bad Request(200)
test("Test for get WorkOut 400", async (t)=>{
    const error = await t.throwsAsync(async () => {
        const res = await t.context.got('user/randomid/team/randomid/workout');
    });
    //check message and statuscode
    t.is(error.response.statusCode,400)
    t.is(error.message,'Response code 400 (Bad Request)')

});

test("Edit workout by function", async (t) => {
    const workoutFile = "V29ya091dEZpbGU="
    const res = await editWorkout()

    // check if response is truthy
    t.assert(res)

    // check if body has the workoutfile
    t.true("workoutfile" in res)

    // check if the file is of right type
    t.is(typeof res['workoutfile'], typeof workoutFile)

    // check if the file is the expected file
    t.is(res.workoutfile, workoutFile)
})

test("PUT workout 200", async (t) => {
    const workoutFile = "V29ya091dEZpbGU="
    const { body, statusCode } = await t.context.got.put("user/1/team/2/workout",
        {
            json: {
                workoutfile: workoutFile
            }
        })

    // check if response is truthy
    t.assert(body)

    // check if body has the workoutfile
    t.true("workoutfile" in body)

    // check if the file is of right type
    t.is(typeof body['workoutfile'], typeof workoutFile)

    // check if the file is the expected file
    t.is(body.workoutfile, workoutFile)
    
    // check if response code is correct
    t.is(statusCode, 200)
})

test("PUT workout 400", async (t) => {
    const workoutFile = "V29ya091dEZpbGU="
    // wrong teamid
    let error = await t.throwsAsync(async () => {
        await t.context.got.put('user/1/team/randomid/workout', {
            json: {
                workoutfile: workoutFile
            }
        })
    })

    // check message and statuscode
    t.is(error.response.statusCode, 400)
    t.is(error.message, 'Response code 400 (Bad Request)')

    // wrong userid
    error = await t.throwsAsync(async () => {
        await t.context.got.put('user/randomid/team/2/workout', {
            json: {
                workoutfile: workoutFile
            }
        })
    })

    // check message and statuscode
    t.is(error.response.statusCode, 400)
    t.is(error.message, 'Response code 400 (Bad Request)')

    // wrong both ids
    error = await t.throwsAsync(async () => {
        await t.context.got.put('user/randomid/team/randomid/workout', {
            json: {
                workoutfile: workoutFile
            }
        })
    })

    // check message and statuscode
    t.is(error.response.statusCode, 400)
    t.is(error.message, 'Response code 400 (Bad Request)')
})
