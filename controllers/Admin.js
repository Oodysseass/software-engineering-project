'use strict';

// Importing the utility functions for writing JSON responses
var utils = require('../utils/writer.js');
// Importing the AdminService module for handling admin-related operations
var Admin = require('../service/AdminService.js');

/*
  Endpoint for getting the team calendar

  teamid: integer specifying the id of the team that has the calendar

  userid: integer specifying the id of the admin that requests to see the calendar

  returns http response based on the result of the operation
*/
module.exports.getCalendar = function getCalendar (req, res, next) {
  const userid = req.params.userid;
  const teamid = req.params.teamid;

  Admin.getCalendar(userid, teamid)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

/*
  Endpoint for editing the team calendar

  body: the request body holding an object with a list of the calendar

  userid: integer specifying the id of the admin that requests to edit the calendar

  teamid: integer specifying the id of the team the admin is in

  returns http response based on the result of the operation
*/
module.exports.editCalendar = function editCalendar (req, res, next) {
  const { body } = req;
  const userid = req.params.userid;
  const teamid = req.params.teamid;

  Admin.editCalendar(body, userid, teamid)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response, 400);
    });
};

/*
  Endpoint for editing the statistics file

  body: the request body holding an object with the statistics file

  userId: integer specifying the id of the admin that requests to edit the statistics file

  teamId: integer specifying the id of the team the admin is in

  returns http response based on the result of the operation
*/
module.exports.editStatistics = function editStatistics (req, res, next) {
  const { body } = req;
  const userId = req.params.userid;
  const teamId = req.params.teamid;

  Admin.editStatistics(body, userId, teamId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response, 400);
    });
};

/*
  Endpoint for editing the workout file

  body: the request body holding an object with the workout file

  userId: integer specifying the id of the admin that requests to edit the workout file

  teamId: integer specifying the id of the team the admin is in

  returns http response based on the result of the operation
*/
module.exports.editWorkout = function editWorkout (req, res, next) {
  const { body } = req;
  const userId = req.params.userId;
  const teamId = req.params.teamId;

  Admin.editWorkout(body, userId, teamId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response, 400);
    });
};

/*
  Endpoint for kicking a teammate from the team

  userId: integer specifying the id of the admin that requests to kick a teammate

  teamId: integer specifying the id of the team the admin is in

  teammateUserId: integer specifying the id of the requested user to be kicked

  returns http response based on the result of the operation
*/
module.exports.kickTeammate = function kickTeammate (req, res, next) {
  const userId = req.params.userid;
  const teamId = req.params.teamid;
  const teammateUserId = req.params.teammateUserId;

  Admin.kickTeammate(userId, teamId, teammateUserId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

/*
  Endpoint for sending an invitation in an email for joining the team 

  userId: integer specifying the id of the admin that requests to send an invitation

  teamId: integer specifying the id of the team the admin is in

  invitedUserEmail: string specifying the email of the requested user to join the team

  returns http response based on the result of the operation
*/
module.exports.sendInvitation = function sendInvitation (req, res, next) {
  const userId = req.openapi.pathParams.userId;
  const teamId = req.openapi.pathParams.teamId;
  const invitedUserEmail = req.query.invitedUserEmail;

  Admin.sendInvitation(userId, teamId, invitedUserEmail)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
