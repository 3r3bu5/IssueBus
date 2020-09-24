const mongoose = require( "mongoose" );
const { v4: uuidv4 } = require( "uuid" );



const IssueSchema = new mongoose.Schema( {
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
	summary: {
		type: String,
		required: true,
		unique: true
	},
	issue_type: {
		type:Number,
		min:1,
		max:4,
		required: true
	},
	issue_severity: {
		type:Number,
		min:1,
		max:5,
		required: true
	},
	issue_status: {
		type:Number,
		min:1,
		max:9,
		required: true
	},
	issue_priority: {
		type:Number,
		min:1,
		max:5,
		required: true
	},
	reporter: {
		type: String,
		required: true,
	},
	resolvers: [ {
		type: String,
		required: true,
	} ],
	attachments: [ {
		type: String,
	} ],
	comments: [ {
		type: String,
		required: true,
	} ]

} , { timestamps: true } );




const Issue = mongoose.model( "issue", IssueSchema );

module.exports = Issue;
