if(true) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'))
}

import React from 'react';
import {Provider} from 'react-redux';
import store from './redux/store';
import AppNavigators from './navigation/AppNavigators';
import { LoadingView } from './common/Component/LoadingView';

const App = () => {
	return (
		<Provider store={store} >
			<LoadingView />
			<AppNavigators />
		</Provider>
	);
}

export default App;   