import React, { Component } from 'react';
import Request from 'superagent';
import UrlApi, { UrlRedirect } from '../share/UrlApi';
import { RenderInput, RenderSelect, RenderRadioButon, RenderDate } from '../share/InputsRender';
import './user.css';

class UserLogin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            ErrorLogin: ""
        };

        this.OnChangeInput = this.OnChangeInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
    }

    handleRegister(){
        window.location.href = UrlRedirect.UserRegister;
    }

    handleSubmit = event => {
        var username = this.state.username;
        var password = this.state.password;

        var postJson = {
            username: username,
            password: password
        };

        var $this = this;
        Request.post(UrlApi.UserLogin)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send(postJson)
            .end(function (err, res) {
                if (err) {
                    $this.setState({
                        ErrorLogin: "username hoặc mật khẩu không đúng!"
                    });
                }
                else {
                    localStorage.setItem('x-auth', res.body.accessToken);
                    localStorage.setItem('x-urlapi', res.body.UrlApi);
                    window.location.href = '/';
                }
            });
    }

    OnChangeInput(e) {
        var name = e.target.name;
        var value = e.target.value;
        var jsonState = { 
            ErrorLogin: "",
            [name]: value 
        };

        this.setState(jsonState);
    }
    onKeyDown(e){
        if(e.key === "Enter"){
            this.handleSubmit();
        }
    }
    render() {
        return (
            < div className="div_loginform" onKeyDown={this.onKeyDown}>
                <div>
                    <h1 className="login-header">Login</h1>
                    <h3 style={{ color: "red", marginTop: "3px" }}>{this.state.ErrorLogin}</h3>
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
                            <button className="btn btn-primary" onClick={this.handleRegister}>Đăng ký</button>
                        </div>
                </div>
            </div>
        );
    }
}

export default UserLogin;