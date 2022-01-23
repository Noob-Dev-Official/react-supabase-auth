import React, { useState, useRef } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';
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

const UpdateProfile = () => {
	const [email, setEmail] = useState({ email: '' });
	const [password, setPassword] = useState({ password: '' });
	const [error, setError] = useState(false);
	const [errorMssg, setErrorMssg] = useState('');
	const [loading, setLoading] = useState(false);

	const { currentUser, updateEmail, updatePassword } = useAuth();

	const navigate = useNavigate();

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

	const onFormSubmit = (e) => {
		e.preventDefault();

		if (confirmPasswordRef.current.value !== password.password) {
			setPassword({ password: '' });
			confirmPasswordRef.current.value = '';

			setError(true);
			setErrorMssg('Passwords do not match!');

			hideErrorMssg();
			return 'incorrect password';
		} else {
			const promises = [];
			setLoading(true);
			setError(false);

			if (email.email && email.email !== currentUser.email) {
				promises.push(updateEmail(email.email));
			}

			if (password.password) {
				promises.push(updatePassword(password.password));
			}

			Promise.all(promises)
				.then(() => {
					navigate('/');
				})
				.catch((err) => {
					setErrorMssg(err);
					console.log(err);
					hideErrorMssg();
				})
				.finally(() => {
					setLoading(false);
				});
		}

		setLoading(false);
	};

	const hideErrorMssg = () => {
		setTimeout(() => {
			setError(false);
			setErrorMssg('');
		}, 5000);
	};

	return (
		<>
			{error && <Alert mssg={errorMssg} />}
			<AuthFormParent>
				<AuthFormHeading>Update Profile</AuthFormHeading>
				<AuthForm onSubmit={onFormSubmit}>
					<AuthFormEmailDiv>
						<AuthFormLabel>Email</AuthFormLabel>
						<AuthFormInput
							type='text'
							name='email'
							value={email.email}
							onChange={onEmailChange}
						/>
					</AuthFormEmailDiv>
					<AuthFormPasswordDiv>
						<AuthFormLabel>Password</AuthFormLabel>
						<AuthFormInput
							type='password'
							name='password'
							value={password.password}
							onChange={onPasswordChange}
						/>
					</AuthFormPasswordDiv>
					<AuthFormPasswordDiv>
						<AuthFormLabel>Confirm Password</AuthFormLabel>
						<AuthFormInput
							ref={confirmPasswordRef}
							type='password'
							name='password'
							required
						/>
					</AuthFormPasswordDiv>
					<AuthFormSubmitBtn
						disabled={loading}
						type='submit'
						name='submit'
						value='Update'
					/>
				</AuthForm>
			</AuthFormParent>
			<AuthFormBottomText>
				<Link
					style={{
						color: '#D9004C',
					}}
					to='/'
				>
					Cancel
				</Link>
			</AuthFormBottomText>
		</>
	);
};

export default UpdateProfile;
