import React from 'react';

const SelectDefault = ({ options, value, onChange }) => {
	return (
		<select value={value} onChange={(event) => onChange(event.target.value)}>
			{options.map((option) => (
				<option value={option.value} key={option.value}>
					{option.name}
				</option>
			))}
		</select>
	);
};

export default SelectDefault;
