const Joi = require( "joi" );

function roleSchema( req, res, next ) {

	var schema;

	if( req.method === "PUT" ) {
		schema = Joi.object( {

			name: Joi.string()
				.alphanum()
				.min( 6 )
				.max( 30 ),
	
			description: Joi.string()
				.min( 15 )
				.max( 500 ),
	
			abbr: Joi.string()
				.min( 3 )
				.max( 9 )
	
		} );

	} else {
		schema = Joi.object( {

			name: Joi.string()
				.alphanum()
				.min( 6 )
				.max( 30 )
				.required(),
	
			description: Joi.string()
				.min( 15 )
				.max( 500 )
				.required(),
	
			abbr: Joi.string()
				.min( 3 )
				.max( 9 )
				.required(),
	
		} );
	}


	// schema options
	const options = {
		abortEarly: false, // include all errors
		allowUnknown: true, // ignore unknown props
		stripUnknown: true // remove unknown props
	};

	// validate request body against schema
	const { error, value } = schema.validate( req.body, options );
    
	if ( error ) {
		// on fail return comma separated errors
		return next( error );
	} else {
		console.log( value );
		req.body = value;
		next();
	}
}

function userSchema( req, res, next ) {

	var schema;

	if( req.method === "PUT" ) {
		schema = Joi.object( {

			name: Joi.string()
				.min( 3 )
				.max( 30 ),
			password: Joi.string()
				.pattern( new RegExp( "^[a-zA-Z0-9]{3,30}$" ) )
				.min( 6 )
				.max( 255 ),   
			image: Joi.string()
				.alphanum(),
			role : Joi.string(),
			email: Joi.string()
				.email()
		} );

	} else {

		schema = Joi.object( {

			name: Joi.string()
				.min( 3 )
				.max( 30 )
				.required(),       
			password: Joi.string()
				.pattern( new RegExp( "^[a-zA-Z0-9]{3,30}$" ) )
				.required()
				.min( 6 )
				.max( 255 ),   
			image: Joi.string()
				.alphanum(),
			role : Joi.string()
				.required(),
			email: Joi.string()
				.email()
				.required()
		} );
	}
	// schema options
	const options = {
		abortEarly: false, // include all errors
		allowUnknown: true, // ignore unknown props
		stripUnknown: true // remove unknown props
	};

	// validate request body against schema
	const { error, value } = schema.validate( req.body, options );
    
	if ( error ) {
		// on fail return comma separated errors
		return next( error );
	} else {
		// on success replace req.body with validated value and trigger next middleware function
		req.body = value;
		next();
	}
}

function porjectSchema( req, res, next ) {

	var schema;

	if( req.method === "PUT" ) {

		schema = Joi.object( {

			name: Joi.string()
				.min( 6 )
				.max( 30 ),
	
			description: Joi.string()
				.min( 15 )
				.max( 500 ),
	
			versions: Joi.array()
				.items( Joi.object( {
					number: Joi.number().required(),
					developers: Joi.array()
						.items( Joi.string().required() )
				} )
				)
		} );
		
	} else {
		schema = Joi.object( {

			name: Joi.string()
				.min( 6 )
				.max( 30 )
				.required(),
	
			description: Joi.string()
				.min( 15 )
				.max( 500 )
				.required(),
	
			versions: Joi.array()
				.required()
				.items( Joi.object( {
					number: Joi.number().required(),
					developers: Joi.array()
						.items( Joi.string().required() )
						.required()
				} ).required()
				)
		} );
	}
	

	// schema options
	const options = {
		abortEarly: false, // include all errors
		allowUnknown: true, // ignore unknown props
		stripUnknown: true // remove unknown props
	};

	// validate request body against schema
	const { error, value } = schema.validate( req.body, options );
    
	if ( error ) {
		// on fail return comma separated errors
		return next( error );
	} else {
		// on success replace req.body with validated value and trigger next middleware function
		req.body = value;
		next();
	}
}

