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
