/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// Reequire 
const express = require( "express" );
const router = express.Router();
const authenticate = require( "../middlewares/authenticate" );
const cors = require( "../middlewares/cors" );

// controllers
const uploadCtrl = require( "../controllers/uploadCtrl" );
//app configuration
router.use( express.json() );
router.use( express.urlencoded( { extended: false } ) );


router.route( "/" )
	.options( cors.corsWithOptions, ( req,res ) => { res.status( 200 ); } )
	.get( cors.cors, authenticate.verifyUser, authenticate.verifyAdmin, uploadCtrl.methodNotallowed )
	.post( cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, uploadCtrl.uploadSingleMidd, uploadCtrl.uploadSingle  )
	.put( authenticate.verifyUser, authenticate.verifyAdmin, uploadCtrl.methodNotallowed )
	.delete( authenticate.verifyUser, authenticate.verifyAdmin, uploadCtrl.methodNotallowed );

router.route( "/attachments" )
	.options( cors.corsWithOptions, ( req,res ) => { res.status( 200 ); } )
	.get( cors.cors, authenticate.verifyUser, authenticate.verifyAdmin, uploadCtrl.methodNotallowed )
	.post( cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, uploadCtrl.multipleUpload, uploadCtrl.uploadMulti )
	.put( authenticate.verifyUser, authenticate.verifyAdmin, uploadCtrl.methodNotallowed )
	.delete( authenticate.verifyUser, authenticate.verifyAdmin, uploadCtrl.methodNotallowed );

module.exports = router;