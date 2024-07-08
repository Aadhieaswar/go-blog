import { RouteObject } from "react-router-dom";
import LoginForm from "../components/user/LoginForm";
import PostList from "../components/posts/PostList";
import CreatePostForm from "../components/posts/CreatePostForm";
import RegisterForm from "../components/user/RegisterForm";
import PostDisplay from "../components/posts/PostDisplay";
import UserProfile from "../components/profile/UserProfile";

interface AppRoutes {
	[key: string]: RouteObject;
}

const routes: AppRoutes = {
	Home: {
		path: '/',
		element: <PostList />
	},
	RegisterUser: {
		path: '/register',
		element: <RegisterForm />
	},
	LoginUser: {
		path: '/login',
		element: <LoginForm />
	},
	UserProfile: {
		path: '/profile/:id',
		element: <UserProfile />
	},
	CreatePost: {
		path: '/create-post',
		element: <CreatePostForm />
	},
	GetPost: {
		path: '/post/:slug',
		element: <PostDisplay />
	},
}

export default routes;