import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
	getPostList,
	requestSendToPost,
	requestError,
} from "../../redux/actions/postActions";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PostList() {
	const [accessToken, setAccessToken] = useState(
		localStorage.getItem("accessToken")
	);
	const [posts, setPosts] = useState([]);
	useEffect(() => {
		setAccessToken(localStorage.getItem("accessToken"));
		getPosts();
	}, []);

	function getPosts() {
		requestSendToPost();
		axios
			.get("http://localhost:3001/api/posts", {
				headers: {
					Authorization: accessToken,
				},
			})
			.then((res) => {
				setPosts(res.data);
			})
			.catch((error) => {
				requestError(error.message);
			});
	}

	function deleteTodo(post) {
		requestSendToPost();
		axios
			.delete(`http://localhost:3001/api/posts/post/remove/${post._id}`, {
				headers: {
					Authorization: accessToken,
				},
			})
			.then(() => {
				toast.success("Post deleted");
				getPosts();
			})
			.catch((error) => {
				requestError(error.message);
			});
	}

	return (
		<div className="container">
			<div className="mt-3">
				<h2 className="pl">Post's List</h2>
				<hr />
				{posts.length === 0 ? (
					<h2 className="text-warning"> No post's available</h2>
				) : (
					<div className="container">
						<div className="row">
							{posts.map((post) => {
								return (
									// <div key={post._id}>
									<div className="col sm mb-5" key={post._id}>
										<div
											// key={post._id}
											className="card"
											style={{ width: "18rem" }}
										>
											<img
												className="card-img-top"
												src={post.image}
												// src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzB0pqU6H_nbOYszqC0JStl9-Fj-cjvF80iw&usqp=CAU"
												alt="Card image cap"
											/>
											<div
												className="card-body"
												style={{ color: "black" }}
											>
												<h5 className="card-title">
													{post.title}
												</h5>
												<p className="card-text">
													{post.text}
												</p>
												<button className="btn">
													<Link
														to={`/edit/${post._id}`}
														className="nav-link btn border border-1 border-dark"
													>
														Edit post
													</Link>
												</button>
												<button
													className="btn btn-danger ml-1"
													onClick={() => {
														deleteTodo(post);
													}}
												>
													Delete
												</button>
											</div>
										</div>
									</div>
									// </div>
								);
							})}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		posts: state.postReducer.posts,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getPostList: (data) => dispatch(getPostList(data)),
		requestSendToPost: () => dispatch(requestSendToPost()),
		requestError: (error) => dispatch(requestError(error)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
