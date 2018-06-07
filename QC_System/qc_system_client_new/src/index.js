import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import './frontend/vendors/bootstrap/dist/css/bootstrap.min.css';
import './frontend/vendors/font-awesome/css/font-awesome.min.css';
import './frontend/vendors/nprogress/nprogress.css';
import './frontend/vendors/iCheck/skins/flat/green.css';
import './frontend/vendors/bootstrap-progressbar/css/bootstrap-progressbar-3.3.4.min.css';
import './frontend/vendors/jqvmap/dist/jqvmap.min.css';
import './frontend/vendors/bootstrap-daterangepicker/daterangepicker.css';
import './frontend/build/css/custom.min.css';

const store = createStore(reducers);

ReactDOM.render(
    // <Provider store={store}>
        <App />
    // </Provider>

    , document.getElementById('root'));
registerServiceWorker();
