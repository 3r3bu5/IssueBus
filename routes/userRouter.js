/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// Reequire 
const express = require( "express" );
const router = express.Router();
const { v4: uuidv4 } = require( "uuid" );
const config = require( "../config" );
// middlewares

const cors = require( "../middlewares/cors" );
const { userValidation } = require( "../middlewares/validation" );


// AUTHENTICATION 
const authenticate = require( "../middlewares/authenticate" );
const passport = require( "passport" );

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
	.options( cors.corsWithOptions, ( req,res ) => { res.status( 200 ); } )

	.get( cors.cors , authenticate.verifyUser , authenticate.verifyAdmin, ( req,res,next ) => {
		User.find()
			.populate( "role" , "_id name description abbr" )
			.select( "-password -createdAt -updatedAt -__v" )
			.then( ( Users ) => {
				res.status( 200 );
				res.setHeader( "Content-Type","application/json" );
				res.json( { message: "This will return all Users " , Users: Users } );
			} )
			.catch( ( err ) => next( err ) );
	} )
	.put(  cors.corsWithOptions, ( req,res,next ) => {
		res.status( 405 );
		res.json( { error: "PUT Method is not allowed on /Users " } );
	} )
	.delete( cors.corsWithOptions, authenticate.verifyUser , authenticate.verifyAdmin, ( req,res,next ) => {
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
router.route( "/manage/:UserId" )
	.options( cors.corsWithOptions, ( req,res ) => { res.status( 200 ); } )

	.get( cors.cors , authenticate.verifyUser , authenticate.verifyAdmin, ( req,res,next ) => {
		User.findById( req.params.UserId )
			.populate( "role" , "_id name description abbr" )
			.select( "-password -createdAt -updatedAt -__v" )
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
	.post( cors.corsWithOptions, ( req,res,next ) => {
		res.status( 405 );
		res.json( { error: "POST Method is not allowed on /Users/UserId " } );
		
	} )
	.put( cors.corsWithOptions, authenticate.verifyUser , authenticate.verifyAdmin, userValidation, ( req,res,next ) => {
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
	.delete(  cors.corsWithOptions, authenticate.verifyUser , authenticate.verifyAdmin, ( req,res,next ) => {

		User.findByIdAndDelete( req.params.UserId )
			.then( ( User ) => {

				res.status( 200 );
				res.setHeader( "Content-Type","application/json" );
				res.json( { message: `DELETE the User whose Id is ${req.params.UserId} ` } );

		
			}, ( err ) => next( err ) 
			)
			.catch( ( err ) => next( err ) );
		
	} );

router
	.options( cors.corsWithOptions, ( req,res ) => { res.status( 200 ); } )

	.post( "/signup",  cors.corsWithOptions, authenticate.verifyUser , authenticate.verifyAdmin , userValidation ,( req, res, next ) => {
		User.register( new User( {  email:req.body.email ,name :req.body.name , role : req.body.role  } ), 
			req.body.password, ( err, user ) => {
				if( err ) {
					res.statusCode = 500;
					res.setHeader( "Content-Type", "application/json" );
					res.json( { err: err } );
				}
				else {	
					user.save( ( err, user ) => {
						if ( err ) {
							res.statusCode = 500;
							res.setHeader( "Content-Type", "application/json" );
							res.json( { err: err } );
							return ;
						}
					
						res.statusCode = 200;
						res.setHeader( "Content-Type", "application/json" );
						res.json( { success: true, status: "Registration Successful!" } );
					
					} );
				}
			} );
	} );

router
	.options( cors.corsWithOptions, ( req,res ) => { res.status( 200 ); } )

	.post( "/init",   cors.corsWithOptions,( req, res, next ) => {	

		
		User.findOne( { superuser: true } )
			.then( ( user ) => {
				console.log( user );
				if ( user != null ) {
					res.status( 200 );
					res.setHeader( "Content-Type","application/json" );
					res.json( { message: "OK" } );
				}
				else {
					User.register( new User( {  email:config.adminEmail , name : config.adminName , role : "1" , superuser: true } ), 
						config.adminPass , ( err, user ) => {
							if( err ) {
								res.statusCode = 500;
								res.setHeader( "Content-Type", "application/json" );
								res.json( { err: err } );
							}
							else {	
								user.save( ( err, user ) => {
									if ( err ) {
										res.statusCode = 500;
										res.setHeader( "Content-Type", "application/json" );
										res.json( { err: err } );
										return ;
									}
					
									res.statusCode = 200;
									res.setHeader( "Content-Type", "application/json" );
									res.json( { success: true, status: " Intiliazed!" } );
					
								} );
							}
						} );
				}

		
			} )
			.catch( ( err ) => next( err ) );
	
	} );

router
	.options( cors.corsWithOptions, ( req,res ) => { res.status( 200 ); } )

	.post( "/login",   cors.corsWithOptions, passport.authenticate( "local" ) ,( req, res, next ) => {	

		var token = authenticate.getToken( { _id: req.user._id } );
		res.status( 200 );
		res.setHeader( "Content-Type", "application/json" );
		res.json( { status: true  , token: token , message: "Logged-In Successful!" } );
	
	} );


module.exports = router;