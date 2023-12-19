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