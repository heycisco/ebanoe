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
	const [postsTemp] = useState([]);
	const [ready, setReady] = useState();
	const endOfPage = useRef();
	const observerPage = useRef();

	useEffect(() => {
		const getPosts = async () => {
			const response = `http://localhost:1337/api/posts/?populate=*&pagination[pageSize]=2&pagination[page]=${currentPage}`;
			console.log(currentPage);
			const { data } = await axios.get(response);
			setPagination(data.meta.pagination);
			postsTemp.push(...data.data);
			setCurrentPage(currentPage + 1);
			if (currentPage >= data.meta.pagination.pageCount) {
				setReady(true);
			}
		};
		if (ready) {
			setPosts(postsTemp.slice(2));
			setLoaded(true);
			return () => {
			};
		}
		getPosts();
	}, [currentPage, postsTemp, ready]);

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
		const postsNow = Math.ceil(postsReady.searched / pagination.pageSize);
		if (loadedPage > postsNow) {
			setLoadedPage(postsNow);
		}
		if (postsReady.searched > 0 && loadedPage < 1) {
			setLoadedPage(1);
		}
	}, [loadedPage, postsReady.searched, pagination.pageSize]);

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
					posts={postsReady.content}
					loadedPage={loadedPage}
					pagination={pagination}
					searched={postsReady.searched}
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
// http://localhost:1337/api/slugify/slugs/post/post-9999?populate=*
