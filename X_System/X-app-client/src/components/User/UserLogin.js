import React, { Component } from 'react';
import Request from 'superagent';
import { UrlApi } from '../share/Url';
import validator from 'validator';
import { RenderInput, RenderSelect, RenderRadioButon, RenderDate } from '../share/InputsRender';

import './user.css';

class UserLogin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            ErrorEmail: ""
        };

        this.OnChangeInput = this.OnChangeInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
    }

    handleSubmit = event => {
        var email = this.state.email;

        if (!validator.isEmail(email)) {
            this.setState({
                ErrorEmail: 'Email không đúng định dạng'
            });
            event.preventDefault();
            return;
        }

        var password = this.state.password;

        var postJson = {
            email: email,
            password: password
        };

        Request.post(UrlApi.UserLogin)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send(postJson)
            .end(function (err, res) {
                console.log(res);
                localStorage.setItem('x-auth', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YWNhZWM1Nzk1ZDhiZjFlOWNhZDFmYzQiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTIzMjU4MjE0fQ.j2XEPnqPpJEg_LmOts-zh9Cik9-406HS26DvXvCjlN8');
                window.location.href = '/';
            });
    }

    OnChangeInput(e) {
        var name = e.target.name;
        var value = e.target.value;
        var jsonState = { [name]: value };

        if(name === "email"){
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
                            <button className="btn btn-primary login--button" onClick={this.handleSubmit}>Đăng nhập</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserLogin;