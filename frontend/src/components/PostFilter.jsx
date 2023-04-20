import React from 'react';
import CheckboxDefault from './UI/CheckboxDefault';
import SelectDefault from './UI/SelectDefault';

const PostFilter = ({ filter, setFilter }) => {
	return (
		<div className='sort form-group'>
			<SelectDefault
				options={[
					{ value: '', name: 'Default' },
					{ value: 'title', name: 'Title' },
					{ value: 'createdAt', name: 'Created' },
					{ value: 'updatedAt', name: 'Udpated' },
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
	);
};

export default PostFilter;
