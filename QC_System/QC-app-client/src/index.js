import React from 'react';
import ReactDOM from 'react-dom';
import Request from 'superagent';
import { AppAdmin, AppXSystem } from './App';
import registerServiceWorker from './registerServiceWorker';
import Layout from './components/layout/Layout';
import UrlApi from './components/share/UrlApi';

import './index.css';
import './frontend/vendor/popup/popup.css';
import './frontend/vendor/bootstrap/css/bootstrap.css';
import './frontend/vendor/metisMenu/metisMenu.css';
import './frontend/dist/css/sb-admin-2.css';
import './frontend/vendor/morrisjs/morris.css';
import './frontend/vendor/font-awesome/css/font-awesome.css';

var AllowedUrl = ["login", "register", "post-campaign"];
var UnallowedUrlLogin = ["login", "register"];

var currentUrl = window.location.href;
var systemType = currentUrl.replace('http://', "").replace("https://", "").split('/')[1];
var elementApp = <AppAdmin />;

var currentPage = currentUrl.replace('http://', '').replace('https://', '').split('/')[1];
var currentPageWithoutParameters = currentPage.split('?')[0];

if (systemType === "x-system") {
    elementApp = <AppXSystem />;
}

function ReactRender(haveLayout) {
    if (haveLayout && currentPageWithoutParameters === "post-campaign") {
        haveLayout = false;
    }

    haveLayout ?
        ReactDOM.render(<Layout />, window.document.getElementById('root'))
        : ReactDOM.render(<div id="body"></div>, window.document.getElementById('root'));

    ReactDOM.render(elementApp, window.document.getElementById('body'));
}

function RedirectUrl() {
    if (AllowedUrl.indexOf(currentPageWithoutParameters) === -1) {
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
            if (UnallowedUrlLogin.indexOf(currentPage) === -1) {
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
