import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import PostList from './components/PostList';
import PostSearch from './components/PostSearch';
import PostFilter from './components/PostFilter';
import { useSort } from './hooks/useSort';
import LogoDefault from './components/UI/LogoDefault';
import ButtonDefault from './components/UI/ButtonDefault';
import ModalDefault from './components/UI/ModalDefault';
import PostForm from './components/PostForm';
// import logo from './logo.svg';

function App() {
	// const [loadedPage, setLoadedPage] = useState(0);
	const [loadedPage, setLoadedPage] = useState(0);
	const [pagination, setPagination] = useState({ total: 0, pageSize: 0 });
	const [posts, setPosts] = useState([]);
	const [loaded, setLoaded] = useState(false);
	const [fin, setFin] = useState(false);
	const partSize = 2;
	// const [currentPage, setCurrentPage] = useState(1);
	// const [postsTemp] = useState([]);
	// const [ready, setReady] = useState();
	const endOfPage = useRef();
	const observerPage = useRef();

	// useEffect(() => {
	// 	const getPosts = async () => {
	// 		const response = `http://localhost:1337/api/posts/?populate=*&pagination[pageSize]=${partSize}&pagination[page]=${currentPage}`;
	// 		console.log(currentPage);
	// 		const { data } = await axios.get(response);
	// 		setPagination(data.meta.pagination);
	// 		postsTemp.push(...data.data);
	// 		setCurrentPage(currentPage + 1);
	// 		if (currentPage >= data.meta.pagination.pageCount) {
	// 			setReady(true);
	// 		}
	// 	};
	// 	if (ready) {
	// 		setPosts(postsTemp.slice(2));
	// 		setLoaded(true);
	// 		return () => {};
	// 	}
	// 	getPosts();
	// }, [currentPage, postsTemp, ready]);

	useEffect(() => {
		const getPosts = async () => {
			const response = `http://localhost:1337/api/posts/?populate=*`;
			const { data } = await axios.get(response);
			setPosts(data.data);
			setPagination({
				total: data.meta.pagination.total,
				pageSize: partSize,
			});
			setLoaded(true);
			setTimeout(() => {
				setFin(true);
			}, '1000');
		};
		getPosts();
	}, []);

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
					setLoadedPage((loadedPage) => loadedPage + 1);
					console.log('r2');
					return;
				}
			};
			observerPage.current = new IntersectionObserver(callback);
			observerPage.current.observe(endOfPage.current);
		console.log('r1');
		console.log(loadedPage);
		}
	}, [endOfPage, fin]);

	const [modal, setModal] = useState(false);
	function sendFormData(data) {
		console.log(data);
		setModal(false);
	}

	return (
		<div className='App'>
			<div className='main-header'>
				<div className='main-header__logo'>
					<LogoDefault />
				</div>
				<div className='main-header__filters'>
					{loaded && <PostSearch filter={filter} setFilter={setFilter} />}
					{loaded && <PostFilter filter={filter} setFilter={setFilter} />}
				</div>
				<div className='main-header__add-post'>
					<ButtonDefault onClick={() => setModal(true)}>
						Add post
					</ButtonDefault>
				</div>
			</div>

			<PostList
				posts={postsReady.content}
				loadedPage={loadedPage}
				pagination={pagination}
				searched={postsReady.searched}
				endOfPage={endOfPage}
				loaded={loaded}
			/>
			{loaded && (
				<div
					className='scroll-observer'
					ref={endOfPage}
					style={{ height: 1, width: 1 }}
				/>
			)}

			<div className='main-footer'>FOOTER</div>

			<ModalDefault visible={modal} setVisible={setModal}>
				<PostForm submit={sendFormData} />
			</ModalDefault>
		</div>
	);
}

export default App;

// SINGLE EXAMPLE
// http://localhost:1337/api/slugify/slugs/post/post-9999?populate=*
