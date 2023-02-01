import React from 'react';

const ButtonDefault = ({children, ...props}) => {
	return (
		<button {...props} className='default'>
			{children}
		</button>
	);
};

export default ButtonDefault;