import React, { useCallback, useEffect } from 'react';

import history from 'libraries/history';
import { FormattedMessage } from 'react-intl';

//import {useSelector, useDispatch} from "react-redux";
import useLink from 'tools/hooks/useLink';

import IconLogo from 'svgs/others/IconLogo';

import styles from './index.module.scss';

function TopBar() {
  // event: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>,

  const { onClick_LinkInsideApp } = useLink(history);

  return (
    <div className={`${styles['root']}`}>
      <a className={`${styles['home']}`} href="/" onClick={onClick_LinkInsideApp}>
        <div>
          <IconLogo className={`${styles['icon-logo']}`} />
        </div>

        <div>
          <FormattedMessage id={`Nav.NameApp`} />
        </div>
      </a>
    </div>
  );
}

TopBar.defaultProps = {};

export default TopBar;
