import { call, select, put } from "redux-saga/effects";
//import { firebaseFirestore } from "firebaseApp";

import {ChessInstance, Move, Square } from 'chess.js'
import chessFocusing from 'chessApp';

// import * as config from 'config';
import {StateRoot} from 'store/reducers';
import * as actions from "store/actions";
import * as types from "store/types";




function* moveInQuizPlaying(action: actions.data.quiz.type__MOVE_IN_QUIZ_PLAYING) {

    const {from, to, san} = action.payload;
    //console.log(to, from, to, san)
    // yield put( actions.data.quiz.return__MOVE_IN_QUIZ_EDITING({
    //     from, to, san
    // }) );
    const quizFocusing: types.data.quiz.Quiz =  yield select( (state:StateRoot) => state.data.quiz.focusing ); 
    const quizPresent: types.present.QuizPresent =  yield select( (state:StateRoot) => state.present.quiz ); 
    
    try {

        chessFocusing.turn();
        //console.log('fen: ', chessFocusing.fen())
        let result = null as Move | null;

        if (san){
            result = chessFocusing.move(san);
        }
        else {
            result = chessFocusing.move({from: from as Square, to: to as Square});
        }

        // if move was valid
        // 처음 플레이어의 움직임이 가능한 움직임 이였다면, 
        // 정답의 움직임에 속하는지 파악
        // 정답에 속하면 다음 상대 움직임이 있는지 파악하고, 
        // 없으면 최종 성공, 있으면 다음 상대 움직임 자동 실행
        if (result === null) {
            console.log('move was not valid')
        }
        else {
            
            const listSeriesSanCorrect = quizFocusing.listSeriesSanCorrect

            // 이전까지의 listSanMove (quizPresent) 에 현재 움직임을 포함한 배열을 
            // 처음부터 포함하는 정답 움직임이 있어야 한다 
            const seriesSanUntilThis = [...quizPresent.seriesSan, result?.san];
            
            // 정답 움직임 모음집 에서 여태까지의 움직임과 일치하는 모음집 부분집합 구하기
            const listSeriesSanCorrectIncluding = listSeriesSanCorrect.filter(seriesSanCorrectEach=>{
                const indexIncludingAll = seriesSanCorrectEach.join('-').indexOf(seriesSanUntilThis.join('-'));
                // 처음 움직임부터 동일해야 한다
                if (indexIncludingAll === 0){
                    return true;
                }
                else {
                    return false;
                }
            });

            // 여태까지의 움직임 만족하는게 있다면
            if (listSeriesSanCorrectIncluding.length > 0){
                const indexSameMove = listSeriesSanCorrectIncluding.findIndex(e=>e.length === seriesSanUntilThis.length);
                
                // 끝까지 동일한 정답 움직임이 있다면 => 즉 정답!
                if (indexSameMove !== -1){
                    // correct!
                    console.log("correct!");

                    const replacement = {
                        ...quizPresent,
                        fen: chessFocusing.fen(),
                        turn: chessFocusing.turn() === 'w' ? 'white' : 'black',
                        listSanMove: [...quizPresent.seriesSan, result.san],
                    }
            
                    yield put( actions.present.return__REPLACE({
                        listKey: [ 'quiz'],
                        replacement,
                    }) );

                }
                // 움직임이 더 남아 있어서, 상대 움직임을 자동으로 실현해야줘야 한다
                else {
                    // index 0 이 아무것도 안한 처음 상태, +1 한 상태가 방금 플레이어의 수, +2 한 상태가 다음 자동적으로 둘 수
                    const sanNext = listSeriesSanCorrectIncluding[0][seriesSanUntilThis.length -1 + 1];

                    let result = chessFocusing.move(sanNext);


                    if (!result) {
                        console.log('move in answer was not valid')
                    }
                    else {
            
                        // const fen = chessFocusing.fen();
            
                        const replacement = {
                            ...quizPresent,
                            fen: chessFocusing.fen(),
                            turn: chessFocusing.turn() === 'w' ? 'white' : 'black',
                            seriesSan: [...quizPresent.seriesSan, result.san],
                        }
                
                        yield put( actions.present.return__REPLACE({
                            listKey: [ 'quiz'],
                            replacement,
                        }) );
                
                    }
                }
            }
            else {
                console.log('wrong move!!!');
                // 해당 움직임 취소
                chessFocusing.undo();
            }
            
    
        }
        

        // 여기까지 Editing 에서와 동일


        
        
    } catch (error) {
        
        console.error(error);
        
        // yield put( actions.notification.return__ADD_DELETE_BANNER({
        //     codeSituation: 'CreateQuiz_UnknownError__E'
        // }) );
    }
}

export default moveInQuizPlaying;


