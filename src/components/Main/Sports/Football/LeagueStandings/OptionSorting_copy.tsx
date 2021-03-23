import React, { useCallback, useEffect, useMemo } from "react";
import history from 'historyApp';

import { FormattedMessage } from 'react-intl';
import axios from 'axios';

import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';


import * as actions  from 'store/actions';

//import Portal from './OptionSorting/Portal';

import styles from './OptionSorting.module.scss';

 
// import IconSort from 'svgs/basic/IconSort';
type PropsOptionSorting = {
    property: 'points' | 'goals_diff' | 'goals_against' | 'goals_scored'; 
    direction: 'ascending' | 'descending';
    dictEventHandler: any;
    active: boolean;
}

function OptionSorting({
    property, 
    direction,
    dictEventHandler,
    active,
}: PropsOptionSorting) {

    const dispatch = useDispatch();

    return (
        <div className={`${styles['root']}`}
            data-property={property}
            data-active={active}
            draggable={true}
            onDrag={dictEventHandler.onDrag}
            onDragOver={dictEventHandler.onDragOver}
            onDragLeave={dictEventHandler.onDragLeave}
            onDrop={dictEventHandler.onDrop}
        >
            <span>{property}</span>
            <button
                type='button'
                value={property}
                onClick={dictEventHandler.onClick_ChangeDirection}
            >{direction === 'ascending' ? '<' : '>'}</button>
        </div>
    );
}

OptionSorting.defaultProps = {};

export default OptionSorting;

