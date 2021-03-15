import React from 'react';
import { 
    render, beforeAllDefault, 
    screen, fireEvent, waitFor
} from 'test-utils'; 
import '@testing-library/jest-dom/extend-expect';


import translationEn from 'language/translation/en.json';
import Weather from '../Life/Weather';

beforeAllDefault();

describe('<Weather />', () => {

    /*
    it('matches snapshot', () => {
        const {container} = render(<Header />);
        expect(container).toMatchSnapshot();
    });
    */ 
    
    
    it ('check getting table', async () => {
        render(<Weather />);
        
        
        await waitFor( () => expect(screen.getByRole('figure', {name: 'Hourly'})).toBeInTheDocument() );

    });
    
    

});
 