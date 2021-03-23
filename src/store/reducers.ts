import {combineReducers} from 'redux';

import reducerStatus from './reducers/status';
import reducerNotification from './reducers/notification';
import reducerAuth from './reducers/auth';
import reducerData from './reducers/data';



const reducerRoot = combineReducers({
    notification: reducerNotification,
    status: reducerStatus,
    auth: reducerAuth,
    data: reducerData,
});

// redux 에서의 action 속의 type을 name 로 바꿔서 이용 (TypeScript 의 type과 구분하기 위해 )

export default reducerRoot;

export type StateRoot = ReturnType<typeof reducerRoot>; // https://velog.io/@velopert/use-typescript-and-redux-like-a-pro