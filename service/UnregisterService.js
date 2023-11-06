'use strict';


/**
 * Create a new user account
 * FR1 - The user must be able to create account. 
 *
 * body User_body PersonalDetails of the user
 * returns inline_response_200
 **/
exports.createUser = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "password" : "test1233",
  "teamdId" : 2,
  "isAdmin" : true,
  "userId" : 1,
  "BasicInformation" : {
    "phone" : "6932112312",
    "surname" : "Beltes",
    "name" : "Anastasis",
    "weight" : 80.5,
    "profileimage" : "101010111",
    "age" : 22,
    "email" : "tasoulis@example.com",
    "height" : 185.5
  }
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

