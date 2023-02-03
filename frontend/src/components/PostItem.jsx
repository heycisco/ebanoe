import React from 'react';
import { useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const PostItem = (props) => {
	function localHostFix(data) {
		// return data;
		return data.replace(/(\/uploads\/)/g, 'http://localhost:1337/uploads/');
	}
	function dateFormat(data) {
		const date = data.slice(0, 10).split('-').reverse().join('.');
		const time = data.slice(11, 19);
		return `Date: ${date} | Time: ${time}`;
	}
	const [expand, setExpand] = useState({ class: '', active: false });

	function togglePost(open) {
		if (!props.content.more) {
			return;
		}
		if (open) {
			return setExpand({ class: ' expand', active: true });
		}
		expand.active
			? setExpand({ class: '', active: false })
			: setExpand({ class: ' expand', active: true });
	}

	return (
		<div>
			<div
				className={
					'post' + (props.content.more ? ' more' : '') + expand.class
				}
				onClick={() => togglePost(true)}>
				<div className='post__content'>
					<div className='post__date'>
						{dateFormat(props.content.createdAt)}
					</div>
					<h2 className='post__title'>{props.content.title}</h2>
					{props.content.image.data && (
						<img
							src={localHostFix(props.content.image.data.attributes.url)}
							alt={props.content.image.data.attributes.name}
						/>
					)}
					{props.content.short && (
						<div
							dangerouslySetInnerHTML={{
								__html: localHostFix(props.content.short),
							}}
						/>
					)}
					<TransitionGroup className='animate-def'>
						{props.content.more && expand.active && (
							<CSSTransition timeout={300} classNames='animate-default'>
								<div className='post__more'>
									<div
										dangerouslySetInnerHTML={{
											__html: localHostFix(props.content.more),
										}}
									/>
								</div>
							</CSSTransition>
						)}
					</TransitionGroup>
				</div>

				<div className='post__close' onClick={(e) => e.stopPropagation()}>
					<button onClick={() => togglePost(false)}>Close</button>
				</div>
			</div>
		</div>
	);
};

export default PostItem;
