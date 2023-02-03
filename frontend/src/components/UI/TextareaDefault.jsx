import React from 'react';

const TextareaDefault = React.forwardRef((props, ref) => {
	return <textarea {...props} className='default' ref={ref}></textarea>;
});

export default TextareaDefault;
