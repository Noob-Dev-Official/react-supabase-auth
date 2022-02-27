import React, { useState, useRef, useEffect } from 'react';

import { Link } from 'react-router-dom';

import { useAuth } from '../contexts/authContext';
import Alert from '../components/Alert';
import Success from '../components/Success';
import {
	AuthFormParent,
	AuthFormHeading,
	AuthForm,
	AuthFormLabel,
	AuthFormInput,
	AuthFormEmailDiv,
	AuthFormPasswordDiv,
	AuthFormSubmitBtn,
} from '../components/AuthFormComponents';

const SignUp = () => {
	const [email, setEmail] = useState({ email: '' });
	const [password, setPassword] = useState({ password: '' });
	const [error, setError] = useState(false);
	const [errorMssg, setErrorMssg] = useState('');
	const [success, setSuccess] = useState(false);
	const [successMssg, setSuccessMssg] = useState('');
	const [loading, setLoading] = useState(false);

	const { signup } = useAuth();

	const confirmPasswordRef = useRef();

	const onEmailChange = (e) => {
		setEmail(() => {
			return {
				[e.target.name]: e.target.value,
			};
		});
	};

	const onPasswordChange = (e) => {
		setPassword(() => {
			return {
				[e.target.name]: e.target.value,
			};
		});
	};

	const onFormSubmit = async (e) => {
		e.preventDefault();

		if (confirmPasswordRef.current.value !== password.password) {
			setPassword({ password: '' });
			confirmPasswordRef.current.value = '';

			setError(true);
			setErrorMssg('Passwords do not match!');

			hideErrorMssg();
			return 'incorrect password';
		} else {
			const signUp = await signup(email.email, password.password);

			if (!signUp.error) {
				setSuccess(true);
				setSuccessMssg('Sign Up successful!');
				hideSuccessMssg();
			} else {
				setError(true);
				setErrorMssg(signUp.error.message);
				hideErrorMssg();
			}
		}

		setLoading(false);
	};

	const hideErrorMssg = () => {
		setTimeout(() => {
			setError(false);
		}, 5000);
	};

	const hideSuccessMssg = () => {
		setTimeout(() => {
			setSuccess(false);
		}, 5000);
	};

	useEffect(() => {
		return () => {
			setLoading(false);
		};
	}, []);

	return (
		<>
			{error && <Alert mssg={errorMssg} />}
			{success && <Success mssg={successMssg} />}
			<AuthFormParent>
				<AuthFormHeading>Sign Up</AuthFormHeading>
				<AuthForm onSubmit={onFormSubmit}>
					<AuthFormEmailDiv>
						<AuthFormLabel>Email</AuthFormLabel>
						<AuthFormInput
							type='text'
							name='email'
							value={email.email}
							onChange={onEmailChange}
							required
						/>
					</AuthFormEmailDiv>
					<AuthFormPasswordDiv>
						<AuthFormLabel>Password</AuthFormLabel>
						<AuthFormInput
							type='password'
							name='password'
							value={password.password}
							onChange={onPasswordChange}
							placeholder='6 characters minimum'
							required
						/>
					</AuthFormPasswordDiv>
					<AuthFormPasswordDiv>
						<AuthFormLabel>Confirm Password</AuthFormLabel>
						<AuthFormInput
							ref={confirmPasswordRef}
							type='password'
							name='password'
							placeholder='6 characters minimum'
							required
						/>
					</AuthFormPasswordDiv>
					<AuthFormSubmitBtn
						disabled={loading}
						type='submit'
						name='submit'
						value='Enter'
					/>
				</AuthForm>
				<p>
					Already have an account?<Link to='/sign-in'>Sign In</Link>
				</p>
			</AuthFormParent>
		</>
	);
};

export default SignUp;
