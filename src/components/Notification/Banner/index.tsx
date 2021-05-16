import React, { useCallback, useMemo, useEffect } from "react";

import { useHistory, useLocation } from "react-router-dom";
import { FormattedMessage } from 'react-intl';

import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';
import * as actionsRoot from "store/actions";

import {Banner as TypeBanner} from 'store/reducers/notification';

import IconXCircle from 'svgs/basic/IconXCircle';

import IconSuccess from 'svgs/notification/IconSuccess';
import IconHint from 'svgs/notification/IconHint';
import IconError from 'svgs/notification/IconError';
import IconWarning from 'svgs/notification/IconWarning';


//import IconBanner from 'svgs/basic/IconBanner';

import styles from './index.module.scss';


type PropsBanner = {
    banner: TypeBanner
};


function Banner({
    banner
}: PropsBanner) {
  
  const dispatch = useDispatch();
  
  const onClick_DeleteBanner = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        const {value : id} = event.currentTarget;
        
        dispatch(actionsRoot.notification.return__DELETE_BANNER({
            id: id
        }) )
    }, []
  );
  
  const idMessaga = useMemo( 
    ()=>{ 
        return `message__${banner['id']}`
    }, [banner]
  )
  
  // console.log(banner);
  
  return (
    
    <div 
        role='alert'
        aria-labelledby={idMessaga}
        className={`${styles['root']} ${styles[banner['kindSituation']]}`} 
    >

        <div className={`${styles['left']}`}>
            {banner['kindSituation'] === 'success' &&  <IconSuccess className={`${styles['icon__success']}`}  /> }
            {banner['kindSituation'] === 'hint' &&  <IconHint className={`${styles['icon__hint']}`}  /> }
            {banner['kindSituation'] === 'error' &&  <IconError className={`${styles['icon__error']}`}  /> }
            {banner['kindSituation'] === 'warning' &&  <IconWarning className={`${styles['icon__warning']}`}  /> }
        </div>
            
        <div className={`${styles['middle']}`}>
            <div
                id={idMessaga}
            ><FormattedMessage id={banner.idMessage} /> </div>
        </div>
      
        <div className={`${styles['right']}`}>
            <button 
                type='button'
                aria-label="Delete Banner"
                className={`${styles['button__delete']}`} 
                value={banner['id']}
                onClick={onClick_DeleteBanner}
            >
                <IconXCircle className={`${styles['icon__x-circle']}`} kind={'regular'}  />
                <IconXCircle className={`${styles['icon__x-circle']}`} kind={'solid'}  />
            </button>

        </div>
      
    </div>
  );
}

Banner.defaultProps = {
  
};

export default Banner;


/*
전체 요소들이 리렌더링 되면 그 요소의 애니메이션이 없어지는 

<Styled.Div__Banner_Guage
        className={banner['situation']}
        banner={banner}
      />
*/
