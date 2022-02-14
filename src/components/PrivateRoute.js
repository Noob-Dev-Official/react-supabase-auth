import React from 'react';
import { useNavigate, Route } from 'react-router-dom';

import { useAuth } from '../contexts/authContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
	const { currentUser } = useAuth();
	const navigate = useNavigate();

	return (
		<>
			<Route
				{...rest}
				element={currentUser ? <Component /> : navigate('/sign-in')}
			></Route>
		</>
	);
};

export default PrivateRoute;
