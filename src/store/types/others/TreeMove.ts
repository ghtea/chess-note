

export type PayloadNodeMove = {
  san:string; 
  depth:number;
  turn: 'white' | 'black';
  seriesSanBefore: string[];
  nodeMoveBefore: NodeMove | TreeMove;
}


export class NodeMove {

  //id: string;
  san: string;
  depth: number;
  turn: 'white' | 'black';
  seriesSan: string[];
  listNodeMoveNext: NodeMove[];
  nodeMoveBefore: NodeMove | TreeMove;

  
  constructor (paylod: PayloadNodeMove) {
    
    const {san, depth, turn, seriesSanBefore, nodeMoveBefore} = paylod;

    this.san = san;
    this.depth = depth;
    this.turn = turn;
    this.seriesSan = seriesSanBefore.concat([san]);
    this.listNodeMoveNext = [];
    this.nodeMoveBefore = nodeMoveBefore;
  }

  
  // 직속 자식 노드 추가
  // TreeMove 의 addNodeMoveNext 와 잘 맞추기 (어느 한쪽 수정하면 다른 한쪽도 해주기)
  addNodeMoveNext(san:string): NodeMove{
    // san, this.depth + 1, this.turn === 'white' ? 'black' : 'white', this.listSanMove, this
    const payload: PayloadNodeMove = {
      san: san,
      depth: this.depth + 1,
      turn: this.turn === 'white' ? 'black' : 'white' ,
      seriesSanBefore: this.seriesSan,
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
    const queueSan = this.seriesSan;
    let nodeFocusing: NodeMove | TreeMove = this;  // eslint-disable-line @typescript-eslint/no-this-alias
    let sanLatest = '';
    // 해당 노드의 자식이 1개 or 0개뿐이면 그 부모로 올라간다 (단, 최상단인 TreeNode까지는 올라가지 않는다)
    let doContinue = true;
    while ( doContinue ){ 
      if (isNodeMove(nodeFocusing)){
        if (nodeFocusing.listNodeMoveNext.length <= 1 && queueSan.length > 0){
          nodeFocusing = nodeFocusing.nodeMoveBefore;
          sanLatest = queueSan.pop() as string;
        }
        else {
          doContinue = false;
        }
      }
      else { // TreeNode 일때
        doContinue = false;
      }
    }
    // 마지막으로 제거한 san을 갖고 있는  자식 NodeMode 을 제거
    nodeFocusing.listNodeMoveNext = nodeFocusing.listNodeMoveNext.filter(e=>e.san !== sanLatest);

  }

}







function isNodeMove(node: NodeMove | TreeMove): node is NodeMove {
  return (node as NodeMove).san !== undefined;
}



export type PayloadTreeMove = {
  fenStart:string | undefined; 
  turnNext: 'white' | 'black';
}

export class TreeMove {
  fenStart: string | undefined;
  turnNext: 'white' | 'black';
  listNodeMoveNext: NodeMove[];

  constructor(payload: PayloadTreeMove) {
    const {fenStart, turnNext} = payload;

    this.fenStart = fenStart;
    this.turnNext = turnNext;
    this.listNodeMoveNext = [];
  }
  

  addNodeMoveNext(san:string): NodeMove{
    // san, this.depth + 1, this.turn === 'white' ? 'black' : 'white', this.listSanMove, this
    const payload: PayloadNodeMove = {
      san: san,
      depth: 1,
      turn: this.turnNext,
      seriesSanBefore: [],
      nodeMoveBefore: this,
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


  returnListSeriesSan(): string[][]{
    const listSeriesSan: string[][] = [];

    for (const nodeMoveFirst of this.listNodeMoveNext){
      dfs(nodeMoveFirst);
    }
    return listSeriesSan;
    
    function dfs(nodeMove: NodeMove){
      // 더이상 앞으로 나아가는게 없으면 정답 리스트에 반환
      if (nodeMove && nodeMove.listNodeMoveNext && nodeMove.listNodeMoveNext.length === 0){
        listSeriesSan.push(nodeMove.seriesSan);
      }
      else if (nodeMove && nodeMove.listNodeMoveNext && nodeMove.listNodeMoveNext.length > 0){
        for (const nodeMoveNext of nodeMove.listNodeMoveNext){
          dfs(nodeMoveNext);
        }
      }
    }
  }

  putSeriesSan(seriesSan: string[]){
    const queueSan = [...seriesSan];

    let nodeMoveFocusing : TreeMove | NodeMove  = this; // eslint-disable-line @typescript-eslint/no-this-alias

    while (queueSan.length > 0){
      // 기존에 의미 그 순간의 해당 움직임이 존재하면, 그 무브에 들어가기 (들어가서 그 단계에 추가 시키기 위해)
      if (nodeMoveFocusing.listNodeMoveNext.findIndex(e=>e.san === queueSan[0]) !== -1){
        nodeMoveFocusing = nodeMoveFocusing.listNodeMoveNext.find(e=>e.san === queueSan[0]) as NodeMove;
        queueSan.shift();
      }
      // 이제 해당 움직임이 더이상 기존에 존재하지 않으면, 새롭게 붙인다
      else {

        let turn: 'white' | 'black' = 'white';
        if (isNodeMove(nodeMoveFocusing)) {
          turn = nodeMoveFocusing.turn === 'white' ? 'black' : 'white';
        }
        else {
          turn = nodeMoveFocusing.turnNext;
        }

        const payload: PayloadNodeMove = {
          san: queueSan.shift() as string,
          depth: isNodeMove(nodeMoveFocusing) ? nodeMoveFocusing.depth + 1 : 1,
          turn: turn,
          seriesSanBefore: isNodeMove(nodeMoveFocusing) ? nodeMoveFocusing.seriesSan : [],
          nodeMoveBefore: nodeMoveFocusing,
        }
        const nodeMoveNew = new NodeMove(payload);
        nodeMoveFocusing.listNodeMoveNext = [ ... nodeMoveFocusing.listNodeMoveNext, nodeMoveNew]
        nodeMoveFocusing.listNodeMoveNext.sort((a,b)=>{
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
        nodeMoveFocusing = nodeMoveNew;
      }
    }

  }


  deleteNthSeriesSan(index: number){

    let count = 0;

    for (const nodeMoveFirst of this.listNodeMoveNext){
      dfs(nodeMoveFirst);
    }

    function dfs(nodeMove: NodeMove){
      // 더이상 다음 수 가 없으면, 즉 끝까지 왔으면 해답 번호 체크
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

  restart(payload:PayloadTreeMove){
    const {fenStart, turnNext} = payload;
    this.fenStart = fenStart;
    this.turnNext = turnNext;
    this.listNodeMoveNext = [];
  }

}
