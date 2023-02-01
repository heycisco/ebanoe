import React from 'react';

const ModalDefault = ({ children, visible, setVisible }) => {
	const modalClasses = ['modal'];
	if (visible) {
		modalClasses.push('active');
	}
	return (
		<div className={modalClasses.join(' ')} onClick={() => setVisible(false)}>
			<div className='modal__wrapper' onClick={(e) => e.stopPropagation()}>
				{children}
			</div>
		</div>
	);
};

export default ModalDefault;
