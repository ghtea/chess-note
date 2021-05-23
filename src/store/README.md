### State Management

[back to to top](#system)

> Redux, immer, Redux saga

- made useful action
  ```typescript
  export const name__REPLACE: string = `status/REPLACE`;
  interface Payload__REPLACE {
    keyList: (string | number)[];
    replacement: any;
  }
  export const return__REPLACE = (payload: Payload__REPLACE) => {
    return {
      type: name__REPLACE,
      payload: payload,
    };
  };
  export type type__REPLACE = ReturnType<typeof return__REPLACE>;
  ```
- divided reducers
  ```typescript
    const rootReducer = combineReducers({
      appearance: appearanceReducer,   // ex. showing each modal or not
      auth: authReducer,  // data of logged user
      data: reducerData,  // data from database
      notification: notificationReducer,  // for notification
      present: reducerPresent,   // for state for present like 'white player's turn to move'
      status: statusReducer,  // for information lik 'user data is ready', 'quiz data is loading'
  });
      ...
  ```
  - made useful saga - chess-note/src/store/sagas/others/
