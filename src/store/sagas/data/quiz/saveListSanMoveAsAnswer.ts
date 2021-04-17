import { call, select, put } from "redux-saga/effects";
import { firebaseFirestore } from "firebaseApp";

import axios from "axios";
import apolloClient from 'apollo';
import { gql, useQuery , FetchResult} from '@apollo/client';
import { v4 as uuidv4 } from 'uuid';

// import * as config from 'config';
import {StateRoot} from 'store/reducers';
import * as actions from "store/actions";
import * as types from "store/types";
import NodeMove from "store/types/data/NodeMove";



function* saveListSanMoveAsAnswer(action: actions.data.quiz.type__SAVE_LIST_SAN_MOVE_AS_ANSWER) {

    const {listSanMove} = action.payload;

    const quizFocusing: types.data.quiz.Quiz =  yield select( (state:StateRoot) => state.data.quiz.focusing ); 
    
    try {
        
        let queueSanMove = [...listSanMove];
        let depth = 0;
        let turn = quizFocusing.side; // 처음에 두는 플레이어의 색상
        let listNodeMoveNextCurrentDepth: NodeMove[] | undefined = [...quizFocusing.listNodeMoveNextCorrect];

        let listSanUntil = []

        // 매번 움직임이 현재 답 트리에 있으면, 새로 만들 트리를 작게 할 생각 (새로운 트리의 시작 노드를 늦춘다)
        while (listNodeMoveNextCurrentDepth && listNodeMoveNextCurrentDepth.findIndex(e=>e.san === queueSanMove[0])){
            listNodeMoveNextCurrentDepth = listNodeMoveNextCurrentDepth.find(e=>e.san === queueSanMove[0])?.listNodeMoveNext
            listSanUntil.push( queueSanMove.shift() as string);
            depth++;
            turn = turn === 'white' ? 'black' : 'white';
        }


        // 이미 존재 하는데, 기존에 답 트리가 더 길 때
        // 즉, 새로운 답이 기존 답보다 짧아서, 기존 답의 뒷부분을 없애야 할 때
        if (queueSanMove.length === 0 && listNodeMoveNextCurrentDepth && listNodeMoveNextCurrentDepth.length > 0){
            
        }
        // 남은 움직임 큐로 새로운 노트 트리를 만든다
        else if (queueSanMove && queueSanMove.length > 0){
            const san = queueSanMove.shift();
            let nodeMoveRoot = new NodeMove(san as string, depth, turn, listSanUntil);
            let nodeFocusing = nodeMoveRoot;
            while (queueSanMove.length > 0){
                // 맨 앞 san을 빼서 그걸 현재 노드에 추가하고, 이후에는 그 노드에 주목한다 
                nodeFocusing = nodeFocusing.addNodeMoveNext(queueSanMove.shift() as string);
            }
        }



        for (let sanMoveEach of listSanMove){
            //const nodeMoveEach =
        }
        

    } catch (error) {
        
        console.error(error);
        
        // yield put( actions.notification.return__ADD_DELETE_BANNER({
        //     codeSituation: 'Football_AddTeam_UnknownError__E'
        // }) );
    }
}

export default saveListSanMoveAsAnswer;





