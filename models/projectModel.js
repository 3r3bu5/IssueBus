const mongoose = require( "mongoose" );
const { v4: uuidv4 } = require( "uuid" );



const projectSchema = new mongoose.Schema( {
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
	version: [ {
		_id: { type: String, default: uuidv4() },
		number : {
			type: String,
			required: true,
			unique: true
		},
		issues: [ {
			type: String,
			unique: true
		} ],
	} ]
} , { timestamps: true } );




const project = mongoose.model( "project", projectSchema );

module.exports = project;
