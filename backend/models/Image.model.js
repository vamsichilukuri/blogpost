const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var imageSchema = new mongoose.Schema(
	{
		path: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

//Export the model
module.exports = mongoose.model("Image", imageSchema);
