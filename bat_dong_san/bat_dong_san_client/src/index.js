import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import './frontend/css/reset.css';
import './frontend/css/responsive.css';

import './frontend/form/vendor/bootstrap/css/bootstrap.min.css';
import './frontend/form/fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import './frontend/form/fonts/Linearicons-Free-v1.0.0/icon-font.min.css';
import './frontend/form/vendor/animate/animate.css';
import './frontend/form/vendor/css-hamburgers/hamburgers.min.css';
import './frontend/form/vendor/animsition/css/animsition.min.css';
import './frontend/form/vendor/select2/select2.min.css';
import './frontend/form/vendor/daterangepicker/daterangepicker.css';
import './frontend/form/css/util.css';
import './frontend/form/css/main.css';


import './frontend/table/vendor/bootstrap/css/bootstrap.min.css';
import './frontend/table/fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import './frontend/table/vendor/animate/animate.css';
import './frontend/table/vendor/select2/select2.min.css';
import './frontend/table/vendor/perfect-scrollbar/perfect-scrollbar.css';
import './frontend/table/css/util.css';
import './frontend/table/css/main.css';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
