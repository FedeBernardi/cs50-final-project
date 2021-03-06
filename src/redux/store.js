import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage'

import indexReducer from './reducers/indexReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk)
);

const persistConfig = {
    key: 'tripApp',
    storage
}

const persistedReducer = persistReducer(persistConfig, indexReducer);

export const store = createStore(
    persistedReducer,
    enhancer
);

export const persistor = persistStore(store);
