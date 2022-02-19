import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../supabase/supabase';

const authContext = createContext({});

export const useAuth = () => {
	return useContext(authContext);
};

export const AuthProvider = ({ children }) => {
	const { auth } = supabase;

	const [currentUser, setCurrentUser] = useState();
	const [isSignedIn, setIsSignedIn] = useState(false);
	const [loading, setLoading] = useState(true);

	const signup = (email, password) => {
		return auth.signUp({ email: email, password: password });
	};

	const signin = async (email, password) => {
		console.log('signin');
		return await auth.signIn({ email: email, password: password });
	};

	const signout = () => {
		return auth.signOut();
	};

	const resetPassword = (email) => {
		return auth.api.resetPasswordForEmail(email);
	};

	const updateEmail = (email) => {
		return auth.update({ email: email });
	};

	const updatePassword = (password) => {
		return auth.update({ password: password });
	};

	const user = () => {
		return auth.user();
	};

	const initialiseUser = () => {
		const user = auth.user();
		let username;

		if (user) {
			username = user.user_metadata.user_name;
		}

		setCurrentUser(user);
		localStorage.setItem('username', username);
	};

	const value = {
		isSignedIn,
		currentUser,
		user,
		signup,
		signin,
		signout,
		resetPassword,
		updateEmail,
		updatePassword,
	};

	useEffect(() => {
		const authState = auth.onAuthStateChange((event, session) => {
			if (event === 'SIGNED_IN') {
				initialiseUser();
				setIsSignedIn(true);
			}

			if (event === 'SIGNED_OUT') {
				setCurrentUser(null);
				setIsSignedIn(false);
			}
		});

		setLoading(false);

		return () => authState.data.unsubscribe();
	}, []);

	return (
		<authContext.Provider value={value}>
			{!loading && children}
		</authContext.Provider>
	);
};
