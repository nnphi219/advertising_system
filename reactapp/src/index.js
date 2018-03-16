import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import AdsArea from './components/Ads_Area/AdsArea';

ReactDOM.render(<AdsArea />, document.getElementById('root'));
registerServiceWorker();
