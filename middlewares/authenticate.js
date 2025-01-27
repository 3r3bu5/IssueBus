/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
const express =  require( "express" );
const User = require( "../models/userModel" );
const passport = require( "passport" );
const LocalStrategy = require( "passport-local" ).Strategy;
const JwtStrategy = require( "passport-jwt" ).Strategy;
const ExtractJwt = require( "passport-jwt" ).ExtractJwt;
const config = require( "../config" );
var jwt = require( "jsonwebtoken" );

passport.use( new LocalStrategy( {  usernameField: "email" } , User.authenticate() ) ); 
passport.serializeUser( User.serializeUser() );
passport.deserializeUser( User.deserializeUser() );

exports.getToken = function( user ) {
	return jwt.sign( user, config.JWTsecret,
		{ expiresIn: 36000 } );
};

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.JWTsecret ;
exports.JWTpassport = passport.use( new JwtStrategy( opts, function( jwt_payload, done ) {
	User.findOne( { _id: jwt_payload._id }, function( err, user ) {
		if ( err ) {
			return done( err, false );
		}
		if ( user ) {
			return done( null, user );
		} else {
			return done( null, false );
		}
	} );
} ) );

exports.verifyUser = passport.authenticate( "jwt", { session: false } );

exports.verifyAdmin = function( req,res,next ){

	if ( req.user.superuser === true ) {
		next();
	}
	else{
		res.status( 401 );
		err = new Error( "You are not authorized to perform this operation!" );
		return next( err );
	}

};