import React from 'react';
import { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import PostFilter from './components/PostFilter';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import ButtonDefault from './components/UI/ButtonDefault';
import ModalDefault from './components/UI/ModalDefault';
import logo from './logo.svg';

function App() {
	const [error, setError] = useState(null);
	const [posts, setPosts] = useState([]);
	useEffect(() => {
		axios
			.get('http://localhost:1337/api/posts?populate=*')
			.then(({ data }) => {
				setPosts(data.data);
			})
			.catch((error) => setError(error));
	}, []);
	if (error) {
		console.log('Error:' + error.message);
	}

	const [filter, setFilter] = useState({
		sort: '',
		reverse: false,
		query: '',
		advSearch: false,
	});
	const sortedPosts = useMemo(() => {
		let postsTemp = posts;
		if (filter.sort) {
			postsTemp = [...posts].sort((a, b) =>
				a.attributes[filter.sort].localeCompare(b.attributes[filter.sort]),
			);
		}
		if (filter.reverse) {
			postsTemp = [...postsTemp].reverse();
		}
		return postsTemp;
	}, [filter.sort, filter.reverse, posts]);
	const sortedSearchedPost = useMemo(() => {
		let postsTemp = sortedPosts;
		let queryTemp = filter.query.toLowerCase();
		function sanitize(data) {
			return data.replace(/<[^>]+>/g, '').toLowerCase();
		}
		if (!filter.advSearch) {
			postsTemp = postsTemp.filter((post) =>
				post.attributes.title.toLowerCase().includes(queryTemp),
			);
		} else {
			postsTemp = postsTemp.filter((post) => {
				return (
					post.attributes.title.toLowerCase().includes(queryTemp) ||
					sanitize(post.attributes.short).includes(queryTemp) ||
					sanitize(post.attributes.more).includes(queryTemp)
				);
			});
		}
		return postsTemp;
	}, [filter.query, filter.advSearch, sortedPosts]);

	const [modal, setModal] = useState(false);

	function sendFormData(data) {
		console.log(data);
		setModal(false);
	}

	return (
		<div className='App'>
			<img className='logo' src={logo} alt='logo' />
			<ButtonDefault onClick={() => setModal(true)}>
				Open modal
			</ButtonDefault>
			<PostFilter filter={filter} setFilter={setFilter} />
			<PostList posts={sortedSearchedPost} title='Posts' />
			<ModalDefault visible={modal} setVisible={setModal}>
				<PostForm submit={sendFormData} />
			</ModalDefault>
		</div>
	);
}

export default App;

// SINGLE EXAMPLE
// http://localhost:1337/api/slugify/slugs/post/example-post-1?populate=*