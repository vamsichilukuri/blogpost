import React, { lazy, Suspense } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

// Header && Footer
const NavBar = lazy(() => import("../components/navbar/NavBar"));

// Pages | Components

const CreatePost = lazy(() => import("../components/post/PostCreate"));
const PostList = lazy(() => import("../components/post/PostList"));
const PostEdit = lazy(() => import("../components/post/PostEdit"));
const LoginPage = lazy(() => import("../components/auth/login/LoginPage"));
const RegisterPage = lazy(() =>
	import("../components/auth/register/RegisterPage")
);


function Routers() {
	return (
		<Router>
			<Suspense fallback={() => <h2>Loading...</h2>}>
				<NavBar />
				<Switch>
					<Route exact path="/" component={PostList} />
					<Route exact path="/create-post" component={CreatePost} />
					<Route exact path="/edit/:id" component={PostEdit} />
					<Route exact path="/sign-up" component={RegisterPage} />
					<Route exact path="/sign-in" component={LoginPage} />
				</Switch>
			</Suspense>
		</Router>
	);
}

export default Routers;
