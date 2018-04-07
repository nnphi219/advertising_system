import React from 'react';
import ReactDOM from 'react-dom';
import Request from 'superagent';
import { AppAdmin, AppXSystem } from './App';
import registerServiceWorker from './registerServiceWorker';
import Layout from './components/layout/Layout';
import UserLogin from './components/User/UserLogin';
import UrlApi from './components/share/UrlApi';

import './index.css';
import './frontend/vendor/popup/popup.css';
import './frontend/vendor/bootstrap/css/bootstrap.css';
import './frontend/vendor/metisMenu/metisMenu.css';
import './frontend/dist/css/sb-admin-2.css';
import './frontend/vendor/morrisjs/morris.css';
import './frontend/vendor/font-awesome/css/font-awesome.css';

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YWM4NWJhZTE5MDk2NzI4NzQzZDVhZTgiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTIzMDgwMTExfQ.40zT-vxKNhtMrpDrneq8wqvY1mFDEvm7TeiYmOgjFJU

var currentUrl = window.location.href;
var systemType = currentUrl.replace('http://', "").replace("https://", "").split('/')[1];
var elementApp = <AppAdmin />;

if (systemType === "x-system") {
    elementApp = <AppXSystem />;
}

var logedIn = false;

registerServiceWorker();

var token = localStorage.getItem('x-auth');

Request.get(UrlApi.UserAuthen)
    .set('x-auth', token)
    .then((res) => {
        var user = res.body;
        if (user) {
            logedIn = true;
        }

        RedirectUrl();
    }).catch((e) => {
        logedIn = false;
        RedirectUrl();
        Promise.reject();
    });

function RedirectUrl() {
    var currentURL = window.location.href.replace('http://', '').replace('https://', '');
    var currentPath = "/" + currentURL.split('/')[1];

    if (logedIn || currentPath === "/user-login") {
        ReactDOM.render(<Layout />, window.document.getElementById('root'));
        ReactDOM.render(elementApp, window.document.getElementById('body'));
    }
    else {
        window.location.href = '/user-login';
    }
}



