'use strict';

var utils = require('../utils/writer.js');
var Admin = require('../service/AdminService.js');

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
