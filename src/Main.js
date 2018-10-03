import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import {store, persistor} from './redux/store';
import Navigator from './Navigator';

export default class Main extends React.Component {
    render() {
        return <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Navigator />
            </PersistGate>
        </Provider>;
    }
}
