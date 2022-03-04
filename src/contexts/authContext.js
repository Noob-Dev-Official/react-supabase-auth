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

	const signup = async (email, password) => {
		const { error, user } = await auth.signUp({
			email: email,
			password: password,
		});

		if (error) {
			console.log(error);
		}

		return { error, user };
	};

	const signin = async (email, password) => {
		const { error, user } = await auth.signIn({
			email: email,
			password: password,
		});

		if (error) {
			console.log(error);
		}

		return { error, user };
	};

	const signout = async () => {
		const { error } = auth.signOut();

		if (error) {
			console.log(error);
		}

		setCurrentUser(null);
		setIsSignedIn(false);

		return { error };
	};

	const resetPassword = async (email) => {
		const { data, error } = await auth.api.resetPasswordForEmail(email);

		if (error) {
			console.log(error);
		}

		return { error, data };
	};

	const updateEmail = async (email) => {
		const { data, error } = await auth.update({ email: email });

		if (error) {
			console.log(error);
		}

		return { error, data };
	};

	const updatePassword = async (password) => {
		const { data, error } = await auth.update({ password: password });

		if (error) {
			console.log(error);
		}

		return { error, data };
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
				console.log('login');
				initialiseUser();
				setIsSignedIn(true);
			}

			if (event === 'SIGNED_OUT') {
				setCurrentUser(null);
				setIsSignedIn(false);
			}

			if (event === 'PASSWORD_RECOVERY') {
				console.log('password recovery');
				console.log(event);
				console.log(session);
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
