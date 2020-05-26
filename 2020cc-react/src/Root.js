import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import App from './App';
import {Provider} from 'react-redux';
import configureStore from './store';

const Root = () => {
    return(
        <Provider store={configureStore()}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>
    );
};

export default Root;
