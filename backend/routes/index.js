const router = require("express").Router();
const { Joi, token, accountVerify } = require("../middleware/jwt");

// controls
const {
	PostsList,
	CreatePost,
	EditPost,
	DeletePost,
	GetPost,
	UploadImage,
} = require("../controller/Post.controller");

const {
	Registration,
	Login,
	// ActivateAccount,
	ForgetPassword,
	ResetPassword,
	UserByEmail,
	UserByUserName,
	UsersList,
} = require("../controller/User.controller");

const multer = require("multer");
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "./public/images");
	},
	filename: (req, file, cb) => {
		cb(null, `${Date.now().toString()}${file.originalname}`);
	},
});
const upload = multer({ storage });

// all User routes
router.post("/users/sign-up", Registration);
// router.get(
// 	"/users/account-activation/:token",
// 	accountVerify(),
// 	ActivateAccount
// );
router.post("/users/sign-in", Login);
router.post("/users/forget-password", ForgetPassword);
router.put("/users/reset-password", token(), ResetPassword);
router.get("/users/user/:email", token(), UserByEmail);
router.get("/users/user/:username", token(), UserByUserName);
router.get("/users", token(), UsersList);

// all post routes
router.get("/posts", token(), PostsList);
router.get("/posts/post/:postId", token(), GetPost);
router.put("/posts/post/edit/:postId", token(), EditPost);
router.post("/posts/new", token(), CreatePost);
router.post("/posts/image/upload", token(), upload.single("file"), UploadImage);
router.delete("/posts/post/remove/:postId", token(), DeletePost);

module.exports = router;
