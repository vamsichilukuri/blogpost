import React, { useState } from "react";
// import "./registerPage.css";
import { connect } from "react-redux";
import { userData } from "../../../redux/actions/userActions";
import { useHistory } from "react-router-dom";

import axios from "axios";

function RegisterPage({ userData }) {
	const history = useHistory();

	const [userInput, setUserInput] = useState({
		firstName: "",
		lastName: "",
		mobile: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const {
		firstName,
		lastName,
		mobile,
		email,
		password,
		confirmPassword,
	} = userInput;

	const handleInput = (e) =>
		setUserInput({ ...userInput, [e.target.name]: e.target.value });
	const handleForm = (data) => {
		axios
			.post("http://localhost:3001/api/users/sign-up", data)
			.then((res) => {
				history.push("/sign-in");
			})
			.catch((error) => {
				console.log("error");
			});
	};

	return (
		<div className="register-form">
			<div className="container">
				<h2 className="text-center">Register</h2>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						handleForm(userInput);
					}}
				>
					<div className="form-group">
						<label htmlFor="firstName">First Name</label>
						<input
							className="form-control"
							type="text"
							name="firstName"
							id="firstName"
							value={firstName}
							onChange={(e) => handleInput(e)}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="lastName">Last Name</label>
						<input
							className="form-control"
							type="text"
							name="lastName"
							id="lastName"
							value={lastName}
							onChange={(e) => handleInput(e)}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="email">Email</label>
						<input
							className="form-control"
							type="email"
							name="email"
							id="email"
							value={email}
							onChange={(e) => handleInput(e)}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="mobile">Mobile</label>
						<input
							className="form-control"
							type="tel"
							name="mobile"
							id="mobile"
							value={mobile}
							onChange={(e) => handleInput(e)}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="password">Password</label>
						<input
							className="form-control"
							type="password"
							name="password"
							id="password"
							value={password}
							onChange={(e) => handleInput(e)}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="confirmPassword">
							Confirm Password
						</label>
						<input
							className="form-control"
							type="password"
							name="confirmPassword"
							id="confirmPassword"
							value={confirmPassword}
							onChange={(e) => handleInput(e)}
						/>
					</div>
					<div className="form-group">
						<button
							className="btn btn-primary mx-auto"
							type="submit"
						>
							Sign up
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default connect(null, { userData })(RegisterPage);
