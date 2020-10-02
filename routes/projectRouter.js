/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// Reequire 
const express = require( "express" );
const router = express.Router();
const authenticate = require( "../middlewares/authenticate" );
const cors = require( "../middlewares/cors" );
const { 
	projectValidation,
	verValidation,
	issueValidation, 
	commentValidation } = require( "../middlewares/validation" );

// require models
const { project } = require( "../models/projectModel" );

// controllers
const projectCtrl = require( "../controllers/projectCtrl" );
const verCtrl = require( "../controllers/verCtrl" );
const issueCtrl = require( "../controllers/issueCtrl" );
const commentCtrl = require( "../controllers/commentCtrl" );


//app configuration
router.use( express.json() );
router.use( express.urlencoded( { extended: false } ) );


// projectRouter

router.route( "/" )
	.options( cors.corsWithOptions, ( req,res ) => { res.status( 200 ); } )
	.get( cors.cors , authenticate.verifyUser , projectCtrl.getAll )
	.post(  cors.corsWithOptions, authenticate.verifyUser , authenticate.verifyAdmin, projectValidation, projectCtrl.createOne )
	.put( cors.corsWithOptions, authenticate.verifyUser , authenticate.verifyAdmin, projectCtrl.methodNotallowed )
	.delete(  cors.corsWithOptions, authenticate.verifyUser , authenticate.verifyAdmin, projectCtrl.deleteAll );

router.route( "/:projectId" )
	.options( cors.corsWithOptions, ( req,res ) => { res.status( 200 ); } )
	.get( cors.cors , authenticate.verifyUser , projectCtrl.getOne )
	.post(   cors.corsWithOptions, authenticate.verifyUser , authenticate.verifyAdmin, projectCtrl.methodNotallowed )
	.put(  cors.corsWithOptions, authenticate.verifyUser , authenticate.verifyAdmin, projectValidation , projectCtrl.updateOne )
	.delete(  cors.corsWithOptions,  authenticate.verifyUser , authenticate.verifyAdmin, projectCtrl.deleteOne  );

// versionRouter

router.route( "/:projectId/ver" )
	.options( cors.corsWithOptions, ( req,res ) => { res.status( 200 ); } )
	.get( cors.cors , authenticate.verifyUser , verCtrl.getAll )
	.post(  cors.corsWithOptions, authenticate.verifyUser , authenticate.verifyAdmin, verValidation , verCtrl.createOne  )
	.put(  cors.corsWithOptions, authenticate.verifyUser , authenticate.verifyAdmin, verCtrl.methodNotallowed )
	.delete(  cors.corsWithOptions, authenticate.verifyUser , authenticate.verifyAdmin, verCtrl.deleteAll );

router.route( "/:projectId/ver/:versionId" )
	.options( cors.corsWithOptions, ( req,res ) => { res.status( 200 ); } )
	.get( cors.cors , authenticate.verifyUser , verCtrl.getOne  )
	.post(  cors.corsWithOptions, authenticate.verifyUser , authenticate.verifyAdmin, verCtrl.methodNotallowed )
	.put(  cors.corsWithOptions,  authenticate.verifyUser , authenticate.verifyAdmin, verValidation , verCtrl.editOne )
	.delete(  cors.corsWithOptions, authenticate.verifyUser , authenticate.verifyAdmin, verCtrl.deleteOne );

// issueRouter
router.route( "/:projectId/ver/:versionId/issues" )
	.options( cors.corsWithOptions, ( req,res ) => { res.status( 200 ); } )
	.get( cors.cors , authenticate.verifyUser , issueCtrl.getAll )
	.post( cors.corsWithOptions, authenticate.verifyUser , issueValidation, issueCtrl.createOne )
	.put(  cors.corsWithOptions, authenticate.verifyUser , authenticate.verifyAdmin, issueCtrl.methodNotallowed )
	.delete(  cors.corsWithOptions, authenticate.verifyUser , authenticate.verifyAdmin, issueCtrl.deleteAll  );


router.route( "/:projectId/ver/:versionId/issues/:issueId" )
	.options( cors.corsWithOptions, ( req,res ) => { res.status( 200 ); } )
	.get( cors.cors , authenticate.verifyUser , issueCtrl.getOne )
	.post(  cors.corsWithOptions, authenticate.verifyUser , authenticate.verifyAdmin, issueCtrl.methodNotallowed )
	.put(  cors.corsWithOptions, authenticate.verifyUser , issueValidation, issueCtrl.editOne )
	.delete(  cors.corsWithOptions, authenticate.verifyUser , authenticate.verifyAdmin, issueCtrl.deleteOne );

// commentRouter

router.route( "/:projectId/ver/:versionId/issues/:issueId/comments" )
	.options( cors.corsWithOptions, ( req,res ) => { res.status( 200 ); } )
	.get( cors.cors , authenticate.verifyUser , commentCtrl.getAll )
	.post(  cors.corsWithOptions, authenticate.verifyUser , commentValidation, commentCtrl.createOne )
	.put(  cors.corsWithOptions, authenticate.verifyUser , commentCtrl.methodNotallowed )
	.delete( cors.corsWithOptions, authenticate.verifyUser ,authenticate.verifyAdmin , commentCtrl.deleteAll );

router.route( "/:projectId/ver/:versionId/issues/:issueId/comments/:commentId" )
	.options( cors.corsWithOptions, ( req,res ) => { res.status( 200 ); } )
	.get( cors.cors , authenticate.verifyUser , commentCtrl.getOne )
	.post(  cors.corsWithOptions, authenticate.verifyUser, commentCtrl.methodNotallowed )
	.put( cors.corsWithOptions, authenticate.verifyUser , commentValidation , commentCtrl.editOne )
	.delete(  cors.corsWithOptions, authenticate.verifyUser , commentCtrl.deleteOne );


module.exports = router;