/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const express = require( "express" );
const router = express.Router();
const { v4: uuidv4 } = require( "uuid" );
const config = require( "../config" );

// middlewares
const cors = require( "../middlewares/cors" );
const { userValidation } = require( "../middlewares/validation" );

// Authentication middlewares
const authenticate = require( "../middlewares/authenticate" );
const passport = require( "passport" );

// controllers
const userCtrl = require( "../controllers/userCtrl" );

//app configuration
router.use( express.json() );
router.use( express.urlencoded( { extended: false } ) );


router.route( "/" )
	.options( cors.corsWithOptions, ( req,res ) => { res.status( 200 ); } )
	.get( cors.cors , authenticate.verifyUser , authenticate.verifyAdmin, userCtrl.getAll )
	.put(  cors.corsWithOptions, authenticate.verifyUser , authenticate.verifyAdmin, userCtrl.methodNotallowed )
	.delete( cors.corsWithOptions, authenticate.verifyUser , authenticate.verifyAdmin, userCtrl.deleteAll );

router.route( "/manage/:UserId" )
	.options( cors.corsWithOptions, ( req,res ) => { res.status( 200 ); } )
	.get( cors.cors , authenticate.verifyUser , authenticate.verifyAdmin, userCtrl.getOne )
	.post( cors.corsWithOptions, authenticate.verifyUser , authenticate.verifyAdmin, userCtrl.methodNotallowed )
	.put( cors.corsWithOptions, authenticate.verifyUser , authenticate.verifyAdmin, userValidation, userCtrl.editOne )
	.delete(  cors.corsWithOptions, authenticate.verifyUser , authenticate.verifyAdmin, userCtrl.deleteOne  );

router
	.options( cors.corsWithOptions, ( req,res ) => { res.status( 200 ); } )
	.post( "/signup",  cors.corsWithOptions, authenticate.verifyUser , authenticate.verifyAdmin , userValidation , userCtrl.register );

router
	.options( cors.corsWithOptions, ( req,res ) => { res.status( 200 ); } )
	.post( "/init",   cors.corsWithOptions, userCtrl.init );

router
	.options( cors.corsWithOptions, ( req,res ) => { res.status( 200 ); } )
	.post( "/login",   cors.corsWithOptions, passport.authenticate( "local" ) , userCtrl.login );


module.exports = router;