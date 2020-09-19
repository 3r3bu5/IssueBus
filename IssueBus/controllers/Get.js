'use strict';

var utils = require('../utils/writer.js');
var Get = require('../service/GetService');

module.exports.getProject = function getProject (req, res, next) {
  Get.getProject()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getProjects = function getProjects (req, res, next, project_id) {
  Get.getProjects(project_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getProjectsProject_idVVersion_id = function getProjectsProject_idVVersion_id (req, res, next, project_id, version_id) {
  Get.getProjectsProject_idVVersion_id(project_id, version_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getProjectsProject_idVVersion_idIssues = function getProjectsProject_idVVersion_idIssues (req, res, next, project_id, version_id) {
  Get.getProjectsProject_idVVersion_idIssues(project_id, version_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getProjectsProject_idVVersion_idIssuesIssue_id = function getProjectsProject_idVVersion_idIssuesIssue_id (req, res, next, project_id, version_id, issue_id) {
  Get.getProjectsProject_idVVersion_idIssuesIssue_id(project_id, version_id, issue_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getProjectsProject_idVVersion_idIssuesIssue_idComments = function getProjectsProject_idVVersion_idIssuesIssue_idComments (req, res, next, project_id, version_id, issue_id) {
  Get.getProjectsProject_idVVersion_idIssuesIssue_idComments(project_id, version_id, issue_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getProjectsProject_idVVersion_idIssuesIssue_idCommentsComment_id = function getProjectsProject_idVVersion_idIssuesIssue_idCommentsComment_id (req, res, next, project_id, version_id, issue_id, comment_id) {
  Get.getProjectsProject_idVVersion_idIssuesIssue_idCommentsComment_id(project_id, version_id, issue_id, comment_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getProjectsVersion = function getProjectsVersion (req, res, next, project_id) {
  Get.getProjectsVersion(project_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getUsers = function getUsers (req, res, next) {
  Get.getUsers()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
