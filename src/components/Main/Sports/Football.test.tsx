import React from 'react';
import { 
    render, beforeAllDefault, 
    screen, fireEvent, waitFor
} from 'test-utils'; 
import '@testing-library/jest-dom/extend-expect';


import translationEn from 'language/translation/en.json';
import Football from './Football';

beforeAllDefault();

describe('<Football />', () => {

    /*
    it('matches snapshot', () => {
        const {container} = render(<Header />);
        expect(container).toMatchSnapshot();
    });
    */ 
    
    
    it ('check getting table', async () => {
        render(<Football />);
        
        
        await waitFor( () => expect(screen.getByRole('table', {name: 'League Standings'})).toBeInTheDocument() );

    });
    
    

});
