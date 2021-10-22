const Post = require("../models/Post.model");
const Image = require("../models/Image.model");
const _ = require("lodash");
const ObjectId = require("mongodb").ObjectID;

const PostsList = async (req, res) => {
	try {
		const posts = await Post.find({ userId: new ObjectId(req.user._id) });
		res.status(200).send(posts);
	} catch (e) {
		return res.status(404).json({
			message: e && e.message ? e.message : "Something Went Wrong.",
		});
	}
};

const CreatePost = async (req, res) => {
	try {
		const { _id } = req.user;
		const { title, text, file } = _.extend(
			req.query || {},
			req.params || {},
			req.body.post || {}
		);
		const post = await Post.create({
			title,
			text,
			image: file,
			userId: new ObjectId(_id),
		});
		res.status(200).send(post);
	} catch (e) {
		return res.status(404).send({
			message: e && e.message ? e.message : "Something Went Wrong.",
		});
	}
};
const UploadImage = async (req, res) => {
	try {
		const file = req.file;
		const imgPath = `http://localhost:3001/images/${file.filename}`;
		const image = await Image.create({
			path: imgPath,
		});
		res.status(200).send(image);
	} catch (e) {
		return res.status(404).send({
			message: e && e.message ? e.message : "Something Went Wrong.",
		});
	}
};

const GetPost = async (req, res) => {
	try {
		const { postId } = _.extend(
			req.query || {},
			req.params || {},
			req.body || {}
		);
		const post = await Post.findOne({ _id: new ObjectId(postId) });
		res.status(200).send(post);
	} catch (e) {
		return res.status(404).json({
			success: false,
			message: e && e.message ? e.message : "Something Went Wrong.",
		});
	}
};

const EditPost = async (req, res) => {
	try {
		const { title, text, postId } = _.extend(
			req.query || {},
			req.params || {},
			req.body.updatePost || {}
		);
		const post = await Post.findOneAndUpdate(
			{ _id: new ObjectId(postId) },
			{ title, text }
		);
		res.status(200).send(post);
	} catch (e) {
		return res.status(404).json({
			success: false,
			message: e && e.message ? e.message : "Something Went Wrong.",
		});
	}
};

const DeletePost = async (req, res) => {
	try {
		const { postId } = _.extend(
			req.query || {},
			req.params || {},
			req.body || {}
		);

		let post = await Post.findOneAndDelete({ _id: new ObjectId(postId) });
		if (!post) return res.status(404).json("Post not found");
		return res.status(201).send("Post is removed!");
	} catch (e) {
		return res.status(404).json({
			success: false,
			message: e && e.message ? e.message : "Something Went Wrong.",
		});
	}
};

module.exports = {
	PostsList,
	CreatePost,
	GetPost,
	DeletePost,
	EditPost,
	UploadImage,
};
