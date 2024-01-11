'use strict';


/**
 * Create new Team
 * FR4 - The logged in user must be able to create a team. 
 *
 * userId String the id of the user that wants to create a team
 * teamName String the name of the created team
 * returns inline_response_200_3
 **/
exports.createTeam = function (body) {
  return new Promise(function (resolve, reject) {
    if (body.TeamName) {
      resolve(body);
    } else {
      reject(new Error("Empty team name"))
    }
  });
}


/**
 * Get teammate information
 * FR12 - The team member must be able to see the personal information of the other members. 
 *
 * userId String the id of the user that wants to see the team contacts
 * teamId String the id of the team.
 * returns List
 **/
exports.getContacts = function () {
  return new Promise(function (resolve) {
    var examples = {};
    examples['application/json'] = [{
      "name": "tasos",
      "surname": "karakoul",
      "profileimage": "1111111"
    }, {
      "name": "giwrgos",
      "surname": "gkyzis",
      "profileimage": "0000001"
    }];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get the Statictics Section of the Team
 * FR11 - The team member must be able to browse to all team sections 
 *
 * userId String the id of the user
 * teamId String the id of team
 * returns inline_response_200_9
 **/
exports.getStatistics = function () {
  return new Promise(function (resolve) {
    var examples = {};
    examples['application/json'] = {
      "statfile": "U3RhdGlzdGljc0ZpbGU="
    };
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get team chat messages
 * FR10 - Team members must be able to see the chat. 
 *
 * userid Integer The ID of the user
 * teamid Integer The ID of the team
 * returns List
 **/
exports.getTeamChat = function () {
  return new Promise(function (resolve) {
    var examples = {};
    examples['application/json'] = [{
      "message": " Hello team!",
      "senderId": 1
    }, {
      "message": "Match Day!!! LET'S",
      "senderId": 2
    }];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get teammate information
 * FR12 - The team member must be able to see the personal information of the other members. 
 *
 * userId String the id of the user that wants to see the personal information
 * teamId String the id of the team.
 * teammateUserId String the id of the teammate that the user wants to see his information.
 * returns user_BasicInformation
 **/
exports.getTeammateInfo = function () {
  return new Promise(function (resolve) {
    var examples = {};
    examples['application/json'] = {
      "phone": "6932112312",
      "surname": "Beltes",
      "name": "Anastasis",
      "weight": 80.5,
      "profileimage": "101010111",
      "age": 22,
      "email": "tasoulis@example.com",
      "height": 185.5
    };
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get the Workout Section of the Team
 * FR11 - The team member must be able to browse to all team sections 
 *
 * userId String the id of the user
 * teamId String the id of team
 * returns inline_response_200_10
 **/
exports.getWorkout = function () {
  return new Promise(function (resolve) {
    var examples = {};
    examples['application/json'] = {
      "workoutfile": "V29ya091dEZpbGU="
    };
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Logs user into the system
 * FR2 - The registered user must be able to log in. 
 *
 * body User_login_body Login Credentials
 * returns inline_response_200_1
 **/
exports.loginUser = function (body) {
  return new Promise(function (resolve, reject) {
    if (body.email && body.password) {
      resolve({ token: "000001" });
    } else {
      reject(new Error("Empty login body"));
    }
  });
}


/**
 * See invitations
 * FR5 - The logged in user must be to manage his invitations. 
 *
 * userId Integer 
 * returns inline_response_200_2
 **/
exports.seeInvitation = function () {
  return new Promise(function (resolve) {
    var examples = {};
    examples['application/json'] = {
      "TeamName": "[\"Omadara\",\" Omada2\"]"
    };
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Send a message to the team chat
 * (FR10) - Team members must be able to send messages to the team chat. 
 *
 * body Teamid_teamChat_body Message Entity
 * userid Integer The ID of the user
 * teamid Integer The ID of the team
 * returns teamid_teamChat_body
 **/
exports.sendTeamChatMessage = function (body) {
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples['application/json'] = {
      "senderId": 1,
      "message": "Hello team!"
    };
    if (body.senderId && body.message) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      reject(new Error("Not right message structure"))
    }
  });
}


/**
 * Update user information
 * FR3 - A user that is logged in to his account must be able to update his password 
 *
 * body User_userId_body PersonalDetails of the user
 * userId String id of the user that need to update his/her info
 * returns inline_response_200
 **/
exports.updateUser = function (body, userId) {
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

    if (userId != body.userId)
      reject(new Error("Forbidden"))

    resolve(body);
  });
}


/**
 * FR3 - A user that is logged in to his account must be able to update his password 
 *
 * userId Integer 
 * returns inline_response_200
 **/
exports.userUserIdGET = function () {
  return new Promise(function (resolve) {
    var examples = {};
    examples['application/json'] = {
      "password": "test1233",
      "teamdId": 2,
      "isAdmin": true,
      "userId": 1,
      "BasicInformation": {
        "phone": "6932112312",
        "surname": "Beltes",
        "name": "Anastasis",
        "weight": 80.5,
        "profileimage": "101010111",
        "age": 22,
        "email": "tasoulis@example.com",
        "height": 185.5
      }
    };
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

