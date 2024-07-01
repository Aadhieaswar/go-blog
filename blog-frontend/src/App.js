import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import PostList from 'components/posts/PostList';
import CreatePostForm from 'components/posts/CreatePostForm';
import NavBar from 'components/layout/navbar/Navbar';
import RegisterForm from 'components/user/RegisterForm';
import LoginForm from 'components/user/LoginForm';
import AppProviders from 'context/AppProviders';


function App() {
	return (
		<AppProviders>
			<Router>
				<div className="App">
					<NavBar />
					<Routes>
						<Route path="/" Component={PostList}/>
						<Route path="/create-post" Component={CreatePostForm}/>
						<Route path="/register" Component={RegisterForm}/>
						<Route path="/login" Component={LoginForm}/>
					</Routes>
				</div>
			</Router>
		</AppProviders>
	);
}

export default App;
