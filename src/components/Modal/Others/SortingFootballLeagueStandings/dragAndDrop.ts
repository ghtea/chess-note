import React from 'react';
import { DragDropContext, Droppable, Draggable, DraggableLocation } from 'react-beautiful-dnd';


// 



export const moveDroppableBetweenArrays = (listStarted: unknown[], listEnded: unknown[], droppableStarted:DraggableLocation, droppableEnded: DraggableLocation) => {
    const listStartedClone = Array.from(listStarted);
    const listEndedClone = Array.from(listEnded);
    const [removed] = listStartedClone.splice(droppableStarted.index, 1);

    listEndedClone.splice(droppableEnded.index, 0, removed);

    const result: any = {};
    result[droppableStarted.droppableId] = listStartedClone;
    result[droppableEnded.droppableId] = listEndedClone;

    return result;
};


export const moveElementInArray = (list: unknown[], iBefore: number, iAfter: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(iBefore, 1);
    result.splice(iAfter, 0, removed);

    return result;
};



/*
const grid = 8;
export const returnStyleItem = (isDragging: boolean, styleDraggable: React.CSSProperties):React.CSSProperties => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    //padding: grid * 2,
    // margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'grey',

    // styles we need to apply on draggables
    ...styleDraggable
});

export const returnStyleList = (isDraggedOver: boolean):React.CSSProperties => ({
    background: isDraggedOver ? 'lightblue' : 'lightgrey',
    padding: grid,
    width: 'auto',
    alignSelf: 'flex-end',
});

*/