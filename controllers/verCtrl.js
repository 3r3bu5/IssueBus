/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const express = require( "express" );
const { project } = require( "../models/projectModel" );


/*
@Route      >    METHOD /projects/:projectId/ver
@Behavioure >    Return all project's versions /
                 Add a new version to a specific project /
                 Delete all project versions
@Access     >    Registered User for listing project's versions /
                 Admin to edit the project's versions /
                 Admin to DELETE the project's versions
*/

exports.getAll =  ( req,res,next ) => {
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
};

exports.createOne = ( req,res,next ) => {

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
    
    
};


exports.methodNotallowed = ( req,res, ) => {
	res.status( 405 );
	res.json( { error: ` ${req.method} Method is not allowed on ${req.baseUrl} ` } );
}; 

exports.deleteAll = ( req,res,next ) => {
		
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
};

/*
@Route      >    METHOD /projects/:projectId/ver/:versionId
@Behavioure >    Return a specifc project version /
                 edit a version of a specific project /
                 Delete a project version
@Access     >    Registered User for listing project's version /
                 Admin to edit the project's version /
                 Admin to DELETE the project's version
*/

exports.getOne = ( req,res,next ) => {
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
}; 

exports.editOne = ( req,res,next ) => {
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
}; 

exports.deleteOne = ( req,res,next ) => {

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
}; 