const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var postSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		title: {
			type: String,
			required: true,
		},
		text: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			default: "",
		},
	},
	{
		timestamps: true,
	}
);

//Export the model
module.exports = mongoose.model("Post", postSchema);
