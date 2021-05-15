import React, { useCallback, useEffect, useState, useRef } from "react";
import history from 'libraries/history';
import { useLocation } from "react-router-dom";
import { FormattedMessage } from 'react-intl';

import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';
import * as actionsRoot from "store/actions";

import Category from './Nav/Category';
import LinkSolo from './Nav/LinkSolo';
import nav, {Category as TypeCategory, Link as TypeLInk} from './nav';
import useLink from 'tools/hooks/useLink';

import styles from './NavBoard.module.scss';
import IconAngle from 'svgs/basic/IconAngle';


type PropsNavBoard = {
    isOpen:boolean;
};

function NavBoard({isOpen}: PropsNavBoard) {

    const {onClick_LinkInsideApp} = useLink(history);

    const [idCategoryOpen, setIdCategoryOpen] = useState<undefined | string>(undefined);

    const onClick_Category = useCallback(
        (event:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            const {currentTarget: {value : idCategoryClicked}} = event;
            if (idCategoryOpen === idCategoryClicked){
                setIdCategoryOpen(undefined);
            }
            else {
                setIdCategoryOpen(idCategoryClicked);
            }
        },[idCategoryOpen]
    );
    
    // close sub menu when click outside of menu
    const refListAll = useRef<HTMLUListElement>(null);
    const onClick_Window = useCallback(
        (event:MouseEvent)=> {   
            if ( !refListAll.current?.contains(event.target as Node)){
                setIdCategoryOpen(undefined);
            } 
        },[refListAll]
    ); 
    useEffect(()=>{  // close sub menu when click outside of menu
        window.addEventListener('click', onClick_Window);
        return () => window.removeEventListener('click', onClick_Window);
    },[onClick_Window]);


    return (
        <nav 
            className={`${styles['root']} on-small-devices ${isOpen ? 'is-open' : ''}`}
            aria-label="Main Navigation Board"
        > 
            <ul 
            className={`${styles['all']}`}
            aria-labelledby={'name__categoryA'}
            ref={refListAll}
            >
                {nav.map((itemEach, iEach)=>{
                const {kind} = itemEach;
                if (kind === 'category'){
                    return (
                        <Category  
                            idCategoryOpen={idCategoryOpen}
                            kind={(itemEach as TypeCategory).kind}
                            id={(itemEach as TypeCategory).id}
                            listLink={(itemEach as TypeCategory).listLink}

                            onClick={onClick_Category}
                            setIdCategoryOpen={setIdCategoryOpen}
                            
                            key={`NavBar__Item-${iEach}`}
                        />
                    )
                }
                else { // kind === 'link;
                    return (
                        <LinkSolo  
                            kind={(itemEach as TypeLInk).kind}
                            id={(itemEach as TypeLInk).id}
                            
                            setIdCategoryOpen={setIdCategoryOpen}
                            key={`NavBar__Item-${iEach}`}
                        />
                    )
                }
            })}
            </ul>
        </nav> 
    );
}

NavBoard.defaultProps = {
    isOpen: false
};

export default NavBoard;
