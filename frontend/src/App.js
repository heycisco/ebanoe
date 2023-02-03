import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import PostList from './components/PostList';
import PostFilter from './components/PostFilter';
import { useSort } from './hooks/useSort';
import ButtonDefault from './components/UI/ButtonDefault';
import ModalDefault from './components/UI/ModalDefault';
import PostForm from './components/PostForm';
import logo from './logo.svg';

function App() {
	const [currentPage, setCurrentPage] = useState(1);
	const [loadedPage, setLoadedPage] = useState(0);
	const [pagination, setPagination] = useState({});
	const [posts, setPosts] = useState([]);
	const [loaded, setLoaded] = useState(false);
	const endOfPage = useRef();
	const observerPage = useRef();

	useEffect(() => {
		const response = `http://localhost:1337/api/posts/?populate=*&pagination[pageSize]=2&pagination[page]=${currentPage}`;
		const getPosts = async () => {
			const { data } = await axios.get(response);
			if (currentPage <= data.meta.pagination.pageCount) {
				setPagination(data.meta.pagination);
				setPosts([...posts, ...data.data]);
				return setCurrentPage(currentPage + 1);
			} else {
				return setLoaded(true);
			}
		};
		getPosts();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentPage]);

	const [filter, setFilter] = useState({
		sort: '',
		reverse: false,
		query: '',
		advSearch: false,
	});
	const postsReady = useSort(
		posts,
		filter.sort,
		filter.reverse,
		filter.query,
		filter.advSearch,
		loadedPage * pagination.pageSize,
	);
	useEffect(() => {
		if (loadedPage > pagination.pageCount) {
			setLoadedPage(pagination.pageCount);
		}
	}, [loadedPage, pagination.pageCount]);

	useEffect(() => {
		if (loaded) {
			const callback = function (entries) {
				if (entries[0].isIntersecting) {
					return setLoadedPage((loadedPage) => loadedPage + 1);
				}
			};
			observerPage.current = new IntersectionObserver(callback);
			observerPage.current.observe(endOfPage.current);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loaded, endOfPage]);

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
			{loaded && <PostFilter filter={filter} setFilter={setFilter} />}
			{!loaded ? (
				<h2>Loading…</h2>
			) : (
				<PostList
					posts={postsReady}
					title='Posts'
					loadedPage={loadedPage}
					pagination={pagination}
				/>
			)}
			{loaded && (
				<div
					className='scroll-observer'
					ref={endOfPage}
					style={{ height: 1, width: 1 }}
				/>
			)}
			{loaded && loadedPage === pagination.pageCount && (
				<h2 style={{ marginTop: 24 }}>No more posts</h2>
			)}
			<ModalDefault visible={modal} setVisible={setModal}>
				<PostForm submit={sendFormData} />
			</ModalDefault>
		</div>
	);
}

export default App;

// SINGLE EXAMPLE
// http://localhost:1337/api/slugify/slugs/post/example-post-1?populate=*
