'use strict';

var utils = require('../utils/writer.js');
var Delete = require('../service/DeleteService');

module.exports.deleteProject = function deleteProject (req, res, next) {
  Delete.deleteProject()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteProjectsProject_id = function deleteProjectsProject_id (req, res, next, project_id) {
  Delete.deleteProjectsProject_id(project_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteProjectsProject_idVVersion_id = function deleteProjectsProject_idVVersion_id (req, res, next, project_id, version_id) {
  Delete.deleteProjectsProject_idVVersion_id(project_id, version_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteProjectsProject_idVVersion_idIssues = function deleteProjectsProject_idVVersion_idIssues (req, res, next, project_id, version_id) {
  Delete.deleteProjectsProject_idVVersion_idIssues(project_id, version_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteProjectsProject_idVVersion_idIssuesIssue_id = function deleteProjectsProject_idVVersion_idIssuesIssue_id (req, res, next, project_id, version_id, issue_id) {
  Delete.deleteProjectsProject_idVVersion_idIssuesIssue_id(project_id, version_id, issue_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteProjectsProject_idVVersion_idIssuesIssue_idComments = function deleteProjectsProject_idVVersion_idIssuesIssue_idComments (req, res, next, project_id, version_id, issue_id) {
  Delete.deleteProjectsProject_idVVersion_idIssuesIssue_idComments(project_id, version_id, issue_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteProjectsProject_idVVersion_idIssuesIssue_idCommentsComment_id = function deleteProjectsProject_idVVersion_idIssuesIssue_idCommentsComment_id (req, res, next, project_id, version_id, issue_id, comment_id) {
  Delete.deleteProjectsProject_idVVersion_idIssuesIssue_idCommentsComment_id(project_id, version_id, issue_id, comment_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteUsers = function deleteUsers (req, res, next) {
  Delete.deleteUsers()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
