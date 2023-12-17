'use strict';

var utils = require('../utils/writer.js');
var Unregister = require('../service/UnregisterService');

module.exports.createUser = function createUser (req, res, next, body) {
  Unregister.createUser(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response, 400);
    });
};
