'use strict';

var utils = require('../utils/writer.js');
var Admin = require('../service/AdminService');

module.exports.editCalendar = function editCalendar (req, res, next, userid, teamid) {
  Admin.editCalendar(userid, teamid)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.editCalendar_1 = function editCalendar_1 (req, res, next, body, userid, teamid) {
  Admin.editCalendar_1(body, userid, teamid)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.editStatistics = function editStatistics (req, res, next, body, userId, teamId) {
  Admin.editStatistics(body, userId, teamId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.editWorkout = function editWorkout (req, res, next, body, userId, teamId) {
  Admin.editWorkout(body, userId, teamId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.kickTeammate = function kickTeammate (req, res, next, userId, teamId, teammateUserId) {
  Admin.kickTeammate(userId, teamId, teammateUserId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.sendInvitation = function sendInvitation (req, res, next, userId, teamId, invitedUserEmail) {
  Admin.sendInvitation(userId, teamId, invitedUserEmail)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
