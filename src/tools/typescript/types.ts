

// I had wrote this, but I forgot what it is...

// 아마 자동 완성만 도와주도록 한것인듯?
export type UnionSuggesting<T extends U, U = string> = T | (U & Record<string, unknown>);