/*
 "data":{
      "team_id":4066,
      "name":"FC Bayern Munich",
      "short_code":"FCB",
      "logo":"/soccer/teams/100/111.png",
      "country":{
         "country_id":48,
         "name":"Germany",
         "country_code":"de",
         "continent":"Europe"
      }
   }
 */



 /*

{
"query":{
	"apikey":"08eaade0-5243-11eb-a483-a739433d5a26","season_id":"359"
},
"data":{
	"season_id":359,"league_id":237,"has_groups":0,
	"standings":[

// example of each team
{
	"team_id":2509,"position":1,"points":99,"status":"Promotion","result":"Champions League",
	"overall":{"games_played":38,"won":32,"draw":3,"lost":3,"goals_diff":52,"goals_scored":85,"goals_against":33},
	"home":{"games_played":19,"won":14,"draw":2,"lost":3,"goals_diff":16,"goals_scored":33,"goals_against":17},
	"away":{"games_played":19,"won":14,"draw":2,"lost":3,"goals_diff":16,"goals_scored":33,"goals_against":17}},
{

"team_id":12400,"position":2,"points":81,"status":"Promotion","result":"Champions League","overall":{"games_played":38,"won":26,"draw":3,"lost":9,"goals_diff":67,"goals_scored":102,"goals_against":35},"home":{"games_played":19,"won":11,"draw":1,"lost":7,"goals_diff":23,"goals_scored":45,"goals_against":22},"away":{"games_played":19,"won":11,"draw":1,"lost":7,"goals_diff":23,"goals_scored":45,"goals_against":22}},{"team_id":2523,"position":3,"points":66,"status":"Promotion","result":"Champions League","overall":{"games_played":38,"won":18,"draw":12,"lost":8,"goals_diff":30,"goals_scored":66,"goals_against":36},"home":{"games_played":19,"won":8,"draw":5,"lost":6,"goals_diff":7,"goals_scored":26,"goals_against":19},"away":{"games_played":19,"won":8,"draw":5,"lost":6,"goals_diff":7,"goals_scored":26,"goals_against":19}},{"team_id":2524,"position":4,"points":66,"status":"Promotion","result":"Champions League","overall":{"games_played":38,"won":20,"draw":6,"lost":12,"goals_diff":15,"goals_scored":69,"goals_against":54},"home":{"games_played":19,"won":9,"draw":3,"lost":7,"goals_diff":1,"goals_scored":39,"goals_against":38},"away":{"games_played":19,"won":9,"draw":3,"lost":7,"goals_diff":1,"goals_scored":39,"goals_against":38}},{"team_id":12424,"position":5,"points":62,"status":"Promotion","result":"Europa League","overall":{"games_played":38,"won":18,"draw":8,"lost":12,"goals_diff":26,"goals_scored":67,"goals_against":41},"home":{"games_played":19,"won":7,"draw":4,"lost":8,"goals_diff":8,"goals_scored":32,"goals_against":24},"away":{"games_played":19,"won":7,"draw":4,"lost":8,"goals_diff":8,"goals_scored":32,"goals_against":24}},{"team_id":12430,"position":6,"points":59,"status":"Promotion","result":"Europa League Qualification","overall":{"games_played":38,"won":16,"draw":11,"lost":11,"goals_diff":14,"goals_scored":61,"goals_against":47},"home":{"games_played":19,"won":4,"draw":8,"lost":7,"goals_diff":-5,"goals_scored":25,"goals_against":30},"away":{"games_played":19,"won":4,"draw":8,"lost":7,"goals_diff":-5,"goals_scored":25,"goals_against":30}},{"team_id":850,"position":7,"points":59,"status":"same","result":null,"overall":{"games_played":38,"won":15,"draw":14,"lost":9,"goals_diff":11,"goals_scored":51,"goals_against":40},"home":{"games_played":19,"won":7,"draw":7,"lost":5,"goals_diff":3,"goals_scored":24,"goals_against":21},"away":{"games_played":19,"won":7,"draw":7,"lost":5,"goals_diff":3,"goals_scored":24,"goals_against":21}},{"team_id":2522,"position":8,"points":56,"status":"Promotion","result":"Europa League Qualification","overall":{"games_played":38,"won":14,"draw":14,"lost":10,"goals_diff":8,"goals_scored":56,"goals_against":48},"home":{"games_played":19,"won":4,"draw":8,"lost":7,"goals_diff":-4,"goals_scored":20,"goals_against":24},"away":{"games_played":19,"won":4,"draw":8,"lost":7,"goals_diff":-4,"goals_scored":20,"goals_against":24}},{"team_id":2512,"position":9,"points":54,"status":"same","result":null,"overall":{"games_played":38,"won":14,"draw":12,"lost":12,"goals_diff":0,"goals_scored":39,"goals_against":39},"home":{"games_played":19,"won":4,"draw":9,"lost":6,"goals_diff":-9,"goals_scored":15,"goals_against":24},"away":{"games_played":19,"won":4,"draw":9,"lost":6,"goals_diff":-9,"goals_scored":15,"goals_against":24}},{"team_id":2513,"position":10,"points":54,"status":"same","result":null,"overall":{"games_played":38,"won":15,"draw":9,"lost":14,"goals_diff":-7,"goals_scored":43,"goals_against":50},"home":{"games_played":19,"won":7,"draw":5,"lost":7,"goals_diff":-8,"goals_scored":19,"goals_against":27},"away":{"games_played":19,"won":7,"draw":5,"lost":7,"goals_diff":-8,"goals_scored":19,"goals_against":27}},{"team_id":12423,"position":11,"points":52,"status":"same","result":null,"overall":{"games_played":38,"won":15,"draw":7,"lost":16,"goals_diff":-9,"goals_scored":51,"goals_against":60},"home":{"games_played":19,"won":9,"draw":4,"lost":6,"goals_diff":5,"goals_scored":30,"goals_against":25},"away":{"games_played":19,"won":9,"draw":4,"lost":6,"goals_diff":5,"goals_scored":30,"goals_against":25}},{"team_id":2516,"position":12,"points":49,"status":"same","result":null,"overall":{"games_played":38,"won":13,"draw":10,"lost":15,"goals_diff":-12,"goals_scored":44,"goals_against":56},"home":{"games_played":19,"won":5,"draw":3,"lost":11,"goals_diff":-15,"goals_scored":20,"goals_against":35},"away":{"games_played":19,"won":5,"draw":3,"lost":11,"goals_diff":-15,"goals_scored":20,"goals_against":35}},{"team_id":849,"position":13,"points":44,"status":"same","result":null,"overall":{"games_played":38,"won":11,"draw":11,"lost":16,"goals_diff":-20,"goals_scored":38,"goals_against":58},"home":{"games_played":19,"won":5,"draw":3,"lost":11,"goals_diff":-19,"goals_scored":18,"goals_against":37},"away":{"games_played":19,"won":5,"draw":3,"lost":11,"goals_diff":-19,"goals_scored":18,"goals_against":37}},{"team_id":2515,"position":14,"points":43,"status":"same","result":null,"overall":{"games_played":38,"won":11,"draw":10,"lost":17,"goals_diff":-19,"goals_scored":31,"goals_against":50},"home":{"games_played":19,"won":5,"draw":5,"lost":9,"goals_diff":-14,"goals_scored":16,"goals_against":30},"away":{"games_played":19,"won":5,"draw":5,"lost":9,"goals_diff":-14,"goals_scored":16,"goals_against":30}},{"team_id":2518,"position":15,"points":41,"status":"same","result":null,"overall":{"games_played":38,"won":9,"draw":14,"lost":15,"goals_diff":-15,"goals_scored":39,"goals_against":54},"home":{"games_played":19,"won":4,"draw":7,"lost":8,"goals_diff":-8,"goals_scored":19,"goals_against":27},"away":{"games_played":19,"won":4,"draw":7,"lost":8,"goals_diff":-8,"goals_scored":19,"goals_against":27}},{"team_id":12401,"position":16,"points":39,"status":"same","result":null,"overall":{"games_played":38,"won":10,"draw":9,"lost":19,"goals_diff":-13,"goals_scored":49,"goals_against":62},"home":{"games_played":19,"won":4,"draw":5,"lost":10,"goals_diff":-10,"goals_scored":19,"goals_against":29},"away":{"games_played":19,"won":4,"draw":5,"lost":10,"goals_diff":-10,"goals_scored":19,"goals_against":29}},{"team_id":2520,"position":17,"points":35,"status":"same","result":null,"overall":{"games_played":38,"won":9,"draw":8,"lost":21,"goals_diff":-26,"goals_scored":41,"goals_against":67},"home":{"games_played":19,"won":2,"draw":5,"lost":12,"goals_diff":-18,"goals_scored":19,"goals_against":37},"away":{"games_played":19,"won":2,"draw":5,"lost":12,"goals_diff":-18,"goals_scored":19,"goals_against":37}},{"team_id":2511,"position":18,"points":34,"status":"Relegation","result":null,"overall":{"games_played":38,"won":9,"draw":7,"lost":22,"goals_diff":-25,"goals_scored":40,"goals_against":65},"home":{"games_played":19,"won":4,"draw":1,"lost":14,"goals_diff":-17,"goals_scored":18,"goals_against":35},"away":{"games_played":19,"won":4,"draw":1,"lost":14,"goals_diff":-17,"goals_scored":18,"goals_against":35}},{"team_id":2517,"position":19,"points":34,"status":"Relegation","result":null,"overall":{"games_played":38,"won":8,"draw":10,"lost":20,"goals_diff":-28,"goals_scored":36,"goals_against":64},"home":{"games_played":19,"won":2,"draw":4,"lost":13,"goals_diff":-23,"goals_scored":14,"goals_against":37},"away":{"games_played":19,"won":2,"draw":4,"lost":13,"goals_diff":-23,"goals_scored":14,"goals_against":37}},{"team_id":2510,"position":20,"points":21,"status":"Relegation","result":null,"overall":{"games_played":38,"won":5,"draw":6,"lost":27,"goals_diff":-49,"goals_scored":26,"goals_against":75},"home":{"games_played":19,"won":1,"draw":3,"lost":15,"goals_diff":-31,"goals_scored":7,"goals_against":38},"away":{"games_played":19,"won":1,"draw":3,"lost":15,"goals_diff":-31,"goals_scored":7,"goals_against":38}}]
}
}
 */