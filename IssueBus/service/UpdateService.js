'use strict';


/**
 * Update specific project.
 * to update specific project.
 *
 * body Project  (optional)
 * project_id String the id of a project.
 * returns Project
 **/
exports.putProjectsProject_id = function(body,project_id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "developed_by" : [ {
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
  }, {
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
  } ],
  "updated_at" : "updated_at",
  "project_id" : "project_id",
  "name" : "name",
  "description" : "description",
  "created_at" : "created_at",
  "version" : [ "", "" ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Update a specific version data for a specific project
 * edit the version number.
 *
 * body Object  (optional)
 * project_id String the id of the project.
 * version_id String the id of the version number of the project.
 * returns Object
 **/
exports.putProjectsProject_idVVersion_id = function(body,project_id,version_id) {
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


/**
 * Edit a specific issue.
 *
 * body Object  (optional)
 * project_id String 
 * version_id String 
 * issue_id String 
 * returns Issue
 **/
exports.putProjectsProject_idVVersion_idIssuesIssue_id = function(body,project_id,version_id,issue_id) {
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
 * Update a specific comment.
 *
 * body Object  (optional)
 * project_id String the id of a specific project.
 * version_id String the id of the version number.
 * issue_id String the id of a specific issue.
 * comment_id String the id of the comment to be edited.
 * returns Comment
 **/
exports.putProjectsProject_idVVersion_idIssuesIssue_idCommentsComment_id = function(body,project_id,version_id,issue_id,comment_id) {
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

