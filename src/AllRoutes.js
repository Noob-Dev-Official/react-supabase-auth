import React from 'react';

import { Navigate, useRoutes } from 'react-router-dom';

import Home from './pages/Home';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import ForgotPassword from './pages/ForgotPassword';
import UpdateProfile from './pages/UpdateProfile';

const AllRoutes = ({ isSignedIn }) => {
	let routes = useRoutes([
		{
			path: '/',
			element: isSignedIn ? <Home /> : <Navigate to='/sign-in' />,
		},
		{
			path: '/update-profile',
			element: isSignedIn ? <UpdateProfile /> : <Navigate to='/sign-in' />,
		},
		{
			path: '/sign-in',
			element: <SignIn />,
		},
		{
			path: '/sign-up',
			element: <SignUp />,
		},
		{
			path: '/forgot-password',
			element: <ForgotPassword />,
		},
	]);

	return routes;
};

export default AllRoutes;
