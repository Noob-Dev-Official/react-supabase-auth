import React, { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../contexts/authContext';
import Alert from '../components/Alert';
import {
	AuthFormParent,
	AuthFormHeading,
	AuthForm,
	AuthFormLabel,
	AuthFormInput,
	AuthFormEmailDiv,
	AuthFormPasswordDiv,
	AuthFormSubmitBtn,
	AuthFormBottomText,
} from '../components/AuthFormComponents';

const SignIn = () => {
	const [email, setEmail] = useState({ email: '' });
	const [password, setPassword] = useState({ password: '' });
	const [error, setError] = useState(false);
	const [errorMssg, setErrorMssg] = useState('');
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();

	const { signin } = useAuth();

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

	//eslint-disable-next-line
	const hideErrorMssg = () => {
		setTimeout(() => {
			setError(false);
			setErrorMssg('');
		}, 5000);
	};

	const onFormSubmit = async (e) => {
		e.preventDefault();

		// setLoading(true);

		try {
			// setError(false);

			await signin(email.email, password.password);
			navigate('/');
		} catch (err) {
			setErrorMssg('Cannot Sign In');
			// setError(true);
			console.log(err);
			// hideErrorMssg(); //ERROR: this was the problem, need to fix it later - Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
		}

		// setLoading(false);
	};

	return (
		<>
			{error && <Alert mssg={errorMssg} />}
			<AuthFormParent>
				<AuthFormHeading>Sign In</AuthFormHeading>
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
							required
						/>
					</AuthFormPasswordDiv>
					<AuthFormSubmitBtn
						// disabled={loading}
						type='submit'
						name='submit'
						value='Sign In'
					/>
				</AuthForm>
				<p>
					Need an account?<Link to='/sign-up'> Sign Up</Link>
				</p>
			</AuthFormParent>
			<AuthFormBottomText>
				Forgot password?<Link to='/forgot-password'> Click Here</Link>
			</AuthFormBottomText>
		</>
	);
};

export default SignIn;
