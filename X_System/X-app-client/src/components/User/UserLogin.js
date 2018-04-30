import React, { Component } from 'react';
import Request from 'superagent';
import { UrlApi, UrlRedirect } from '../share/Url';
import validator from 'validator';
import { RenderInput } from '../share/InputsRender';

import './user.css';

class UserLogin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            ErrorEmail: "",
            errorLogin: ""
        };

        this.OnChangeInput = this.OnChangeInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
    }

    handleRegister() {
        window.location.href = UrlRedirect.UserRegister;
    }

    handleSubmit = event => {
        var email = this.state.email;

        if (!validator.isEmail(email)) {
            this.setState({
                ErrorEmail: 'Email không đúng định dạng'
            });
            return;
        }

        var password = this.state.password;

        var postJson = {
            email: email,
            password: password
        };

        var $this = this;
        Request.post(UrlApi.UserLogin)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send(postJson)
            .end(function (err, res) {
                if (err) {
                    $this.setState({
                        errorLogin: "Email hoặc mật khẩu không đúng!"
                    });
                }
                else {
                    localStorage.setItem('x-auth', res.body.accessToken);
                    window.location.href = '/';
                }
            });
    }

    OnChangeInput(e) {
        var name = e.target.name;
        var value = e.target.value;
        var jsonState = { 
            errorLogin: "",
            [name]: value 
        };

        if (name === "email") {
            jsonState.ErrorEmail = "";
        }

        this.setState(jsonState);
    }
    onKeyDown(e) {
        if (e.key === "Enter") {
            this.handleSubmit();
        }
    }
    render() {
        return (
            < div className="div_loginform" onKeyDown={this.onKeyDown}>
                <div>
                    <h1 className="login-header">Login</h1>
                    <h3 style={{ color: "red", marginTop: "3px" }}>{this.state.errorLogin}</h3>
                    <div className="login-form">
                        <RenderInput
                            nameId={"email"}
                            title={"Email"}
                            errorTitle={this.state.ErrorEmail}
                            value={this.state.email}
                            type={"text"}
                            className={"login--input"}
                            cssLabel={"login--text"}
                            OnChangeInput={this.OnChangeInput}
                        />

                        <RenderInput
                            nameId={"password"}
                            title={"Password"}
                            value={this.state.password}
                            type={"password"}
                            className={"login--input"}
                            cssLabel={"login--text"}
                            OnChangeInput={this.OnChangeInput}
                        />
                        <div className="submit">
                            <button className="btn btn-primary" onClick={this.handleSubmit}>Đăng nhập</button>
                            <button className="btn btn-primary" onClick={this.handleRegister}>Đăng ký</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserLogin;