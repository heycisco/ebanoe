import React from 'react';

const CheckboxDefault = ({ name, id, checked, onChange }) => {
	return (
		<div className='checkbox'>
			<input
				id={id}
				type='checkbox'
				checked={checked}
				onChange={(event) => onChange(event.target.checked)}
			/>
			<label htmlFor={id}>{name}</label>
		</div>
	);
};

export default CheckboxDefault;
