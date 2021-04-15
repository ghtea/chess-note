import * as types from "store/types"; 
import { KindGetListQuiz } from "store/types/data/quiz";

// export const name__GET_LEAGUE_STANDINGS = 'data/football/GET_LEAGUE_STANDINGS';
// type Payload__GET_LEAGUE_STANDINGS = {
//     idLeague: string
// }
// export const return__GET_LEAGUE_STANDINGS = (payload: Payload__GET_LEAGUE_STANDINGS) => {
//     return {
//         type: name__GET_LEAGUE_STANDINGS,
//         payload: payload
//     }
// };
// export type type__GET_LEAGUE_STANDINGS = ReturnType<typeof return__GET_LEAGUE_STANDINGS>;


// export const name__UPDATE_LEAGUE_STANDINGS = 'data/football/UPDATE_LEAGUE_STANDINGS';
// type Payload__UPDATE_LEAGUE_STANDINGS = {
//     idLeague: string,
//     triggeringGet?: boolean,
// }
// export const return__UPDATE_LEAGUE_STANDINGS = (payload: Payload__UPDATE_LEAGUE_STANDINGS) => {
//     return {
//         type: name__UPDATE_LEAGUE_STANDINGS,
//         payload: payload
//     }
// };
// export type type__UPDATE_LEAGUE_STANDINGS = ReturnType<typeof return__UPDATE_LEAGUE_STANDINGS>;






// export const name__GET_LIST_TEAM = 'data/football/GET_LIST_TEAM';
// type Payload__GET_LIST_TEAM = {
//     idCountry?: string,
// }
// export const return__GET_LIST_TEAM = (payload: Payload__GET_LIST_TEAM) => {
//     return {
//         type: name__GET_LIST_TEAM,
//         payload: payload
//     }
// };
// export type type__GET_LIST_TEAM = ReturnType<typeof return__GET_LIST_TEAM>;


// export const name__CHECK_LIST_TEAM = 'data/football/CHECK_LIST_TEAM';
// type Payload__CHECK_LIST_TEAM = {
//     listIdTeam: string[],
// }
// export const return__CHECK_LIST_TEAM = (payload: Payload__CHECK_LIST_TEAM) => {
//     return {
//         type: name__CHECK_LIST_TEAM,
//         payload: payload
//     }
// };
// export type type__CHECK_LIST_TEAM = ReturnType<typeof return__CHECK_LIST_TEAM>;

export const name__MOVE_IN_QUIZ = 'data/quiz/MOVE_IN_QUIZ';
type Payload__MOVE_IN_QUIZ = {
    from?: string;
    to?: string;
    san?: string;
}
export const return__MOVE_IN_QUIZ = (payload: Payload__MOVE_IN_QUIZ) => {
    return {
        type: name__MOVE_IN_QUIZ,
        payload: payload
    }
};
export type type__MOVE_IN_QUIZ = ReturnType<typeof return__MOVE_IN_QUIZ>;



export const name__GET_QUIZ_BY_ID = 'data/quiz/GET_QUIZ_BY_ID';
type Payload__GET_QUIZ_BY_ID = {
    idQuiz: string,
    idUserInApp?: string,
}
export const return__GET_QUIZ_BY_ID = (payload: Payload__GET_QUIZ_BY_ID) => {
    return {
        type: name__GET_QUIZ_BY_ID,
        payload: payload
    }
};
export type type__GET_QUIZ_BY_ID = ReturnType<typeof return__GET_QUIZ_BY_ID>;



export const name__GET_LIST_QUIZ = 'data/quiz/GET_LIST_QUIZ';
type Payload__GET_LIST_QUIZ = {
    kind: KindGetListQuiz,
    idUser?: string,
}
export const return__GET_LIST_QUIZ = (payload: Payload__GET_LIST_QUIZ) => {
    return {
        type: name__GET_LIST_QUIZ,
        payload: payload
    }
};
export type type__GET_LIST_QUIZ = ReturnType<typeof return__GET_LIST_QUIZ>;






export const name__CREATE_QUIZ = 'data/quiz/CREATE_QUIZ';
type Payload__CREATE_QUIZ = {
    name?: string,
    side: 'white' | 'black',
    fenStart: string,
    listListMoveCorrect: string[][],
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


export const name__SAVE_LIST_MOVE = 'data/quiz/SAVE_LIST_MOVE';
type Payload__SAVE_LIST_MOVE = {
    listMove: string[],
    index?: number,
}
export const return__SAVE_LIST_MOVE= (payload: Payload__SAVE_LIST_MOVE) => {
    return {
        type: name__SAVE_LIST_MOVE,
        payload: payload
    }
};
export type type__SAVE_LIST_MOVE = ReturnType<typeof return__SAVE_LIST_MOVE>;



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