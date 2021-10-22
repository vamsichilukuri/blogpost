import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
	createPost,
	requestSendToPost,
	requestError,
} from "../../redux/actions/postActions";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PostCreate({
	createPost,
	requestSendToPost,
	isLoading,
	requestError,
}) {
	const [accessToken, setAccessToken] = useState(
		localStorage.getItem("accessToken")
	);
	const [post, setPost] = useState({
		title: "",
		text: "",
		file: "",
	});
	const [image, setImage] = useState(null);

	const { title, text } = post;
	const history = useHistory();

	useEffect(() => {
		if (!accessToken) {
			history.push("/sign-in");
		}
	}, []);
	const onChange = (e) => {
		if (e.target.name === "title" || e.target.name === "text") {
			setPost({
				...post,
				[e.target.name]: e.target.value,
			});
		} else {
			setPost({
				...post,
				[e.target.name]: e.target.files[0],
			});
		}
	};

	const onImage = (e) => {
		// setImage(e.target.files[0]);
		// };
		// const onClick = () => {
		setAccessToken(localStorage.getItem("accessToken"));
		const data = new FormData();
		data.append("file", e.target.files[0]);
		axios
			.post("http://localhost:3001/api/posts/image/upload", data, {
				headers: {
					Authorization: accessToken,
				},
			})
			.then((res) => {
				toast.success("image uploaded");
				setPost({
					...post,
					file: res.data.path,
				});
			});
	};

	const handleSubmit = (post) => {
		setAccessToken(localStorage.getItem("accessToken"));
		requestSendToPost();
		axios
			.post(
				"http://localhost:3001/api/posts/new",
				{ post },
				{
					headers: {
						Authorization: accessToken,
					},
				}
			)
			.then((res) => {
				createPost(res.data);
				history.push("/");
				toast.success("New Post Created");
			})
			.catch((error) => {
				requestError(error.message);
			});
	};

	return (
		<div>
			<div className="container">
				<div className="mt-3">
					<h3>Create Post</h3>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							handleSubmit(post);
						}}
					>
						<div className="form-group">
							<label htmlFor="file">Image</label>
							<input
								className="form-control"
								type="file"
								name="file"
								id="file"
								onChange={(e) => onImage(e)}
							/>
						</div>
						{/* <button
							type="button"
							className="btn btn-success btn-block"
							onClick={onClick}
						>
							Upload
						</button> */}
						<div className="form-group">
							<label htmlFor="title">Title</label>
							<input
								className="form-control"
								type="text"
								name="title"
								id="title"
								value={title}
								onChange={(e) => onChange(e)}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="text">Text</label>
							<input
								className="form-control"
								type="text"
								name="text"
								id="text"
								value={text}
								onChange={(e) => onChange(e)}
							/>
						</div>
						<div className="form-group">
							<button className="btn btn-primary" type="submit">
								Create Post
							</button>
						</div>
					</form>
				</div>
			</div>
			{isLoading && <div>please wait...</div>}
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		isLoading: state.postReducer.isLoading,
		error: state.postReducer.error,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		createPost: (data) => dispatch(createPost(data)),
		requestSendToPost: () => dispatch(requestSendToPost()),
		requestError: (error) => dispatch(requestError(error)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(PostCreate);
