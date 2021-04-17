import {v4 as uuid} from 'uuid';

export type PayloadNodeMove = {
  san:string; 
  depth:number;
  turn: 'white' | 'black';
  listSanMoveBefore: string[];
  nodeMoveBefore: NodeMove | null;
}


export default class NodeMove {

  //id: string;
  san: string;
  depth: number;
  turn: 'white' | 'black';
  listSanMove: string[];
  listNodeMoveNext: NodeMove[];
  nodeMoveBefore: NodeMove | null;

  
  constructor (paylod: PayloadNodeMove) {
    
    const {san, depth, turn, listSanMoveBefore, nodeMoveBefore} = paylod;

    this.san = san;
    this.depth = depth;
    this.turn = turn;
    this.listSanMove = listSanMoveBefore.concat([san]);
    this.listNodeMoveNext = [];
    this.nodeMoveBefore = nodeMoveBefore;
  }

  returnListPath(): string[][]{
    let listPath: string[][] = [];
    dfs(this);
    return listPath;
    
    function dfs(nodeMove: NodeMove){
      // 더이상 앞으로 나아가는게 없으면 정답 리스트에 반환
      if (nodeMove && nodeMove.listNodeMoveNext && nodeMove.listNodeMoveNext.length === 0){
        listPath.push(nodeMove.listSanMove);
      }
      else if (nodeMove && nodeMove.listNodeMoveNext && nodeMove.listNodeMoveNext.length > 0){
        for (const nodeMoveNext of nodeMove.listNodeMoveNext){
          dfs(nodeMoveNext);
        }
      }
    }
  }

  putPath(listPath: string[]){
    let queueSan = [...listPath];
    let nodeMoveFocusing : NodeMove = this;
    while (queueSan.length > 0){
      // 기존에 의미 그 순간의 해당 움직임이 존재하면
      if (nodeMoveFocusing.listNodeMoveNext.findIndex(e=>e.san === queueSan[0]) !== -1){
        nodeMoveFocusing = nodeMoveFocusing.listNodeMoveNext.find(e=>e.san === queueSan[0]) as NodeMove;
        queueSan.shift();
      }
      else {
        // 새롭게 만든 자식 노드를 반환
        nodeMoveFocusing = nodeMoveFocusing.addNodeMoveNext(queueSan.shift() as string);
      }
    }
    // 해당 노드가 마지막이 되어야 한다
    // 기존 path(퀴즈의 정답)이 새로운 path로 수정되도록 작동한다
    nodeMoveFocusing.listNodeMoveNext = [];

  }


  deleteNthPath(index: number){

    let count = 0;
    dfs(this);

    function dfs(nodeMove: NodeMove){
      // 더이상 앞으로 나아가는게 없으면 정답 리스트에 반환
      if (nodeMove && nodeMove.listNodeMoveNext && nodeMove.listNodeMoveNext.length === 0){
        if (count === index){
          nodeMove.deleteUntilCurrentNodeMove();
        }
        count++;
      }
      else if (nodeMove && nodeMove.listNodeMoveNext && nodeMove.listNodeMoveNext.length > 0){
        for (const nodeMoveNext of nodeMove.listNodeMoveNext){
          dfs(nodeMoveNext);
        }
      }
    }
  }


  // 직속 자식 노드 추가
  addNodeMoveNext(san:string): NodeMove{
    // san, this.depth + 1, this.turn === 'white' ? 'black' : 'white', this.listSanMove, this
    const payload: PayloadNodeMove = {
      san: san,
      depth: this.depth + 1,
      turn: this.turn === 'white' ? 'black' : 'white' ,
      listSanMoveBefore: this.listSanMove,
      nodeMoveBefore: this
    }
    const nodeMoveNext = new NodeMove(payload);

    this.listNodeMoveNext = [...this.listNodeMoveNext, nodeMoveNext];
    this.listNodeMoveNext.sort((a,b)=>{
      if (a.san < b.san){
        return -1;
      }
      else if (a.san > b.san){
        return 1;
      }
      else {
        return 0;
      }
    })
    return nodeMoveNext; // 방금 만든 자식 노드를, 참조 유지한채로 반환한다(자동으로), 즉 여기다 다시 자식 노드 추가하면, 전체 루트 노드의 손자로서 추가!!
  }


  // 직속 자식 노드 삭제
  deleteNodeMoveNext(san:string): NodeMove[] {
    this.listNodeMoveNext = this.listNodeMoveNext.filter(e=>e.san !== san);
    return this.listNodeMoveNext;
  }


  // 해당 노드 줄기 삭제
  // 해당 노드에서 위로 올라가면서, 해당 노드가 속하는 줄기 삭제
  // 해당 노드말고 다른 노드을 자식으로 가지는 노드 직전까지 삭제한다
  deleteUntilCurrentNodeMove() {
    let nodeTopBranch = this.nodeMoveBefore || this;
    let sanChildTopBranch = this.san;

    // 삭제할 브랜치의 직속 부모 찾아서 (이 직속 부모는 자식이 삭제할브랜치를 포함해서 2개 이상)
    // 그 부모의 자식중에서 브랜치 삭제
    // 단 root node 는 나둬야 한다
    while (nodeTopBranch.listNodeMoveNext.length === 1 && nodeTopBranch.depth !== 0){
      sanChildTopBranch = nodeTopBranch.san; // nodeTopBranch 가 위로 가기전에 이용해야 한다
      nodeTopBranch = nodeTopBranch.nodeMoveBefore as NodeMove;
    }
    // console.log(nodeTopBranch, sanChildTopBranch)
    nodeTopBranch.listNodeMoveNext = nodeTopBranch.listNodeMoveNext.filter(e=>e.san !== sanChildTopBranch);

  }

}


const payload:PayloadNodeMove = {
  san: 'e4',
  depth: 0,
  turn: 'white',
  listSanMoveBefore: [],
  nodeMoveBefore: null,
}
const nodeMoveRoot = new NodeMove(payload);
nodeMoveRoot.addNodeMoveNext('e5').addNodeMoveNext('d4').addNodeMoveNext('d5');

//console.log(nodeMoveRoot.listNodeMoveNext[0].listNodeMoveNext)

//console.log(nodeMoveRoot.deleteNodeMoveLater(['e4', 'e5', 'd4']));

//console.log(nodeMoveRoot.listNodeMoveNext[0].listNodeMoveNext)

//nodeMoveRoot.deleteNthPath(0)
console.log(nodeMoveRoot.returnListPath());



