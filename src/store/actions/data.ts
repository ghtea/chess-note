export * as quiz from './data/quiz';

export const name__REPLACE = `data/REPLACE`; // 뒤에 as const 를 붙이면 reducer 에서 auth.REPLACE 로 쓸때 오류 뜬다. 아직 이해못
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
export type type__REPLACE = ReturnType<typeof return__REPLACE>; // 리덕스에서의 type, 타입스크립트에서의 type 헷갈림 주의!
