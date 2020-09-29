/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// Reequire 
const express = require( "express" );
const router = express.Router();
const authenticate = require( "../middlewares/authenticate" );
const cors = require( "../middlewares/cors" );


// require models

const { project } = require( "../models/projectModel" );

//app configuration
router.use( express.json() );
router.use( express.urlencoded( { extended: false } ) );

/*
@Route      >    METHOD /projects
@Behavioure >    Return all projects / 
                 POST a new project /
                 Delete all projects
@Access     >    Registered User for listing projects /
                 Admin to POST a new project /
                 Admin to DELETE all projects
*/
router.route( "/" )
	.options( cors.corsWithOptions, ( req,res ) => { res.status( 200 ); } )
	.get( cors.cors , authenticate.verifyUser , ( req,res,next ) => {
		project.find()
			.populate( "versions.issues" )
			.populate( "versions.developers" ,  " _id name email " )
			.then( ( projects ) => {
				res.status( 200 );
				res.setHeader( "Content-Type","application/json" );
				res.json( { message: "This will return all projects " , projects: projects } );
			} )
			.catch( ( err ) => next( err ) );
	} )
	.post(  cors.corsWithOptions, authenticate.verifyUser , authenticate.verifyAdmin,( req,res,next ) => {
		project.create( req.body )
			.then( ( project ) => {
				res.status( 200 );
				res.setHeader( "Content-Type","application/json" );
				res.json( { message: "This will return the new created  project " , project: project } );
			} )
			.catch( ( err ) => next( err ) );
	} )
	.put( cors.corsWithOptions, authenticate.verifyUser , authenticate.verifyAdmin, ( req,res,next ) => {
		res.status( 405 );
		res.json( { error: "PUT Method is not allowed on /projects " } );
	} )
	.delete(  cors.corsWithOptions, authenticate.verifyUser , authenticate.verifyAdmin, ( req,res,next ) => {
		project.remove()
			.then( ( projects ) => {
				res.status( 200 );
				res.setHeader( "Content-Type","application/json" );
				res.json( { message: "This will the DELETE ALL CURRENT PROJECTS" , deletedProjectsInfo: projects } );
			} )
			.catch( ( err ) => next( err ) );
	} );

/*
@Route      >    METHOD /projects/:projectId
@Behavioure >    Return a specific project /
                 Update a specific project /
                 Delete a specific project
@Access     >    Registered User for listing projects /
                 Admin to edit the project /
                 Admin to DELETE the project
*/
router.route( "/:projectId" )
	.options( cors.corsWithOptions, ( req,res ) => { res.status( 200 ); } )

	.get( cors.cors , authenticate.verifyUser ,  ( req,res,next ) => {
		project.findById( req.params.projectId )
			.populate( "versions.issues" )
			.populate( "versions.developers versions.issues.comments.author versions.issues.reporter versions.issues.resolvers " ,  " _id name email " )
			.then( ( project ) => {
				if ( project != null ) {
					res.status( 200 );
					res.setHeader( "Content-Type","application/json" );
					res.json( { message: "This will return that specific project " , project: project } );
				}else {
					err = new Error( `Project ID ${req.params.projectId} does not exist! ` );
					err.statusCode = 404;
					return next( err );
				}
			} )
			.catch( ( err ) => next( err ) );
	} )
	.post(   cors.corsWithOptions, authenticate.verifyUser , authenticate.verifyAdmin, ( req,res,next ) => {
		res.status( 405 );
		res.json( { error: "POST Method is not allowed on /projects/projectId " } );
		
	} )
	.put(  cors.corsWithOptions, authenticate.verifyUser , authenticate.verifyAdmin, ( req,res,next ) => {
		project.findByIdAndUpdate( req.params.projectId,
			{ $set : req.body } 
			, { new : true } )
			.then( ( project ) => {
				res.status( 200 );
				res.setHeader( "Content-Type","application/json" );
				res.json( { message: "This will return that specific project " , project: project } );
			} )
			.catch( ( err ) => next( err ) );
	} )
	.delete(  cors.corsWithOptions,  authenticate.verifyUser , authenticate.verifyAdmin, ( req,res,next ) => {

		project.findByIdAndDelete( req.params.projectId )
			.then( ( project ) => {

				res.status( 200 );
				res.setHeader( "Content-Type","application/json" );
				res.json( { message: `DELETE the project whose Id is ${req.params.projectId} ` } );

		
			}, ( err ) => next( err ) 
			)
			.catch( ( err ) => next( err ) );
		
	} );


