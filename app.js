var createError = require( "http-errors" );
var express = require( "express" );
var path = require( "path" );
var cookieParser = require( "cookie-parser" );
var logger = require( "morgan" );
const config = require( "./config" );
const passport = require( "passport" );
const mongoose = require( "mongoose" );
const helmet = require( "helmet" );

// MongoDB connection 

mongoose.connect( config.DBUrl, { useNewUrlParser: true , useUnifiedTopology: true, useCreateIndex:true } )
	.then( console.log( "Connected to the DB server Successfully!" ) )
	.catch( ( err ) => console.log( err ) );
//

// Routers
var indexRouter = require( "./routes/index" );
const projectRouter = require( "./routes/projectRouter" );
const roleRouter = require( "./routes/roleRouter" );
const userRouter = require( "./routes/userRouter" );
const uploadRouter = require( "./routes/uploadRouter" );


var app = express();
app.use( helmet() );

// allow only https requests
app.all( "*", ( req, res, next ) => {
	if ( req.secure ) {
		return next();
	}
	else {
		res.redirect( 307, "https://" + req.hostname + ":" + app.get( "secPort" ) + req.url );
	}
} );


// view engine setup
app.set( "views", path.join( __dirname, "views" ) );
app.set( "view engine", "ejs" );

// express app configurations
app.use( logger( "dev" ) );
app.use( express.json() );
app.use( express.urlencoded( { extended: false } ) );
app.use( cookieParser() );
app.use( express.static( path.join( __dirname, "public" ) ) );
// passport initilaize
app.use( passport.initialize() );
app.use( passport.session() );
// Routes
app.use( "/", indexRouter );
app.use( "/users", userRouter );
app.use( "/projects", projectRouter );
app.use( "/roles", roleRouter );
app.use( "/uploads", uploadRouter );


// catch 404 and forward to error handler
app.use( function( req, res, next ) {
	next( createError( 404 ) );
} );

// error handler
// eslint-disable-next-line no-unused-vars
app.use( function( err, req, res, next ) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get( "env" ) === "development" ? err : {};

	// render the error page
	res.status( err.status || 500 );
	res.render( "error" );
} );

module.exports = app;
