import * as types from "store/types"; 
import {NodeMove} from "store/types/others/TreeMove";
import { KindGetFocusListQuiz } from "store/types/data/quiz";





export const name__MOVE_IN_QUIZ_EDITING = 'data/quiz/MOVE_IN_QUIZ_EDITING';
type Payload__MOVE_IN_QUIZ_EDITING = {
    from?: string;
    to?: string;
    san?: string;
}
export const return__MOVE_IN_QUIZ_EDITING = (payload: Payload__MOVE_IN_QUIZ_EDITING) => {
    return {
        type: name__MOVE_IN_QUIZ_EDITING,
        payload: payload
    }
};
export type type__MOVE_IN_QUIZ_EDITING = ReturnType<typeof return__MOVE_IN_QUIZ_EDITING>;



export const name__MOVE_IN_QUIZ_PLAYING = 'data/quiz/MOVE_IN_QUIZ_PLAYING';
type Payload__MOVE_IN_QUIZ_PLAYING = {
    from?: string;
    to?: string;
    san?: string;
}
export const return__MOVE_IN_QUIZ_PLAYING = (payload: Payload__MOVE_IN_QUIZ_PLAYING) => {
    return {
        type: name__MOVE_IN_QUIZ_PLAYING,
        payload: payload
    }
};
export type type__MOVE_IN_QUIZ_PLAYING = ReturnType<typeof return__MOVE_IN_QUIZ_PLAYING>;



export const name__BACK_TO_START = 'data/quiz/BACK_TO_START';
export const return__BACK_TO_START = ( ) => {
    return {
        type: name__BACK_TO_START    
    }
};
export type type__BACK_TO_START = ReturnType<typeof return__BACK_TO_START>;



export const name__FOCUS_QUIZ = 'data/quiz/FOCUS_QUIZ';
type Payload__FOCUS_QUIZ = {
    quiz?: types.data.quiz.Quiz,
    situation: types.present.quiz.Situation, 
}
export const return__FOCUS_QUIZ = (payload: Payload__FOCUS_QUIZ) => {
    return {
        type: name__FOCUS_QUIZ,
        payload: payload
    }
};
export type type__FOCUS_QUIZ = ReturnType<typeof return__FOCUS_QUIZ>;



export const name__GET_LIST_QUIZ = 'data/quiz/GET_LIST_QUIZ';
type Payload__GET_LIST_QUIZ = {
    idUser?: string,
}
export const return__GET_LIST_QUIZ = (payload: Payload__GET_LIST_QUIZ) => {
    return {
        type: name__GET_LIST_QUIZ,
        payload: payload
    }
};
export type type__GET_LIST_QUIZ = ReturnType<typeof return__GET_LIST_QUIZ>;



export const name__GET_QUIZ_BY_ID = 'data/quiz/GET_QUIZ_BY_ID';
type Payload__GET_QUIZ_BY_ID = {
    idQuiz: string,
    idUserInApp?: string,
    situation: types.present.quiz.Situation, 
}
export const return__GET_QUIZ_BY_ID = (payload: Payload__GET_QUIZ_BY_ID) => {
    return {
        type: name__GET_QUIZ_BY_ID,
        payload: payload
    }
};
export type type__GET_QUIZ_BY_ID = ReturnType<typeof return__GET_QUIZ_BY_ID>;



export const name__GET_DICT_LIST_QUIZ = 'data/quiz/GET_DICT_LIST_QUIZ';
type Payload__GET_DICT_LIST_QUIZ = {
    idUser?: string,
}
export const return__GET_DICT_LIST_QUIZ = (payload: Payload__GET_DICT_LIST_QUIZ) => {
    return {
        type: name__GET_DICT_LIST_QUIZ,
        payload: payload
    }
};
export type type__GET_DICT_LIST_QUIZ = ReturnType<typeof return__GET_DICT_LIST_QUIZ>;



export const name__GET_FOCUS_LIST_QUIZ = 'data/quiz/GET_FOCUS_LIST_QUIZ';
type Payload__GET_FOCUS_LIST_QUIZ = {
    kind: KindGetFocusListQuiz,
    idUser?: string,
}
export const return__GET_FOCUS_LIST_QUIZ = (payload: Payload__GET_FOCUS_LIST_QUIZ) => {
    return {
        type: name__GET_FOCUS_LIST_QUIZ,
        payload: payload
    }
};
export type type__GET_FOCUS_LIST_QUIZ = ReturnType<typeof return__GET_FOCUS_LIST_QUIZ>;






export const name__CREATE_QUIZ = 'data/quiz/CREATE_QUIZ';
type Payload__CREATE_QUIZ = {
    name?: string,
    turnNext: 'white' | 'black',
    fenStart: string,
    listSeriesSanCorrect: string[][],
    listSeriesSanMention: string[][],
    idUser: string,
    isPublic: boolean,
}
export const return__CREATE_QUIZ = (payload: Payload__CREATE_QUIZ) => {
    return {
        type: name__CREATE_QUIZ,
        payload: payload
    }
};
export type type__CREATE_QUIZ = ReturnType<typeof return__CREATE_QUIZ>;




export const name__WATCH_FEN_START_CHANGE = 'data/quiz/WATCH_FEN_START_CHANGE';
export const return__WATCH_FEN_START_CHANGE= () => {
    return {
        type: name__WATCH_FEN_START_CHANGE
    }
};
export type type__WATCH_FEN_START_CHANGE = ReturnType<typeof return__WATCH_FEN_START_CHANGE>;


// export const name__SAVE_LIST_SAN_MOVE_AS_ANSWER = 'data/quiz/SAVE_LIST_SAN_MOVE_AS_ANSWER';
// type Payload__SAVE_LIST_SAN_MOVE_AS_ANSWER = {
//     seriesSan: string[],
// }
// export const return__SAVE_LIST_SAN_MOVE_AS_ANSWER= (payload: Payload__SAVE_LIST_SAN_MOVE_AS_ANSWER) => {
//     return {
//         type: name__SAVE_LIST_SAN_MOVE_AS_ANSWER,
//         payload: payload
//     }
// };
// export type type__SAVE_LIST_SAN_MOVE_AS_ANSWER = ReturnType<typeof return__SAVE_LIST_SAN_MOVE_AS_ANSWER>;




/*
export const name__MANIPULATE_DATA = 'data/MANIPULATE_DATA';
type Payload__MANIPULATE_DATA = {
    kind: 'create' | 'update',
    draft: any,
    id? : string,
    idOwner?: string,
}
export const return__MANIPULATE_DATA = (payload: Payload__MANIPULATE_DATA) => {
    return {
        type: name__MANIPULATE_DATA,
        payload: payload
    }
};
export type type__MANIPULATE_DATA = ReturnType<typeof return__MANIPULATE_DATA>;




export const name__DELETE_DATA = 'data/DELETE_DATA';
interface Payload__DELETE_DATA {
    id: string;
    urlImageIcon: string | undefined;
    idUser: string | undefined;
}
export const return__DELETE_DATA = (payload: Payload__DELETE_DATA) => {
    return {
        type: name__DELETE_DATA,
        payload: payload
    }
};
export type type__DELETE_DATA = ReturnType<typeof return__DELETE_DATA>;



export const name__GET_DATA = 'data/GET_DATA'; 
export const return__GET_DATA = (payload: any) => {
    return {
        type: name__GET_DATA,
        payload: payload
    }
};
export type type__GET_DATA = ReturnType<typeof return__GET_DATA>;

*/