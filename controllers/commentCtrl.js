/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const express = require( "express" );
const { project } = require( "../models/projectModel" );

exports.methodNotallowed = ( req,res, ) => {
	res.status( 405 );
	res.json( { error: ` ${req.method} Method is not allowed on ${req.baseUrl} ` } );
}; 

/*
@Route      >   METHOD /Issues/:IssueId/comments
@Behavioure >   Return a specific Issue's comments /
			 	Post a new comment on a specific Issue /
			 	Delete all comments on a specific Issue
@Access     >   Registered User for listing the comments /
			 	Registered Users to post a new  comment /
			 	Admin to DELETE all the comments
*/

exports.getAll = ( req,res,next ) => {
	project.findById( req.params.projectId )
		.populate( "versions.issues" )
		.populate( "versions.developers versions.issues.comments.author versions.issues.reporter versions.issues.resolvers " ,  " _id name email " )
		.then( ( project ) => {
			var version = project.versions.id( req.params.versionId );
			var issue = version.issues.id( req.params.issueId );
			if ( project != null && version != null & issue != null ) {

				res.status( 200 );
				res.setHeader( "Content-Type","application/json" );
				res.json( { message: "This will return all comments on a specific issues of a specific project version " , comments: issue.comments } );
                
			}
			else if( project == null ) {
				// eslint-disable-next-line no-undef
				err = new Error( ` project Id  ${req.params.projectId} has not found!` );
				// eslint-disable-next-line no-undef
				err.status= 404 ;
				return next( err );
			} else if( issue == null ) {
				// eslint-disable-next-line no-undef
				err = new Error( ` Issue Id  ${req.params.issueId} has not found!` );
				// eslint-disable-next-line no-undef
				err.status= 404 ;
				return next( err );
			}
			else {
				// eslint-disable-next-line no-undef
				err = new Error( ` version Id ${req.params.versionId} on project ${req.params.projectId} has not found!` );
				err.status= 404 ;
				// eslint-disable-next-line no-undef
				return next( err );
			}
		} )
		.catch( ( err ) => next( err ) );
};

exports.createOne = ( req,res,next ) => {
	project.findById( req.params.projectId )
		.populate( "versions.issues" )
		.populate( "versions.developers versions.issues.comments.author versions.issues.reporter versions.issues.resolvers " ,  " _id name email " )
		.then( ( project ) => {
			var version = project.versions.id( req.params.versionId );
			var issue = version.issues.id( req.params.issueId );
			if ( project != null && version != null & issue != null ) {
                
				req.body.author = req.user._id;

				issue.comments.push( req.body );

				project.save()
					.then( ( project ) => {
						res.status( 200 );
						res.setHeader( "Content-Type","application/json" );
						res.json( { message: "This will return a specific  issues of a specific project version " , comments:issue.comments } );
					} )			
					.catch( ( err ) => next( err ) );
    
                
			}
			else if( project == null ) {
				// eslint-disable-next-line no-undef
				err = new Error( ` project Id  ${req.params.projectId} has not found!` );
				// eslint-disable-next-line no-undef
				err.status= 404 ;
				return next( err );
			} else if( issue == null ) {
				// eslint-disable-next-line no-undef
				err = new Error( ` Issue Id  ${req.params.issueId} has not found!` );
				// eslint-disable-next-line no-undef
				err.status= 404 ;
				return next( err );
			}
			else {
				// eslint-disable-next-line no-undef
				err = new Error( ` version Id ${req.params.versionId} on project ${req.params.projectId} has not found!` );
				err.status= 404 ;
				// eslint-disable-next-line no-undef
				return next( err );
			}
		} )
		.catch( ( err ) => next( err ) );


}; 

exports.deleteAll = ( req,res,next ) => {

	project.findById( req.params.projectId )
		.then( ( project ) => {
			var version = project.versions.id( req.params.versionId );
			var issue = version.issues.id( req.params.issueId );
			if ( project != null && version != null & issue != null ) {
            
				issue.comments = [];

				project.save()
					.then( ( project ) => {
						res.status( 200 );
						res.setHeader( "Content-Type","application/json" );
						res.json( { message: "This will deleta all comments on a specific issue of a specific project version " , comments: issue.comments } );
					} )			
					.catch( ( err ) => next( err ) );
    
                
			}
			else if( project == null ) {
				// eslint-disable-next-line no-undef
				err = new Error( ` project Id  ${req.params.projectId} has not found!` );
				// eslint-disable-next-line no-undef
				err.status= 404 ;
				return next( err );
			} else if( issue == null ) {
				// eslint-disable-next-line no-undef
				err = new Error( ` Issue Id  ${req.params.issueId} has not found!` );
				// eslint-disable-next-line no-undef
				err.status= 404 ;
				return next( err );
			}
			else {
				// eslint-disable-next-line no-undef
				err = new Error( ` version Id ${req.params.versionId} on project ${req.params.projectId} has not found!` );
				err.status= 404 ;
				// eslint-disable-next-line no-undef
				return next( err );
			}
		} )
		.catch( ( err ) => next( err ) );


}; 

/*
@Route      >    METHOD /Issues/:IssueId/comments/:commentId
@Behavioure >    Return a specific Issue's comment /
			 	 Edit a comment on a specific Issue /
			 	 Delete a comments on a specific Issue
@Access     >    Registered User for listing the comments /
				 Registered Users & Owner User to edit the comment /
				 Registered Users & Owner User to DELETE  the comment
*/

