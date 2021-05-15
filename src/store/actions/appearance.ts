export const name__REPLACE = 'appearance/REPLACE';
interface Payload__REPLACE {
  listKey: (string | number)[];
  replacement: unknown;
}
export const return__REPLACE = (payload: Payload__REPLACE) => {
  return {
    type: name__REPLACE,
    payload: payload,
  };
};
export type type__REPLACE = ReturnType<typeof return__REPLACE>;
