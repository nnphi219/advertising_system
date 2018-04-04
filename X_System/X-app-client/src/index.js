import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Layout from './components/layout/Layout';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Layout />, window.document.getElementById('root'));
ReactDOM.render(
    <App />,
    document.getElementById('body'),
);
registerServiceWorker();
