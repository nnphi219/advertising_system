import React, { Component } from 'react';
import validator from 'validator';
import Request from 'superagent';
import UrlApi, { UrlRedirect } from '../share/UrlApi';
import './user.css';

class RegisterForm extends Component {
    constructor(props) {
        super(props);

        this.handleCancel = this.handleCancel.bind(this);
    }

    handleCancel() {
        window.location.href = UrlRedirect.UserLogin;
    }

    render() {
        var stateValues = this.props.stateValues;

        return (
            <div className="login100-form validate-form" onKeyDown={this.onKeyDown}>
                <span className="login100-form-title p-b-34">
                    Đăng ký
                </span>
                <div className="wrap-input100 rs1-wrap-input100 validate-input m-b-20" data-validate="Type user name">
                    <input id="first-name" name="username" value={stateValues.username} onChange={this.props.OnChangeInput} className="input100" type="text" placeholder="User name" />
                    <span className="focus-input100"></span>
                </div>

                <div className="wrap-input100 rs2-wrap-input100 validate-input m-b-20" data-validate="Type password">
                    <input name="email" value={stateValues.email} onChange={this.props.OnChangeInput} className="input100" type="text" placeholder="Email" />
                    <span className="focus-input100"></span>
                </div>

                <div className="wrap-input100 rs2-wrap-input100 validate-input m-b-20" data-validate="Type password">
                    <input name="password" value={stateValues.password} onChange={this.props.OnChangeInput} className="input100" type="password" placeholder="Password" />
                    <span className="focus-input100"></span>
                </div>

                <div className="wrap-input100 rs2-wrap-input100 validate-input m-b-20" data-validate="Type password">
                    <input name="passwordconfirm" value={stateValues.passwordconfirm} onChange={this.props.OnChangeInput} className="input100" type="password" placeholder="XÁc nhận password" />
                    <span className="focus-input100"></span>
                </div>

                <div className="wrap-input100 rs1-wrap-input100 validate-input m-b-20" data-validate="Type user name">
                    <input id="first-name" name="UrlApi" value={stateValues.UrlApi} onChange={this.props.OnChangeInput} className="input100" type="text" placeholder="Domain chính" />
                    <span className="focus-input100"></span>
                </div>

                <div className="container-login100-form-btn">
                    <button className="login100-form-btn" onClick={this.props.submit}>
                        Đăng ký
						        </button>
                </div>

                <div className="w-full text-center p-t-27 p-b-100">

                </div>

                <div className="w-full text-center p-b-100">
                    <button className="txt3" onClick={this.props.openLogin}>
                        Đăng nhập
						        </button>
                </div>
            </div>
        );
    }
}

class UserRegister extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            password: '',
            usernameError: '',
            emailError: '',
            passwordError: '',
            UrlApi: ''
        };

        this.OnChangeInput = this.OnChangeInput.bind(this);
        this.submit = this.submit.bind(this);
    }

    OnChangeInput(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    GetStateModel() {
        var submitValid = true;
        var state = this.state;

        var jsonError = {};

        if (state.username === "") {
            submitValid = false;
            jsonError.usernameError = "Username chưa được nhập";
        }
        if (state.email === "" || !validator.isEmail(state.email)) {
            submitValid = false;
            jsonError.emailError = "Email không hợp lệ";
        }
        if (state.password === "" || state.password !== state.passwordconfirm) {
            submitValid = false;
            jsonError.passwordError = "Password không giống nhau";
        }
        if (!submitValid) {
            this.setState(jsonError);
            return;
        }

        var jsonState = {
            username: state.username,
            password: state.password,
            UrlApi: state.UrlApi,
            email: state.email
        };

        return jsonState;
    }

    submit() {
        var content = this.GetStateModel();

        Request.post(UrlApi.UserManagement)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send(content)
            .end(function (err, res) {
                if (err) {

                }
                else {
                    localStorage.setItem('x-auth', res.body.accessToken);
                    localStorage.setItem('x-urlapi', res.body.UrlApi);
                    window.location.href = '/';
                }
            });
    }

    render() {
        return (
            <RegisterForm
                submit={this.submit}
                OnChangeInput={this.OnChangeInput}
                stateValues={this.state}
                openLogin={this.props.openLogin}
            />
        );
    }
}

export default UserRegister;