/*
@Route      >    METHOD /projects/:projectId/ver
@Behavioure >    Return all project's versions /
                 Add a new version to a specific project /
                 Delete all project versions
@Access     >    Registered User for listing project's versions /
                 Admin to edit the project's versions /
                 Admin to DELETE the project's versions
*/

router.route( "/:projectId/ver" )
	.options( cors.corsWithOptions, ( req,res ) => { res.status( 200 ); } )

	.get( cors.cors , authenticate.verifyUser , ( req,res,next ) => {
		project.findById( req.params.projectId )
			.populate( "versions.issues" )
			.populate( "versions.developers versions.issues.comments.author versions.issues.reporter versions.issues.resolvers " ,  " _id name email " )
			.then( ( project ) => {
				if ( project != null ) {
					res.status( 200 );
					res.setHeader( "Content-Type","application/json" );
					res.json( { message: "This will return all versions of a  specific project " , versions: project.versions } );
				}else {
					err = new Error( `Project ID ${req.params.projectId} does not exist! ` );
					err.statusCode = 404;
					return next( err );
				}
			} )
			.catch( ( err ) => next( err ) );
	} )
	.post(  cors.corsWithOptions, authenticate.verifyUser , authenticate.verifyAdmin, ( req,res,next ) => {

		project.findById( req.params.projectId )
			.then( ( project ) => {
				if ( project != null ) {
					project.versions.push( req.body );
					project.save()
						.then( ( project ) => {
							res.status( 200 );
							res.setHeader( "Content-Type","application/json" );
							res.json( { message: "This will add a new version to a specific project " , versions: project.versions } );
						} )
						.catch( ( err ) => next( err ) );
					
				}else {
					err = new Error( `Project ID ${req.params.projectId} does not exist! ` );
					err.statusCode = 404;
					return next( err );
				}
			} )
			.catch( ( err ) => next( err ) );
		
		
	} )
	.put(  cors.corsWithOptions, authenticate.verifyUser , authenticate.verifyAdmin, ( req,res,next ) => {
		res.status( 405 );
		res.json( { error: "POST Method is not allowed on /projects/:projectId/version " } );
	} )
	.delete(  cors.corsWithOptions, authenticate.verifyUser , authenticate.verifyAdmin, ( req,res,next ) => {
		
		project.findById( req.params.projectId )
			.then( ( project ) => {
				if ( project != null ) {
					project.versions = [];
					project.save()
						.then( ( project ) => {
							res.status( 200 );
							res.setHeader( "Content-Type","application/json" );
							res.json( { message: "This will delete all  specific project's versions " , versions: project.versions } );
						} )
						.catch( ( err ) => next( err ) );
					
				}else {
					err = new Error( `Project ID ${req.params.projectId} does not exist! ` );
					err.statusCode = 404;
					return next( err );
				}
			} )
			.catch( ( err ) => next( err ) );
	} );


/*
@Route      >    METHOD /projects/:projectId/ver/:versionId
@Behavioure >    Return a specifc project versions /
                 edit a version of a specific project /
                 Delete a project version
@Access     >    Registered User for listing project's version /
                 Admin to edit the project's version /
                 Admin to DELETE the project's version
*/

