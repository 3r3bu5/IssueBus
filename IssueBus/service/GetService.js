'use strict';


/**
 * Get all the information about current projects.
 * Get all the information about current projects.
 *
 * returns Project
 **/
exports.getProject = function() {
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
 * get a specific project data.
 * get a specific project data.
 *
 * project_id String the id of a project.
 * returns Project
 **/
exports.getProjects = function(project_id) {
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
 * Get a specific version data for a specific project
 * Get the version data including issues.
 *
 * project_id String the id of the project.
 * version_id String the id of the version number of the project.
 * returns Object
 **/
exports.getProjectsProject_idVVersion_id = function(project_id,version_id) {
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
 * Get all issues for a specific project version
 *
 * project_id String the id of a specifc project
 * version_id String the id of a project version number.
 * returns Issue
 **/
exports.getProjectsProject_idVVersion_idIssues = function(project_id,version_id) {
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
 * Get a specific issue.
 *
 * project_id String 
 * version_id String 
 * issue_id String 
 * returns Issue
 **/
exports.getProjectsProject_idVVersion_idIssuesIssue_id = function(project_id,version_id,issue_id) {
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
 * Get all comments of a specific issue.
 *
 * project_id String the id of a specific project.
 * version_id String the id of version number.
 * issue_id String the id of a specific issue.
 * returns Comment
 **/
exports.getProjectsProject_idVVersion_idIssuesIssue_idComments = function(project_id,version_id,issue_id) {
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
 * Get a specific comment.
 *
 * project_id String the id of a specific project.
 * version_id String the id of the version number.
 * issue_id String the id of a specific issue.
 * comment_id String the id of the comment to be edited.
 * returns Comment
 **/
exports.getProjectsProject_idVVersion_idIssuesIssue_idCommentsComment_id = function(project_id,version_id,issue_id,comment_id) {
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
 * Get all project versions.
 * Get all project versions.
 *
 * project_id String 
 * returns Object
 **/
exports.getProjectsVersion = function(project_id) {
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
 * Get all users.
 *
 * returns User
 **/
exports.getUsers = function() {
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

