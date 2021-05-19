import { combineReducers } from 'redux';

import appearanceReducer from './appearance';
import authReducer from './auth';
import quizReducer from './quiz';
import notificationReducer from './notification';
import statusReducer from './status';

const rootReducer = combineReducers({
  appearance: appearanceReducer,
  auth: authReducer,
  quiz: quizReducer,
  notification: notificationReducer,
  status: statusReducer,
});

// redux 에서의 action 속의 type을 name 로 바꿔서 이용 (TypeScript 의 type과 구분하기 위해 )

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>; // https://velog.io/@velopert/use-typescript-and-redux-like-a-pro
