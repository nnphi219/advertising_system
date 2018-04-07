import React, { Component } from 'react';
import Request from 'superagent';
import UrlApi from '../share/UrlApi';
import { RenderInput, RenderSelect, RenderRadioButon, RenderDate } from '../share/InputsRender';
import './user.css';

class UserLogin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: ""
        };

        this.OnChangeInput = this.OnChangeInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = event => {
        var username = this.state.username;
        var password = this.state.password;

        var postJson = {
            username: username,
            password: password
        };

        Request.post(UrlApi.UserLogin)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send(postJson)
            .end(function (err, res) {
                localStorage.setItem('x-auth', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YWM4NmVlZDVjMGE3OTE1Mzg3Y2I2YTgiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTIzMDg1MDM4fQ.ktMP8PWMzYcw2SXeW7yeF6PEGpmuFusOMSJMtO5om6Q');
                window.location.href = '/';
            });

        event.preventDefault();
    }

    OnChangeInput(e) {
        var name = e.target.name;
        var value = e.target.value;
        var jsonState = { [name]: value };

        this.setState(jsonState);
    }

    render() {
        return (
            < div className="div_loginform" >
                <div>
                    <h1>Login</h1>
                    <div>
                        <RenderInput
                            nameId={"username"}
                            title={"User name"}
                            value={this.state.username}
                            type={"text"}
                            className={"login--input"}
                            OnChangeInput={this.OnChangeInput}
                        />

                        <RenderInput
                            nameId={"password"}
                            title={"Password"}
                            value={this.state.password}
                            type={"password"}
                            className={"login--input"}
                            OnChangeInput={this.OnChangeInput}
                        />
                    </div>
                    <div className="submit">
                        <button className="btn btn-primary" onClick={this.handleSubmit}>Đăng nhập</button>
                    </div>

                </div>
            </div>
        );
    }
}

export default UserLogin;