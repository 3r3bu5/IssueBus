/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// Reequire 
const express = require( "express" );
const router = express.Router();

// issueRouter
const issueRouter = require( "./issueRouter" );


// require models

const project = require( "../models/projectModel" );

//app configuration
router.use( express.json() );
router.use( express.urlencoded( { extended: false } ) );
router.use( "/:projectId/issues", issueRouter );

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
	.get( ( req,res,next ) => {
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
	.post( ( req,res,next ) => {
		project.create( req.body )
			.then( ( project ) => {
				res.status( 200 );
				res.setHeader( "Content-Type","application/json" );
				res.json( { message: "This will return the new created  project " , project: project } );
			} )
			.catch( ( err ) => next( err ) );
	} )
	.put( ( req,res,next ) => {
		res.status( 405 );
		res.json( { error: "PUT Method is not allowed on /projects " } );
	} )
	.delete( ( req,res,next ) => {
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
	.get( ( req,res,next ) => {
		project.findById( req.params.projectId )
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
	.post( ( req,res,next ) => {
		res.status( 405 );
		res.json( { error: "POST Method is not allowed on /projects/projectId " } );
		
	} )
	.put( ( req,res,next ) => {
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
	.delete( ( req,res,next ) => {

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
@Route      >    METHOD /projects
@Behavioure >    Return all projects / 
                 POST a new project / 
                 Delete all projects
@Access     >    Registered User for listing projects /
                 Admin to POST a new project /
                 Admin to DELETE all projects
*/
router.route( "/" )
	.get( ( req,res,next ) => {
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
	.post( ( req,res,next ) => {
		project.create( req.body )
			.then( ( project ) => {
				res.status( 200 );
				res.setHeader( "Content-Type","application/json" );
				res.json( { message: "This will return the new created  project " , project: project } );
			} )
			.catch( ( err ) => next( err ) );
	} )
	.put( ( req,res,next ) => {
		res.status( 405 );
		res.json( { error: "PUT Method is not allowed on /projects " } );
	} )
	.delete( ( req,res,next ) => {
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
	.get( ( req,res,next ) => {
		project.findById( req.params.projectId )
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
	.post( ( req,res,next ) => {
		res.status( 405 );
		res.json( { error: "POST Method is not allowed on /projects/projectId " } );
		
	} )
	.put( ( req,res,next ) => {
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
	.delete( ( req,res,next ) => {

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
	.get( ( req,res,next ) => {
		project.findById( req.params.projectId )
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
	.post( ( req,res,next ) => {

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
	.put( ( req,res,next ) => {
		res.status( 405 );
		res.json( { error: "POST Method is not allowed on /projects/:projectId/version " } );
	} )
	.delete( ( req,res,next ) => {

		
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
	.get( ( req,res,next ) => {
		project.findById( req.params.projectId )
			.then( ( project ) => {
				var version = project.versions.id( req.params.versionId );
				if ( project != null && version != null ) {
					res.status( 200 );
					res.setHeader( "Content-Type","application/json" );
					res.json( { message: "This will return all versions of a  specific project " , version } );
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
			} )
			.catch( ( err ) => next( err ) );
	} )
	.post( ( req,res,next ) => {

		res.status( 405 );
		res.json( { error: "POST Method is not allowed on /projects/:projectId/version/:versionId " } );
		
	} )
	.put( ( req,res,next ) => {
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

	.delete( ( req,res,next ) => {

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

module.exports = router;