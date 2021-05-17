import React from 'react';
import { 
    render, beforeAllDefault, 
    screen, fireEvent, waitFor
} from 'test-utils'; 

import translationEn from 'language/translation/en.json';
import Footer from './index';
// import Modal from './Modal';

// import { StringLiteral } from 'typescript';

beforeAllDefault();


describe('<Footer />', () => {

    it('matches snapshot', () => {
        const {container} = render(<Footer />);
        expect(container).toMatchSnapshot();
    });

    
});

