import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import PostList from 'components/posts/PostList';
import CreatePostForm from 'components/posts/CreatePostForm';
import NavBar from 'components/layout/navbar/Navbar';
import RegisterForm from 'components/user/RegisterForm';
import LoginForm from 'components/user/LoginForm';
import AppContextProvider from 'context/AppContextProvider';
import Urls from 'context/Urls';
import RouteHandler from 'components/RouteHandler';
import AlertManager from 'components/layout/alert/AlertManager';
import UserProfile from 'components/profile/UserProfile';
import PostDisplay from 'components/posts/PostDisplay';


function App() {
	return (
		<AppContextProvider>
			<Router>
				<div className="App">
					<RouteHandler />
					<AlertManager />
					<NavBar />
					<Routes>
						<Route path={Urls.Home} Component={PostList}/>
						<Route path={Urls.CreatePost} Component={CreatePostForm}/>
						<Route path={Urls.RegisterUser} Component={RegisterForm}/>
						<Route path={Urls.LoginUser} Component={LoginForm}/>
						<Route path={Urls.UserProfile} Component={UserProfile}/>
						<Route path={Urls.GetPost} Component={PostDisplay}/>
					</Routes>
				</div>
			</Router>
		</AppContextProvider>
	);
}

export default App;
