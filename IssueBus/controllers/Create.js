'use strict';

var utils = require('../utils/writer.js');
var Create = require('../service/CreateService');

module.exports.postProject = function postProject (req, res, next, body) {
  Create.postProject(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.postProjectsProject_idVVersion_idIssues = function postProjectsProject_idVVersion_idIssues (req, res, next, body, project_id, version_id) {
  Create.postProjectsProject_idVVersion_idIssues(body, project_id, version_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.postProjectsProject_idVVersion_idIssuesIssue_idComments = function postProjectsProject_idVVersion_idIssuesIssue_idComments (req, res, next, body, project_id, version_id, issue_id) {
  Create.postProjectsProject_idVVersion_idIssuesIssue_idComments(body, project_id, version_id, issue_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.postUsersLogin = function postUsersLogin (req, res, next, body) {
  Create.postUsersLogin(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.postUsersSignup = function postUsersSignup (req, res, next, body) {
  Create.postUsersSignup(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.postprojectsProject_idVersion = function postprojectsProject_idVersion (req, res, next, body, project_id) {
  Create.postprojectsProject_idVersion(body, project_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
