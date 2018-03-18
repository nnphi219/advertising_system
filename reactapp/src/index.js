import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './frontend/css/popup.css';
import './frontend/css/ads_area.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, window.document.getElementById('root'));

registerServiceWorker();
