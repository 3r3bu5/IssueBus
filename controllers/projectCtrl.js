/* eslint-disable no-unused-vars */
const express = require( "express" );
const { project } = require( "../models/projectModel" );


/*
@Route      >    METHOD /projects
@Behavioure >    Return all projects / 
                 POST a new project /
                 Delete all projects
@Access     >    Registered User for listing projects /
                 Admin to POST a new project /
                 Admin to DELETE all projects
*/

exports.getAll = ( req,res,next ) => {
	project.find()
		.populate( "versions.issues" )
		.populate( "versions.developers" ,  " _id name email " )
		.then( ( projects ) => {
			res.status( 200 );
			res.setHeader( "Content-Type","application/json" );
			res.json( { message: "This will return all projects " , projects: projects } );
		} )
		.catch( ( err ) => next( err ) );
} ;

exports.createOne = ( req,res,next ) => {
	project.create( req.body )
		.then( ( project ) => {
			res.status( 200 );
			res.setHeader( "Content-Type","application/json" );
			res.json( { message: "This will return the new created  project " , project: project } );
		} )
		.catch( ( err ) => next( err ) );
};

exports.methodNotallowed = ( req,res, ) => {
	res.status( 405 );
	res.json( { error: ` ${req.method} Method is not allowed on ${req.baseUrl} ` } );
}; 

exports.deleteAll = ( req,res,next ) => {
	project.remove()
		.then( ( projects ) => {
			res.status( 200 );
			res.setHeader( "Content-Type","application/json" );
			res.json( { message: "This will the DELETE ALL CURRENT PROJECTS" , deletedProjectsInfo: projects } );
		} )
		.catch( ( err ) => next( err ) );
}; 

/*
@Route      >    METHOD /projects/:projectId
@Behavioure >    Return a specific project /
                 Update a specific project /
                 Delete a specific project
@Access     >    Registered User for listing projects /
                 Admin to edit the project /
                 Admin to DELETE the project
*/

exports.getOne =  ( req,res,next ) => {
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
};

exports.updateOne = ( req,res,next ) => {

	project.findById( req.params.projectId )
		.then( ( project ) => {
			if( req.body.name ) {
				project.name = req.body.name;
			}
			if( req.body.description ) {
				project.description = req.body.description;
			}
			project.save()
				.then( ( project ) => {
					res.status( 200 );
					res.setHeader( "Content-Type","application/json" );
					res.json( { message: "This will return that specific project " , project: project } );
				} ).catch( ( err ) => next( err ) );
            
		} )
		.catch( ( err ) => next( err ) );
};

exports.deleteOne = ( req,res,next ) => {

	project.findByIdAndDelete( req.params.projectId )
		.then( ( project ) => {

			res.status( 200 );
			res.setHeader( "Content-Type","application/json" );
			res.json( { message: `DELETE the project whose Id is ${req.params.projectId} ` } );

    
		}, ( err ) => next( err ) 
		)
		.catch( ( err ) => next( err ) );
    
};