router.route( "/:projectId/ver/:versionId" )
	.options( cors.corsWithOptions, ( req,res ) => { res.status( 200 ); } )

	.get( cors.cors , authenticate.verifyUser ,  ( req,res,next ) => {
		project.findById( req.params.projectId )
			.populate( "versions.issues" )
			.populate( "versions.developers versions.issues.comments.author versions.issues.reporter versions.issues.resolvers " ,  " _id name email " )
			.then( ( project ) => {
				var version = project.versions.id( req.params.versionId );
				if ( project != null && version != null ) {
					res.status( 200 );
					res.setHeader( "Content-Type","application/json" );
					res.json( { message: "This will return all versions of a  specific project " , version } );
				}
				else if( project == null ) {
					// eslint-disable-next-line no-undef
					err = new Error( ` project Id  ${req.params.projectId} has not found!` );
					// eslint-disable-next-line no-undef
					err.status= 404 ;
					return next( err );
				} else {
					// eslint-disable-next-line no-undef
					err = new Error( ` version Id ${req.params.versionId} on project ${req.params.projectId} has not found!` );
					err.status= 404 ;
					// eslint-disable-next-line no-undef
					return next( err );
				}
			} )
			.catch( ( err ) => next( err ) );
	} )
	.post(  cors.corsWithOptions, authenticate.verifyUser , authenticate.verifyAdmin, ( req,res,next ) => {

		res.status( 405 );
		res.json( { error: "POST Method is not allowed on /projects/:projectId/version/:versionId " } );
		
	} )
	.put(  cors.corsWithOptions,  authenticate.verifyUser , authenticate.verifyAdmin, ( req,res,next ) => {
		project.findById( req.params.projectId )
			.then( ( project ) => {
				var version = project.versions.id( req.params.versionId );
				if ( project != null && version != null ) {

					if ( req.body.number ){
						version.number = req.body.number;
					}
					if ( req.body.developers ){
						version.developers = req.body.developers;
					}

					project.save().then( ( project ) => {
						res.status( 200 );
						res.setHeader( "Content-Type","application/json" );
						res.json( { message: "This will return all versions of a  specific project " , version } );
					} )
						.catch( ( err ) => next( err ) );

					
				}
				else if( project == null ) {
					// eslint-disable-next-line no-undef
					err = new Error( ` Issue Id  ${req.params.projectId} has not found!` );
					// eslint-disable-next-line no-undef
					err.status= 404 ;
					return next( err );
				} else {
					// eslint-disable-next-line no-undef
					err = new Error( ` version Id ${req.params.versionId} on project ${req.params.projectId} has not found!` );
					err.status= 404 ;
					// eslint-disable-next-line no-undef
					return next( err );
				}
				

			} ).catch( ( err ) => next( err ) );
	} )

	.delete(  cors.corsWithOptions, authenticate.verifyUser , authenticate.verifyAdmin, ( req,res,next ) => {

		project.findById( req.params.projectId )
			.then( ( project ) => {
				var version = project.versions.id( req.params.versionId );
				if ( project != null && version != null ) {

					version.remove();
					project.save().then( ( project ) => {
						res.status( 200 );
						res.setHeader( "Content-Type","application/json" );
						res.json( { message: "This will return all versions of a  specific project " , version } );
					} )
						.catch( ( err ) => next( err ) );

				
				}
				else if( project == null ) {
				// eslint-disable-next-line no-undef
					err = new Error( ` Issue Id  ${req.params.projectId} has not found!` );
					// eslint-disable-next-line no-undef
					err.status= 404 ;
					return next( err );
				} else {
				// eslint-disable-next-line no-undef
					err = new Error( ` version Id ${req.params.versionId} on project ${req.params.projectId} has not found!` );
					err.status= 404 ;
					// eslint-disable-next-line no-undef
					return next( err );
				}
			

			} ).catch( ( err ) => next( err ) );
	} );



