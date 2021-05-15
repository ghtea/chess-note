import React, { useCallback, useEffect, useMemo  } from "react";
import history from 'libraries/history';
import { useLocation } from "react-router-dom";
import { FormattedMessage } from 'react-intl';

import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';
import * as actions from "store/actions";

import convertCase from 'tools/vanilla/convertCase';
import nav, {Link as TypeLink} from 'components/Header/nav';
import useLink from 'tools/hooks/useLink';

// import styles from './LinkSolo.module.scss';

import IconAngle from 'svgs/basic/IconAngle';


type PropsLinkSolo = TypeLink & {
    setIdCategoryOpen:  React.Dispatch<React.SetStateAction<string | undefined>>
}; 
 
function LinkSolo({
    id: idLinkSolo, 
    setIdCategoryOpen,
}: PropsLinkSolo) {

    const dispatch = useDispatch();

    const onClick_Link = useCallback(
        (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        console.log('haha')
        const href = event.currentTarget.getAttribute("href");  // https://stackoverflow.com/questions/1550901/how-to-get-raw-href-contents-in-javascript
        if (href) {
            dispatch(actions.appearance.return__REPLACE({ 
                listKey: ['showing', 'header', 'board'],
                replacement: false 
            })); 

            history.push(href);
            setIdCategoryOpen(undefined); 
        }
        },[]
    );

    const slugLinkSolo = useMemo(()=>encodeURIComponent( convertCase(idLinkSolo, 'kebabLower') ),[]);

    
    return (
        // <FormattedMessage id={`Nav.${convertCase(idLinkSolo, 'pascal')}`} />
        <li > 
          <a 
              href={`/${slugLinkSolo}`}
              onClick={onClick_Link}
          > 
              <FormattedMessage id={`Nav.${convertCase(idLinkSolo, 'pascal')}`} /> 
          </a>
        </li>
        
    );
}

 
export default LinkSolo;
 