/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// Require 
const express = require( "express" );
const router = express.Router();

// require models

const { Issue } = require( "../models/issueModel" );

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
		Issue.find( {} )
			.populate( "resolvers  reporter comments.author" ,  " _id name email " )
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
			.populate( "resolvers  reporter comments.author" ,  " _id name email " )
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

/*
@Route      >    METHOD /Issues/:IssueId/comments
@Behavioure >    Return a specific Issue's comments /
                 Post a new comment on a specific Issue /
                 Delete all comments on a specific Issue
@Access     >    Registered User for listing the comments /
                 Registered Users to post a new  comment /
                 Admin to DELETE all the comments
*/
router.route( "/:IssueId/comments" )
	.get( ( req,res,next ) => {
		Issue.findById( req.params.IssueId )
			.populate( "comments.author" ,  " _id name email " )
			.then( ( Issue ) => {
				if ( Issue != null ) {
					res.status( 200 );
					res.setHeader( "Content-Type","application/json" );
					res.json( { message: "This will return a specific Issue's comments " , comments :Issue.comments } );
				}else {
					err = new Error( `Issue ID ${req.params.IssueId} does not exist! ` );
					err.statusCode = 404;
					return next( err );
				}
			} )
			.catch( ( err ) => next( err ) );
	} )
	.post( ( req,res,next ) => {
		Issue.findById( req.params.IssueId )
			.then( ( Issue ) => {
				if ( Issue != null ) {
					Issue.comments.push( req.body );
					Issue.save()
						.then( ( Issue ) => {
							res.status( 200 );
							res.setHeader( "Content-Type","application/json" );
							res.json( { message: "This will create a new comment on a specific Issue " , comments :Issue.comments } );
						} )
						.catch( ( err ) => next( err ) );

				}else {
					err = new Error( `Issue ID ${req.params.IssueId} does not exist! ` );
					err.statusCode = 404;
					return next( err );
				}
			} )
			.catch( ( err ) => next( err ) );
		
		
	} )
	.put( ( req,res,next ) => {
		res.status( 405 );
		res.json( { error: "POST Method is not allowed on /Issues/:IssueId/comments " } );

		// Issue.findByIdAndUpdate( req.params.IssueId,
		// 	{ $set : req.body } 
		// 	, { new : true } )
		// 	.then( ( Issue ) => {
		// 		res.status( 200 );
		// 		res.setHeader( "Content-Type","application/json" );
		// 		res.json( { message: "This will return that specific Issue " , Issue: Issue } );
		// 	} )
		// 	.catch( ( err ) => next( err ) );
	} )
	.delete( ( req,res,next ) => {

		Issue.findById( req.params.IssueId )
			.then( ( Issue ) => {
				if ( Issue != null ) {
					Issue.comments = [];
					Issue.save()
						.then( ( Issue ) => {
							res.status( 200 );
							res.setHeader( "Content-Type","application/json" );
							res.json( { message: " [DANGER] This will delete all comments on a specific Issue " , Issue } );
						} )
						.catch( ( err ) => next( err ) );

				}else {
					err = new Error( `Issue ID ${req.params.IssueId} does not exist! ` );
					err.statusCode = 404;
					return next( err );
				}
			} )
			.catch( ( err ) => next( err ) );
		
	} );

/*
@Route      >    METHOD /Issues/:IssueId/comments/:commentId
@Behavioure >    Return a specific Issue's comment /
                 Edit a comment on a specific Issue /
                 Delete a comments on a specific Issue
@Access     >    Registered User for listing the comments /
                 Registered Users & Owner User to edit the comment /
                 Registered Users & Owner User to DELETE  the comment
*/
router.route( "/:IssueId/comments/:commentID" )
	.get( ( req,res,next ) => {
		Issue.findById( req.params.IssueId )
			.populate( "comments.author" ,  " _id name email " )

			.then( ( Issue ) => {
				var comment = Issue.comments.id( req.params.commentID );

				if( Issue != null && comment != null ){ 
					res.status( 200 );
					res.setHeader( "Content-Type","application/json" );
					res.json( comment );
				} else if( Issue == null ) {
					// eslint-disable-next-line no-undef
					err = new Error( ` Issue Id  ${req.params.id} has not found!` );
					// eslint-disable-next-line no-undef
					err.status= 404 ;
					return next( err );
				} else {
					// eslint-disable-next-line no-undef
					err = new Error( ` comment Id ${req.params.commentID} on Issue ${req.params.IssueId} has not found!` );
					err.status= 404 ;
					// eslint-disable-next-line no-undef
					return next( err );
				}
		
			}, ( err ) => next( err ) 
			)
			.catch( ( err ) => next( err ) );
	} )
	.post( ( req,res,next ) => {
		res.status( 405 );
		res.json( { error: "POST Method is not allowed on /Issues/:IssueId/comments " } );
	} )
	.put( ( req,res,next ) => {
		
		Issue.findById( req.params.IssueId )
			.then( ( Issue ) => {
				var comment = Issue.comments.id( req.params.commentID );

				if( Issue != null && comment != null ){ 

					if ( req.body.comment ){
						comment.comment = req.body.comment;
					}
					if ( req.body.attachments ){
						comment.attachments = req.body.attachments;
					}

					Issue.save()
						.then( ( Issue ) => {
							res.status( 200 );
							res.setHeader( "Content-Type","application/json" );
							res.json( comment );
						} ) 
						.catch( ( err ) => next( err ) );


				} else if( Issue == null ) {
				// eslint-disable-next-line no-undef
					err = new Error( ` Issue Id  ${req.params.id} has not found!` );
					// eslint-disable-next-line no-undef
					err.status= 404 ;
					return next( err );
				} else {
				// eslint-disable-next-line no-undef
					err = new Error( ` comment Id ${req.params.commentID} on Issue ${req.params.IssueId} has not found!` );
					err.status= 404 ;
					// eslint-disable-next-line no-undef
					return next( err );
				}
	
			}, ( err ) => next( err ) 
			)
			.catch( ( err ) => next( err ) );
	} )
	.delete( ( req,res,next ) => {

		Issue.findById( req.params.IssueId )
			.then( ( Issue ) => {
				var comment = Issue.comments.id( req.params.commentID );

				if( Issue != null && comment != null ){ 

					comment.remove();
					Issue.save()
						.then( ( Issue ) => {
							res.status( 200 );
							res.setHeader( "Content-Type","application/json" );
							res.json( comment );
						} ) 
						.catch( ( err ) => next( err ) );


				} else if( Issue == null ) {
				// eslint-disable-next-line no-undef
					err = new Error( ` Issue Id  ${req.params.id} has not found!` );
					// eslint-disable-next-line no-undef
					err.status= 404 ;
					return next( err );
				} else {
				// eslint-disable-next-line no-undef
					err = new Error( ` comment Id ${req.params.commentID} on Issue ${req.params.IssueId} has not found!` );
					err.status= 404 ;
					// eslint-disable-next-line no-undef
					return next( err );
				}
	
			}, ( err ) => next( err ) 
			)
			.catch( ( err ) => next( err ) );
		
	} );



module.exports = router;