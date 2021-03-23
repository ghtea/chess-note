import React from 'react';
import { 
    render, beforeAllDefault, 
    screen, fireEvent, waitFor
} from 'test-utils'; 

import translationEn from 'language/translation/en.json';
import Test from './Test';

// import { StringLiteral } from 'typescript';

beforeAllDefault();


describe('<Test />', () => {

    /*
    it('matches snapshot', () => {
        const {container} = render(<Header />);
        expect(container).toMatchSnapshot();
    });
    */ 


    it('test banner', () => {
        render(<Test />);
        
        fireEvent.click( screen.getByRole('button', {name: 'Test 1'}) );
        waitFor( ()=> expect(screen.getByRole('alert', {name: translationEn['Notification.Test1__S' as keyof typeof translationEn] } )).toBeInTheDocument() );

        fireEvent.click( screen.getByRole('button', {name: 'Test 2'}) );
        waitFor( ()=> expect(screen.getByRole('alert', {name: translationEn[ 'Notification.Test2__H' as keyof typeof translationEn] } )).toBeInTheDocument() );

    });
    
});


// https://twitter.com/i/lists/create

// https://www.samdawson.dev/article/react-redux-use-selector-vs-connect
// https://itnext.io/how-existing-redux-patterns-compare-to-the-new-redux-hooks-b56134c650d2
// 테스팅 등으로 비교한 connect vs useSelector