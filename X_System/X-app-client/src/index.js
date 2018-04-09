import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Layout from './components/layout/Layout';
import registerServiceWorker from './registerServiceWorker';

import './index.css';
import './frontend/assets/css/bootstrap.css';
import './frontend/assets/css/bootstrap-responsive.css';
import './frontend/assets/css/docs.css';
import './frontend/assets/css/prettyPhoto.css';
import './frontend/assets/js/google-code-prettify/prettify.css';
import './frontend/assets/css/flexslider.css';
import './frontend/assets/css/refineslide.css';
import './frontend/assets/css/font-awesome.css';
import './frontend/assets/css/animate.css';
import './frontend/assets/css/style.css';
import './frontend/assets/color/default.css';

ReactDOM.render(<Layout />, window.document.getElementById('root'));
ReactDOM.render(
    <App />,
    document.getElementById('body'),
);
registerServiceWorker();
