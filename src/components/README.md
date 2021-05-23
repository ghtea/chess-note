
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
