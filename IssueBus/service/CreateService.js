'use strict';


/**
 * Post a new project.
 * Post a new project.
 *
 * body Project  (optional)
 * no response value expected for this operation
 **/
exports.postProject = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Post a new issue for a specific project version
 *
 * body Object  (optional)
 * project_id String the id of a specifc project
 * version_id String the id of a project version number.
 * returns Issue
 **/
exports.postProjectsProject_idVVersion_idIssues = function(body,project_id,version_id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "summary" : "summary",
  "issue_severity" : 6.027456183070403,
  "resolvers" : [ null, null ],
  "attachments" : [ {
    "updated_at" : "updated_at",
    "attachment_id" : "attachment_id",
    "name" : "name",
    "created_at" : "created_at",
    "url" : "url"
  }, {
    "updated_at" : "updated_at",
    "attachment_id" : "attachment_id",
    "name" : "name",
    "created_at" : "created_at",
    "url" : "url"
  } ],
  "comments" : [ {
    "updated_at" : "updated_at",
    "attachment" : [ null, null ],
    "description" : "description",
    "created_at" : "created_at",
    "comment_id" : "comment_id"
  }, {
    "updated_at" : "updated_at",
    "attachment" : [ null, null ],
    "description" : "description",
    "created_at" : "created_at",
    "comment_id" : "comment_id"
  } ],
  "issue_id" : "issue_id",
  "issue_priority" : 5.962133916683182,
  "issue_type" : 1.3203313,
  "description" : "description",
  "created_at" : "created_at",
  "issue_status" : 1.4658129805029452,
  "reporter" : {
    "password" : "password",
    "role" : {
      "role_id" : "role_id",
      "name" : "name",
      "description" : "description",
      "abbr" : "abbr"
    },
    "user_id" : "user_id",
    "name" : "name",
    "email" : "email"
  },
  "updated_at" : "updated_at",
  "name" : "name"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Post  a new comment on a specific issue.
 *
 * body Object  (optional)
 * project_id String the id of a specific project.
 * version_id String the id of version number.
 * issue_id String the id of a specific issue.
 * returns Comment
 **/
exports.postProjectsProject_idVVersion_idIssuesIssue_idComments = function(body,project_id,version_id,issue_id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "updated_at" : "updated_at",
  "attachment" : [ null, null ],
  "description" : "description",
  "created_at" : "created_at",
  "comment_id" : "comment_id"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * login a user.
 *
 * body Object  (optional)
 * no response value expected for this operation
 **/
exports.postUsersLogin = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Signup a new user [Admins only].
 * Allow only admin to signup users
 *
 * body User  (optional)
 * returns User
 **/
exports.postUsersSignup = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "password" : "password",
  "role" : {
    "role_id" : "role_id",
    "name" : "name",
    "description" : "description",
    "abbr" : "abbr"
  },
  "user_id" : "user_id",
  "name" : "name",
  "email" : "email"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Post a new version of an existing project.
 * post a new version of an existing project.
 *
 * body Object  (optional)
 * project_id String 
 * returns Object
 **/
exports.postprojectsProject_idVersion = function(body,project_id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = { };
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

