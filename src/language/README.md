
### Language

[back to to top](#system)

> react-intl

- work well with Notification

  ```typescript
      const intl = useIntl();
      //
      <input
          type='password'
          placeholder={intl.formatMessage({ id: 'Page.LogIn_Password'})}
          value={inputPassword.value}
          required
          onChange={inputPassword.onChange}
          onKeyPress={onKeyPress_LogIn}
      />
      //
      <FormattedMessage id={`Notification.${situationCodePassword}`}/>
  ```

  ```
  // ko.json // there is en.json too
      ...
      "Modal.SortingFootballLeagueStandings_Title": "테이블 정렬하기",
      "Modal.SortingFootballLeagueStandings_Points": "포인트",
      "Modal.SortingFootballLeagueStandings_GoalsDiff": "골 득실차",
      "Modal.SortingFootballLeagueStandings_GoalsScored": "골 득점 수",
      "Modal.SortingFootballLeagueStandings_GoalsAgainst": "골 실점 수",
      "Modal.SortingFootballLeagueStandings_GamesPlayed": "경기 수",

      "Nav.NameApp": "데이터 시너리",
      "Nav.Home": "홈",
      "Nav.LogIn": "로그인",
      "Nav.SignUp": "회원가입",
      "Nav.Sports": "스포츠",
      "Nav.Sports_Football": "축구",
      "Nav.Life": "라이프",
      "Nav.Life_Weather": "날씨",

      "Notification.Test1__S": "테스트에 성공하였습니다 1 !",
      "Notification.Test2__H": "테스트에 성공하였습니다 2 !",
      "Notification.NotLoggedIn__E": "먼저 로그인해야 합니다",
      "Notification.UnknownError__E": "알수 없는 에러가 발생했습니다",
      ...

  ```

---
