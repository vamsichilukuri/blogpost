import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//API
import axios from "axios";

toast.configure();
function PostEdit({ match }) {
	const [post, setPost] = useState({
		title: "",
		text: "",
	});
	const [accessToken, setAccessToken] = useState(
		localStorage.getItem("accessToken")
	);

	const history = useHistory();

	const { title, text } = post;
	const onChange = (e) => {
		setPost({
			...post,
			[e.target.name]: e.target.value,
		});
	};
	const handleSubmit = () => {
		if (title && text) {
			const updatePost = { title, text };
			axios
				.put(
					`http://localhost:3001/api/posts/post/edit/${match.params.id}`,
					{
						updatePost,
					},
					{
						headers: {
							Authorization: accessToken,
						},
					}
				)
				.then(() => {
					setPost({ title: "", text: "" });
					toast.success("Updated");
					history.push("/");
				})
				.catch((err) => toast.error(err.message));
		} else {
			console.log("something is missing");
		}
	};
	useEffect(() => {
		axios
			.get(`http://localhost:3001/api/posts/post/${match.params.id}`, {
				headers: {
					Authorization: accessToken,
				},
			})
			.then((response) => {
				const post = response.data;
				setPost({
					title: post.title,
					text: post.text,
				});
			})
			.catch((error) => toast.error(error.message));
	}, []);
	return (
		<div className="container">
			<div className="mt-3 todo-form">
				<h3>Edit Post</h3>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						handleSubmit(post);
					}}
				>
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
						<button className="btn btn-secondary" type="submit">
							Update Post
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default PostEdit;