/*
@Route      >    METHOD /projects/:projectId/ver/:versionId/Issues
@Behavioure >    Return all issues / 
                 POST a new issue / 
                 Delete all issues
@Access     >    Registered User for listing issues /
                 Registered User to POST a new issues /
                 Admin to DELETE all issuess
*/
router.route( "/:projectId/ver/:versionId/issues" )
	.options( cors.corsWithOptions, ( req,res ) => { res.status( 200 ); } )

	.get( cors.cors , authenticate.verifyUser , ( req,res,next ) => {
		project.findById( req.params.projectId )
			.populate( "versions.issues" )
			.populate( "versions.developers versions.issues.comments.author versions.issues.reporter versions.issues.resolvers " ,  " _id name email " )
			.then( ( project ) => {
				var version = project.versions.id( req.params.versionId );
				if ( project != null && version != null ) {
					res.status( 200 );
					res.setHeader( "Content-Type","application/json" );
					res.json( { message: "This will return all issues of a specific project version " , issues: version.issues } );
				}
				else if( project == null ) {
					// eslint-disable-next-line no-undef
					err = new Error( ` project Id  ${req.params.projectId} has not found!` );
					// eslint-disable-next-line no-undef
					err.status= 404 ;
					return next( err );
				} else {
					// eslint-disable-next-line no-undef
					err = new Error( ` version Id ${req.params.versionId} on project ${req.params.projectId} has not found!` );
					err.status= 404 ;
					// eslint-disable-next-line no-undef
					return next( err );
				}
			} )
			.catch( ( err ) => next( err ) );
	} )
	.post( cors.corsWithOptions, authenticate.verifyUser , ( req,res,next ) => {

		project.findById( req.params.projectId )
			.then( ( project ) => {
				var version = project.versions.id( req.params.versionId );
				if ( project != null && version != null ) {
					req.body.reporter = req.user._id;
					if ( req.user.superuser == false ){
						req.body.resolvers = [];
					}
					version.issues.push( req.body );
					project.save()
						.then( ( project ) => {
							res.status( 200 );
							res.setHeader( "Content-Type","application/json" );
							res.json( { message: "This will create a new issues for a specific project version " , issues: version.issues } );
						} )
						.catch( ( err ) => next( err ) );
					
				}
				else if( project == null ) {
					// eslint-disable-next-line no-undef
					err = new Error( ` project Id  ${req.params.projectId} has not found!` );
					// eslint-disable-next-line no-undef
					err.status= 404 ;
					return next( err );
				} else {
					// eslint-disable-next-line no-undef
					err = new Error( ` version Id ${req.params.versionId} on project ${req.params.projectId} has not found!` );
					err.status= 404 ;
					// eslint-disable-next-line no-undef
					return next( err );
				}
			} )
			.catch( ( err ) => next( err ) );
	} )
	.put(  cors.corsWithOptions, authenticate.verifyUser , authenticate.verifyAdmin, ( req,res,next ) => {
		res.status( 405 );
		res.json( { error: "PUT Method is not allowed on /:projectId/ver/:versionId/issues " } );
	} )
	.delete(  cors.corsWithOptions, authenticate.verifyUser , authenticate.verifyAdmin, ( req,res,next ) => {
		project.findById( req.params.projectId )
			.then( ( project ) => {
				var version = project.versions.id( req.params.versionId );
				if ( project != null && version != null ) {
					version.issues = [];
					project.save()
						.then( ( project ) => {
							res.status( 200 );
							res.setHeader( "Content-Type","application/json" );
							res.json( { message: "This will deletea all  issues for a specific project version " , issues: version.issues } );
						} )
						.catch( ( err ) => next( err ) );
					
				}
				else if( project == null ) {
					// eslint-disable-next-line no-undef
					err = new Error( ` project Id  ${req.params.projectId} has not found!` );
					// eslint-disable-next-line no-undef
					err.status= 404 ;
					return next( err );
				} else {
					// eslint-disable-next-line no-undef
					err = new Error( ` version Id ${req.params.versionId} on project ${req.params.projectId} has not found!` );
					err.status= 404 ;
					// eslint-disable-next-line no-undef
					return next( err );
				}
			} )
			.catch( ( err ) => next( err ) );
	} );

