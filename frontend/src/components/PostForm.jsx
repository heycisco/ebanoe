import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import ButtonDefault from './UI/ButtonDefault';
import InputDefault from './UI/InputDefault';
import TextareaDefault from './UI/TextareaDefault';

const PostForm = ({ submit }) => {
	const [user, setUser] = useState({
		username: '',
		email: '',
		token: localStorage.getItem('token'),
		password: '',
	});
	if (localStorage.getItem('username')) {
		user.username = localStorage.getItem('username');
	}
	const [registerNow, setRegisterNow] = useState({
		register: false,
		label: 'Need to register?',
	});

	// useEffect(() => {
	// 	if (user.username && user.password) {
	// 		console.log('1');
	// 	} else {
	// 		console.log('2');
	// 	}
	// }, [user]);

	function switchMode(e) {
		e.preventDefault();
		!registerNow.register
			? setRegisterNow({ register: true, label: 'Already have an account?' })
			: setRegisterNow({ register: false, label: 'Need to register?' });
	}

	function login(e) {
		e.preventDefault();
		if (user.username && user.password) {
			axios
				.post('http://localhost:1337/api/auth/local', {
					identifier: user.username,
					password: user.password,
				})
				.then((response) => {
					console.log(response.data.user);

					localStorage.setItem('username', response.data.user.username);
					localStorage.setItem('token', response.data.jwt);
					setUser({
						username: response.data.user.username,
						token: response.data.jwt,
					});
				})
				.catch((error) => {
					console.log('An error occurred:', error.response);
				});
		}
	}

	function register(e) {
		e.preventDefault();
		if (user.username && user.password) {
			axios
				.post('http://localhost:1337/api/auth/local/register', {
					username: user.username,
					email: user.email,
					password: user.password,
				})
				.then((response) => {
					console.log(response.data.user);

					localStorage.setItem('username', response.data.user.username);
					localStorage.setItem('token', response.data.jwt);
					setUser({
						username: response.data.user.username,
						token: response.data.jwt,
					});
				})
				.catch((error) => {
					console.log('An error occurred:', error.response);
				});
		}
	}

	function logout(e) {
		e.preventDefault();
		setUser({
			username: '',
			token: '',
			password: '',
		});
		localStorage.removeItem('username');
		localStorage.removeItem('token');
	}

	const [newContent, setNewContent] = useState({ title: '', short: '' });
	function addNewPost(e) {
		e.preventDefault();
		if (newContent.title.trim()) {
			sent({
				title: newContent.title,
				short: fixNewLine(newContent.short),
				categories: [2],
			});
		}
	}

	function fixNewLine(data) {
		return data.replace(/(\r\n|\r|\n)/g, '<br>');
	}

	const sent = async (data) => {
		console.log(data);
		await axios
			.post(
				'http://localhost:1337/api/posts',
				{ data: data },
				{
					headers: {
						Authorization: `Bearer ${user.token}`,
					},
				},
			)
			.then((response) => {
				console.log(response);
				submit(response);
				setNewContent({ title: '', short: '' });
			})
			.catch((error) => {
				console.log(error);
			});
	};

	if (user.token) {
		return (
			<form className='add-post'>
				<InputDefault
					type='text'
					placeholder='Title'
					value={newContent.title}
					onChange={(e) =>
						setNewContent({ ...newContent, title: e.target.value })
					}
				/>
				<TextareaDefault
					value={newContent.short}
					placeholder='Add some content'
					onChange={(e) =>
						setNewContent({
							...newContent,
							short: e.target.value,
						})
					}
				/>
				<ButtonDefault onClick={addNewPost}>Create</ButtonDefault>
				<button onClick={logout}>logout</button>
			</form>
		);
	}
	return (
		<div>
			<h4>Login to add a post</h4>
			<form className='login'>
				<InputDefault
					type='text'
					placeholder='Name'
					value={user.username}
					onChange={(e) => setUser({ ...user, username: e.target.value })}
				/>
				{registerNow.register && (
					<InputDefault
						type='email'
						placeholder='E-mail'
						value={user.email}
						onChange={(e) => setUser({ ...user, email: e.target.value })}
					/>
				)}
				<InputDefault
					type='password'
					placeholder='Password'
					value={user.password}
					onChange={(e) => setUser({ ...user, password: e.target.value })}
				/>
				{!registerNow.register ? (
					<button onClick={login}>Login</button>
				) : (
					<button onClick={register}>Register</button>
				)}
			</form>
			<button className='secondary' onClick={switchMode}>
				{registerNow.label}
			</button>
		</div>
	);
};

export default PostForm;
