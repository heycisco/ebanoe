import React from 'react';
import PostItem from './PostItem';

const PostList = ({ title, posts }) => {
	if (!posts.length) {
		return <h1>No content</h1>;
	}
	return (
		<div>
			<h1>{title}</h1>
			<div className='post-list'>
				{posts.map((post) => (
					<PostItem content={post.attributes} key={post.id} />
				))}
			</div>
		</div>
	);
};

export default PostList;
