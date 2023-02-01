import React from 'react';
import CheckboxDefault from './UI/CheckboxDefault';
import InputDefault from './UI/InputDefault';
import SelectDefault from './UI/SelectDefault';

const PostFilter = ({ filter, setFilter }) => {
	return (
		<div className='manipulate-content'>
			<div className='search'>
				<InputDefault
					placeholder='Search'
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
			<div className='sort'>
				<SelectDefault
					options={[
						{ value: '', name: 'Default' },
						{ value: 'title', name: 'Title' },
						{ value: 'publishedAt', name: 'Date' },
					]}
					value={filter.sort}
					onChange={(selectedSort) =>
						setFilter({ ...filter, sort: selectedSort })
					}
				/>
				<CheckboxDefault
					name='Reverse'
					id='reverse'
					checked={filter.revert}
					onChange={(e) => setFilter({ ...filter, reverse: e })}
				/>
			</div>
		</div>
	);
};

export default PostFilter;
