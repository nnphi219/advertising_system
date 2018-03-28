import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './frontend/css/popup.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Layout from './components/layout/Layout';

ReactDOM.render(<Layout />, window.document.getElementById('root'));
ReactDOM.render(<App />, window.document.getElementById('body'));

registerServiceWorker();
