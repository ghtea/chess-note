# Chess Note

[웹사이트 방문](https://cn.nextwing.me/quiz) (회원가입을 하면 더 많은 을 이용할 수 있습니다)

- 체스 퀴즈를 직접 만들고, 수정, 플레이 하는 웹사이트
  -  체스 퀴즈: 체스의 특정 상황에서 최적의 수 맞추는 문제
- 1인 개발

---

## 참고 이미지
![ChessNote skills](https://user-images.githubusercontent.com/47841931/120080007-c33ae400-c0f1-11eb-9e59-408c6904ac00.png)
![ChessNote](https://user-images.githubusercontent.com/47841931/120080024-dea5ef00-c0f1-11eb-811d-1c42f5f259a1.png)

## 참고 사용 예
### 체스 퀴즈 만들기 
- 체스 게임 상황을 표시하는 FEN 표기법을 이용
![Create](https://user-images.githubusercontent.com/47841931/120092151-d7abca80-c14b-11eb-9379-8fbdf617ed66.gif)

### 체스 퀴즈들 필터링
![Filter](https://user-images.githubusercontent.com/47841931/120092152-d8dcf780-c14b-11eb-8bd3-c95ae51be00c.gif)

### 정답, 참고 움직임을 자동 플레이로 보여주기
![AutoPlay](https://user-images.githubusercontent.com/47841931/120092154-da0e2480-c14b-11eb-9b23-6619b8470316.gif)



---

## 기술 포인트

### 체스관련 라이브러리 + 직접 보강 으로 체스 플레이 구현 [더보기](/tree/master/src/libraries)
- 시각적인 부분, 정답 움직임 경로 처리 등을 직접 구현
- 라이브러리와 상태 관리, Redux saga의 교묘한 협업
---
### 체계적인 UI의 구성 [더보기]
- HTML 구조와 비슷하게 폴더 트리 구현
- 배너 알림 구현 (Notification)
- aria 속성 활용 등 시맨틱 마크업 고려
- 철저한 다국어 (영어, 한글) 지원
---
### 체계적인 스타일 시스템 [더보기](/tree/master/src/styles)
- 다크모드의 편한 구현을 위해 독자적인 색상 시스템, 믹스인 만듬
- 아이콘은 fontawesome 에서 svg 다운받아 component 으로 만들어서 사용
- 정사각형의 체스판을 구현하기 위해 상태관리와 연동에서 관련 스타일 구현
---
### 거대한 상태관리 + Redux saga의 활용 
- 특히 모듈로 나누는 방식에 공을 들임
- Redux saga 를 이용해서 action 간의 관계 구성
- TypeScript 적극 활용
---
### 백엔드
- 로그인, 회원 관리는 Firebase 이용
- 백엔드는 NestJs, GraphQL, TypeORM
---
### 배포
- 프론트는 AWS Amplify에서 github 연동한 자동화 배포 
  - 환경 변수 등 AWS Amplify에서 별도 설정
- 백엔드는 Zeit Now를 이용해서 CLI 에서 바로 배포
- 개인 도메인 사용
---

## 기능 포인트
### 체스 퀴즈 만들기 
- 퀴즈 시작 지점 지정 (플레이어에게 주어지는 장면)
  - 체스 상태를 나타내는 정보 (FEN) 붙여넣기로 한번에 구현 가능
- 정답 움직임, 참고표시 움직임 지정
 - 여러 움직임 (트리), 여러 경우의 수 지정 가능
 - 실제로 플레어어가 두었을 때 정답과 비교, 결과 피드백, 기록 저장
 - 정답 움직임, 참고표시 움직임 자동으로 두면서 보여주기 가능
- 이름, 공개여부등 지정 
### 각 체스 퀴즈에 대한 행동
- 해당 퀴즈의 작성자이면 편집, 삭제 가능
- 좋아요, 싫어요
- 시도한 뒤 결과 저장 (실패, 성공), UI에 표시
### 만들어진 체스 퀴즈 모음 보기
- 필터링 구현
- 좋아요, 싫어요, 자신의 시도 결과 등의 정보까지 확인 가능
