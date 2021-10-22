const Joi = require("joi");

const Schemas = {
	// sign-up
	Registration: Joi.object().keys({
		firstName: Joi.string().required(),
		lastName: Joi.string().required(),
		email: Joi.string().required().email(),
		mobile: Joi.number(),
		password: Joi.string().min(6).required(),
		confirmPassword: Joi.string().min(6).optional(),
	}),

	// sign-in
	Login: Joi.object().keys({
		email: Joi.string().required().email(),
		password: Joi.string().min(6).required(),
	}),
};

module.exports = Schemas;
