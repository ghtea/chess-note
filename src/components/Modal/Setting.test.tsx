import React from 'react';
import { render, beforeAllDefault} from 'test-utils';
// import '@testing-library/jest-dom/extend-expect';    // 이거 필요없는 듯?
import {screen, fireEvent} from '@testing-library/react';
//import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
// import * from '@testing-library/dom';

import translationEn from 'language/translation/en.json';
import Setting from './Setting';

beforeAllDefault();


describe('<Setting />', () => {

    /*
    it('matches snapshot', () => {
        const {container} = render(<Header />);
        expect(container).toMatchSnapshot();
    });
    */ 
    const listLength = [3,2];
    const lengthAll = listLength.reduce((a, b) => a + b, 0)
    // 3 + 2 = 5
    for (let i = 0; i < lengthAll; i++){
        // console.log(i)
        it('click each input', () => {
            render(<Setting />);

            fireEvent.click(screen.getAllByRole('radio')[i]);
            expect(screen.getAllByRole('radio')[i].getAttribute('checked'))
            //.toBe('false');

        });
    }

    
    it('check number of defaul checked inputs', () => {
        render(<Setting />);

        expect(screen.getAllByRole('radio', {checked: true}).length).toBe(listLength.length);
    });
    
    

});


// https://twitter.com/i/lists/create

// https://www.samdawson.dev/article/react-redux-use-selector-vs-connect
// https://itnext.io/how-existing-redux-patterns-compare-to-the-new-redux-hooks-b56134c650d2
// 테스팅 등으로 비교한 connect vs useSelector