import React, { Component } from 'react';
import Request from 'superagent';
import './user.css';
import { UrlApi } from '../share/Url';
import validator from 'validator';

class UserLoginInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            login: false,
            usernamelogin: ''
        }

        this.logout = this.logout.bind(this);
        this.authenticate();
    }

    authenticate() {
        var token = localStorage.getItem('x-auth');

        Request.get(UrlApi.UserAuthen)
            .set('x-auth', token)
            .then((res) => {
                var user = res.body;
                if (user) {
                    this.setState({
                        login: true,
                        usernamelogin: user.username
                    });
                }
                else {
                    this.RedirectUrl();
                }
            }).catch((e) => {
                this.RedirectUrl();
                Promise.reject();
            });
    }

    RedirectUrl() {
        var currentURL = window.location.href.replace('http://', '').replace('https://', '');
        var currentPath = currentURL.split('/')[1];

        if (currentPath !== "login") {
            window.location.href = 'login';
        }
    }

    logout() {
        var token = localStorage.getItem('x-auth');
        localStorage.setItem('x-auth', '');
        window.location.href = '/login';
        // Request.delete(UrlApi.UserLogout)
        //     .set('x-auth', token)
        //     .end(function (err, res) {
        //         localStorage.setItem('x-auth', '');
        //         window.location.href = '/login';
        //     });
    }

    render() {
        return (
            this.state.login ?
                <div>
                    <a className="userlogininfo--name">{this.state.usernamelogin}</a>
                    <ul className="dropdown-menu userlogininfo_menu">
                        <li><a onClick={this.logout}><i className="fa fa-sign-out fa-fw"></i>Logout</a></li>
                    </ul>
                </div>
                :
                null
        );
    }
}

export default UserLoginInfo;