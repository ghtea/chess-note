import React, { useCallback, useEffect } from "react";

import history from 'historyApp';
import { useLocation } from "react-router-dom";
import { FormattedMessage } from 'react-intl';

//import {useSelector, useDispatch} from "react-redux";
import useLink from 'tools/hooks/useLink';

import IconLogo from 'svgs/others/IconLogo';

import styles from './TopBar.module.scss';


type PropsTopBar = {};

function TopBar({}: PropsTopBar) {
  
  // event: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>, 
   
  const {onClick_LinkInsideApp} = useLink(history);

  return (
    <div 
        className={`${styles['root']}`}
    >
        <a  
            className={`${styles['home']}`}
            href='/' 
            onClick={onClick_LinkInsideApp}
        >
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
