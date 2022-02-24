import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import { useAuth } from '../contexts/authContext';
import Alert from '../components/Alert';
import {
	AuthFormParent,
	AuthFormHeading,
	AuthForm,
	AuthFormLabel,
	AuthFormInput,
	AuthFormEmailDiv,
	AuthFormSubmitBtn,
	AuthFormBottomText,
} from '../components/AuthFormComponents';
import Success from '../components/Success';

const ForgotPassword = () => {
	const [email, setEmail] = useState({ email: '' });
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);
	const [errorMssg, setErrorMssg] = useState('');
	const [successMssg, setSuccessMssg] = useState('');

	const { resetPassword } = useAuth();

	const onEmailChange = (e) => {
		setEmail(() => {
			return {
				[e.target.name]: e.target.value,
			};
		});
	};

	const onFormSubmit = async (e) => {
		e.preventDefault();

		try {
			setError(false);
			setLoading(true);
			await resetPassword(email.email);

			setSuccess(true);
			setSuccessMssg('Check your inbox for further instruction.');
			hideSuccessMssg();
		} catch (err) {
			setError(true);
			setErrorMssg('Failed to reset password');
			console.log(err);
			hideErrorMssg();
		}
		console.log('outside error');
		setLoading(false);
	};

	const hideErrorMssg = () => {
		setTimeout(() => {
			setError(false);
			setErrorMssg('');
		}, 5000);
	};

	const hideSuccessMssg = () => {
		setTimeout(() => {
			setSuccess(false);
			setSuccessMssg('');
		}, 5000);
	};

	return (
		<>
			{error && <Alert mssg={errorMssg} />}
			{success && <Success mssg={successMssg} />}
			<AuthFormParent>
				<AuthFormHeading>Reset Password</AuthFormHeading>
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
					<AuthFormSubmitBtn
						disabled={loading}
						type='submit'
						name='submit'
						value='Reset Password'
					/>
					<p className='forgot-password-sign-in'>
						<Link to='/sign-in'>Sign In</Link>
					</p>
				</AuthForm>
			</AuthFormParent>
			<AuthFormBottomText>
				Need an account?<Link to='/sign-up'> Sign Up</Link>
			</AuthFormBottomText>
		</>
	);
};

export default ForgotPassword;
