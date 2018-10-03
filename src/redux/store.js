import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage'

import indexReducer from './reducers/indexReducer';

const persistConfig = {
    key: 'tripApp',
    storage
}

const persistedReducer = persistReducer(persistConfig, indexReducer);

export const store = createStore(
    persistedReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk)
);

export const persistor = persistStore(store);
