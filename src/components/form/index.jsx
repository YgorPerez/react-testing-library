import React, { useState } from 'react';
import validator from 'validator';

export default function Form() {
	const [signUpInput, setSignUpInput] = useState({
		email: '',
		password: '',
		confirmPassword: '',
	});

	const handleInput = (e) => {
		setSignUpInput({
			...signUpInput,
			[e.target.name]: e.target.value,
		});
	};

	const [error, setError] = useState('');

	const handleClick = (e) => {
		e.preventDefault();
		if (!validator.isEmail(signUpInput.email)) {
			return setError('Please enter a valid email');
		} else if (signUpInput.password.length < 5) {
			return setError('Password must be at least 5 characters');
		} else if (signUpInput.password !== signUpInput.confirmPassword) {
			return setError('Passwords do not match');
		} else {
			return setError('');
		}
	};

	return (
		<form>
			<div className='container mb-3 mt-3'>
				<label htmlFor='email' className='form-label'>
					Email address:
				</label>
				<input
					type='email'
					id='email'
					name='email'
					className='form-control'
					value={signUpInput.email}
					onChange={handleInput}
				/>
				<label htmlFor='password' className='form-label'>
					Password:
				</label>
				<input
					type='password'
					placeholder='FJjf#q%2!32'
					name='password'
					id='password'
					className='form-control'
					value={signUpInput.password}
					onChange={handleInput}
				/>
				<label htmlFor='confirm-password' className='form-label'>
					Confirm password:{' '}
				</label>
				<input
					type='password'
					placeholder='FJjf#q%2!32'
					name='confirmPassword'
					id='confirm-password'
					className='form-control'
					value={signUpInput.confirmPassword}
					onChange={handleInput}
				/>
				{error && <p className='alert alert-danger'>{error}</p>}
				<button
					type='submit'
					className='btn btn-primary'
					onClick={handleClick}
				>
					Submit
				</button>
			</div>
		</form>
	);
}
