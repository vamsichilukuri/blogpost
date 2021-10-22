const User = require("../models/User.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const Config = require("config");
const nodemailer = require("nodemailer");
const _ = require("lodash");

const Registration1 = async (req, res) => {
	try {
		console.log("======> ", req.body);
		const { firstName, lastName, email, mobile, password } = _.extend(
			req.query || {},
			req.params || {},
			req.body || {}
		);
		// check if any user exists with this email ot not
		const userCheck = await User.findOne({
			$or: [{ email }, { mobile }],
		});
		console.log("88888",userCheck);
		if (!userCheck) {
			// create accessToken (JWT) & this token will expire in 20min
			const accessToken = jwt.sign(
				{
					lastName,
					firstName,
					email,
					password,
					mobile,
				},
				Config.get("JWTSecretKeyForAccountActivation"),
				{ expiresIn: "20m" }
			);

			// // email verification
			// let transporter = nodemailer.createTransport({
			// 	service: "gmail",
			// 	auth: {
			// 		user: "vamsidevtest@gmail.com",
			// 		pass: "VamsiDevTest@9",
			// 	},
			// });
			// let mailOptions = {
			// 	from: "vamsidevtest@gmail.com",
			// 	to: email,
			// 	subject: "Send email using NodeJS",
			// 	text: `
			// 	Hello ${firstName} ${lastName},
			// `,
			// 	html: `CloudFormz, 
			// 	<h3> Welcome to Meet</h3>
			// 	<p> Please Verify your Account. this link will expire in 20 Min.</p>
			// 	<a href="http://localhost:3001/api/users/account-activation/${accessToken}/">Click here to activate your account</a>`,
			// };
			// transporter.sendMail(mailOptions, (error, info) => {
			// 	if (error) {
			// 		console.log("you got the error", error);
			// 	} else {
			// 		console.log(`Email Send to ${info.response} `);
			// 	}
			// });
			res.status(200).json({
				success: true,
				message:
					"Please check you mail, we send a link to activate you account",
				data: accessToken,
			});
		} else {
			res.status(401).json({
				success: false,
				message: "Please check user already exists",
			});
		}
	} catch (e) {
		res.status(500).json({
			success: false,
			message: e && e.message ? e.message : "Something Went Wrong.",
		});
	}
};

// Activate user account
const Registration = async (req, res) => {
console.log("======> ", req.body);
		const { firstName, lastName, email, mobile, password } = _.extend(
			req.query || {},
			req.params || {},
			req.body || {}
		);	try {
		const userCheck = await User.findOne({
			$or: [{ email }, { mobile }],
		});
		if (userCheck) {
			res.state(401).json('user already exist')
		}else{		
		// hashing the password & activating the account
		const salt = await bcrypt.genSalt(10);
		const hashPassword = await bcrypt.hash(password, salt);

		const avatar = await gravatar.url(email, {
			s: "200",
			r: "pg",
			d: "mm",
		});
		const data = await User.create({
			firstName,
			lastName,
			userName: firstName + " " + lastName,
			email,
			mobile,
			password: hashPassword,
			avatar,
			isActive: true,
		});
		res.status(200).json({
			success: true,
			message: "Your Account created Successfully. You can Login Now",
			data: data,
		});
		}
	} catch (e) {
		return res.status(500).json({
			success: false,
			message: e && e.message ? e.message : "Something Went Wrong.",
		});
	}
};

const Login = async (req, res) => {
	try {
		const { email, password } = _.extend(
			req.query || {},
			req.params || {},
			req.body || {}
		);
		console.log(req.body)
		// get user & check password
		const user = await User.findOne({ email });
		const validPassword = await bcrypt.compare(password, user.password);
		if (!validPassword) {
			return res.status(400).send("invalid password");
		} else {
			// create access token after login & this token expire's in 1 day
			const accessToken = jwt.sign(
				{
					_id: user._id,
				},
				Config.get("JWTSecretKey"),
				{ expiresIn: "1d" }
			);
			res.json({
				success: true,
				message: "User Logged in Successfully",
				data: user,
				accessToken: accessToken,
			});
		}
	} catch (e) {
		res.status(404).json({
			success: false,
			message: e && e.message ? e.message : "Something Went Wrong.",
		});
	}
};

const ForgetPassword = async (req, res) => {
	const params = _.extend(req.query || {}, req.params || {}, req.body || {});
	const { email } = params;
	try {
		// get user with email
		const user = await User.findOne({ email });
		if (user) {
			// create accessToken (JWT) & this token will expire in 20min
			const accessToken = jwt.sign(
				{
					_id: user._id,
				},
				Config.get("JWTSecretKey"),
				{ expiresIn: "20m" }
			);

			// we store access token for reset password check
			const resetPasswordTokenAdded = await User.updateOne({
				passwordResetToken: accessToken,
			});

			if (resetPasswordTokenAdded) {
				// email verification
				let transporter = nodemailer.createTransport({
					service: "gmail",
					auth: {
						user: "vamsidevtest@gmail.com",
						pass: "VamsiDevTest@9",
					},
				});
				let mailOptions = {
					from: "vamsidevtest@gmail.com",
					to: email,
					subject: "Send email using NodeJS",
					text: `
				Hello ${user.userName},
			`,
					html: `
				<h2> Welcome to meets </h2>
				<p> Please Reset your Account Password. this link will expire in 20 Min.</p>
				<a href="http://localhost:3001/api/users/reset-password/${accessToken}/">Click me to Reset your Password</a>`,
				};
				transporter.sendMail(mailOptions, (error, info) => {
					if (error) {
						console.log("you got the error");
					} else {
						console.log(`Email Send to ${info.response} `);
					}
				});
			}
			res.json({
				success: true,
				message:
					"Please check you mail, we send a link to reset password you account",
				data: accessToken,
			});
		} else {
			res.json({
				success: false,
				message:
					"User with this email doesn't exist, Please check Once again.",
			});
		}
	} catch (e) {
		return res.json({
			success: false,
			message: e && e.message ? e.message : "Something Went Wrong.",
		});
	}
};

const ResetPassword = async (req, res) => {
	const params = _.extend(req.query || {}, req.params || {}, req.body || {});
	const { newPassword } = params;
	const { _id } = req.user;
	try {
		// hashing the new password
		const salt = await bcrypt.genSalt(10);
		const hashPassword = await bcrypt.hash(newPassword, salt);

		// update password by user id and remove password reset token
		const updatePassword = await User.findOneAndUpdate(
			{ _id },
			{
				password: hashPassword,
				passwordResetToken: "",
			}
		);
		res.json({
			success: true,
			message: "Password Updated successfully. Login Now",
			data: updatePassword,
		});
	} catch (e) {
		console.log("error", e);
		return res.json({
			success: false,
			message: e && e.message ? e.message : "Something Went Wrong.",
		});
	}
};

// get user by email
const UserByEmail = async (req, res) => {
	try {
		const { email } = _.extend(
			req.query || {},
			req.params || {},
			req.body || {}
		);
		const user = await User.findOne({ email }).select("-password");
		if (user) {
			res.status(200).json({
				success: true,
				message: "User details",
				data: user,
			});
		}
		res.status(400).json({ success: false, message: "User not exist" });
	} catch (e) {
		return res.json({
			success: false,
			message: e && e.message ? e.message : "Something Went Wrong.",
		});
	}
};

// get user by username
const UserByUserName = async (req, res) => {
	try {
		const { username } = _.extend(
			req.query || {},
			req.params || {},
			req.body || {}
		);
		const user = await User.findOne({ userName: username }).select(
			"-password"
		);
		if (user) {
			res.status(200).json({
				success: true,
				message: "User details",
				data: user,
			});
		}
		res.status(400).json({ success: false, message: "User not exist" });
	} catch (e) {
		return res.json({
			success: false,
			message: e && e.message ? e.message : "Something Went Wrong.",
		});
	}
};

// get users
const UsersList = async (req, res) => {
	try {
		// const { email } = _.extend(
		// 	req.query || {},
		// 	req.params || {},
		// 	req.body || {}
		// );
		const users = await User.find().select("-password");
		res.status(200).json({
			success: true,
			message: "All users",
			data: users,
		});
	} catch (e) {
		return res.json({
			success: false,
			message: e && e.message ? e.message : "Something Went Wrong.",
		});
	}
};

module.exports = {
	Registration,
	// ActivateAccount,
	Login,
	ForgetPassword,
	ResetPassword,
	UserByEmail,
	UserByUserName,
	UsersList,
};
