export type PayloadChessMoveNode = {
  san: string;
  depth: number;
  turn: 'white' | 'black';
  sanSeriesBefore: string[];
  chessMoveNodeBefore: ChessMoveNode | ChessMoveTree;
};

export class ChessMoveNode {
  //id: string;
  san: string;
  depth: number;
  turn: 'white' | 'black';
  sanSeries: string[];
  listChessMoveNodeNext: ChessMoveNode[];
  chessMoveNodeBefore: ChessMoveNode | ChessMoveTree;

  constructor(paylod: PayloadChessMoveNode) {
    const { san, depth, turn, sanSeriesBefore, chessMoveNodeBefore } = paylod;

    this.san = san;
    this.depth = depth;
    this.turn = turn;
    this.sanSeries = sanSeriesBefore.concat([san]);
    this.listChessMoveNodeNext = [];
    this.chessMoveNodeBefore = chessMoveNodeBefore;
  }

  // 직속 자식 노드 추가
  // ChessMoveTree 의 addChessMoveNodeNext 와 잘 맞추기 (어느 한쪽 수정하면 다른 한쪽도 해주기)
  addChessMoveNodeNext(san: string): ChessMoveNode {
    // san, this.depth + 1, this.turn === 'white' ? 'black' : 'white', this.listSanMove, this
    const payload: PayloadChessMoveNode = {
      san: san,
      depth: this.depth + 1,
      turn: this.turn === 'white' ? 'black' : 'white',
      sanSeriesBefore: this.sanSeries,
      chessMoveNodeBefore: this,
    };
    const chessMoveNodeNext = new ChessMoveNode(payload);

    this.listChessMoveNodeNext = [...this.listChessMoveNodeNext, chessMoveNodeNext];
    this.listChessMoveNodeNext.sort((a, b) => {
      if (a.san < b.san) {
        return -1;
      } else if (a.san > b.san) {
        return 1;
      } else {
        return 0;
      }
    });
    return chessMoveNodeNext; // 방금 만든 자식 노드를, 참조 유지한채로 반환한다(자동으로), 즉 여기다 다시 자식 노드 추가하면, 전체 루트 노드의 손자로서 추가!!
  }

  // 직속 자식 노드 삭제
  deleteChessMoveNodeNext(san: string): ChessMoveNode[] {
    this.listChessMoveNodeNext = this.listChessMoveNodeNext.filter((e) => e.san !== san);
    return this.listChessMoveNodeNext;
  }

  // 해당 노드 줄기 삭제
  // 해당 노드에서 위로 올라가면서, 해당 노드가 속하는 줄기 삭제
  // 해당 노드말고 다른 노드을 자식으로 가지는 노드 직전까지 삭제한다
  deleteUntilCurrentChessMoveNode() {
    const queueSan = this.sanSeries;
    let nodeFocusing: ChessMoveNode | ChessMoveTree = this; // eslint-disable-line @typescript-eslint/no-this-alias
    let sanLatest = '';
    // 해당 노드의 자식이 1개 or 0개뿐이면 그 부모로 올라간다 (단, 최상단인 TreeNode까지는 올라가지 않는다)
    let doContinue = true;
    while (doContinue) {
      if (isChessMoveNode(nodeFocusing)) {
        if (nodeFocusing.listChessMoveNodeNext.length <= 1 && queueSan.length > 0) {
          nodeFocusing = nodeFocusing.chessMoveNodeBefore;
          sanLatest = queueSan.pop() as string;
        } else {
          doContinue = false;
        }
      } else {
        // TreeNode 일때
        doContinue = false;
      }
    }
    // 마지막으로 제거한 san을 갖고 있는  자식 NodeMode 을 제거
    nodeFocusing.listChessMoveNodeNext = nodeFocusing.listChessMoveNodeNext.filter(
      (e) => e.san !== sanLatest,
    );
  }
}

function isChessMoveNode(node: ChessMoveNode | ChessMoveTree): node is ChessMoveNode {
  return (node as ChessMoveNode).san !== undefined;
}

export class ChessMoveTree {
  startingFen: string | undefined;
  nextTurn: 'white' | 'black';
  listChessMoveNodeNext: ChessMoveNode[];

  constructor(startingFen: string) {
    this.startingFen = startingFen || 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
    this.nextTurn = this.nextTurn = getNextTurn(this.startingFen);
    this.listChessMoveNodeNext = [];
  }

  addChessMoveNodeNext(san: string): ChessMoveNode {
    // san, this.depth + 1, this.turn === 'white' ? 'black' : 'white', this.listSanMove, this
    const payload: PayloadChessMoveNode = {
      san: san,
      depth: 1,
      turn: this.nextTurn,
      sanSeriesBefore: [],
      chessMoveNodeBefore: this,
    };
    const chessMoveNodeNext = new ChessMoveNode(payload);

    this.listChessMoveNodeNext = [...this.listChessMoveNodeNext, chessMoveNodeNext];
    this.listChessMoveNodeNext.sort((a, b) => {
      if (a.san < b.san) {
        return -1;
      } else if (a.san > b.san) {
        return 1;
      } else {
        return 0;
      }
    });
    return chessMoveNodeNext; // 방금 만든 자식 노드를, 참조 유지한채로 반환한다(자동으로), 즉 여기다 다시 자식 노드 추가하면, 전체 루트 노드의 손자로서 추가!!
  }

