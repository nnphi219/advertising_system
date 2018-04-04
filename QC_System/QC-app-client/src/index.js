import React from 'react';
import ReactDOM from 'react-dom';
import { AppAdmin, AppXSystem } from './App';
import registerServiceWorker from './registerServiceWorker';
import Layout from './components/layout/Layout';

import './index.css';
import './frontend/vendor/popup/popup.css';
import './frontend/vendor/bootstrap/css/bootstrap.css';
import './frontend/vendor/metisMenu/metisMenu.css';
import './frontend/dist/css/sb-admin-2.css';
import './frontend/vendor/morrisjs/morris.css';
import './frontend/vendor/font-awesome/css/font-awesome.css';

var currentUrl = window.location.href;
var systemType = currentUrl.replace('http://', "").replace("https://", "").split('/')[1];
var elementApp = systemType === "x-system" ? <AppXSystem /> : <AppAdmin />;

ReactDOM.render(<Layout />, window.document.getElementById('root'));
ReactDOM.render(elementApp, window.document.getElementById('body'));

registerServiceWorker();