exports.getOne = ( req,res,next ) => {

	project.findById( req.params.projectId )
		.populate( "versions.issues" )
		.populate( "versions.developers versions.issues.comments.author versions.issues.reporter versions.issues.resolvers " ,  " _id name email " )
		.then( ( project ) => {
			var version = project.versions.id( req.params.versionId );
			var issue = version.issues.id( req.params.issueId );
			var comment = issue.comments.id( req.params.commentId );
			if ( project != null && version != null & issue != null & comment != null ) {

				res.status( 200 );
				res.setHeader( "Content-Type","application/json" );
				res.json( { message: "This will return all comments on a specific issues of a specific project version " , comment } );
                
			}
			else if( project == null ) {
				// eslint-disable-next-line no-undef
				err = new Error( ` project Id  ${req.params.projectId} has not found!` );
				// eslint-disable-next-line no-undef
				err.status= 404 ;
				return next( err );
                
			}
			else if( comment == null ) {
				// eslint-disable-next-line no-undef
				err = new Error( ` comment Id  ${req.params.commentId} has not found!` );
				// eslint-disable-next-line no-undef
				err.status= 404 ;
				return next( err );
			}
			else if( issue == null ) {
				// eslint-disable-next-line no-undef
				err = new Error( ` Issue Id  ${req.params.issueId} has not found!` );
				// eslint-disable-next-line no-undef
				err.status= 404 ;
				return next( err );
			}
			else {
				// eslint-disable-next-line no-undef
				err = new Error( ` version Id ${req.params.versionId} on project ${req.params.projectId} has not found!` );
				err.status= 404 ;
				// eslint-disable-next-line no-undef
				return next( err );
			}
		} )
		.catch( ( err ) => next( err ) );
};

exports.editOne = ( req,res,next ) => {
		
	project.findById( req.params.projectId )
		.then( ( project ) => {
			var version = project.versions.id( req.params.versionId );
			var issue = version.issues.id( req.params.issueId );
			var comment = issue.comments.id( req.params.commentId );
			if ( comment.author.toString() == req.user._id.toString() ) {

				if ( project != null && version != null & issue != null & comment != null ) {

					if ( req.body.comment ){
						comment.comment = req.body.comment;
					}
					if ( req.body.attachments ){
						comment.attachments = req.body.attachments;
					}
					project.save()
						.then( ( project ) => {
							res.status( 200 );
							res.setHeader( "Content-Type","application/json" );
							res.json( { message: "This will return all comments on a specific issues of a specific project version " , comment } );
						} )
						.catch( ( err ) => next( err ) );			
                    
				}
				else if( project == null ) {
					// eslint-disable-next-line no-undef
					err = new Error( ` project Id  ${req.params.projectId} has not found!` );
					// eslint-disable-next-line no-undef
					err.status= 404 ;
					return next( err );
                    
				}
				else if( comment == null ) {
					// eslint-disable-next-line no-undef
					err = new Error( ` comment Id  ${req.params.commentId} has not found!` );
					// eslint-disable-next-line no-undef
					err.status= 404 ;
					return next( err );
				}
				else if( issue == null ) {
					// eslint-disable-next-line no-undef
					err = new Error( ` Issue Id  ${req.params.issueId} has not found!` );
					// eslint-disable-next-line no-undef
					err.status= 404 ;
					return next( err );
				}
				else {
					// eslint-disable-next-line no-undef
					err = new Error( ` version Id ${req.params.versionId} on project ${req.params.projectId} has not found!` );
					err.status= 404 ;
					// eslint-disable-next-line no-undef
					return next( err );
				}

			} else {
				err = new Error( " You are not allowed to perform this operation " );
				err.status= 404 ;
				// eslint-disable-next-line no-undef
				return next( err );
			}
		} )
		.catch( ( err ) => next( err ) );
}; 

exports.deleteOne = ( req,res,next ) => {

	project.findById( req.params.projectId )
		.then( ( project ) => {
			var version = project.versions.id( req.params.versionId );
			var issue = version.issues.id( req.params.issueId );
			var comment = issue.comments.id( req.params.commentId );
			if ( comment.author.toString() == req.user._id.toString() ) {
				if ( project != null && version != null & issue != null & comment != null ) {

					comment.remove();
					project.save()
						.then( ( project ) => {
							res.status( 200 );
							res.setHeader( "Content-Type","application/json" );
							res.json( { message: "This will return all comments on a specific issues of a specific project version " , comment } );
						} )
						.catch( ( err ) => next( err ) );			
                
				}
				else if( project == null ) {
					// eslint-disable-next-line no-undef
					err = new Error( ` project Id  ${req.params.projectId} has not found!` );
					// eslint-disable-next-line no-undef
					err.status= 404 ;
					return next( err );
                
				}
				else if( comment == null ) {
					// eslint-disable-next-line no-undef
					err = new Error( ` comment Id  ${req.params.commentId} has not found!` );
					// eslint-disable-next-line no-undef
					err.status= 404 ;
					return next( err );
				}
				else if( issue == null ) {
					// eslint-disable-next-line no-undef
					err = new Error( ` Issue Id  ${req.params.issueId} has not found!` );
					// eslint-disable-next-line no-undef
					err.status= 404 ;
					return next( err );
				}
				else {
					// eslint-disable-next-line no-undef
					err = new Error( ` version Id ${req.params.versionId} on project ${req.params.projectId} has not found!` );
					err.status= 404 ;
					// eslint-disable-next-line no-undef
					return next( err );
				}
			} else{
				err = new Error( " You are not allowed to perform this operation " );
				err.status= 404 ;
				// eslint-disable-next-line no-undef
				return next( err );
			}
            
		} )
		.catch( ( err ) => next( err ) );

}; 