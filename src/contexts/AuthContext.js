import { createContext, useContext, useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const AuthContext = createContext({});

export const useAuth = () => {
	return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
	const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
	const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
	const supabase = createClient(supabaseUrl, supabaseKey);
	const { auth } = supabase;

	const [currentUser, setCurrentUser] = useState();
	const [isSignedIn, setIsSignedIn] = useState(false);
	const [loading, setLoading] = useState(true);

	const signup = (email, password) => {
		return auth.signUp({ email: email, password: password });
	};

	const signin = (email, password) => {
		return auth.signIn({ email: email, password: password });
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
		const unsubscribe = auth.onAuthStateChange((event, session) => {
			console.log(event, session);

			if (event === 'SIGNED_IN') {
				initialiseUser();
				setIsSignedIn(false);
			}
		});

		setLoading(false);
		return unsubscribe;
		// eslint-disable-next-line
	}, []);

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
};
