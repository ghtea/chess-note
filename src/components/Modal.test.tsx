import React, { useCallback} from 'react';
import { 
    render, beforeAllDefault, 
    screen, fireEvent, waitFor
} from 'test-utils'; 
import '@testing-library/jest-dom/extend-expect';

import translationEn from 'language/translation/en.json';
import Modal from './Modal';

// import { StringLiteral } from 'typescript';
import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';
import * as actionsRoot from "store/actions";
import convertCase from 'tools/vanilla/convertCase';

beforeAllDefault();


type PropsHeader = {};

function CollectionButtonOpening({}: PropsHeader) {

    const dispatch = useDispatch();
    
    const onClick_ShowModal = useCallback(
        (event:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const {value} = event.currentTarget;
        dispatch(actionsRoot.status.return__REPLACE({ 
            listKey: ['showing', 'modal', value],
            replacement: true
        }));
        },[]
    );
  
  return (
    <div >
        <button
            type='button'
            aria-label="Open Setting"
            value={convertCase("Setting", 'camel')}
            onClick={onClick_ShowModal}
        />

        <button
            type='button'
            aria-label="Open MyProfile"
            value={convertCase("MyProfile", 'camel')}
            onClick={onClick_ShowModal}
        />  

        <button
            type='button'
            aria-label="Open SortingFootballLeagueStandings"
            value={convertCase("SortingFootballLeagueStandings", 'camel')}
            onClick={onClick_ShowModal}
        />    
    </div>
  );
}

describe('Open and close all modals', () => {

    /*
    it('matches snapshot', () => {
        const {container} = render(<Header />);
        expect(container).toMatchSnapshot();
    });
    */ 

    it('open/close Setting', () => {
        render(<Modal/>);
        render(<CollectionButtonOpening />);

        fireEvent.click(screen.getByRole('button', {name: 'Open Setting'}));
        expect(screen.getByRole('dialog', {name: translationEn['Modal.Setting_Title']})).toBeInTheDocument();
        
        fireEvent.click( screen.getByRole('button', {name: 'Close Setting'}) );
        expect(screen.queryByRole('dialog', {name: translationEn['Modal.Setting_Title']})).not.toBeInTheDocument();


        fireEvent.click( screen.getByRole('button', {name: 'Open Setting'}) );
        expect(screen.getByRole('dialog', {name: translationEn['Modal.Setting_Title']})).toBeInTheDocument();
        
        fireEvent.click( screen.getByLabelText('Outside Setting') );
        expect(screen.queryByRole('dialog', {name: translationEn['Modal.Setting_Title']})).not.toBeInTheDocument();
    });


    it('open/close MyProfile', () => {
        render(<Modal/>);
        render(<CollectionButtonOpening />);

        fireEvent.click(screen.getByRole('button', {name: 'Open MyProfile'}));
        expect(screen.getByRole('dialog', {name: translationEn['Modal.MyProfile_Title']})).toBeInTheDocument();
        
        fireEvent.click( screen.getByRole('button', {name: 'Close MyProfile'}) );
        expect(screen.queryByRole('dialog', {name: translationEn['Modal.MyProfile_Title']})).not.toBeInTheDocument();


        fireEvent.click( screen.getByRole('button', {name: 'Open MyProfile'}) );
        expect(screen.getByRole('dialog', {name: translationEn['Modal.MyProfile_Title']})).toBeInTheDocument();
        
        fireEvent.click( screen.getByLabelText('Outside MyProfile') );
        expect(screen.queryByRole('dialog', {name: translationEn['Modal.MyProfile_Title']})).not.toBeInTheDocument();
    }); 

    it('open/close SortingFootballLeagueStandings', () => {
        render(<Modal/>);
        render(<CollectionButtonOpening />);

        fireEvent.click(screen.getByRole('button', {name: 'Open SortingFootballLeagueStandings'}));
        expect(screen.getByRole('dialog', {name: translationEn['Modal.SortingFootballLeagueStandings_Title']})).toBeInTheDocument();
        
        fireEvent.click( screen.getByRole('button', {name: 'Close SortingFootballLeagueStandings'}) );
        expect(screen.queryByRole('dialog', {name: translationEn['Modal.SortingFootballLeagueStandings_Title']})).not.toBeInTheDocument();


        fireEvent.click( screen.getByRole('button', {name: 'Open SortingFootballLeagueStandings'}) );
        expect(screen.getByRole('dialog', {name: translationEn['Modal.SortingFootballLeagueStandings_Title']})).toBeInTheDocument();
        
        fireEvent.click( screen.getByLabelText('Outside SortingFootballLeagueStandings') );
        expect(screen.queryByRole('dialog', {name: translationEn['Modal.SortingFootballLeagueStandings_Title']})).not.toBeInTheDocument();
    }); 

});


// https://twitter.com/i/lists/create

// https://www.samdawson.dev/article/react-redux-use-selector-vs-connect
// https://itnext.io/how-existing-redux-patterns-compare-to-the-new-redux-hooks-b56134c650d2
// 테스팅 등으로 비교한 connect vs useSelector