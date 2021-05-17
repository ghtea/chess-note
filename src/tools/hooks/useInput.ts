import React, {useState} from 'react';

// const useInput = <T>(initial: T)=>{
const useInput = (initialValue:unknown) => {
	const [value, setValue] = useState(initialValue);
	
	const onChange = (event: React.ChangeEvent<HTMLInputElement>)  => {
		setValue(event.target.value);
	}
	return {value, setValue, onChange};
}

export default useInput;