'use strict';

var utils = require('../utils/writer.js');
var Unregister = require('../service/UnregisterService');

/*
  Endpoint to create user

  body: the request body holding the user object
  
  returns http response based on the result of the operation
*/
module.exports.createUser = function createUser (req, res, next, body) {
  // use service function
  Unregister.createUser(body)
    .then(function (response) {
      // user created
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      // user not created
      utils.writeJson(res, response, 400);
    });
};
