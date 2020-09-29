/* eslint-disable no-unused-vars */
// Reequire 
const express = require( "express" );
const router = express.Router();
const authenticate = require( "../middlewares/authenticate" );

// require models

const  Role  = require( "../models/roleModel" );

//app configuration
router.use( express.json() );
router.use( express.urlencoded( { extended: false } ) );



/*
@Route      >    METHOD /Roles
@Behavioure >    Return all Roles / 
                 POST a new Role / 
                 Delete all Roles
@Access     >    Admin for listing Roles /
                 Admin to POST a new Role /
                 Admin to DELETE all Roles
*/
router.route( "/" )
	.get( authenticate.verifyUser , authenticate.verifyAdmin, ( req,res,next ) => {
		Role.find()
			.then( ( Roles ) => {
				res.status( 200 );
				res.setHeader( "Content-Type","application/json" );
				res.json( { message: "This will return all Roles " , Roles: Roles } );
			} )
			.catch( ( err ) => next( err ) );
	} )
	.post( authenticate.verifyUser , authenticate.verifyAdmin, ( req,res,next ) => {
		Role.create( req.body )
			.then( ( Role ) => {
				res.status( 200 );
				res.setHeader( "Content-Type","application/json" );
				res.json( { message: "This will return the new created  Role " , Role: Role } );
			} )
			.catch( ( err ) => next( err ) );
	} )
	.put(authenticate.verifyUser , authenticate.verifyAdmin, ( req,res,next ) => {
		res.status( 405 );
		res.json( { error: "PUT Method is not allowed on /Roles " } );
	} )
	.delete(authenticate.verifyUser , authenticate.verifyAdmin, ( req,res,next ) => {
		Role.remove()
			.then( ( Roles ) => {
				res.status( 200 );
				res.setHeader( "Content-Type","application/json" );
				res.json( { message: "This will the DELETE ALL CURRENT RoleS" , deletedRolesInfo: Roles } );
			} )
			.catch( ( err ) => next( err ) );
	} );

/*
@Route      >    METHOD /Roles/:RoleId
@Behavioure >    Return a specific Role /
                 Update a specific Role /
                 Delete a specific Role
@Access     >    Admin for listing Roles /
                 Admin to edit the Role /
                 Admin to DELETE the Role
*/
router.route( "/:RoleId" )
	.get( authenticate.verifyUser , authenticate.verifyAdmin,( req,res,next ) => {
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
	} )
	.post(authenticate.verifyUser , authenticate.verifyAdmin, ( req,res,next ) => {
		res.status( 405 );
		res.json( { error: "POST Method is not allowed on /Roles/RoleId " } );
		
	} )
	.put( authenticate.verifyUser , authenticate.verifyAdmin,( req,res,next ) => {
		Role.findById( req.params.RoleId,
			{ $set : req.body } 
			, { new : true } )
			.then( ( Role ) => {
				res.status( 200 );
				res.setHeader( "Content-Type","application/json" );
				res.json( { message: "This will return that specific Role " , Role: Role } );
			} )
			.catch( ( err ) => next( err ) );
	} )
	.delete( authenticate.verifyUser , authenticate.verifyAdmin, ( req,res,next ) => {

		Role.findByIdAndDelete( req.params.RoleId )
			.then( ( Role ) => {

				res.status( 200 );
				res.setHeader( "Content-Type","application/json" );
				res.json( { message: `DELETE the Role whose Id is ${req.params.RoleId} ` } );

		
			}, ( err ) => next( err ) 
			)
			.catch( ( err ) => next( err ) );
		
	} );

module.exports = router;