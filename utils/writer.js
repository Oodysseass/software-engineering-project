// construnction function for respnosepaylode
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
//functions to create the json response
var writeJson = exports.writeJson = function(response, arg1, arg2) {
  var code;
  var payload;
  //cheks if arg1 exist and is instanceof ResponsePayload
  if(arg1 && arg1 instanceof ResponsePayload) {
    //call writejason with this values
    writeJson(response, arg1.payload, arg1.code);
    return;
  }
  //checks if arg2 is integer
  if(arg2 && Number.isInteger(arg2)) {
    //assigned arg2 to code value
    code = arg2;
  }
  //else checks if arg1 is integer and assigned it to code value
  else {
    if(arg1 && Number.isInteger(arg1)) {
      code = arg1;
    }
  }
  //sets arg1 to payload 
  if(code && arg1) {
    payload = arg1;
  }
  else if(arg1) {
    payload = arg1;
  }

  if(!code) {
    // if no response code given, we default to 200
    code = 200;
  }
  //if payload is object converting it to json
  if(typeof payload === 'object') {
    payload = JSON.stringify(payload, null, 2);
  }
  //sets the response
  response.writeHead(code, {'Content-Type': 'application/json'});
  response.end(payload);
}
