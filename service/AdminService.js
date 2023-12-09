'use strict';


/**
 * edit calendar by admin
 * FR7 - The admin must be able to edit calendar 
 *
 * userid Integer 
 * teamid Integer 
 * returns List
 **/
exports.editCalendar = function(userid,teamid) {
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
exports.editCalendar_0 = function(body,userid,teamid) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "locations" : "gym",
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
    var examples = {};
    examples['application/json'] = {
  "statfile" : "U3RhdGlzdGljc0ZpbGU="
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
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
    var examples = {};
    examples['application/json'] = {
  "workoutfile" : "V29ya091dEZpbGU="
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
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
exports.sendInvitation = function(userId,teamId,invitedUserEmail) {
  return new Promise(function(resolve, reject) {
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
  });
}

