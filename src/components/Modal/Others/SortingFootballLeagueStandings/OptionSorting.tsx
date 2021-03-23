import React, { useCallback, useEffect, useMemo } from "react";
import history from 'historyApp';

import { FormattedMessage, useIntl } from 'react-intl';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';

import IconSortButton from 'svgs/basic/IconSortButton';

import convertCase from 'tools/vanilla/convertCase'
import * as actions  from 'store/actions';

//import Portal from './OptionSorting/Portal';

import styles from './OptionSorting.module.scss';

 
// import IconSort from 'svgs/basic/IconSort';
type PropsOptionSorting = {
    property: 'points' | 'goals_diff' | 'goals_against' | 'goals_scored' | 'games_played';  
    direction: 'ascending' | 'descending';
    dictEventHandler: any;
    active: boolean;

    draggableId: string,
    index: number,
}


// https://github.com/LeeHyungGeun/react-beautiful-dnd-kr

function OptionSorting({
    property, 
    direction,
    dictEventHandler,
    active,
    
    draggableId,
    index,
}: PropsOptionSorting) {
 
    const dispatch = useDispatch();
    const nodeRef = React.useRef(null);
    
     
    return (
        <Draggable
            draggableId={draggableId}
            index={index}
        >
        {(provided, snapshot) => (

        <div className={`${styles['root']} ${snapshot.isDragging ? 'isDragging' : ''}`}
            data-property={property}
            data-active={active}
            draggable='true'
            style={provided.draggableProps.style}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
        >   
            <span> <FormattedMessage id={`Modal.SortingFootballLeagueStandings_${convertCase(property, 'pascal')}`} /> </span>

            <button
                type='button'
                value={property}
                onClick={dictEventHandler.onClick_ChangeDirection}
            >   <IconSortButton className={`${styles['icon__sort-button']}`} direction={direction}/>   
            </button> 
        </div>

        )}
        </Draggable>
    );
}

OptionSorting.defaultProps = {};

export default OptionSorting;

