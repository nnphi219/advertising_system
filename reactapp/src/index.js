import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Ads_Area from './components/Ads_Area/AdsArea';

ReactDOM.render(<Ads_Area />, document.getElementById('root'));
registerServiceWorker();
