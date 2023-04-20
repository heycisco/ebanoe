import React, { useState, useEffect, useRef } from 'react';
import PostItem from './PostItem';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const PostList = ({ posts, loadedPage, pagination, searched, loaded }) => {
	return (
		<main className='posts'>
			{loaded && (
				<div className='posts__info'>
					<span>
						Displayed: {posts.length} | Search: {searched} | All:{' '}
						{pagination.total}
					</span>
					<span>
						Page: {loadedPage}/{Math.ceil(searched / pagination.pageSize)}
					</span>
				</div>
			)}
			<div className='posts-state-msg'>
				{!loaded && <h2>Loading…</h2>}
				{loaded && !posts.length && <h2>No content</h2>}
			</div>
			{loaded && (
				<TransitionGroup className='posts__list'>
					{posts.map((post) => (
						<CSSTransition
							key={post.id}
							timeout={1000}
							classNames='animate-default'>
							<PostItem content={post.attributes} />
						</CSSTransition>
					))}
				</TransitionGroup>
			)}
			{loaded && loadedPage === pagination.pageCount && (
				<h2 style={{ marginTop: 24 }}>No more posts</h2>
			)}
		</main>
	);
};

export default PostList;