/*
@Route      >   METHOD  /:projectId/ver/:versionId/issues/:issueId
@Behavioure >   Return a specific Issue /
				Update a specific Issue /
			 	Delete a specific Issue
@Access     >   Registered User for listing Issues /
			 	Registered & assigned Users to edit the Issue /
			 	Admin User to DELETE the Issue
*/
router.route( "/:projectId/ver/:versionId/issues/:issueId" )
	.options( cors.corsWithOptions, ( req,res ) => { res.status( 200 ); } )

	.get( cors.cors , authenticate.verifyUser , ( req,res,next ) => {
		project.findById( req.params.projectId )
			.populate( "versions.issues" )
			.populate( "versions.developers versions.issues.comments.author versions.issues.reporter versions.issues.resolvers " ,  " _id name email " )
			.then( ( project ) => {
				var version = project.versions.id( req.params.versionId );
				var issue = version.issues.id( req.params.issueId );
				if ( project != null && version != null & issue != null ) {

					res.status( 200 );
					res.setHeader( "Content-Type","application/json" );
					res.json( { message: "This will return a specific  issues of a specific project version " , issue } );
					
				}
				else if( project == null ) {
					// eslint-disable-next-line no-undef
					err = new Error( ` project Id  ${req.params.projectId} has not found!` );
					// eslint-disable-next-line no-undef
					err.status= 404 ;
					return next( err );
				} else if( issue == null ) {
					// eslint-disable-next-line no-undef
					err = new Error( ` Issue Id  ${req.params.issueId} has not found!` );
					// eslint-disable-next-line no-undef
					err.status= 404 ;
					return next( err );
				}
				else {
					// eslint-disable-next-line no-undef
					err = new Error( ` version Id ${req.params.versionId} on project ${req.params.projectId} has not found!` );
					err.status= 404 ;
					// eslint-disable-next-line no-undef
					return next( err );
				}
			} )
			.catch( ( err ) => next( err ) );
	} )
	.post(  cors.corsWithOptions, authenticate.verifyUser , authenticate.verifyAdmin, ( req,res,next ) => {
		res.status( 405 );
		res.json( { error: "POST Method is not allowed on /Issues/:issueId " } );
	
	} )
	.put(  cors.corsWithOptions, authenticate.verifyUser , ( req,res,next ) => {

		project.findById( req.params.projectId )
			.then( ( project ) => {
				var version = project.versions.id( req.params.versionId );
				var issue = version.issues.id( req.params.issueId );
			
				if ( project != null && version != null & issue != null ) {
				
					if ( req.body.name ) {
						issue.name = req.body.name;
					}
					if ( req.body.description ) {
						issue.description = req.body.description;
					}
					if ( req.body.summary ) {
						issue.summary = req.body.summary;
					}
					if ( req.body.issue_type ) {
						issue.issue_type = req.body.issue_type;
					}
					if ( req.body.issue_severity ) {
						issue.issue_severity = req.body.issue_severity;
					}
					if ( req.body.issue_status ) {
						issue.issue_status = req.body.issue_status;
					}
					if ( req.body.issue_priority ) {
						issue.issue_priority = req.body.issue_priority;
					}
					if ( req.body.attachments ) {
						issue.attachments = req.body.attachments;
					}
					if ( req.user.superuser  && req.body.resolvers ){
						issue.resolvers = req.body.resolvers  ;
					}
					project.save()
						.then( ( project ) => {
							res.status( 200 );
							res.setHeader( "Content-Type","application/json" );
							res.json( { message: "This will return a specific  issues of a specific project version " , issue } );
						} )			
						.catch( ( err ) => next( err ) );
			
						
				}
				else if( project == null ) {
					// eslint-disable-next-line no-undef
					err = new Error( ` project Id  ${req.params.projectId} has not found!` );
					// eslint-disable-next-line no-undef
					err.status= 404 ;
					return next( err );
				} else if( issue == null ) {
					// eslint-disable-next-line no-undef
					err = new Error( ` Issue Id  ${req.params.issueId} has not found!` );
					// eslint-disable-next-line no-undef
					err.status= 404 ;
					return next( err );
				}
				else {
					// eslint-disable-next-line no-undef
					err = new Error( ` version Id ${req.params.versionId} on project ${req.params.projectId} has not found!` );
					err.status= 404 ;
					// eslint-disable-next-line no-undef
					return next( err );
				}

			} )
		
			
			.catch( ( err ) => next( err ) );
	} )
	.delete(  cors.corsWithOptions, authenticate.verifyUser , authenticate.verifyAdmin,( req,res,next ) => {

		project.findById( req.params.projectId )
			.then( ( project ) => {
				var version = project.versions.id( req.params.versionId );
				var issue = version.issues.id( req.params.issueId );
				if ( project != null && version != null & issue != null ) {
				
					issue.remove();	
					project.save()
						.then( ( project ) => {
							res.status( 200 );
							res.setHeader( "Content-Type","application/json" );
							res.json( { message: "This will remove a specific  issues of a specific project version " , issue } );
						} )			
						.catch( ( err ) => next( err ) );
		
					
				}
				else if( project == null ) {
					// eslint-disable-next-line no-undef
					err = new Error( ` project Id  ${req.params.projectId} has not found!` );
					// eslint-disable-next-line no-undef
					err.status= 404 ;
					return next( err );
				} else if( issue == null ) {
					// eslint-disable-next-line no-undef
					err = new Error( ` Issue Id  ${req.params.issueId} has not found!` );
					// eslint-disable-next-line no-undef
					err.status= 404 ;
					return next( err );
				}
				else {
					// eslint-disable-next-line no-undef
					err = new Error( ` version Id ${req.params.versionId} on project ${req.params.projectId} has not found!` );
					err.status= 404 ;
					// eslint-disable-next-line no-undef
					return next( err );
				}
			} )
			.catch( ( err ) => next( err ) );
	
	} );

