import React, { useCallback, useEffect, useState, useRef } from "react";
import history from 'historyApp';
import { useLocation } from "react-router-dom";
import { FormattedMessage } from 'react-intl';

import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';
import * as actionsRoot from "store/actions";

import Category from './Nav/Category';
import nav from './nav';
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
                {nav.map((categoryEach, iEach)=>(
                    <Category 
                        idCategoryOpen={idCategoryOpen}

                        id={categoryEach.id}
                        listLink={categoryEach.listLink}

                        onClick={onClick_Category}
                        setIdCategoryOpen={setIdCategoryOpen}
                        key={`NavBoard__Category-${iEach}`}
                    />
                ))}
            </ul>
        </nav> 
    );
}

NavBoard.defaultProps = {
    isOpen: false
};

export default NavBoard;
