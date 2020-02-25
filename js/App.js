import React, {Component} from 'react';
import {Provider} from 'react-redux';
import AppNavigator from './navigator/AppNavigators';
import store from './store';

export default class App extends Component {
    render() {
        /**
         * 3.将store传递给App框架
         */
        return <Provider store={store}>
            <AppNavigator/>
        </Provider>;
    }

}