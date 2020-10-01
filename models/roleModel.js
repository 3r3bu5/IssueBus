const mongoose = require( "mongoose" );
const { v4: uuidv4 } = require( "uuid" );


const RoleSchema = new mongoose.Schema( {
	_id: { type: String, default: uuidv4 },
	name: {
		type: String,
		required: true,
		unique: true
	},
	description: {
		type: String,
		required: true,
		unique: true
	},
	abbr: {
		type: String,
		unique: true
	},
	
} , { timestamps: true } );




const Role = mongoose.model( "role", RoleSchema );

module.exports = Role;
