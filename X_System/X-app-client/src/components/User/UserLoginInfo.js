import React, { Component } from 'react';
import Request from 'superagent';
import './user.css';
import { UrlApi } from '../share/Url';

class UserLoginInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            login: false,
            usernamelogin: this.props.usernamelogin
        }

        this.logout = this.logout.bind(this);
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

    logout() {
        var token = localStorage.getItem('x-auth');
        
        Request.delete(UrlApi.UserLogout)
            .set('x-auth', token)
            .end(function (err, res) {
                localStorage.setItem('x-auth', '');
                window.location.href = '/login';
            });
    }

    render() {
        return (
            this.props.login ?
                <div>
                    <a className="userlogininfo--name" >{this.state.usernamelogin}</a>
                    <button className="user--logout" onClick={this.logout}><i className="fa fa-sign-out fa-fw"></i>Logout</button>
                    <ul className="dropdown-menu userlogininfo_menu" >
                        <li><a onClick={this.logout}><i className="fa fa-sign-out fa-fw"></i>Logout</a></li>
                    </ul>
                </div>
                :
                null
        );
    }
}

export default UserLoginInfo;