import {combineReducers} from 'redux';

import reducerAppearance from './reducers/appearance';
import reducerAuth from './reducers/auth';
import reducerData from './reducers/data';
import reducerNotification from './reducers/notification';
import reducerPresent from './reducers/present';
import reducerStatus from './reducers/status';

const reducerRoot = combineReducers({
    appearance: reducerAppearance,
    auth: reducerAuth,
    data: reducerData,
    notification: reducerNotification,
    present: reducerPresent,
    status: reducerStatus,
});

// redux 에서의 action 속의 type을 name 로 바꿔서 이용 (TypeScript 의 type과 구분하기 위해 )

export default reducerRoot;

export type StateRoot = ReturnType<typeof reducerRoot>; // https://velog.io/@velopert/use-typescript-and-redux-like-a-pro