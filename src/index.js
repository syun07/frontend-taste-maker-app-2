import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import * as serviceWorker from './serviceWorker';
import allReducers from './reducers/allReducers';

import 'semantic-ui-css/semantic.min.css';
import './index.css';

let store = createStore(allReducers)

ReactDOM.render(
	<Provider store={store}>
	<App />
	</Provider>,
	document.getElementById('root')
);

serviceWorker.unregister();
