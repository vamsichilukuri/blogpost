import React, { useState } from "react";
import { userData } from "../../../redux/actions/userActions";
import { connect } from "react-redux";
import axios from "axios";
import { useHistory} from "react-router-dom"

function LoginPage({ userData }) {
	const history = useHistory();
	const [userInput, setUserInput] = useState({
		email: "",
		password: "",
	});
	const { email, password } = userInput;

	const handleInput = (e) =>
		setUserInput({ ...userInput, [e.target.name]: e.target.value });
	const handleForm = (data) => {
		axios
			.post("http://localhost:3001/api/users/sign-in", data)
			.then((res) => {
				console.log(res.data.accessToken)
				userData(res.data);
				localStorage.setItem("accessToken", res.data.accessToken)
				history.push("/")
				
			})
			.catch((error) => {
				console.log("error", error);
			});
	};

	return (
		<div className="register-form">
			<div className="container">
				<h2 className="text-center">Login</h2>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						handleForm(userInput);
					}}
				>
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
						<button
							className="btn btn-primary mx-auto"
							type="submit"
						>
							Sign in
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
const mapDispatchToProps = (dispatch) => {
	return {
		userData: (data) => dispatch(userData(data)),
	};
};
export default connect(null, { userData })(LoginPage);
