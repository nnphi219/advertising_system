import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Layout from './components/layout/Layout';
import UserLoginInfo from './components/User/UserLoginInfo';
import registerServiceWorker from './registerServiceWorker';
import Request from 'superagent';
import { UrlApi, UrlRedirect } from './components/share/Url';

import './index.css';
import './frontend/vendor/popup.css';
import './frontend/vendor/bootstrap-tokenfield.css';
import './frontend/assets/css/bootstrap.css';
import './frontend/assets/css/bootstrap-responsive.css';
import './frontend/assets/css/bootstrap-tokenfield.css';
import './frontend/assets/css/docs.css';
import './frontend/assets/css/prettyPhoto.css';
import './frontend/assets/js/google-code-prettify/prettify.css';
import './frontend/assets/css/flexslider.css';
import './frontend/assets/css/refineslide.css';
import './frontend/assets/css/font-awesome.css';
import './frontend/assets/css/animate.css';
import './frontend/assets/css/style.css';
import './frontend/assets/color/default.css';

var AllowedUrl = ["login", "register", "post", "tin-rao-vat", ''];
var AllowedUrlAdmin = ['pages', 'posttypes'];

function RedirectUrl() {
    var currentURL = window.location.href.replace('http://', '').replace('https://', '');
    var currentPath = currentURL.split('/')[1];

    if (AllowedUrl.indexOf(currentPath) === -1) {
        window.location.href = '/login';
    }
    else {
        ReactRender("", "", false);
    }
}

function ReactRender(username, user_type, isLogin) {
    var currentURL = window.location.href.replace('http://', '').replace('https://', '');
    var currentPath = currentURL.split('/')[1];
    var isAdmin = user_type === 'admin' ? true : false;
    if (AllowedUrlAdmin.indexOf(currentPath) !== -1) {
        if (!isAdmin) {
            // 404
            window.location.href = UrlRedirect.NotFound;
            return;
        }
    }

    ReactDOM.render(
        <Layout
            isAdmin={isAdmin}
        />,
        window.document.getElementById('root'));
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
            ReactRender(user.username, user.user_type, true);
        }
        else {
            RedirectUrl();
        }
    }).catch((e) => {
        RedirectUrl();
        Promise.reject();
    });

registerServiceWorker();
