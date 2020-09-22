# IssueBus
### What is IssueBus ?
IssueBus is a web application based on REST API that records issues customers/developers have experienced with a software product, and it enables support, engineers, and managers to track/assign those problems until they have been successfully resolved by the developers teams.
### Features
The api supports these features:

- Track the versions of each project .
- Get full descripition of a bug example (running OS, Project version, send attachments related to the bug, ...)
- Track the status level of each bug for each project.
- Track the severity of each bug.
- Assign the projects to the users by the administrator.
- Assign the bug for a group of users by the administrator.

### Values / Benefits

- Each and every product has versions, which are stored in database for easy maintenance.
- Search is based on status, priority and operating system it mean this product provides efficient search techniques.
- Provides fully authenticated system with username and password encryption.
- Improve customer satisfaction with bug free software.
- Increases overall productivity.
- Improve communications between the team working on a project.
- Reduce cost and time required to track and resolve bugs.

## Expected List of Features (V1)

### Authenticantion System.

- Allow users to signin to the website.
- Allow only admin to register a new user.
- Support Google/Github OAuth.

### Project Creation.
- Create a project and store/track each versions inside DB for easy maintenance.
- Assign the project to a group of users.
- List all the tickets for every project.

### Bug/Feature Creation.
- Allow users to submit tickets .
- Assign the ticket to user/ a group of users.
- Modify the ticket status/severity.
- Allow users to comment on tickets.
- Allow users to attach documents/images related to the submitted ticket.
- Preview the full history/edits for each ticket.

### Search & Filter subsystems.
- Allow users to perform full text search.
- Allow users to filter tickets based on:
    - Owner.
    - Project.
    - Severity.
    - Specific date range.
    - Status.
    - Priority.
    - Assigned Users.
    - Type.

## Design and Implementation

I used [Swagger.io](http://swagger.io) to document the API.
Here is a link to the API Documentation (v1) : [https://app.swaggerhub.com/apis-docs/3r3bu5/Issue-Tracker-API/1.0](https://app.swaggerhub.com/apis-docs/3r3bu5/Issue-Tracker-API/1.0)

## Todo
##### Functional
###### Models
- [x] ProjectModel
- [ ] IssueModel
- [ ] RoleModel
- [ ] UserModel
- [ ] AttachmentModel
- [ ] CommentModel
###### Routers
- [x] ProjectRouter
- [ ] IssueRouter
- [ ] UserRouter
- [ ] CommentRouter
###### Views
- [ ] ProjectView
- [ ] IssueView
- [ ] UserView
- [ ] CommentView
###### Authentication & Authorization , and access control
- [ ] Allow only admins to register new users.
- [ ] Allow only admins to create/edit/delete projects.
- [ ] Allow only admin to assign users to tickets.
###### Global
- [ ] CORS
- [ ] Upload Users' photos to AWS instead of local storage.
- [x] Use UUID to generate random Ids instead of node default objectId


##### Non-Functional
- [ ] Enable TLS/SSL.
- [ ] Validate the input of your users
- [ ] Use Secured Session Cookies.
- [ ] Prevent Brute-Force attack againsts forms.
- [ ] Prevent CSRF attack.
- [ ] Use HelmetJs for basic security defaults.
- [ ] Add Rate Limiting (Maybe)? .
