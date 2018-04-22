import React from 'react';
import ReactDOM from 'react-dom';
import Request from 'superagent';
import { AppAdmin, AppXSystem } from './App';
import registerServiceWorker from './registerServiceWorker';
import Layout from './components/layout/Layout';
import UserLogin from './components/User/UserLogin';
import UrlApi, { UrlRedirect } from './components/share/UrlApi';

import './index.css';
import './frontend/vendor/popup/popup.css';
import './frontend/vendor/bootstrap/css/bootstrap.css';
import './frontend/vendor/metisMenu/metisMenu.css';
import './frontend/dist/css/sb-admin-2.css';
import './frontend/vendor/morrisjs/morris.css';
import './frontend/vendor/font-awesome/css/font-awesome.css';

var AllowedUrl = ["login", "register"];
var UnallowedUrlLogin = ["login", "register"];

var currentUrl = window.location.href;
var systemType = currentUrl.replace('http://', "").replace("https://", "").split('/')[1];
var elementApp = <AppAdmin />;

if (systemType === "x-system") {
    elementApp = <AppXSystem />;
}
var logedIn = false;

function ReactRender(haveLayout) {
    var currentURL = window.location.href.replace('http://', '').replace('https://', '');
    var currentPath = currentURL.split('/')[1];

    if (haveLayout && currentPath === "post-campaign") {
        haveLayout = false;
    }

    haveLayout ?
        ReactDOM.render(<Layout />, window.document.getElementById('root'))
        : ReactDOM.render(<div id="body"></div>, window.document.getElementById('root'));

    ReactDOM.render(elementApp, window.document.getElementById('body'));
}

function RedirectUrl() {
    var currentURL = window.location.href.replace('http://', '').replace('https://', '');
    var currentPath = currentURL.split('/')[1];

    if (AllowedUrl.indexOf(currentPath) === -1) {
        window.location.href = '/login';
    }
    else {
        ReactRender(false);
    }
}

var token = localStorage.getItem('x-auth');
Request.get(UrlApi.UserAuthen)
    .set('x-auth', token)
    .then((res) => {
        var user = res.body;
        if (user) {
            var currentURL = window.location.href.replace('http://', '').replace('https://', '');
            var currentPath = currentURL.split('/')[1];

            if (UnallowedUrlLogin.indexOf(currentPath) === -1) {
                ReactRender(true);
            }
            else {
                window.location.href = "/";
            }

        }
        else {
            RedirectUrl();
        }
    }).catch((e) => {
        RedirectUrl();
        Promise.reject();
    });

registerServiceWorker();
