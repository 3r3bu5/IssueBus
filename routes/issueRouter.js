/* eslint-disable no-unused-vars */
// Require 
const express = require( "express" );
const router = express.Router();

// require models

const Issue = require( "../models/issueModel" );

//app configuration
router.use( express.json() );
router.use( express.urlencoded( { extended: false } ) );



/*
@Route      >    METHOD /Issues
@Behavioure >    Return all issues / 
                 POST a new issue / 
                 Delete all issues
@Access     >    Registered User for listing issues /
                 Registered User to POST a new issues /
                 Admin to DELETE all issuess
*/
router.route( "/" )
	.get( ( req,res,next ) => {
		Issue.find()
			.then( ( Issues ) => {
				res.status( 200 );
				res.setHeader( "Content-Type","application/json" );
				res.json( { message: "This will return all Issues " , Issues: Issues } );
			} )
			.catch( ( err ) => next( err ) );
	} )
	.post( ( req,res,next ) => {
		Issue.create( req.body )
			.then( ( Issue ) => {
				res.status( 200 );
				res.setHeader( "Content-Type","application/json" );
				res.json( { message: "This will return the new created  Issue " , Issue: Issue } );
			} )
			.catch( ( err ) => next( err ) );
	} )
	.put( ( req,res,next ) => {
		res.status( 405 );
		res.json( { error: "PUT Method is not allowed on /Issues " } );
	} )
	.delete( ( req,res,next ) => {
		Issue.remove()
			.then( ( Issues ) => {
				res.status( 200 );
				res.setHeader( "Content-Type","application/json" );
				res.json( { message: "This will the DELETE ALL CURRENT Issues" , deletedIssuesInfo: Issues } );
			} )
			.catch( ( err ) => next( err ) );
	} );

/*
@Route      >    METHOD /Issues/:IssueId
@Behavioure >    Return a specific Issue /
                 Update a specific Issue /
                 Delete a specific Issue
@Access     >    Registered User for listing Issues /
                 Registered & assigned Users to edit the Issue /
                 Admin User to DELETE the Issue
*/
router.route( "/:IssueId" )
	.get( ( req,res,next ) => {
		Issue.findById( req.params.IssueId )
			.then( ( Issue ) => {
				if ( Issue != null ) {
					res.status( 200 );
					res.setHeader( "Content-Type","application/json" );
					res.json( { message: "This will return that specific Issue " , Issue: Issue } );
				}else {
					err = new Error( `Issue ID ${req.params.IssueId} does not exist! ` );
					err.statusCode = 404;
					return next( err );
				}
			} )
			.catch( ( err ) => next( err ) );
	} )
	.post( ( req,res,next ) => {
		res.status( 405 );
		res.json( { error: "POST Method is not allowed on /Issues/IssueId " } );
		
	} )
	.put( ( req,res,next ) => {
		Issue.findByIdAndUpdate( req.params.IssueId,
			{ $set : req.body } 
			, { new : true } )
			.then( ( Issue ) => {
				res.status( 200 );
				res.setHeader( "Content-Type","application/json" );
				res.json( { message: "This will return that specific Issue " , Issue: Issue } );
			} )
			.catch( ( err ) => next( err ) );
	} )
	.delete( ( req,res,next ) => {

		Issue.findByIdAndDelete( req.params.IssueId )
			.then( ( Issue ) => {

				res.status( 200 );
				res.setHeader( "Content-Type","application/json" );
				res.json( { message: `DELETE the Issue whose Id is ${req.params.IssueId} ` } );

		
			}, ( err ) => next( err ) 
			)
			.catch( ( err ) => next( err ) );
		
	} );

module.exports = router;