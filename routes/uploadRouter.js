/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// Reequire 
const express = require( "express" );
const router = express.Router();
const multer = require( "multer" );
const authenticate = require( "../middlewares/authenticate" );
const cors = require( "../middlewares/cors" );

// require models

//app configuration
router.use( express.json() );
router.use( express.urlencoded( { extended: false } ) );

imagePath = "public/images";
attachmentsPath = "public/attachments";

var storage = multer.diskStorage( {
	destination: function ( req, file, cb ) {
		cb( null, imagePath );
	},
	filename: function ( req, file, cb ) {
		cb( null, file.originalname + "-" + Date.now() );
	}
} );

var multipleStorage = multer.diskStorage( {
	destination: function ( req, file, cb ) {
		cb( null, attachmentsPath );
	},
	filename: function ( req, file, cb ) {
		cb( null, file.originalname + "-" + Date.now() );
	}
} );

const imageFileFilter = ( req, file, cb ) => {
	if( !file.originalname.match( /\.(jpg|jpeg|png|gif)$/ ) ) {
		return cb( new Error( "You can upload only image files!" ), false );
	}
	cb( null, true );
};

const upload = multer( { storage: storage, fileFilter: imageFileFilter } );

const multipleUpload = multer( { storage: multipleStorage, fileFilter: imageFileFilter } ).array( "attachments",5 );


router.route( "/" )
	.options( cors.corsWithOptions, ( req,res ) => { res.status( 200 ); } )

	.get( cors.cors, authenticate.verifyUser, authenticate.verifyAdmin, ( req, res, ) => {
		res.statusCode = 403;
		res.end( "GET operation not supported on /imageUpload" );
	} )
	.post( cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, upload.single( "imageFile" ), ( req, res ) => {
		res.statusCode = 200;
		res.setHeader( "Content-Type", "application/json" );
		res.json( req.file );
	} )
	.put( authenticate.verifyUser, authenticate.verifyAdmin, ( req, res,  ) => {
		res.statusCode = 403;
		res.end( "PUT operation not supported on /imageUpload" );
	} )
	.delete( authenticate.verifyUser, authenticate.verifyAdmin, ( req, res, ) => {
		res.statusCode = 403;
		res.end( "DELETE operation not supported on /imageUpload" );
	} );

router.route( "/attachments" )
	.options( cors.corsWithOptions, ( req,res ) => { res.status( 200 ); } )

	.get( cors.cors, authenticate.verifyUser, authenticate.verifyAdmin, ( req, res, ) => {
		res.statusCode = 403;
		res.end( "GET operation not supported on /imageUpload" );
	} )
	.post( cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, multipleUpload, ( req, res ) => {
		res.statusCode = 200;
		res.setHeader( "Content-Type", "application/json" );
		res.json( req.files );
	} )
	.put( authenticate.verifyUser, authenticate.verifyAdmin, ( req, res,  ) => {
		res.statusCode = 403;
		res.end( "PUT operation not supported on /imageUpload" );
	} )
	.delete( authenticate.verifyUser, authenticate.verifyAdmin, ( req, res, ) => {
		res.statusCode = 403;
		res.end( "DELETE operation not supported on /imageUpload" );
	} );

module.exports = router;