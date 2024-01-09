'use strict';

// Importing the utility functions for writing JSON responses
var utils = require('../utils/writer.js');
// Importing the UserService module for handling user-related operations
var User = require('../service/UserService');

/*
  Endpoint for creating a new team

  body: the request body holding an object with the name of the new team

  userId: integer specifying the id of the user that requests to create the team

  returns http response based on the result of the operation
*/
module.exports.createTeam = function createTeam (req, res, next, body, userId) {
  // Call the createTeam function from the UserService, passing the provided body and userId
  User.createTeam(body, userId)
    .then(function (response) {
      // Write the JSON response with the result of the operation - Team Successfully Created
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      // Write a JSON response with an error status code if the operation fails
      utils.writeJson(res, response, 400);
    });
};

/*
  Endpoint for retrieving contacts for a user within a specific team

  userId: integer specifying the id of the user that requests to access the team contacts

  teamId: integer specifying the id of the team of the user

  returns http response based on the result of the operation
*/
module.exports.getContacts = function getContacts (req, res, next, userId, teamId) {
  // Call the getContacts function from the UserService, passing the userId and teamId
  User.getContacts(userId, teamId)
    .then(function (response) {
      // Write the JSON response with the retrieved contacts - Successful Operation
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      // Write a JSON response with an error status code if the operation fails
      utils.writeJson(res, response);
    });
};

/*
  Endpoint for retrieving statistics for a user within a specific team

  userId: integer specifying the id of the user that requests to access the team statictics

  teamId: integer specifying the id of the team of the user

  returns http response based on the result of the operation
*/
module.exports.getStatistics = function getStatistics (req, res, next, userId, teamId) {
  // Call the getStatistics function from the UserService, passing the userId and teamId
  User.getStatistics(userId, teamId)
    .then(function (response) {
      // Write the JSON response with the retrieved statistics - Successful Operation
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      // Write a JSON response with an error status code if the operation fails
      utils.writeJson(res, response);
    });
};

// Endpoint for retrieving team chat messages for a user within a specific team
module.exports.getTeamChat = function getTeamChat (req, res, next, userid, teamid) {
  // Call the getTeamChat function from the UserService, passing the userid and teamid
  User.getTeamChat(userid, teamid)
    .then(function (response) {
      // Write the JSON response with the retrieved team chat messages
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      // Write a JSON response with an error status code if the operation fails
      utils.writeJson(res, response);
    });
};

// Endpoint for retrieving information about a teammate for a user within a specific team
module.exports.getTeammateInfo = function getTeammateInfo (req, res, next, userId, teamId, teammateUserId) {
  // Call the getTeammateInfo function from the UserService, passing userId, teamId, and teammateUserId
  User.getTeammateInfo(userId, teamId, teammateUserId)
    .then(function (response) {
      // Write the JSON response with the retrieved teammate information
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      // Write a JSON response with an error status code if the operation fails
      utils.writeJson(res, response);
    });
};

// Endpoint for retrieving workout information for a user within a specific team
module.exports.getWorkout = function getWorkout (req, res, next, userId, teamId) {
  // Call the getWorkout function from the UserService, passing userId and teamId
  User.getWorkout(userId, teamId)
    .then(function (response) {
      // Write the JSON response with the retrieved workout information
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      // Write a JSON response with an error status code if the operation fails
      utils.writeJson(res, response);
    });
};

// Endpoint for user login
module.exports.loginUser = function loginUser (req, res, next, body) {
  // Call the loginUser function from the UserService, passing the provided body
  User.loginUser(body)
    .then(function (response) {
      // Write the JSON response with the result of the login operation
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      // Write a JSON response with an error status code if the login operation fails
      utils.writeJson(res, response, 400);
    });
};


// Endpoint for viewing invitations for a user
module.exports.seeInvitation = function seeInvitation (req, res, next, userId) {
  // Call the seeInvitation function from the UserService, passing the userId
  User.seeInvitation(userId)
    .then(function (response) {
      // Write the JSON response with the retrieved invitations
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      // Write a JSON response with an error status code if the operation fails
      utils.writeJson(res, response);
    });
};

// Endpoint for sending a team chat message
module.exports.sendTeamChatMessage = function sendTeamChatMessage (req, res, next, body, userid, teamid) {
  // Call the sendTeamChatMessage function from the UserService, passing the body, userid, and teamid
  User.sendTeamChatMessage(body, userid, teamid)
    .then(function (response) {
      // Write the JSON response with the result of the sendTeamChatMessage operation
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      // Write a JSON response with an error status code if the operation fails
      utils.writeJson(res, response, 400);
    });
};

// Endpoint for updating user information
module.exports.updateUser = function updateUser (req, res, next, body, userId) {
  // Call the updateUser function from the UserService, passing the body and userId
  User.updateUser(body, userId)
    .then(function (response) {
      // Write the JSON response with the result of the update operation
      utils.writeJson(res, response);
    })
    .catch(function (error) {
      // Check the error message and write a JSON response with the appropriate status code
      if (error.message == "Forbidden")
        // Error Code 403
        utils.writeJson(res, error, 403);
      else
        // Error Code 400
        utils.writeJson(res, error, 400)
    });
};

// Endpoint for retrieving user information by user ID
module.exports.userUserIdGET = function userUserIdGET (req, res, next, userId) {
  // Call the userUserIdGET function from the UserService, passing the userId
  User.userUserIdGET(userId)
    .then(function (response) {
      // Write the JSON response with the retrieved user information
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      // Write a JSON response with an error status code if the operation fails
      utils.writeJson(res, response);
    });
};
