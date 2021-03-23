import React, {useState, useCallback} from 'react';


const useInputBasic = <T>(draftInitial: T) => {

	const [draft, setDraft] = useState<T>(draftInitial);
	
    const onChange = useCallback(
        (event:React.ChangeEvent<HTMLInputElement>) => {
            const draftReplacement = {
                ...draft, 
                [event.currentTarget.name]: event.currentTarget.value
            }
            setDraft(draftReplacement);
            // console.log(draftReplacement);
        },[draft]
    );

	return {draft, onChange};
}

export default useInputBasic;