/* eslint-disable no-unused-vars */
// Reequire 
const express = require( "express" );
const router = express.Router();

// require models

const User  = require( "../models/userModel" );

//app configuration
router.use( express.json() );
router.use( express.urlencoded( { extended: false } ) );



/*
@Route      >    METHOD /Users
@Behavioure >    Return all Users / 
                 Register a new User / 
                 Delete all Users
@Access     >    Admin for listing Users /
                 Admin to create a new User /
                 Admin to DELETE all Users
*/
router.route( "/" )
	.get( ( req,res,next ) => {
		User.find()
			.then( ( Users ) => {
				res.status( 200 );
				res.setHeader( "Content-Type","application/json" );
				res.json( { message: "This will return all Users " , Users: Users } );
			} )
			.catch( ( err ) => next( err ) );
	} )
	.post( ( req,res,next ) => {
		req.body.email = req.body.email.toLowerCase();
		User.create( req.body )
			.then( ( User ) => {
				res.status( 200 );
				res.setHeader( "Content-Type","application/json" );
				res.json( { message: "This will return the new created  User " , User: User } );
			} )
			.catch( ( err ) => next( err ) );
	} )
	.put( ( req,res,next ) => {
		res.status( 405 );
		res.json( { error: "PUT Method is not allowed on /Users " } );
	} )
	.delete( ( req,res,next ) => {
		User.remove()
			.then( ( Users ) => {
				res.status( 200 );
				res.setHeader( "Content-Type","application/json" );
				res.json( { message: "This will the DELETE ALL CURRENT UserS" , deletedUsersInfo: Users } );
			} )
			.catch( ( err ) => next( err ) );
	} );

/*
@Route      >    METHOD /Users/:UserId
@Behavioure >    Return a specific User /
                 Update a specific User /
                 Delete a specific User
@Access     >    Admin for listing Users /
                 Admin to edit the User /
                 Admin to DELETE the User
*/
router.route( "/:UserId" )
	.get( ( req,res,next ) => {
		User.findById( req.params.UserId )
			.then( ( User ) => {
				if ( User != null ) {
					res.status( 200 );
					res.setHeader( "Content-Type","application/json" );
					res.json( { message: "This will return that specific User " , User: User } );
				}else {
					err = new Error( `User ID ${req.params.UserId} does not exist! ` );
					err.statusCode = 404;
					return next( err );
				}
			} )
			.catch( ( err ) => next( err ) );
	} )
	.post( ( req,res,next ) => {
		res.status( 405 );
		res.json( { error: "POST Method is not allowed on /Users/UserId " } );
		
	} )
	.put( ( req,res,next ) => {
		User.findByIdAndUpdate( req.params.UserId,
			{ $set : req.body } 
			, { new : true } )
			.then( ( User ) => {
				res.status( 200 );
				res.setHeader( "Content-Type","application/json" );
				res.json( { message: "This will return that specific User " , User: User } );
			} )
			.catch( ( err ) => next( err ) );
	} )
	.delete( ( req,res,next ) => {

		User.findByIdAndDelete( req.params.UserId )
			.then( ( User ) => {

				res.status( 200 );
				res.setHeader( "Content-Type","application/json" );
				res.json( { message: `DELETE the User whose Id is ${req.params.UserId} ` } );

		
			}, ( err ) => next( err ) 
			)
			.catch( ( err ) => next( err ) );
		
	} );

module.exports = router;