import React from 'react';
import PostItem from './PostItem';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const PostList = ({ title, posts, loadedPage, pagination }) => {
	if (!posts.length) {
		return (
			<div>
				<h1>No content</h1>
			</div>
		);
	}
	return (
		<div>
			<div className='post-info'>
				<span>
					{title}: {posts.length}/{pagination.total}
				</span>
				<span>
					Page: {loadedPage}/{pagination.pageCount}
				</span>
			</div>

			<TransitionGroup className='post-list'>
				{posts.map((post) => (
					<CSSTransition
						key={post.id}
						timeout={1000}
						classNames='animate-default'>
						<PostItem content={post.attributes} />
					</CSSTransition>
				))}
			</TransitionGroup>
		</div>
	);
};

export default PostList;
