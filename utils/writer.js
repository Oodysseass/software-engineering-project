// construnction function for respnose paylod
var ResponsePayload = exports.ResponsePayload = function(code, payload) {
  //sets code
  this.code = code;
  //sets payload
  this.payload = payload;
}

// function that returns the code and payload
exports.respondWithCode = function(code, payload) {
  return new ResponsePayload(code, payload);
}

/*
  Function to create the JSON response

  arg1: either a code, an object/message or a whole response object
  arg2: a code if defined
*/
exports.writeJson = function(response, arg1, arg2) {
  // set code and payload according to arguments format
  let payload = (arg1 instanceof ResponsePayload) ? arg1.payload : arg1;
  let code = (Number.isInteger(arg2)) ? arg2 : (Number.isInteger(arg1)) ? arg1 : (arg1 instanceof ResponsePayload) ? arg1.code : 200;

  // if payload not a simple message, parse
  if (typeof payload === 'object') {
    payload = JSON.stringify(payload, null, 2);
  }

  // set response
  response.writeHead(code, { 'Content-Type': 'application/json' });
  response.end(payload);
};
