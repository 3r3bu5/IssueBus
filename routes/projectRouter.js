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
			.populate("versions.issues")
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

module.exports = router;