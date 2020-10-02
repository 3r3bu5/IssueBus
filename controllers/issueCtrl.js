/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const express = require( "express" );
const { project } = require( "../models/projectModel" );


/*
@Route      >    METHOD /projects/:projectId/ver/:versionId/Issues
@Behavioure >    Return all issues / 
                 POST a new issue / 
                 Delete all issues
@Access     >    Registered User for listing issues /
                 Registered User to POST a new issues /
                 Admin to DELETE all issuess
*/

exports.getAll = ( req,res,next ) => {
	project.findById( req.params.projectId )
		.populate( "versions.issues" )
		.populate( "versions.developers versions.issues.comments.author versions.issues.reporter versions.issues.resolvers " ,  " _id name email " )
		.then( ( project ) => {
			var version = project.versions.id( req.params.versionId );
			if ( project != null && version != null ) {
				res.status( 200 );
				res.setHeader( "Content-Type","application/json" );
				res.json( { message: "This will return all issues of a specific project version " , issues: version.issues } );
			}
			else if( project == null ) {
				// eslint-disable-next-line no-undef
				err = new Error( ` project Id  ${req.params.projectId} has not found!` );
				// eslint-disable-next-line no-undef
				err.status= 404 ;
				return next( err );
			} else {
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
		.then( ( project ) => {
			var version = project.versions.id( req.params.versionId );
			if ( project != null && version != null ) {
				req.body.reporter = req.user._id;
				if ( req.user.superuser == false ){
					req.body.resolvers = [];
				}
				version.issues.push( req.body );
				project.save()
					.then( ( project ) => {
						res.status( 200 );
						res.setHeader( "Content-Type","application/json" );
						res.json( { message: "This will create a new issues for a specific project version " , issues: version.issues } );
					} )
					.catch( ( err ) => next( err ) );
                
			}
			else if( project == null ) {
				// eslint-disable-next-line no-undef
				err = new Error( ` project Id  ${req.params.projectId} has not found!` );
				// eslint-disable-next-line no-undef
				err.status= 404 ;
				return next( err );
			} else {
				// eslint-disable-next-line no-undef
				err = new Error( ` version Id ${req.params.versionId} on project ${req.params.projectId} has not found!` );
				err.status= 404 ;
				// eslint-disable-next-line no-undef
				return next( err );
			}
		} )
		.catch( ( err ) => next( err ) );
};

exports.methodNotallowed = ( req,res, ) => {
	res.status( 405 );
	res.json( { error: ` ${req.method} Method is not allowed on ${req.baseUrl} ` } );
}; 

exports.deleteAll = ( req,res,next ) => {
	project.findById( req.params.projectId )
		.then( ( project ) => {
			var version = project.versions.id( req.params.versionId );
			if ( project != null && version != null ) {
				version.issues = [];
				project.save()
					.then( ( project ) => {
						res.status( 200 );
						res.setHeader( "Content-Type","application/json" );
						res.json( { message: "This will deletea all  issues for a specific project version " , issues: version.issues } );
					} )
					.catch( ( err ) => next( err ) );
                
			}
			else if( project == null ) {
				// eslint-disable-next-line no-undef
				err = new Error( ` project Id  ${req.params.projectId} has not found!` );
				// eslint-disable-next-line no-undef
				err.status= 404 ;
				return next( err );
			} else {
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
@Route      >   METHOD  /:projectId/ver/:versionId/issues/:issueId
@Behavioure >   Return a specific Issue /
				Update a specific Issue /
			 	Delete a specific Issue
@Access     >   Registered User for listing Issues /
			 	Registered & assigned Users to edit the Issue /
			 	Admin User to DELETE the Issue
*/

exports.getOne = ( req,res,next ) => {
	project.findById( req.params.projectId )
		.populate( "versions.issues" )
		.populate( "versions.developers versions.issues.comments.author versions.issues.reporter versions.issues.resolvers " ,  " _id name email " )
		.then( ( project ) => {
			var version = project.versions.id( req.params.versionId );
			var issue = version.issues.id( req.params.issueId );
			if ( project != null && version != null & issue != null ) {

				res.status( 200 );
				res.setHeader( "Content-Type","application/json" );
				res.json( { message: "This will return a specific  issues of a specific project version " , issue } );
                
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

exports.editOne = ( req,res,next ) => {

	project.findById( req.params.projectId )
		.then( ( project ) => {
			var version = project.versions.id( req.params.versionId );
			var issue = version.issues.id( req.params.issueId );
        
			if ( project != null && version != null & issue != null ) {
            
				if ( req.body.name ) {
					issue.name = req.body.name;
				}
				if ( req.body.description ) {
					issue.description = req.body.description;
				}
				if ( req.body.summary ) {
					issue.summary = req.body.summary;
				}
				if ( req.body.issue_type ) {
					issue.issue_type = req.body.issue_type;
				}
				if ( req.body.issue_severity ) {
					issue.issue_severity = req.body.issue_severity;
				}
				if ( req.body.issue_status ) {
					issue.issue_status = req.body.issue_status;
				}
				if ( req.body.issue_priority ) {
					issue.issue_priority = req.body.issue_priority;
				}
				if ( req.body.attachments ) {
					issue.attachments = req.body.attachments;
				}
				if ( req.user.superuser  && req.body.resolvers ){
					issue.resolvers = req.body.resolvers  ;
				}
				project.save()
					.then( ( project ) => {
						res.status( 200 );
						res.setHeader( "Content-Type","application/json" );
						res.json( { message: "This will return a specific  issues of a specific project version " , issue } );
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

exports.deleteOne = ( req,res,next ) => {

	project.findById( req.params.projectId )
		.then( ( project ) => {
			var version = project.versions.id( req.params.versionId );
			var issue = version.issues.id( req.params.issueId );
			if ( project != null && version != null & issue != null ) {
            
				issue.remove();	
				project.save()
					.then( ( project ) => {
						res.status( 200 );
						res.setHeader( "Content-Type","application/json" );
						res.json( { message: "This will remove a specific  issues of a specific project version " , issue } );
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