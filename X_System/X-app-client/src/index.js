import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Layout from './components/layout/Layout';
import UserLoginInfo from './components/User/UserLoginInfo';
import registerServiceWorker from './registerServiceWorker';
import Request from 'superagent';
import { UrlApi } from './components/share/Url';

import './index.css';
import './frontend/vendor/popup.css';
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

var AllowedUrl = ["login", "register", "post", "marketing"];

function RedirectUrl() {
    var currentURL = window.location.href.replace('http://', '').replace('https://', '');
    var currentPath = currentURL.split('/')[1];

    if (AllowedUrl.indexOf(currentPath) === -1) {
        window.location.href = '/login';
    }
    else{
        ReactRender("", false);
    }
}

function ReactRender(username, isLogin) {
    ReactDOM.render(<Layout />, window.document.getElementById('root'));
    ReactDOM.render(
        <UserLoginInfo
            login={isLogin}
            usernamelogin={username}
        />,
        window.document.getElementById('UserLoginInfo')
    );
    ReactDOM.render(
        <App />,
        document.getElementById('body'),
    );
}

var token = localStorage.getItem('x-auth');

Request.get(UrlApi.UserAuthen)
    .set('x-auth', token)
    .then((res) => {
        var user = res.body;
        if (user) {
            ReactRender(user.username, true);
        }
        else {
            RedirectUrl();
        }
    }).catch((e) => {
        RedirectUrl();
        Promise.reject();
    });

registerServiceWorker();
