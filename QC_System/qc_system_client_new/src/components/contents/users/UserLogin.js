import React, { Component } from 'react';
import Request from 'superagent';
import UrlApi, { UrlRedirect } from '../share/UrlApi';
import { RenderInput } from '../share/InputsRender';
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

    handleRegister() {
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
                    console.log(err);
                    $this.setState({
                        ErrorLogin: "username hoặc mật khẩu không đúng!"
                    });
                    Promise.reject();
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
    onKeyDown(e) {
        if (e.key === "Enter") {
            this.handleSubmit();
        }
    }
    render() {
        return (
            <div className="login100-form validate-form" onKeyDown={this.onKeyDown}>
                <span className="login100-form-title p-b-34">
                    Đăng nhập
                            </span>

                <div className="wrap-input100 rs1-wrap-input100 validate-input m-b-20" data-validate="Type user name">
                    <input id="first-name" name="username" value={this.state.username} onChange={this.OnChangeInput} className="input100" type="text" placeholder="User name" />
                    <span className="focus-input100"></span>
                </div>
                <div className="wrap-input100 rs2-wrap-input100 validate-input m-b-20" data-validate="Type password">
                    <input name="password" value={this.state.password} onChange={this.OnChangeInput} className="input100" type="password"  placeholder="Password" />
                    <span className="focus-input100"></span>
                </div>

                <div className="container-login100-form-btn">
                    <button className="login100-form-btn" onClick={this.handleSubmit}>
                        Đăng nhập
						        </button>
                </div>

                <div className="w-full text-center p-t-27 p-b-100">
                    <span className="txt1">
                        Quên
						        </span>

                    <a href="#" className="txt2">
                        User name / password?
						        </a>
                </div>

                <div className="w-full text-center p-b-100">
                    <button className="txt3" onClick={this.props.openRegister}>
                        Đăng ký
						        </button>
                </div>
            </div>
        );
    }
}

export default UserLogin;