/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// Reequire 
const express = require( "express" );
const router = express.Router();
const authenticate = require( "../middlewares/authenticate" );
const cors = require( "../middlewares/cors" );
const { roleValidation } = require( "../middlewares/validation" );


// controllers

const roleCtrl = require( "../controllers/roleCtrl" );

//app configuration
router.use( express.json() );
router.use( express.urlencoded( { extended: false } ) );



router.route( "/" )
	.options( cors.corsWithOptions, ( req,res ) => { res.status( 200 ); } )

	.get( cors.cors ,authenticate.verifyUser , authenticate.verifyAdmin, roleCtrl.getAll  )
	.post(  cors.corsWithOptions, authenticate.verifyUser , authenticate.verifyAdmin, roleValidation , roleCtrl.createOne )
	.put( cors.corsWithOptions, authenticate.verifyUser , authenticate.verifyAdmin, roleCtrl.methodNotallowed )
	.delete( cors.corsWithOptions, authenticate.verifyUser , authenticate.verifyAdmin, roleCtrl.deleteAll );


router.route( "/:RoleId" )
	.options( cors.corsWithOptions, ( req,res ) => { res.status( 200 ); } )

	.get( cors.cors , authenticate.verifyUser , authenticate.verifyAdmin, roleCtrl.getOne )
	.post( cors.corsWithOptions, authenticate.verifyUser , authenticate.verifyAdmin, roleCtrl.methodNotallowed )
	.put(  cors.corsWithOptions, authenticate.verifyUser , authenticate.verifyAdmin, roleValidation,roleCtrl.editOne  )
	.delete(  cors.corsWithOptions, authenticate.verifyUser , authenticate.verifyAdmin, roleCtrl.deleteOne );

module.exports = router;