'use strict';


/**
 * get calendar by admin
 * FR7 - The admin must be able to edit calendar 
 *
 * userid Integer 
 * teamid Integer 
 * returns List
 **/
exports.getCalendar = function(userid,teamid) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "location" : "gym",
  "time" : "13.30",
  "practice" : "Weight"
}, {
  "location" : "court",
  "time" : "19.30",
  "practice" : "Basketball"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * edit calendar by admin
 * FR7 - The admin must be able to edit calendar 
 *
 * body List Day of Calendar
 * userid Integer 
 * teamid Integer 
 * returns List
 **/
exports.editCalendar = function(body,userid,teamid) {
  return new Promise(function(resolve, reject) {
    if (body.length > 0){
      resolve(body)
    } else {
      reject(new Error('Empty calendar object'))
    }
  });
}


/**
 * Edit the Statistics Section
 * FR6 - The admin must be able to edit the Statistics team section 
 *
 * body TeamId_statistics_body Statistcs file
 * userId String the id of the user
 * teamId String the id of team
 * returns teamId_statistics_body
 **/
exports.editStatistics = function(body,userId,teamId) {
  return new Promise(function(resolve, reject) {
    if (body.statfile){
      resolve(body)
    } else {
      reject(new Error('Empty statfile'))
    }
  });
}


/**
 * Edit the Workout Section
 * FR9 - The admin must be able to edit the Workout team section 
 *
 * body TeamId_workout_body 
 * userId String the id of the user
 * teamId String the id of team
 * returns teamId_workout_body
 **/
exports.editWorkout = function(body,userId,teamId) {
  return new Promise(function(resolve, reject) {
    if (body.workoutfile){
      resolve(body)
    } else {
      reject(new Error('Empty workout file'))
    }
  });
}


/**
 * Kick teammate from the team
 * FR14 - An admin must be able to kick a member from the team. 
 *
 * userId String the id of the admin
 * teamId String the id of the team.
 * teammateUserId String the id of the team member that the admin wants to kick.
 * returns inline_response_200_6
 **/
exports.kickTeammate = function(userId,teamId,teammateUserId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "message" : "Successful operation"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Send an Invitation to another User
 * FR6 - The admin must be able to send invitations to logged in users to his team. 
 *
 * userId String the id of the user
 * teamId String the id of team
 * invitedUserEmail String the email of the invited user
 * returns inline_response_200_4
 **/
exports.sendInvitation = function(userId, teamId, invitedUserEmail) {
  return new Promise(function(resolve, reject) {
    // Checking if any of the keys has an empty value
    if (!userId || !teamId || !invitedUserEmail) {
      reject(new Error('One or more required fields are empty'));
    } else {
      var examples = {};
      examples['application/json'] = {
        "teamId" :  2,
        "userId" :  1,
        "invitedUserEmail" : "tasoulis@example.com"
      };
      if (Object.keys(examples).length > 0) {
        resolve(examples[Object.keys(examples)[0]]);
      } else {
        resolve();
      }
    }
  });
};

