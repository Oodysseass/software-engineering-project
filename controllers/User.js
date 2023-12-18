'use strict';

var utils = require('../utils/writer.js');
var User = require('../service/UserService');

module.exports.createTeam = function createTeam (req, res, next, body, userId) {
  User.createTeam(body, userId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response, 400);
    });
};

module.exports.getContacts = function getContacts (req, res, next, userId, teamId) {
  User.getContacts(userId, teamId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getStatistics = function getStatistics (req, res, next, userId, teamId) {
  User.getStatistics(userId, teamId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getTeamChat = function getTeamChat (req, res, next, userid, teamid) {
  User.getTeamChat(userid, teamid)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getTeammateInfo = function getTeammateInfo (req, res, next, userId, teamId, teammateUserId) {
  User.getTeammateInfo(userId, teamId, teammateUserId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getWorkout = function getWorkout (req, res, next, userId, teamId) {
  User.getWorkout(userId, teamId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.loginUser = function loginUser (req, res, next, body) {
  User.loginUser(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response, 400);
    });
};

module.exports.seeInvitation = function seeInvitation (req, res, next, userId) {
  User.seeInvitation(userId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.sendTeamChatMessage = function sendTeamChatMessage (req, res, next, body, userid, teamid) {
  User.sendTeamChatMessage(body, userid, teamid)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response, 400);
    });
};

module.exports.updateUser = function updateUser (req, res, next, body, userId) {
  User.updateUser(body, userId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (error) {
      if (error.message == "Forbidden")
        utils.writeJson(res, error, 403);
      else
        utils.writeJson(res, error, 400)
    });
};

module.exports.userUserIdGET = function userUserIdGET (req, res, next, userId) {
  User.userUserIdGET(userId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
