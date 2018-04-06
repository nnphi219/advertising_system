import React, { Component } from 'react';
import UrlApi from '../share/UrlApi';
import { RenderInput, RenderSelect, RenderRadioButon, RenderDate } from '../share/InputsRender';
import './user.css';

class UserLogin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            username: "",
            password: ""
        };
    }

    handleSubmit = event => {
        event.preventDefault();
    }

    OnChangeInput(e) {
        var name = e.target.name;
        var value = e.target.value;
        var jsonState = { [name]: value };
        console.log(jsonState);
        this.setState(jsonState);
    }

    render() {
        return (
            < div id="page-wrapper" >
                <div className="row" className="div_loginform">
                    <h1>Login</h1>
                    <div>
                        <RenderInput
                            nameId={"username"}
                            title={"User name"}
                            value={this.state.username}
                            type={"text"}
                            className={"user--input"}
                            OnChangeInput={this.OnChangeInput}
                        />

                        <RenderInput
                            nameId={"email"}
                            title={"Email"}
                            value={this.state.email}
                            type={"text"}
                            className={"user--input"}
                            OnChangeInput={this.OnChangeInput}
                        />

                        <RenderInput
                            nameId={"password"}
                            title={"Password"}
                            value={this.state.password}
                            type={"text"}
                            className={"user--input"}
                            OnChangeInput={this.OnChangeInput}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default UserLogin;