export const name__REPLACE = `notification/REPLACE`; // 뒤에 as const 를 붙이면 reducer 에서 status.REPLACE 로 쓸때 오류 뜬다. 아직 이해못

interface Payload__REPLACE {
  keyList: (string | number)[];
  replacement: unknown;
}

export const return__REPLACE = (payload: Payload__REPLACE) => {
  return {
    type: name__REPLACE,
    payload: payload,
  };
};
export type type__REPLACE = ReturnType<typeof return__REPLACE>;

export const name__ADD_DELETE_BANNER = `notification/ADD_DELETE_BANNER`;
interface Payload__ADD_DELETE_BANNER {
  situationCode: string;
  messageValues?: Record<string, React.ReactNode>;
}
export const return__ADD_DELETE_BANNER = (payload: Payload__ADD_DELETE_BANNER) => {
  return {
    type: name__ADD_DELETE_BANNER,
    payload: payload,
  };
};
export type type__ADD_DELETE_BANNER = ReturnType<typeof return__ADD_DELETE_BANNER>;

export const name__DELETE_BANNER = `notification/DELETE_BANNER`; // 뒤에 as const 를 붙이면 reducer 에서 notification.REPLACE 로 쓸때 오류 뜬다. 아직 이해못
interface Payload__DELETE_BANNER {
  id: string;
}
export const return__DELETE_BANNER = (payload: Payload__DELETE_BANNER) => {
  return {
    type: name__DELETE_BANNER,
    payload: payload,
  };
};
export type type__DELETE_BANNER = ReturnType<typeof return__DELETE_BANNER>;

export const name__ADD_CODE_SITUATION_OTHERS = `notification/ADD_CODE_SITUATION_OTHERS`;
interface Payload__ADD_CODE_SITUATION_OTHERS {
  situationCode: string;
}
export const return__ADD_CODE_SITUATION_OTHERS = (payload: Payload__ADD_CODE_SITUATION_OTHERS) => {
  return {
    type: name__ADD_CODE_SITUATION_OTHERS,
    payload: payload,
  };
};
export type type__ADD_CODE_SITUATION_OTHERS = ReturnType<typeof return__ADD_CODE_SITUATION_OTHERS>;

export const name__DELETE_CODE_SITUATION_OTHERS = `notification/DELETE_CODE_SITUATION_OTHERS`;
interface Payload__DELETE_CODE_SITUATION_OTHERS {
  situationCode?: string;
  regex?: RegExp;
}
export const return__DELETE_CODE_SITUATION_OTHERS = (
  payload: Payload__DELETE_CODE_SITUATION_OTHERS,
) => {
  return {
    type: name__DELETE_CODE_SITUATION_OTHERS,
    payload: payload,
  };
};

export type type__DELETE_CODE_SITUATION_OTHERS = ReturnType<
  typeof return__DELETE_CODE_SITUATION_OTHERS
>;

/*
type typeAction =
  | ReturnType<typeof increase>
  | ReturnType<typeof decrease>
  | ReturnType<typeof increaseBy>;
  */
// typescript 안의 type 과 redux 의 type 구분 주의!

/*
    Notification
        {
            id: 'ddd',
            situation: '',
            message: 'ddd',
            created: 2020. ...
        }
*/