/*
@Route      >   METHOD /Issues/:IssueId/comments
@Behavioure >   Return a specific Issue's comments /
			 	Post a new comment on a specific Issue /
			 	Delete all comments on a specific Issue
@Access     >   Registered User for listing the comments /
			 	Registered Users to post a new  comment /
			 	Admin to DELETE all the comments
*/
router.route( "/:projectId/ver/:versionId/issues/:issueId/comments" )
	.options( cors.corsWithOptions, ( req,res ) => { res.status( 200 ); } )

	.get( cors.cors , authenticate.verifyUser , ( req,res,next ) => {
		project.findById( req.params.projectId )
			.populate( "versions.issues" )
			.populate( "versions.developers versions.issues.comments.author versions.issues.reporter versions.issues.resolvers " ,  " _id name email " )
			.then( ( project ) => {
				var version = project.versions.id( req.params.versionId );
				var issue = version.issues.id( req.params.issueId );
				if ( project != null && version != null & issue != null ) {

					res.status( 200 );
					res.setHeader( "Content-Type","application/json" );
					res.json( { message: "This will return all comments on a specific issues of a specific project version " , comments: issue.comments } );
					
				}
				else if( project == null ) {
					// eslint-disable-next-line no-undef
					err = new Error( ` project Id  ${req.params.projectId} has not found!` );
					// eslint-disable-next-line no-undef
					err.status= 404 ;
					return next( err );
				} else if( issue == null ) {
					// eslint-disable-next-line no-undef
					err = new Error( ` Issue Id  ${req.params.issueId} has not found!` );
					// eslint-disable-next-line no-undef
					err.status= 404 ;
					return next( err );
				}
				else {
					// eslint-disable-next-line no-undef
					err = new Error( ` version Id ${req.params.versionId} on project ${req.params.projectId} has not found!` );
					err.status= 404 ;
					// eslint-disable-next-line no-undef
					return next( err );
				}
			} )
			.catch( ( err ) => next( err ) );
	} )
	.post(  cors.corsWithOptions, authenticate.verifyUser , ( req,res,next ) => {
		project.findById( req.params.projectId )
			.populate( "versions.issues" )
			.populate( "versions.developers versions.issues.comments.author versions.issues.reporter versions.issues.resolvers " ,  " _id name email " )
			.then( ( project ) => {
				var version = project.versions.id( req.params.versionId );
				var issue = version.issues.id( req.params.issueId );
				if ( project != null && version != null & issue != null ) {
					
					req.body.author = req.user._id;

					issue.comments.push( req.body );

					project.save()
						.then( ( project ) => {
							res.status( 200 );
							res.setHeader( "Content-Type","application/json" );
							res.json( { message: "This will return a specific  issues of a specific project version " , comments:issue.comments } );
						} )			
						.catch( ( err ) => next( err ) );
		
					
				}
				else if( project == null ) {
					// eslint-disable-next-line no-undef
					err = new Error( ` project Id  ${req.params.projectId} has not found!` );
					// eslint-disable-next-line no-undef
					err.status= 404 ;
					return next( err );
				} else if( issue == null ) {
					// eslint-disable-next-line no-undef
					err = new Error( ` Issue Id  ${req.params.issueId} has not found!` );
					// eslint-disable-next-line no-undef
					err.status= 404 ;
					return next( err );
				}
				else {
					// eslint-disable-next-line no-undef
					err = new Error( ` version Id ${req.params.versionId} on project ${req.params.projectId} has not found!` );
					err.status= 404 ;
					// eslint-disable-next-line no-undef
					return next( err );
				}
			} )
			.catch( ( err ) => next( err ) );
	
	
	} )
	.put(  cors.corsWithOptions, ( req,res,next ) => {
		res.status( 405 );
		res.json( { error: "POST Method is not allowed on /Issues/:IssueId/comments " } );

	} )
	.delete( cors.corsWithOptions, authenticate.verifyUser ,authenticate.verifyAdmin , ( req,res,next ) => {

		project.findById( req.params.projectId )
			.then( ( project ) => {
				var version = project.versions.id( req.params.versionId );
				var issue = version.issues.id( req.params.issueId );
				if ( project != null && version != null & issue != null ) {
				
					issue.comments = [];

					project.save()
						.then( ( project ) => {
							res.status( 200 );
							res.setHeader( "Content-Type","application/json" );
							res.json( { message: "This will deleta all comments on a specific issue of a specific project version " , comments: issue.comments } );
						} )			
						.catch( ( err ) => next( err ) );
		
					
				}
				else if( project == null ) {
					// eslint-disable-next-line no-undef
					err = new Error( ` project Id  ${req.params.projectId} has not found!` );
					// eslint-disable-next-line no-undef
					err.status= 404 ;
					return next( err );
				} else if( issue == null ) {
					// eslint-disable-next-line no-undef
					err = new Error( ` Issue Id  ${req.params.issueId} has not found!` );
					// eslint-disable-next-line no-undef
					err.status= 404 ;
					return next( err );
				}
				else {
					// eslint-disable-next-line no-undef
					err = new Error( ` version Id ${req.params.versionId} on project ${req.params.projectId} has not found!` );
					err.status= 404 ;
					// eslint-disable-next-line no-undef
					return next( err );
				}
			} )
			.catch( ( err ) => next( err ) );
	
	
	} );

