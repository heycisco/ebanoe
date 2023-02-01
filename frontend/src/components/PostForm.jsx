import React from 'react';
import { useState } from 'react';
import ButtonDefault from './UI/ButtonDefault';
import InputDefault from './UI/InputDefault';

const PostForm = ({ submit }) => {
	const [newContent, setNewContent] = useState({ title: '', content: '' });
	function addNewPost(e) {
		e.preventDefault();
		if (newContent.title.trim()) {
			const data = { ...newContent, id: Date.now() };
			submit(data);
			setNewContent({ title: '', content: '' });
		}
	}

	return (
		<form>
			<InputDefault
				type='text'
				placeholder='Title'
				value={newContent.title}
				onChange={(e) =>
					setNewContent({ ...newContent, title: e.target.value })
				}
			/>
			<InputDefault
				type='text'
				placeholder='Content'
				value={newContent.content}
				onChange={(e) =>
					setNewContent({ ...newContent, content: e.target.value })
				}
			/>
			<ButtonDefault onClick={addNewPost}>Create</ButtonDefault>
		</form>
	);
};

export default PostForm;
