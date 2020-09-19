'use strict';

var utils = require('../utils/writer.js');
var Update = require('../service/UpdateService');

module.exports.putProjectsProject_id = function putProjectsProject_id (req, res, next, body, project_id) {
  Update.putProjectsProject_id(body, project_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.putProjectsProject_idVVersion_id = function putProjectsProject_idVVersion_id (req, res, next, body, project_id, version_id) {
  Update.putProjectsProject_idVVersion_id(body, project_id, version_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.putProjectsProject_idVVersion_idIssuesIssue_id = function putProjectsProject_idVVersion_idIssuesIssue_id (req, res, next, body, project_id, version_id, issue_id) {
  Update.putProjectsProject_idVVersion_idIssuesIssue_id(body, project_id, version_id, issue_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.putProjectsProject_idVVersion_idIssuesIssue_idCommentsComment_id = function putProjectsProject_idVVersion_idIssuesIssue_idCommentsComment_id (req, res, next, body, project_id, version_id, issue_id, comment_id) {
  Update.putProjectsProject_idVVersion_idIssuesIssue_idCommentsComment_id(body, project_id, version_id, issue_id, comment_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
