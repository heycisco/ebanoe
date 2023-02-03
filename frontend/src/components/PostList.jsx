import React from 'react';
import PostItem from './PostItem';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const PostList = ({ posts, loadedPage, pagination, searched }) => {
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
				Displayed: {posts.length} | Search: {searched} | All: {pagination.total}
				</span>
				<span>
					Page: {loadedPage}/{Math.ceil(searched / pagination.pageSize)}
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
