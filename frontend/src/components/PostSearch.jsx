import React from 'react';
import CheckboxDefault from './UI/CheckboxDefault';
import InputDefault from './UI/InputDefault';

const PostSearch = ({ filter, setFilter }) => {
	return (
		<div className='search form-group'>
			<InputDefault
				placeholder='Search'
				type='text'
				value={filter.query}
				onChange={(e) => setFilter({ ...filter, query: e.target.value })}
			/>
			<CheckboxDefault
				name='All content'
				id='all_content'
				checked={filter.advSearch}
				onChange={(e) => setFilter({ ...filter, advSearch: e })}
			/>
		</div>
	);
};

export default PostSearch;
