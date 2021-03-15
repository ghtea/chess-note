import React, { useCallback, useEffect } from "react";
import history from 'historyApp';
import { useLocation } from "react-router-dom";
import { FormattedMessage } from 'react-intl';

import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';
import * as actionsRoot from "store/actions";

import styles from './Header.module.scss';

import IconLogo from 'svgs/others/IconLogo';
import IconSearch from 'svgs/basic/IconSearch'; 
import IconPlus from 'svgs/basic/IconPlus';

import IconSetting from 'svgs/basic/IconSetting';
import IconUserCircle from 'svgs/basic/IconUserCircle';


type PropsHeader = {};

function Header({}: PropsHeader) {

    const dispatch = useDispatch();
    const location = useLocation();
    
    const showingHeader = useSelector((state: StateRoot) => state['status']['showing']['header']);
    
    const readyUser = useSelector((state: StateRoot) => state['status']['ready']['user']);
    const loadingUser = useSelector((state: StateRoot) => state['status']['loading']['user']);
    const user = useSelector((state: StateRoot) => state['auth']['user']);
    // useEffect(()=>console.log(user),[user])

    useEffect(() => {
        console.log(location.pathname);
        if (  (/^\/log-in/).test(location.pathname) || (/^\/sign-up/).test(location.pathname)  ) {
            dispatch(actionsRoot.status.return__REPLACE({
                listKey:['showing', 'header'],
                replacement: false
            }));
        }
        else {
            dispatch(actionsRoot.status.return__REPLACE({
                listKey:['showing', 'header'],
                replacement: true
            }));
        }
    }, [location]);


    // event: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>, 
    const onClick_LinkInsideApp = useCallback(
        (destination:string) => {
        history.push(destination);
        },[history]
    );
    
    const onClick_ShowModal = useCallback(
        (idModal:string) => {
        dispatch(actionsRoot.status.return__REPLACE({ 
            listKey: ['showing', 'modal', idModal],
            replacement: true
        }));
        },[]
    );
  
  
  return (
    <header className={`${styles['root']} showing----${showingHeader}`}>

        <div className={`${styles['left']}`} >
            <a
                className={`${styles['logo-app']}`}
                onClick={()=>onClick_LinkInsideApp('/')}
            >
                <div>
                    <IconLogo className={`${styles['icon-logo']}`} />
                </div>
                <div>
                    <FormattedMessage id={`Nav.NameApp`} />
                </div>
            </a>
        </div>
      
        <div className={`${styles['middle']}`} >
            
        </div>
      

        <nav className={`${styles['right']}`} >
            
                { !readyUser && !loadingUser &&
                    <a className={`${styles['log-in']}`} 
                        onClick={()=>onClick_LinkInsideApp('/log-in')} 
                    >
                        <FormattedMessage id={`Nav.LogIn`} />
                    </a>
                }
                
                { readyUser &&
                    <button className={`${styles['user']}`} 
                        onClick={()=>onClick_ShowModal('myProfile')}
                    >
                    {user?.photoURL ? 
                        <div> <img className={`${styles['photo-profile']}`} src={user.photoURL} /> </div>
                        :
                        <div> <IconUserCircle className={`${styles['icon-user-circle']}`} kind="solid"/> </div>
                    }

                    </button>
                }

                <button className={`${styles['setting']}`} 
                    onClick={()=>onClick_ShowModal('setting')}
                >
                <div> <IconSetting className={`${styles['icon-setting']}`} /> </div>
                </button>

        </nav>
      
    </header>
  );
}

Header.defaultProps = {};

export default Header;