  returnSanSeriesList(): string[][] {
    const listSeriesSan: string[][] = [];

    for (const chessMoveNodeFirst of this.listChessMoveNodeNext) {
      dfs(chessMoveNodeFirst);
    }
    return listSeriesSan;

    function dfs(chessMoveNode: ChessMoveNode) {
      // 더이상 앞으로 나아가는게 없으면 정답 리스트에 반환
      if (
        chessMoveNode &&
        chessMoveNode.listChessMoveNodeNext &&
        chessMoveNode.listChessMoveNodeNext.length === 0
      ) {
        listSeriesSan.push(chessMoveNode.sanSeries);
      } else if (
        chessMoveNode &&
        chessMoveNode.listChessMoveNodeNext &&
        chessMoveNode.listChessMoveNodeNext.length > 0
      ) {
        for (const chessMoveNodeNext of chessMoveNode.listChessMoveNodeNext) {
          dfs(chessMoveNodeNext);
        }
      }
    }
  }

  putSanSeries(sanSeries: string[]) {
    const queueSan = [...sanSeries];

    let chessMoveNodeFocusing: ChessMoveTree | ChessMoveNode = this; // eslint-disable-line @typescript-eslint/no-this-alias

    while (queueSan.length > 0) {
      // 기존에 의미 그 순간의 해당 움직임이 존재하면, 그 무브에 들어가기 (들어가서 그 단계에 추가 시키기 위해)
      if (
        chessMoveNodeFocusing.listChessMoveNodeNext.findIndex((e) => e.san === queueSan[0]) !== -1
      ) {
        chessMoveNodeFocusing = chessMoveNodeFocusing.listChessMoveNodeNext.find(
          (e) => e.san === queueSan[0],
        ) as ChessMoveNode;
        queueSan.shift();
      }
      // 이제 해당 움직임이 더이상 기존에 존재하지 않으면, 새롭게 붙인다
      else {
        let turn: 'white' | 'black' = 'white';
        if (isChessMoveNode(chessMoveNodeFocusing)) {
          turn = chessMoveNodeFocusing.turn === 'white' ? 'black' : 'white';
        } else {
          turn = chessMoveNodeFocusing.nextTurn;
        }

        const payload: PayloadChessMoveNode = {
          san: queueSan.shift() as string,
          depth: isChessMoveNode(chessMoveNodeFocusing) ? chessMoveNodeFocusing.depth + 1 : 1,
          turn: turn,
          sanSeriesBefore: isChessMoveNode(chessMoveNodeFocusing)
            ? chessMoveNodeFocusing.sanSeries
            : [],
          chessMoveNodeBefore: chessMoveNodeFocusing,
        };
        const chessMoveNodeNew = new ChessMoveNode(payload);
        chessMoveNodeFocusing.listChessMoveNodeNext = [
          ...chessMoveNodeFocusing.listChessMoveNodeNext,
          chessMoveNodeNew,
        ];
        chessMoveNodeFocusing.listChessMoveNodeNext.sort((a, b) => {
          if (a.san < b.san) {
            return -1;
          } else if (a.san > b.san) {
            return 1;
          } else {
            return 0;
          }
        });
        chessMoveNodeFocusing = chessMoveNodeNew;
      }
    }
  }

  deleteNthSeriesSan(index: number) {
    let count = 0;

    for (const chessMoveNodeFirst of this.listChessMoveNodeNext) {
      dfs(chessMoveNodeFirst);
    }

    function dfs(chessMoveNode: ChessMoveNode) {
      // 더이상 다음 수 가 없으면, 즉 끝까지 왔으면 해답 번호 체크
      if (
        chessMoveNode &&
        chessMoveNode.listChessMoveNodeNext &&
        chessMoveNode.listChessMoveNodeNext.length === 0
      ) {
        if (count === index) {
          chessMoveNode.deleteUntilCurrentChessMoveNode();
        }
        count++;
      } else if (
        chessMoveNode &&
        chessMoveNode.listChessMoveNodeNext &&
        chessMoveNode.listChessMoveNodeNext.length > 0
      ) {
        for (const chessMoveNodeNext of chessMoveNode.listChessMoveNodeNext) {
          dfs(chessMoveNodeNext);
        }
      }
    }
  }

  restart(startingFen: string) {
    this.startingFen = startingFen || 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
    this.nextTurn = this.nextTurn = getNextTurn(this.startingFen);
    this.listChessMoveNodeNext = [];
  }
}

function getNextTurn(fen: string) {
  if (fen.includes(' w ')) {
    return 'white';
  } else {
    return 'black';
  }
}