/*
@Route      >    METHOD /Issues/:IssueId/comments/:commentId
@Behavioure >    Return a specific Issue's comment /
			 	 Edit a comment on a specific Issue /
			 	 Delete a comments on a specific Issue
@Access     >    Registered User for listing the comments /
				 Registered Users & Owner User to edit the comment /
				 Registered Users & Owner User to DELETE  the comment
*/
router.route( "/:projectId/ver/:versionId/issues/:issueId/comments/:commentId" )
	.options( cors.corsWithOptions, ( req,res ) => { res.status( 200 ); } )

	.get( cors.cors , authenticate.verifyUser , ( req,res,next ) => {

		project.findById( req.params.projectId )
			.populate( "versions.issues" )
			.populate( "versions.developers versions.issues.comments.author versions.issues.reporter versions.issues.resolvers " ,  " _id name email " )
			.then( ( project ) => {
				var version = project.versions.id( req.params.versionId );
				var issue = version.issues.id( req.params.issueId );
				var comment = issue.comments.id( req.params.commentId );
				if ( project != null && version != null & issue != null & comment != null ) {

					res.status( 200 );
					res.setHeader( "Content-Type","application/json" );
					res.json( { message: "This will return all comments on a specific issues of a specific project version " , comment } );
					
				}
				else if( project == null ) {
					// eslint-disable-next-line no-undef
					err = new Error( ` project Id  ${req.params.projectId} has not found!` );
					// eslint-disable-next-line no-undef
					err.status= 404 ;
					return next( err );
					
				}
				else if( comment == null ) {
					// eslint-disable-next-line no-undef
					err = new Error( ` comment Id  ${req.params.commentId} has not found!` );
					// eslint-disable-next-line no-undef
					err.status= 404 ;
					return next( err );
				}
				else if( issue == null ) {
					// eslint-disable-next-line no-undef
					err = new Error( ` Issue Id  ${req.params.issueId} has not found!` );
					// eslint-disable-next-line no-undef
					err.status= 404 ;
					return next( err );
				}
				else {
					// eslint-disable-next-line no-undef
					err = new Error( ` version Id ${req.params.versionId} on project ${req.params.projectId} has not found!` );
					err.status= 404 ;
					// eslint-disable-next-line no-undef
					return next( err );
				}
			} )
			.catch( ( err ) => next( err ) );
	} )
	.post(  cors.corsWithOptions, ( req,res,next ) => {
		res.status( 405 );
		res.json( { error: "POST Method is not allowed on /Issues/:IssueId/comments " } );
	} )


	.put( cors.corsWithOptions, authenticate.verifyUser , ( req,res,next ) => {
		
		project.findById( req.params.projectId )
			.then( ( project ) => {
				var version = project.versions.id( req.params.versionId );
				var issue = version.issues.id( req.params.issueId );
				var comment = issue.comments.id( req.params.commentId );
				if ( comment.author.toString() == req.user._id.toString() ) {

					if ( project != null && version != null & issue != null & comment != null ) {

						if ( req.body.comment ){
							comment.comment = req.body.comment;
						}
						if ( req.body.attachments ){
							comment.attachments = req.body.attachments;
						}
						project.save()
							.then( ( project ) => {
								res.status( 200 );
								res.setHeader( "Content-Type","application/json" );
								res.json( { message: "This will return all comments on a specific issues of a specific project version " , comment } );
							} )
							.catch( ( err ) => next( err ) );			
						
					}
					else if( project == null ) {
						// eslint-disable-next-line no-undef
						err = new Error( ` project Id  ${req.params.projectId} has not found!` );
						// eslint-disable-next-line no-undef
						err.status= 404 ;
						return next( err );
						
					}
					else if( comment == null ) {
						// eslint-disable-next-line no-undef
						err = new Error( ` comment Id  ${req.params.commentId} has not found!` );
						// eslint-disable-next-line no-undef
						err.status= 404 ;
						return next( err );
					}
					else if( issue == null ) {
						// eslint-disable-next-line no-undef
						err = new Error( ` Issue Id  ${req.params.issueId} has not found!` );
						// eslint-disable-next-line no-undef
						err.status= 404 ;
						return next( err );
					}
					else {
						// eslint-disable-next-line no-undef
						err = new Error( ` version Id ${req.params.versionId} on project ${req.params.projectId} has not found!` );
						err.status= 404 ;
						// eslint-disable-next-line no-undef
						return next( err );
					}

				} else {
					err = new Error( " You are not allowed to perform this operation " );
					err.status= 404 ;
					// eslint-disable-next-line no-undef
					return next( err );
				}
			} )
			.catch( ( err ) => next( err ) );
	} )
	.delete(  cors.corsWithOptions, authenticate.verifyUser , ( req,res,next ) => {

		project.findById( req.params.projectId )
			.then( ( project ) => {
				var version = project.versions.id( req.params.versionId );
				var issue = version.issues.id( req.params.issueId );
				var comment = issue.comments.id( req.params.commentId );
				if ( comment.author.toString() == req.user._id.toString() ) {
					if ( project != null && version != null & issue != null & comment != null ) {

						comment.remove();
						project.save()
							.then( ( project ) => {
								res.status( 200 );
								res.setHeader( "Content-Type","application/json" );
								res.json( { message: "This will return all comments on a specific issues of a specific project version " , comment } );
							} )
							.catch( ( err ) => next( err ) );			
					
					}
					else if( project == null ) {
					// eslint-disable-next-line no-undef
						err = new Error( ` project Id  ${req.params.projectId} has not found!` );
						// eslint-disable-next-line no-undef
						err.status= 404 ;
						return next( err );
					
					}
					else if( comment == null ) {
					// eslint-disable-next-line no-undef
						err = new Error( ` comment Id  ${req.params.commentId} has not found!` );
						// eslint-disable-next-line no-undef
						err.status= 404 ;
						return next( err );
					}
					else if( issue == null ) {
					// eslint-disable-next-line no-undef
						err = new Error( ` Issue Id  ${req.params.issueId} has not found!` );
						// eslint-disable-next-line no-undef
						err.status= 404 ;
						return next( err );
					}
					else {
					// eslint-disable-next-line no-undef
						err = new Error( ` version Id ${req.params.versionId} on project ${req.params.projectId} has not found!` );
						err.status= 404 ;
						// eslint-disable-next-line no-undef
						return next( err );
					}
				} else{
					err = new Error( " You are not allowed to perform this operation " );
					err.status= 404 ;
					// eslint-disable-next-line no-undef
					return next( err );
				}
				
			} )
			.catch( ( err ) => next( err ) );
	
	} );



module.exports = router;