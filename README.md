# Chess Note

[link](https://cn.nextwing.me/quiz)

>

- On progress
- Save chess quiz and opening and practice them

---

## Focused (compared to past projects)

- Backend: GraphQL, TypeORM, NestJS
- Used library chess.js
- Refined redux

## Should Be Improved

- TDD
- Use other state management

---

## Features

- [Opening](#opening)
- [Quiz](#quiz)

### Opening

[link](https://cn.nextwing.me/opening)

- Save correct move for each move of the opponent in early games.
- Practice it later

### Quiz

[link](https://cn.nextwing.me/quiz)

- Save certain position of pieces and correct next moves.
- Practice it later

---

## System

- [Components (UI)](#components)
- [Styles](#styles)
- [State Management](#state-management)
- [Auth](#auth)
- [Backend](#backend)
- [Language](#language)
- [Icons](#icons)
- [Testing](#testing)
- [Deployment](#deployment)

### Components

[back to to top](#system)

> = Header + Main + Modal + Notification + Action

- Overall
  - immitated name of HTML tags
  - `history.push('/...')` is available in redux saga files
  ```typescript
  import { createBrowserHistory } from 'history';
  export default createBrowserHistory();
  ```
- Header
  - useing same components for mobile view and descktop view
  - navigation links support web accessibility
    - press tab key to open menu for each category (rather than hovering)
- Main

  - [file](https://github.com/ghtea/chess-note/blob/master/src/components/Main.tsx)
  - content which appear based on routes
  - LogIn, Home, ...

  ```javascript
  <Switch>
    <Route exact path="/">
      <Home />
    </Route>

    <Route path="/log-in">
      <LogIn />
    </Route>

    <Route path="/sign-up">
      <SignUp />
    </Route>

    <Route>
      <NotFound />
    </Route>
  </Switch>
  ```

- Modal

  - [file](https://github.com/ghtea/chess-note/blob/master/src/components/Modal.tsx)
  - box shows at the middle of screen for work like 'upload quiz'
  - designed thinking experince on mobile
  - added ARIA attributes for web accessibility
    - ex) role="dialog"

  ```javascript
      function Modal({}: PropsModal) {

          const showingSetting = useSelector((state: RootState) => state.status.showing.modal.setting);
          const showingMyProfile = useSelector((state: RootState) => state.status.showing.modal.myProfile);

          return (
              <>
                  {showingSetting && <Setting />}
                  {showingMyProfile && <MyProfile />}
              </>
      );
  ```

- Notification!
  - [screen shot](https://user-images.githubusercontent.com/47841931/115982497-98cba780-a5d6-11eb-9047-8b9296340b71.png)
  - [sagas about notification](https://github.com/ghtea/chess-note/tree/master/src/store/sagas/notification)
  - banner shows shorty for notificate success, hint, warning, error
  - use 4 color palettes
  - work well with multi-language

---

### Styles

[back to to top](#system)

> Utilize Sass for Dark mode and module coding

- reset.css, basic styles for popular tags
- made mixins for getting color value from map(using key) and apply it with class for theme name

  ```Scss
      @mixin color-each-theme($property, $key-color, $opacity: 1, $is-module: true) {

      @each $name-theme in $list-name-theme {
          $color-1: map-get-deep(
              $map: $palette,
              $keyList: ($name-theme, $key-color)
          );

          $color: $color-1;
          @if ($opacity != 1){
              $color: rgba($color-1, $opacity);
          }

          @if ($name-theme == $name-theme-default) {
              #{$property}: $color;
          }

          @if ($is-module == true) {
              :global(.theme----#{$name-theme}) & {
                  #{$property}: $color;
              }
          }
          @else {
              .theme----#{$name-theme} & {
                  #{$property}: $color;
              }
          }
      }
  }
  ```

---

### State Management

[back to to top](#system)

> Redux, immer, Redux saga

- made useful action
  ```typescript
  export const name__REPLACE: string = `status/REPLACE`;
  interface Payload__REPLACE {
    keyList: (string | number)[];
    replacement: any;
  }
  export const return__REPLACE = (payload: Payload__REPLACE) => {
    return {
      type: name__REPLACE,
      payload: payload,
    };
  };
  export type type__REPLACE = ReturnType<typeof return__REPLACE>;
  ```
- divided reducers
  ```typescript
    const rootReducer = combineReducers({
      appearance: appearanceReducer,   // ex. showing each modal or not
      auth: authReducer,  // data of logged user
      data: reducerData,  // data from database
      notification: notificationReducer,  // for notification
      present: reducerPresent,   // for state for present like 'white player's turn to move'
      status: statusReducer,  // for information lik 'user data is ready', 'quiz data is loading'
  });
      ...
  ```
  - made useful saga - chess-note/src/store/sagas/others/

---

### Auth

[back to to top](#system)

- used Firebase

---

### Backend

[back to to top](#system)

- used NestJS + GraphQL for data of chess opening, quiz and Firebase for auth
- [github repository for backend](https://github.com/ghtea/chess-note-back)

---

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
      <FormattedMessage id={`Notification.${codeSituationPassword}`}/>
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

### Icons

[back to to top](#system)

> svg components from Font Awesome svgs

    - [template file](https://github.com/ghtea/chess-note/blob/master/src/svgs/_IconTemplateAdvanced.tsx)
    ```javascript
    import React from "react";


    type PropsIcon = {
        className?: string;
        kind?: 'regular' | 'solid' | 'light';  // thin, light, regular, solid, ...
    } & typeof propsDefault;

    const propsDefault = {
        className: ''
    };

    // Hide
    const Icon = ({ className, kind }: PropsIcon) => {
    return (
        <span className={`${className} icon`} >
        <svg
            width="100%"
            height="100%"
            fill="currentColor"
            className=""
            aria-hidden="true"
            focusable="false"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 512"
        >
        {(!kind || kind === 'regular') &&
    <path fill="currentColor" d="M634 471L36 3.51A16 16 0 0 0 13.51 6l-10 12.49A16 16 0 0 0 6 41l598 467.49a16 16 0 0 0 22.49-2.49l10-12.49A16 16 0 0 0 634 471zM296.79 146.47l134.79 105.38C429.36 191.91 380.48 144 320 144a112.26 112.26 0 0 0-23.21 2.47zm46.42 219.07L208.42 260.16C210.65 320.09 259.53 368 320 368a113 113 0 0 0 23.21-2.46zM320 112c98.65 0 189.09 55 237.93 144a285.53 285.53 0 0 1-44 60.2l37.74 29.5a333.7 333.7 0 0 0 52.9-75.11 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64c-36.7 0-71.71 7-104.63 18.81l46.41 36.29c18.94-4.3 38.34-7.1 58.22-7.1zm0 288c-98.65 0-189.08-55-237.93-144a285.47 285.47 0 0 1 44.05-60.19l-37.74-29.5a333.6 333.6 0 0 0-52.89 75.1 32.35 32.35 0 0 0 0 29.19C89.72 376.41 197.08 448 320 448c36.7 0 71.71-7.05 104.63-18.81l-46.41-36.28C359.28 397.2 339.89 400 320 400z"></path>
        }
        {(kind === 'light') &&
    <path fill="currentColor" d="M637 485.25L23 1.75A8 8 0 0 0 11.76 3l-10 12.51A8 8 0 0 0 3 26.75l614 483.5a8 8 0 0 0 11.25-1.25l10-12.51a8 8 0 0 0-1.25-11.24zM320 96a128.14 128.14 0 0 1 128 128c0 21.62-5.9 41.69-15.4 59.57l25.45 20C471.65 280.09 480 253.14 480 224c0-36.83-12.91-70.31-33.78-97.33A294.88 294.88 0 0 1 576.05 256a299.73 299.73 0 0 1-67.77 87.16l25.32 19.94c28.47-26.28 52.87-57.26 70.93-92.51a32.35 32.35 0 0 0 0-29.19C550.3 135.59 442.94 64 320 64a311.23 311.23 0 0 0-130.12 28.43l45.77 36C258.24 108.52 287.56 96 320 96zm60.86 146.83A63.15 63.15 0 0 0 320 160c-1 0-1.89.24-2.85.29a45.11 45.11 0 0 1-.24 32.19zm-217.62-49.16A154.29 154.29 0 0 0 160 224a159.39 159.39 0 0 0 226.27 145.29L356.69 346c-11.7 3.53-23.85 6-36.68 6A128.15 128.15 0 0 1 192 224c0-2.44.59-4.72.72-7.12zM320 416c-107.36 0-205.47-61.31-256-160 17.43-34 41.09-62.72 68.31-86.72l-25.86-20.37c-28.48 26.28-52.87 57.25-70.93 92.5a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448a311.25 311.25 0 0 0 130.12-28.43l-29.25-23C389.06 408.84 355.15 416 320 416z"></path>
        }
        {(kind === 'solid') &&
    <path fill="currentColor" d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z"></path>
        }

        </svg>

        </div>
    );
    };
    Icon.defaultProps = propsDefault;
    //

    export default Icon;

    ```

---

### Testing

[back to to top](#system)

- tried simple unit tests, integration tests
- to make testing available with 'Testing Library', I learnt and added ARIA attributes

  - followed as official documents suggest

  ```typescript

  describe('<Header />', () => {

      it('open/close board', () => {
          render(<Header />);

          expect(screen.getByRole('button', {name: 'Open Board'})).toBeInTheDocument();
          expect(screen.queryByRole('button', {name: 'Close Board'})).not.toBeInTheDocument();
          expect(screen.getByRole('navigation', {name: 'Main Navigation Board'}) ).not.toHaveClass('is-open');

          fireEvent.click(screen.getByRole('button', {name: 'Open Board'}));

          expect(screen.queryByRole('button', {name: 'Open Board'})).not.toBeInTheDocument();
          expect(screen.getByRole('button', {name: 'Close Board'})).toBeInTheDocument();
          expect(screen.getByRole('navigation', {name: 'Main Navigation Board'}) ).toHaveClass('is-open');


          fireEvent.click(screen.getByRole('button', {name: 'Close Board'}));

          expect(screen.getByRole('button', {name: 'Open Board'})).toBeInTheDocument();
          expect(screen.queryByRole('button', {name: 'Close Board'})).not.toBeInTheDocument();
          expect(screen.getByRole('navigation', {name: 'Main Navigation Board'}) ).not.toHaveClass('is-open');
      });

      ...
  }

  ```

---

### Deployment

[back to to top](#system)

- using Zeit Now for Backend
- using AWS Amplify for frontend
  - automate deployment by GitHub commit
- custom domain
- using enviroment variables in build process
