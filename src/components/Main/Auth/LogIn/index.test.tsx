import React from 'react';
import { 
    render, beforeAllDefault, 
    screen, fireEvent,
} from 'test-utils';


import translationEn from 'language/translation/en.json';
import LogIn from '.';

beforeAllDefault();

describe('<LogIn />', () => {

    /*
    it('matches snapshot', () => {
        const {container} = render(<Header />);
        expect(container).toMatchSnapshot();
    });
    */ 
    
    
    it ('type input', () => {
        render(<LogIn />);
        
        const inputEmail = screen.getByRole('textbox', {name: translationEn['Main.LogIn_EmailAddress']});
        
        fireEvent.change(inputEmail, { target: { value: 'test email' } });
        expect( (inputEmail as HTMLInputElement).value).toBe('test email');

        const inputPassword = screen.getByLabelText( translationEn['Main.LogIn_Password'] );
        
        fireEvent.change(inputPassword, { target: { value: 'test password' } });
        expect( (inputPassword as HTMLInputElement).value).toBe('test password');
    });
    
    

});
