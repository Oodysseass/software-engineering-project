'use strict';


/**
 * Create a new user account
 * FR1 - The user must be able to create account. 
 *
 * body User_body PersonalDetails of the user
 * returns inline_response_200
 **/
exports.createUser = function (body) {
  return new Promise(function (resolve, reject) {
    const example = {
      password: 'string',
      teamdId: 'number',
      isAdmin: 'boolean',
      userId: 'number',
      BasicInformation: 'object',
    };

    for (let key of Object.keys(example))
      if (!body[key])
        reject(new Error("New user object has not correct structure"));

    for (let [key, type] of Object.entries(example))
      if (typeof body[key] != type)
        reject(new Error("New user object has not correct structure"));

    resolve(body);
  });
}

