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