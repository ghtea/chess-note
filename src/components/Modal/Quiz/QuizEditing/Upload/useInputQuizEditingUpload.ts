import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import * as actions from 'store/actions';

const useInputQuizEditingUpload = <T>(draftInitial: T) => {
  const dispatch = useDispatch();
  const [draft, setDraft] = useState<T>(draftInitial);

  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.currentTarget.name === 'name') {
        dispatch(
          actions.data.return__REPLACE({
            keyList: ['quiz', 'focusing', 'name'],
            replacement: event.currentTarget.value,
          }),
        );
      } else if (event.currentTarget.name === 'isPublic') {
        dispatch(
          actions.data.return__REPLACE({
            keyList: ['quiz', 'focusing', 'isPublic'],
            replacement: event.currentTarget.value === 'isPublic',
          }),
        );
      } else {
        const draftReplacement = {
          ...draft,
          [event.currentTarget.name]: event.currentTarget.value,
        };
        setDraft(draftReplacement);
        // console.log(draftReplacement);
      }
    },
    [draft],
  );

  return { draft, onChange };
};

export default useInputQuizEditingUpload;
