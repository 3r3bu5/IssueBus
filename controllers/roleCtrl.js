/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const express = require( "express" );
const  Role  = require( "../models/roleModel" );



/*
@Route      >    METHOD /Roles
@Behavioure >    Return all Roles / 
                 POST a new Role / 
                 Delete all Roles
@Access     >    Admin for listing Roles /
                 Admin to POST a new Role /
                 Admin to DELETE all Roles
*/


exports.getAll = ( req,res,next ) => {
	Role.find()
		.then( ( Roles ) => {
			res.status( 200 );
			res.setHeader( "Content-Type","application/json" );
			res.json( { message: "This will return all Roles " , Roles: Roles } );
		} )
		.catch( ( err ) => next( err ) );
};

exports.createOne = ( req,res,next ) => {
	Role.create( req.body )
		.then( ( Role ) => {
			res.status( 200 );
			res.setHeader( "Content-Type","application/json" );
			res.json( { message: "This will return the new created  Role " , Role: Role } );
		} )
		.catch( ( err ) => next( err ) );
};

exports.methodNotallowed = ( req,res, ) => {
	res.status( 405 );
	res.json( { error: ` ${req.method} Method is not allowed on ${req.baseUrl} ` } );
}; 

exports.deleteAll = ( req,res,next ) => {
	Role.remove()
		.then( ( Roles ) => {
			res.status( 200 );
			res.setHeader( "Content-Type","application/json" );
			res.json( { message: "This will the DELETE ALL CURRENT RoleS" , deletedRolesInfo: Roles } );
		} )
		.catch( ( err ) => next( err ) );
};


/*
@Route      >    METHOD /Roles/:RoleId
@Behavioure >    Return a specific Role /
                 Update a specific Role /
                 Delete a specific Role
@Access     >    Admin for listing Roles /
                 Admin to edit the Role /
                 Admin to DELETE the Role
*/

exports.getOne = ( req,res,next ) => {
	Role.findById( req.params.RoleId )
		.then( ( Role ) => {
			if ( Role != null ) {
				res.status( 200 );
				res.setHeader( "Content-Type","application/json" );
				res.json( { message: "This will return that specific Role " , Role: Role } );
			}else {
				err = new Error( `Role ID ${req.params.RoleId} does not exist! ` );
				err.statusCode = 404;
				return next( err );
			}
		} )
		.catch( ( err ) => next( err ) );
}; 

exports.editOne = ( req,res,next ) => {
	Role.findByIdAndUpdate( req.params.RoleId,
		{ $set : req.body } 
		, { new : true } )
		.then( ( Role ) => {
			res.status( 200 );
			res.setHeader( "Content-Type","application/json" );
			res.json( { message: "This will return that specific Role " , Role: Role } );
		} )
		.catch( ( err ) => next( err ) );
};

exports.deleteOne = ( req,res,next ) => {

	Role.findByIdAndDelete( req.params.RoleId )
		.then( ( Role ) => {

			res.status( 200 );
			res.setHeader( "Content-Type","application/json" );
			res.json( { message: `DELETE the Role whose Id is ${req.params.RoleId} ` } );

    
		}, ( err ) => next( err ) 
		)
		.catch( ( err ) => next( err ) );
    
};