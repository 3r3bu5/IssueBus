const mongoose = require( "mongoose" );
const { v4: uuidv4 } = require( "uuid" );

// issueSchema

const { IssueSchema } = require( "./issueModel" );


const projectSchema = new mongoose.Schema( {
	_id: { type: String, default: uuidv4 },
	name: { type: String, required: true, index: true, unique:true },
	description: {
		type: String,
		required: true,
	},
	versions: [ {
		_id: { type: String, default: uuidv4 },
		number : {
			type: String,
			required: true,
		},
		issues: [ IssueSchema ],
		developers: [ {
			required: true,
			type: mongoose.Schema.Types.String,
			ref: "user",
		} ]
	} ]
} , { timestamps: true } );




const project = mongoose.model( "project", projectSchema );

module.exports = { project, projectSchema };
