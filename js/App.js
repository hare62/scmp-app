import React from 'react';
import {Provider} from 'react-redux';
import store from './store';
import AppNavigators from './navigation/AppNavigators';

const App = () => {
	return (
		<Provider store={store} >
			<AppNavigators />
		</Provider>
	);
}

export default App;