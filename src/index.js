import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
// let's set up the state management in the index.js file where we wrap our entire app (add provider component)
import {Provider} from 'react-redux';
import {createStore} from 'redux';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import burgerBuilderReducer from './store/reducers/burgerBuilder';

const store = createStore(burgerBuilderReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// with that - we can set the store property on the Provider component
const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();

// has todo with making sure that the connect funcionality & the routing funcionalities work together fine

// add functionality to handle orders with react-dev tool