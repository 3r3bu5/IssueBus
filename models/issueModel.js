const mongoose = require( "mongoose" );
const { v4: uuidv4 } = require( "uuid" );


var attachmentSchema = new mongoose.Schema( {
	_id: { type: String, default: uuidv4 },
	title:  {
		type: String,
		required: true
	},
	url: {
		type: String,
		required: true,
		unique: true
	}
}, {
	timestamps: true
} );

const Attachment = mongoose.model( "attachment", attachmentSchema );

var commentSchema = new mongoose.Schema( {
	_id: { type: String, default: uuidv4 },
	comment:  {
		type: String,
		required: true },
	author:  { 
		type: mongoose.Schema.Types.String,
		ref: "user" },
	attachments: [ attachmentSchema ]
}, {
	timestamps: true
} );

const comment = mongoose.model( "comment", commentSchema );


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
		type: mongoose.Schema.Types.String,
		ref: "user" },
	resolvers: [ {
		type: mongoose.Schema.Types.String,
		ref: "user"
	} ],
	attachments: [ attachmentSchema ],
	comments: [ commentSchema ]

} , { timestamps: true } );




const Issue = mongoose.model( "issue", IssueSchema );

module.exports = {
	Issue,
	comment,
	IssueSchema,
	Attachment };
