import React from 'react';
import { 
    render, beforeAllDefault, 
    screen, fireEvent,
} from 'test-utils';

import convertCase from 'tools/vanilla/convertCase';

import translationEn from 'language/translation/en.json';
import NavBar from './NavBar';
import nav from 'components/Header/nav';

// import { StringLiteral } from 'typescript';

beforeAllDefault();

const listNameCategory = nav.map(
    (category)=> 
        translationEn[`Nav.${convertCase(category.id, 'pascal')}` as keyof typeof translationEn] 
);

describe('<NavBar />', () => {

    /*
    it('matches snapshot', () => {
        const {container} = render(<Header />);
        expect(container).toMatchSnapshot();
    });
    */ 

    it.each(listNameCategory)('open close each category', (name) => {

        render(<NavBar />);

        expect(screen.getByRole('button', {name: name}).getAttribute('aria-expanded')).toBe('false');

        fireEvent.click(screen.getByRole('button', {name: name}));
        expect(screen.getByRole('button', {name: name}).getAttribute('aria-expanded')).toBe('true');


        fireEvent.click(document.body);
        expect(screen.getByRole('button', {name: name}).getAttribute('aria-expanded')).toBe('false');


        fireEvent.click(screen.getByRole('button', {name: name}));
        expect(screen.getByRole('button', {name: name}).getAttribute('aria-expanded')).toBe('true');

        fireEvent.click(screen.getByRole('button', {name: name}));
        expect(screen.getByRole('button', {name: name}).getAttribute('aria-expanded')).toBe('false');
    });

});

// https://twitter.com/i/lists/create

// https://www.samdawson.dev/article/react-redux-use-selector-vs-connect
// https://itnext.io/how-existing-redux-patterns-compare-to-the-new-redux-hooks-b56134c650d2
// 테스팅 등으로 비교한 connect vs useSelector



/*

    it('open close each category', async () => {
        render(<NavBar />);

        expect(screen.getByRole('button', {name: 'Sports'}).getAttribute('aria-expanded')).toBe('false');

        fireEvent.click(screen.getByRole('button', {name: 'Sports'}));
        expect(screen.getByRole('button', {name: 'Sports'}).getAttribute('aria-expanded')).toBe('true');


        fireEvent.click(document.body);
        expect(screen.getByRole('button', {name: 'Sports'}).getAttribute('aria-expanded')).toBe('false');


        fireEvent.click(screen.getByRole('button', {name: 'Sports'}));
        expect(screen.getByRole('button', {name: 'Sports'}).getAttribute('aria-expanded')).toBe('true');

        fireEvent.click(screen.getByRole('button', {name: 'Sports'}));
        expect(screen.getByRole('button', {name: 'Sports'}).getAttribute('aria-expanded')).toBe('false');
    });


*/