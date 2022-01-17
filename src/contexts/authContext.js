import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const AuthContext = createContext();

export const useAuth = () => {
	return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
	const supabaseUrl = process.env.SUPABASE_URL;
	const supabaseKey = process.env.SUPABASE_KEY;
	const supabase = createClient(supabaseUrl, supabaseKey);
	const { auth } = supabase;

	const [currentUser, setCurrentUser] = useState();
	const [loading, setLoading] = useState(true);

	const currentUser = () => {
		return auth.user();
	};

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
};
