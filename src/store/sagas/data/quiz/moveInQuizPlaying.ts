import { call, select, put, delay } from "redux-saga/effects";
//import { firebaseFirestore } from "firebaseApp";

import {ChessInstance, Move, Square } from 'chess.js'
import chessFocusing from 'libraries/chess';

// import * as config from 'config';
import {StateRoot} from 'store/reducers';
import * as actions from "store/actions";
import * as types from "store/types";


function timeout(ms:number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function* moveInQuizPlaying(action: actions.data.quiz.type__MOVE_IN_QUIZ_PLAYING) {

    const {from, to, san} = action.payload;
    //console.log(to, from, to, san)
    // yield put( actions.data.quiz.return__MOVE_IN_QUIZ_EDITING({
    //     from, to, san
    // }) );
    const quizData: types.data.quiz.Quiz =  yield select( (state:StateRoot) => state.data.quiz.focusing ); 
    const quizPresent: types.present.quiz.Quiz =  yield select( (state:StateRoot) => state.present.quiz.focusing ); 
    
    let seriesSan = quizPresent.seriesSan || [];

    try {

        chessFocusing.turn();
        //console.log('fen: ', chessFocusing.fen())
        let moveTried = null as Move | null;

        if (san){
            moveTried = chessFocusing.move(san);
        }
        else {
            moveTried = chessFocusing.move({from: from as Square, to: to as Square});
        }

        // if move was valid
        // 처음 플레이어의 움직임이 가능한 움직임 이였다면, 
        // 정답의 움직임에 속하는지 파악
        // 정답에 속하면 다음 상대 움직임이 있는지 파악하고, 
        // 없으면 최종 성공, 있으면 다음 상대 움직임 자동 실행
        if (moveTried === null) {
            //console.log('move was not valid');
            
            // yield put( actions.notification.return__ADD_DELETE_BANNER({
            //     codeSituation: 'PlayQuiz_NotAvailableMove__W'
            // }) );
        }
        else {

            seriesSan = [...seriesSan, moveTried.san];
            // 먼저 플레이어가 둔 수 둔다
            const replacement = {
                ...quizPresent,
                fen: chessFocusing.fen(),
                turn: chessFocusing.turn() === 'w' ? 'white' : 'black',
                seriesSan: seriesSan,
            }
            yield put( actions.present.return__REPLACE({
                listKey: [ 'quiz', 'focusing'],
                replacement,
            }) );

            yield delay(1000);
            
            const listSeriesSanCorrect = quizData.listSeriesSanCorrect

            // 이전까지의 listSanMove (quizPresent) 에 현재 움직임을 포함한 배열을 
            // 처음부터 포함하는 정답 움직임이 있어야 한다 
            //const seriesSanUntilThis = [...quizPresent.seriesSan, result?.san];
            
            // 정답 움직임 모음집 에서 여태까지의 움직임과 일치하는 모음집 부분집합 구하기
            const listSeriesSanCorrectIncluding = listSeriesSanCorrect.filter(seriesSanCorrectEach=>{
                const indexIncludingAll = seriesSanCorrectEach.join('-').indexOf(seriesSan.join('-'));
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
                const indexSameMove = listSeriesSanCorrectIncluding.findIndex(e=>e.length === seriesSan.length);
                
                // 끝까지 동일한 정답 움직임이 있다면 => 즉 정답!
                if (indexSameMove !== -1){
                    // correct!
                    console.log("correct!");

                    yield put( actions.notification.return__ADD_DELETE_BANNER({
                        codeSituation: 'PlayQuiz_Correct__S'
                    }) );
                    // const replacement = {
                    //     ...quizPresent,
                    //     fen: chessFocusing.fen(),
                    //     turn: chessFocusing.turn() === 'w' ? 'white' : 'black',
                    //     seriesSan: [...quizPresent.seriesSan, result.san],
                    // }
            
                    yield put( actions.present.return__REPLACE({
                        listKey: [ 'quiz', 'focusing', 'situation'],
                        replacement: 'solved',
                    }) );

                }
                // 움직임이 더 남아 있어서, 상대 움직임을 자동으로 실현해야줘야 한다
                else {
                    // index 0 이 아무것도 안한 처음 상태, +1 한 상태가 방금 플레이어의 수, +2 한 상태가 다음 자동적으로 둘 수
                    const sanNext = listSeriesSanCorrectIncluding[0][seriesSan.length -1 + 1];


                    const result = chessFocusing.move(sanNext);


                    if (!result) {
                        //console.log('move in answer was not valid')
                        yield put( actions.notification.return__ADD_DELETE_BANNER({
                            codeSituation: 'PlayQuiz_NotAvailableMove__W'
                        }) );
                    }
                    else {
                        seriesSan = [...seriesSan, result.san]
                        // const fen = chessFocusing.fen();
                        //console.log('herrrr')
                        const replacement = {
                            ...quizPresent,
                            fen: chessFocusing.fen(),
                            turn: chessFocusing.turn() === 'w' ? 'white' : 'black',
                            seriesSan: seriesSan,
                        }

                
                        yield put( actions.present.return__REPLACE({
                            listKey: [ 'quiz', 'focusing'],
                            replacement,
                        }) );
                
                    }
                }
            } 
            else { // 가능한 움직임이지만, 정답에 속한 움직임은 아닐때
                console.log('wrong move!!!');
                
                yield put( actions.present.return__REPLACE({
                    listKey: [ 'quiz', 'focusing', 'situation'],
                    replacement: 'failed',
                }) );

                // yield put( actions.notification.return__ADD_DELETE_BANNER({
                //     codeSituation: 'PlayQuiz_NotAnswer__W'
                // }) );

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


