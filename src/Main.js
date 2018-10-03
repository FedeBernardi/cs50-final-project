import React from 'react';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import indexReducer from './redux/reducers/indexReducer';

import Navigator from './Navigator';

const store = createStore(
    indexReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk)
);

export default class Main extends React.Component {
    render() {
        return <Provider store={store}>
            <Navigator />
        </Provider>;
    }
}
