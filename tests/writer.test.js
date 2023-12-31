const test = require('ava');
const { writeJson, respondWithCode, ResponsePayload } = require('../utils/writer.js');

// Object for creating mock responses
const createMockResponse = () => {
    const response = {
        writeHead: (code, headers) => {
            response.statusCode = code;
            response.headers = headers;
        },
        end: (payload) => {
            response.payload = payload;
        },
    };
    return response;
};

// Testing differenct cases related to write.js file that handles the APIs responses

// writeJson fuction default code
test('writeJson function - default code (200)', (t) => {
    const response = createMockResponse();
    writeJson(response, { message: 'Success' });

    const responseData = JSON.parse(response.payload);
    t.is(response.statusCode, 200);
    t.is(responseData.message, 'Success');
    t.is(response.headers['Content-Type'], 'application/json');
});

// writeJson fucntion code 404 - Error
test('writeJson function - with specified code', (t) => {
    const response = createMockResponse();
    writeJson(response, { error: 'Not Found' }, 404);

    const responseData = JSON.parse(response.payload);
    t.is(response.statusCode, 404);
    t.is(responseData.error, 'Not Found');
    t.is(response.headers['Content-Type'], 'application/json');
});

// writeJson fucntion code 500 - Server Error
test('writeJson function - handle ResponsePayload object', (t) => {
    const response = createMockResponse();
    const responsePayload = new ResponsePayload(500, { error: 'Internal Server Error' });
    writeJson(response, responsePayload);

    const responseData = JSON.parse(response.payload);
    t.is(response.statusCode, 500);
    t.is(responseData.error, 'Internal Server Error');
    t.is(response.headers['Content-Type'], 'application/json');
});

// writeJson fucntion code 200, but no code provided
test('writeJson function - default to 200 if no code provided', (t) => {
    const response = createMockResponse();
    writeJson(response, { data: 'Default Success' });

    const responseData = JSON.parse(response.payload);
    t.is(response.statusCode, 200);
    t.is(responseData.data, 'Default Success');
    t.is(response.headers['Content-Type'], 'application/json');
});


// writeJson fucntion - handling ResponsePayload
test('writeJson function - handle ResponsePayload object or integer', (t) => {
    const response = createMockResponse();

    // Creating a ResponsePayload object
    const responsePayload = new ResponsePayload(500, { error: 'Internal Server Error' });

    // Using the writeJson function with a ResponsePayload object
    writeJson(response, responsePayload);

    let responseData = JSON.parse(response.payload);

    // Assertions for ResponsePayload
    t.is(response.statusCode, 500);
    t.is(responseData.error, 'Internal Server Error');
    t.is(response.headers['Content-Type'], 'application/json');

    // Reset response object
    response.payload = undefined;

    // Using the writeJson function with an integer
    writeJson(response, 404);

    responseData = JSON.parse(response.payload);

    // Assertions for integer
    t.is(response.statusCode, 404);
    t.is(response.headers['Content-Type'], 'application/json');
    t.is(responseData, 404); // No payload for integer
});

// test for respondWithCode function
test('respondWithCode function - create ResponsePayload object', (t) => {
    const responsePayload = respondWithCode(404, { message: 'Not Found' });

    // Ensuring that responsePayload is an instance of ResponsePayload
    t.true(responsePayload instanceof ResponsePayload);
});
