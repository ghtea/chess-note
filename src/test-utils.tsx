import React from 'react';
import { render as renderRtl, RenderOptions } from '@testing-library/react';
// import '@testing-library/dom';

import { IntlProvider } from 'react-intl';
import translationEn from 'language/translation/en.json';


import { Router} from "react-router-dom";  // BrowserRouter
import history from 'libraries/history';

import {Provider, useSelector, useDispatch} from 'react-redux' 
import store from './store';

import { CookiesProvider } from 'react-cookie';

// import '@testing-library/jest-dom/extend-expect'; // 지금으로선 아마 각각의 파일에 추가해야 할듯 
export {screen, fireEvent} from '@testing-library/react';
export {waitFor} from '@testing-library/dom'
//import userEvent from '@testing-library/user-event';


export const beforeAllDefault = () => {
    beforeAll(()=>{
        jest.spyOn(console, 'log').mockImplementation(jest.fn());
        jest.spyOn(console, 'group').mockImplementation(jest.fn());
    });
}


// wrote automatically from IDE tooltip
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Ui = React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>;

type Option = Pick<RenderOptions<typeof import("@testing-library/dom/types/queries")>, "container" | "baseElement" | "hydrate" | "wrapper"> | undefined;

export const render = (ui: Ui, option: Option = undefined) =>{

    const wrapper:React.FunctionComponent<Record<string, unknown>> = ({ children }) => {

        return (
            <Router history={history}>
            <CookiesProvider>
            <Provider store={store}>
            <IntlProvider locale={'en'} messages={translationEn} >
                {children}
            </IntlProvider>
            </Provider>
            </CookiesProvider>
            </Router>
        )
    }

    return renderRtl(ui, { wrapper: wrapper, ...option })
}


