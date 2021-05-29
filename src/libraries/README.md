# Chess 구현 방식

## 이용한 것들
- [chess.js 라이브러리](https://github.com/jhlywa/chess.js/blob/master/README.md)
 - 체스 기물의 움직임을 검증하고, 특정 상황의 checkmate 등의 상태 확인
- 트리 자료구조를 흉내낸 클래스를 만들어서, 각 시점별 누적된 기물의 움직임을 저장
  - [해당 클래스 살펴보기](https://github.com/ghtea/chess-note/blob/master/src/store/types/others/ChessMoveTree.ts) 
- 체스 기물 이미지 등 UI, 체스 움직임 시도 이후 과정은 직접 구현

## 실제 프로젝트의 소스 예
### 체스 기물 움직일 때의 과정
- [실제 파일 보기](https://github.com/ghtea/chess-note/blob/master/src/store/sagas/quiz/moveWhilePlayingQuiz/index.ts)
  - 아래 이미지에서 '플레이 도중 체스 기물 움직이는 액션 디스패치' 후의 과정   
![ChessNote-WhenClickedChessSquare](https://user-images.githubusercontent.com/47841931/120081456-c2598080-c0f8-11eb-9103-4c8eb1fafa8a.png)

