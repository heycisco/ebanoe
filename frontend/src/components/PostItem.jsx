import React from 'react';

const PostItem = (props) => {
	function localHostFix(data) {
		// return data;
		return data.replace(/(\/uploads\/)/g, 'http://localhost:1337/uploads/');
	}
	return (
		<div className='post'>
			<div className='post__content'>
				<h2>{props.content.title}</h2>
				{props.content.short && (
					<div
						dangerouslySetInnerHTML={{
							__html: localHostFix(props.content.short),
						}}
					/>
				)}
				{props.content.more && (
					<div
						dangerouslySetInnerHTML={{
							__html: localHostFix(props.content.more),
						}}
					/>
				)}
			</div>
		</div>
	);
};

export default PostItem;