function verSchema( req, res, next ) {

	var schema;

	if( req.method === "PUT" ) {

		schema = Joi.object( {

			number: Joi.string(),

			developers: Joi.array()
				.items( Joi.string().required() )
			
		} );
		
	} 
		
	else {

		schema = Joi.object( {

			number: Joi.string().required(),
			developers: Joi.array()
				.items( Joi.string().required() )
				.required()
			
		} );
	}
	

	// schema options
	const options = {
		abortEarly: false, // include all errors
		allowUnknown: true, // ignore unknown props
		stripUnknown: true // remove unknown props
	};

	// validate request body against schema
	const { error, value } = schema.validate( req.body, options );
    
	if ( error ) {
		// on fail return comma separated errors
		return next( error );
	} else {
		// on success replace req.body with validated value and trigger next middleware function
		req.body = value;
		next();
	}
}



function commentSchema( req, res, next ) {
	
	const schema = Joi.object( {
		comment: Joi.string().required().min( 5 ).max( 1024 ),
		attachments: Joi.array().items( Joi.object( {
			title: Joi.string().required().min( 5 ).max( 255 ),
			url: Joi.string().required()
		} ).required()
		)
	} );


	// schema options
	const options = {
		abortEarly: false, // include all errors
		allowUnknown: true, // ignore unknown props
		stripUnknown: true // remove unknown props
	};

	// validate request body against schema
	const { error, value } = schema.validate( req.body, options );
    
	if ( error ) {
		// on fail return comma separated errors
		return next( error );
	} else {
		// on success replace req.body with validated value and trigger next middleware function
		req.body = value;
		next();
	}
}

function issueSchema( req, res, next ) {

	var schema;

	if( req.method === "PUT" ) {

		schema = Joi.object( {

			name: Joi.string()
				.min( 6 )
				.max( 30 ),
	
			description: Joi.string()
				.min( 15 ),
		
			summary: Joi.string()
				.min( 5 )
				.max( 150 ),
			
			issue_type: Joi.number()
				.min( 1 )
				.max( 4 ),
	
			issue_severity: Joi.number()
				.min( 1 )
				.max( 5 ),
			issue_status: Joi.number()
				.min( 1 )
				.max( 9 ),
			issue_priority: Joi.number()
				.min( 1 )
				.max( 5 ),
			reporter: Joi.string(),		
			attachments: Joi.array().items( Joi.object( {
				title: Joi.string().required().min( 5 ).max( 255 ),
				url: Joi.string().required()
			} ).required()
			)
		} );
	}


	else {
		schema = Joi.object( {

			name: Joi.string()
				.min( 6 )
				.max( 30 )
				.required(),
	
			description: Joi.string()
				.min( 15 )
				.required(),
		
			summary: Joi.string()
				.min( 5 )
				.max( 150 )
				.required(),
			
			issue_type: Joi.number()
				.min( 1 )
				.max( 4 )
				.required(),
	
			issue_severity: Joi.number()
				.min( 1 )
				.max( 5 )
				.required(),
			issue_status: Joi.number()
				.min( 1 )
				.max( 9 )
				.required(),
			issue_priority: Joi.number()
				.min( 1 )
				.max( 5 )
				.required(),
			reporter: Joi.string(),		
			attachments: Joi.array().items( Joi.object( {
				title: Joi.string().required().min( 5 ).max( 255 ),
				url: Joi.string().required()
			} ).required()
			)
		} );
	} 


	// schema options
	const options = {
		abortEarly: false, // include all errors
		allowUnknown: true, // ignore unknown props
		stripUnknown: true // remove unknown props
	};

	// validate request body against schema
	const { error, value } = schema.validate( req.body, options );
    
	if ( error ) {
		// on fail return comma separated errors
		return next( error );
	} else {
		// on success replace req.body with validated value and trigger next middleware function
		req.body = value;
		next();
	}
}


module.exports = {

	roleValidation: 	  roleSchema,
	userValidation:		  userSchema,
	projectValidation:    porjectSchema,
	verValidation: 		  verSchema,
	commentValidation:    commentSchema,
	issueValidation:	  issueSchema
};