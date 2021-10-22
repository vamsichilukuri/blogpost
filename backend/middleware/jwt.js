const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = {
	// request body validation
	Joi: (schema) => {
		return (req, res, next) => {
			const { error } = schema.validate(req.body ? req.body : {});
			const valid = error === null;
			if (valid) {
				next();
			} else {
				const { details } = error;
				const message = details.map((i) => i.message).join(",");
				console.log("error", message);
				res.status(422).json({ error: message });
			}
		};
	},

	// jwt token verify to login and access all api's
	token: () => {
		return (req, res, next) => {
			const Authorization = req.headers.authorization;
			if (Authorization && Authorization.length > 0) {
				jwt.verify(
					Authorization,
					config.get("JWTSecretKey"),
					function (err, decoded) {
						if (err) {
							return res.json({
								status: 401,
								success: false,
								message: "Failed to authenticate Token",
							});
						} else {
							req.user = decoded;
							next();
						}
					}
				);
			} else {
				res.status(401).send({
					success: false,
					message: "No Token Provided",
				});
			}
		};
	},

	// jwt token to verify account
	accountVerify: () => {
		return (req, res, next) => {
			// const Authorization = req.headers.authorization;
			const Authorization = req.params.token;
			console.log(Authorization);
			if (Authorization && Authorization.length > 0) {
				jwt.verify(
					Authorization,
					config.get("JWTSecretKeyForAccountActivation"),
					function (err, decoded) {
						if (err) {
							return res.json({
								status: 401,
								success: false,
								message: "Failed to authenticate Token",
							});
						} else {
							req.user = decoded;
							next();
						}
					}
				);
			} else {
				res.status(401).send({
					success: false,
					message: "No Token Provided",
				});
			}
		};
	},
};
