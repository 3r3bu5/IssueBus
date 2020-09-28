const mongoose = require( "mongoose" );
const { v4: uuidv4 } = require( "uuid" );


const UserSchema = new mongoose.Schema( {
	_id: { type: String, default: uuidv4 },
	name: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	superuser:{
		type: Boolean,
		default: false
	},
	image:{
		type: String,
		default: "/public/default.png"
	},
	role: { 
		type: mongoose.Schema.Types.String,
		ref: "role"
	}
	

} , { timestamps: true } );




const User = mongoose.model( "user", UserSchema );

module.exports = User;

