import React from 'react';
import ReactDOM from 'react-dom';
import AppWrapper from './containers/AppWrapper';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from "redux";
import { Provider} from "react-redux";
import reducer  from './reducers'


var store=createStore(reducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
ReactDOM.render(<Provider store={store}>
    <AppWrapper />
  </Provider>, document.getElementById('root'));
registerServiceWorker();
export {store};

