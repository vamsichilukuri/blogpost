const mongoose = require("mongoose");
const config = require("config");

const dbConnection = async () => {
	try {
		await mongoose.connect(config.get("mongodbURI"), {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		});
		console.log("Mongodb connection success");
	} catch (error) {
		console.log(`error => `, error.message);
	}
};

module.exports = { dbConnection };
