import React, { Component } from 'react';
import { RenderInput, RenderSelect } from '../share/InputsRender';
import validator from 'validator';
import Request from 'superagent';
import { UrlRedirect, UrlApi } from '../share/Url';

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
            <div>

                <div style={{ paddingLeft: "30px" }}>
                    <RenderInput
                        nameId={"username"}
                        title={"User name"}
                        value={stateValues.username}
                        type={"text"}
                        className={"user--input"}
                        errorTitle={stateValues.usernameError}
                        OnChangeInput={this.props.OnChangeInput}
                    />

                    <RenderInput
                        nameId={"email"}
                        title={"Email"}
                        value={stateValues.email}
                        type={"text"}
                        className={"user--input"}
                        errorTitle={stateValues.emailError}
                        OnChangeInput={this.props.OnChangeInput}
                    />

                    <RenderInput
                        nameId={"password"}
                        title={"Password"}
                        value={stateValues.password}
                        type={"password"}
                        className={"user--input"}
                        errorTitle={stateValues.passwordError}
                        OnChangeInput={this.props.OnChangeInput}
                    />

                    <RenderInput
                        nameId={"passwordconfirm"}
                        title={"Xác nhận Password"}
                        value={stateValues.passwordconfirm}
                        type={"password"}
                        className={"user--input"}
                        OnChangeInput={this.props.OnChangeInput}submit
                    />
                </div>
                <div className="submit">
                    <button className="btn btn-primary" onClick={this.props.submit}>Đăng ký</button>
                    <button className="btn btn-primary" onClick={this.handleCancel}>Cancel</button>
                </div>
            </div>
        );
    }
}

class UserRegister extends Component {
    constructor(props) {
        super(props);

        this.state = {
            usernameError: '',
            emailError: '',
            passwordError: ''
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
            jsonError.usernameError = "error";
        }
        if (!validator.isEmail(state.email)) {
            submitValid = false;
            jsonError.emailError = "Email không hợp lệ";
        }
        if (state.password !== state.passwordconfirm) {
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
            email: state.email
        };

        return jsonState;
    }

    submit() {
        var content = this.GetStateModel();

        var $this = this;
        Request.post(UrlApi.UserManagement)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send(content)
            .end(function (err, res) {
                localStorage.setItem('x-auth', res.body.accessToken);
                window.location.href = UrlRedirect.Users;
            });
    }

    render() {
        return (
            <div>
                <h1>Đăng ký</h1>
                <RegisterForm
                    submit={this.submit}
                    OnChangeInput={this.OnChangeInput}
                    stateValues={this.state}
                />
            </div>
        );
    }
}

export default UserRegister;