import React, {useCallback, useState} from 'react';

import {useSelector, useDispatch} from "react-redux";
// import {StateRoot} from 'store/reducers';
import * as actionsRoot from "store/actions";

// import Setting from "./Action/Setting";

import styles from './index.module.scss';

import IconThreeDots from 'svgs/basic/IconThreeDots';
import IconPlus from 'svgs/basic/IconPlus';
import IconCopy from 'svgs/basic/IconCopy';
import IconShare from 'svgs/basic/IconShare';



function Action() {
  
  // const showingSetting:boolean = useSelector((state: StateRoot) => state['status']['showing']['Action']['setting']);
  const dispatch = useDispatch();

  const [isOpenAction, setIsOpenAction] = useState(false)
  

  const onClick_OpenCloseAction = useCallback(
    (decision?:boolean) => {
        if (decision === true || decision === false){
            setIsOpenAction(decision);
        }
        else {
            setIsOpenAction(isOpenAction=>!isOpenAction);
        }
    },[isOpenAction]
  );

  const onClick_ShowModal = useCallback(
    (idModal:string) => {
      dispatch(actionsRoot.appearance.return__REPLACE({ 
        listKey: ['showing', 'modal', idModal],
        replacement: true
      }))
    },[]
  );
  

  return (
      
    <div className={`${styles['root']} is-open----${isOpenAction}`} >

        <div className={`${styles['main']}`} >
            <button
                type='button'
                value='openCloseAction'
                onClick={()=>onClick_OpenCloseAction()}
            > <IconThreeDots className={`${styles['icon-three-dots']}`} /> 
            </button>
        </div>

        
        <div className={`${styles['menu']}`} >

            <button
                type='button'
                value='copy'
            >   <IconCopy className={`${styles['icon__copy']}`} /> 
            </button>
            <button
                type='button'
                value='share'
            >   <IconShare className={`${styles['icon__share']}`} /> 
            </button>
        </div>
        
        {isOpenAction &&
            <div 
                className={`${styles['shadow-of-action']}`} 
                onClick={()=>onClick_OpenCloseAction(false)}
            />
        }

    </div>
      
  );
}

export default Action;

/*
<Route path="/sign-up" >
            <SignUp />
          </Route>
          <Route path="/log-in" >
            <LogIn />
          </Route>
*/

