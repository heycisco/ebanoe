import React from 'react';

const InputDefault = React.forwardRef((props, ref) => {
	return <input {...props} className='default' ref={ref} />;
});

export default InputDefault;
