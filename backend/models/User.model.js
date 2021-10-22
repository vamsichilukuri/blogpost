const mongoose = require("mongoose"); // Erase if already required

// User schema
var userSchema = new mongoose.Schema(
	{
		userName: {
			type: String,
			unique: true,
		},
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		mobile: {
			type: String,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		avatar: {
			type: String,
		},
		isActive: {
			type: Boolean,
			default: false,
		},
		passwordResetToken: {
			type: String,
			default: "",
			description:
				"A unique token used to verify the user's identity when recovering a password.  Expires after 1 use, or after a set amount of time has elapsed.",
		},
		posts: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Post",
			default:[]
		}],
	},
	{
		timestamp: true,
	}
);

//Export the model
module.exports = mongoose.model("User", userSchema);
