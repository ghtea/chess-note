import React, { useCallback, useEffect, useRef, useMemo } from "react";

import { FormattedMessage } from 'react-intl';
import Cookies from 'js-cookie';

import { DragDropContext, Droppable, Draggable,
    DropResult, ResponderProvided } from 'react-beautiful-dnd';
import OptionSorting from './SortingFootballLeagueStandings/OptionSorting';
import * as toolsDnd from './SortingFootballLeagueStandings/dragAndDrop';
import sortListStatTeam from '../../Main/Sports/Football/LeagueStandings/returnListStatTeamSorted';


import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';
import * as actions from "store/actions";

import convertCase from 'tools/vanilla/convertCase';
import IconX from 'svgs/basic/IconX';

import styles from './SortingFootballLeagueStandings.module.scss';
import stylesModal from 'components/Modal.module.scss';


type PropsSortingFootballLeagueStandings = {};

function SortingFootballLeagueStandings({}: PropsSortingFootballLeagueStandings) {
  
    const dispatch = useDispatch();

    const sorting = useSelector((state: StateRoot) => state.status.current.football.leagueStandings.sorting);
    

    const onClick_CloseModal = useCallback(
        (event:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const {value} = event.currentTarget;
        dispatch(actions.status.return__REPLACE({ 
            listKey: ['showing', 'modal', value],
            replacement: false
        }));
        },[]
    );
    

    const refModal = useRef<HTMLDivElement>(null);
    const onClick_Window = useCallback(
        (event:MouseEvent)=> {   
            if ( !refModal.current?.contains(event.target as Node)){
                dispatch(actions.status.return__REPLACE({ 
                    listKey: ['showing', 'modal', convertCase("SortingFootballLeagueStandings", 'camel')],
                    replacement: false
                }));
            } 
        },[refModal]
    ); 
    useEffect(()=>{  // close sub menu when click outside of menu
        window.addEventListener('click', onClick_Window);
        return () => window.removeEventListener('click', onClick_Window);
    },[onClick_Window]);


    
    const dictEventHandler = useMemo(()=>{
        return {
            onDragEnd: (result: DropResult, provided: ResponderProvided)=>{
            
                const { source, destination } = result;

                // dropped outside the list
                if (!destination) {
                    return;
                }

                if (source.droppableId === destination.droppableId) {
                    const listOption = toolsDnd.moveElementInArray(
                        sorting[source.droppableId as 'listOptionActive' | 'listOptionInactive'],
                        source.index,
                        destination.index
                    );

                    dispatch(actions.status.return__REPLACE({
                        listKey: ['current', 'football', 'leagueStandings', 'sorting', source.droppableId],
                        replacement: listOption
                    }));

                } else {

                    const resultSorting = toolsDnd.moveDroppableBetweenArrays(
                        sorting[source.droppableId as 'listOptionActive' | 'listOptionInactive'],
                        sorting[destination.droppableId as 'listOptionActive' | 'listOptionInactive'],
                        source,
                        destination
                    );

                    dispatch(actions.status.return__REPLACE({
                        listKey: ['current', 'football', 'leagueStandings', 'sorting'],
                        replacement: {
                            listOptionActive: resultSorting['listOptionActive'],
                            listOptionInactive: resultSorting['listOptionInactive'],
                        }
                    }));

                }
                
            },

            onClick_ChangeDirection: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
                event.preventDefault();
                const {value} = event.currentTarget;
                const index = sorting.listOptionActive.findIndex(option => option.property === value);
                if (index > -1){
                    dispatch(actions.status.return__REPLACE({
                        listKey: ['current', 'football', 'leagueStandings', 'sorting', 'listOptionActive', index, 'direction'],
                        replacement: sorting.listOptionActive[index].direction === 'ascending' ? 'descending': 'ascending'
                    }));
                }
            },
        }
    }, [sorting ])
    



  return (
    <div 
        className={`${styles['root']} ${stylesModal['root']}`} 
    >
        <div
            className={`${stylesModal['outside']} ${styles['outside']}`}
            aria-label="Outside SortingFootballLeagueStandings"
        />

        <div 
            className={`${stylesModal['modal']}`}
            role="dialog" aria-labelledby="Heading_SortingFootballLeagueStandings"
            ref={refModal}
        >
            <div className={`${stylesModal['header']} ${styles['header']}`} >
                <h2 id='Heading_SortingFootballLeagueStandings'>  <FormattedMessage id={`Modal.SortingFootballLeagueStandings_Title`} /> </h2>
                <button
                    type='button'
                    aria-label="Close SortingFootballLeagueStandings"
                    value={convertCase("SortingFootballLeagueStandings", 'camel')}
                    onClick={onClick_CloseModal}
                > 
                    <IconX className={`${stylesModal['icon-x']}`} />
                </button>
            </div>

            <div 
                className={`${stylesModal['division']}`}
            />
        
            <div 
                className={`${styles['content']}`} 
            >

                <DragDropContext
                    onDragEnd={dictEventHandler.onDragEnd}
                >

                <div
                    className={`${styles['active']}`}
                >
                    <span
                        className={`${styles['status']}`}
                    > Active </span>

                    <Droppable 
                        droppableId="listOptionActive"
                    >
                    {(provided, snapshot) => (

                    <div
                        className={`${styles['area']} ${snapshot.isDraggingOver ? 'isDraggingOver' : ''}`}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                    {sorting.listOptionActive.map(( (option, index)=>(
                        <OptionSorting
                            property={option.property}
                            direction={option.direction}
                            dictEventHandler={dictEventHandler}
                            active={true}

                            key={`OptionSortingActive-${index}`}
                            draggableId={`OptionSortingActive-${index}`}
                            index={index}
                        />
                    )))}
                    
                    {provided.placeholder} {/* https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/api/droppable.md */ }
                    </div>
                    )}
                    </Droppable>

                </div>

                
                
            
        
                    
                <div 
                    className={`${styles['inactive']}`} 
                >   
                    <span
                        className={`${styles['status']}`}
                    > Inactive </span>

                    <Droppable 
                        droppableId="listOptionInactive"
                    >
                    {(provided, snapshot) => (
                    <div 
                        className={`${styles['area']} ${snapshot.isDraggingOver ? 'isDraggingOver' : ''}`} 
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                    {sorting.listOptionInactive.map(( (option, index)=>(
                        <OptionSorting
                            property={option.property}
                            direction={option.direction}
                            dictEventHandler={dictEventHandler}
                            active={false}

                            key={`OptionSortingInactive-${index}`}
                            draggableId={`OptionSortingInactive-${index}`}
                            index={index}
                        />
                    )))}
                    {provided.placeholder} {/* https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/api/droppable.md */ }
                    </div>
                    )}
                    </Droppable>

                </div>
                </DragDropContext>
                    
            </div>
        
        </div>
    </div>
    
  );
}

SortingFootballLeagueStandings.defaultProps = {};

export default SortingFootballLeagueStandings;


