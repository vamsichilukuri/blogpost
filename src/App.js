import "./App.css";
import NavBar from "./components/navbar/NavBar";
import PostCreate from "./components/post/PostCreate";
import PostList from "./components/post/PostList";
import PostEdit from "./components/post/PostEdit";
import LoginPage from "./components/auth/login/LoginPage";
import RegisterPage from "./components/auth/register/RegisterPage";
function App() {
	return (
		<div className="App">
			{/* <User /> */}
			<NavBar />
			<PostCreate />
			<PostList />
			<PostEdit />
			<LoginPage />
			<RegisterPage />
		</div>
	);
}

export default App;
