import React from "react";
import { Link } from "react-router-dom";
import {connect} from 'react-redux'
import { useSelector, useDispatch } from "react-redux";
import "./navBar.css";
function NavBar({token}) {
	// const token = token;
	console.log(token)
	return (
		<div>
			<ul className="nav justify-content-end mb-5">
				<li className="nav-item">
					<Link className="nav-link active" to="/">
						All posts
					</Link>
				</li>
				<li className="nav-item">
					<Link className="nav-link" to="/create-post">
						Create post
					</Link>
				</li>
				<li className={token ? "domhide nav-item" : "nav-item"}>
					<Link className="nav-link" to="/sign-in">
						Login
					</Link>
				</li>
				<li className={token ? "nav-item" : "domhide nav-item"}>
					<Link className="nav-link" to="/sign-in">
						Logout
					</Link>
				</li>
				<li className={token ? "domhide nav-item" : "nav-item"}>
					<Link className="nav-link" to="/sign-up">
						Sign up
					</Link>
				</li>
			</ul>
		</div>
	);
}

const mapStateToProps = state => {
	return {
			token: state.userReducer.token,
	};
}

export default connect(mapStateToProps,null)(NavBar);
