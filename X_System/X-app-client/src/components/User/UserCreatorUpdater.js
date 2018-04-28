import React, { Component } from 'react';
import Request from 'superagent';
import { UrlApi, UrlRedirect } from '../share/Url';
import { RenderInput, RenderSelect } from '../share/InputsRender';

import './user.css';

class RenderProperties extends Component {
    render() {
        return (
            <div style={{ paddingLeft: "30px" }}>
                <RenderInput
                    nameId={"username"}
                    title={"User name"}
                    value={this.props.stateValues.username}
                    type={"text"}
                    className={"user--input"}
                    OnChangeInput={this.props.OnChangeInput}
                />

                <RenderInput
                    nameId={"email"}
                    title={"Email"}
                    value={this.props.stateValues.email}
                    type={"text"}
                    className={"user--input"}
                    OnChangeInput={this.props.OnChangeInput}
                />

                <RenderInput
                    nameId={"password"}
                    title={"Password"}
                    value={this.props.stateValues.password}
                    type={"password"}
                    className={"user--input"}
                    OnChangeInput={this.props.OnChangeInput}
                />


                <RenderSelect
                    nameId={"user_type"}
                    title={"Loại user"}
                    keys={userInputsData.user_type.keys}
                    values={userInputsData.user_type.values}
                    selectedValue={this.props.stateValues.user_type}
                    OnChangeSelect={this.props.OnChangeInput}
                    className={"input--select"}
                />
            </div>
        );
    }
}

class UserCreatorUpdaterForm extends Component {
    constructor(props) {
        super(props);

        this.OnChangeInput = this.OnChangeInput.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    OnChangeInput(e) {
        var name = e.target.name;
        var value = e.target.value;
        var jsonState = { [name]: value };

        this.props.UpdateState(jsonState);
    }

    handleCancel(){
        window.location.href = UrlRedirect.Users;
    }

    render() {
        return (
            <div>
                <h1>{this.props.titleForm}</h1>
                <RenderProperties
                    OnChangeInput={this.OnChangeInput}

                    stateValues={this.props.stateValues}
                />
                <div className="submit">
                    <button className="btn btn-primary" onClick={this.props.handleSubmit}>Save</button>
                    <button className="btn btn-primary" onClick={this.handleCancel}>Cancel</button>
                </div>
            </div>
        );
    }
}

class UserCreatorUpdater extends Component {
    constructor(props) {
        super(props);

        var jsonState = {};
        this.SetInitState(jsonState);
        this.state = jsonState;

    }

    SetInitState(jsonState) {
        if (this.props.modeAction === "create") {
            jsonState.user_type = userInputsData.user_type.keys[0];
        }
        else if (this.props.modeAction === "edit") {
            var editContents = this.props.editContents;

            jsonState.username = editContents.username;
            jsonState.email = editContents.email;
            jsonState.user_type = editContents.user_type;
        }
    }

    handleUpdateState(jsonState) {
        this.setState(jsonState);
    }

    GetModelStateJson() {
        var state = this.state;

        var userContent = {
            username: state.username,
            email: state.email,
            password: state.password,
            user_type: state.user_type
        };

        return userContent;
    }

    CreateUser() {
        var userContent = this.GetModelStateJson();

        Request.post(UrlApi.UserManagement)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send(userContent)
            .end(function (err, res) {
                window.location.href = UrlRedirect.Users;
            });
    }

    EditUser() {
        var userContent = this.GetModelStateJson();

        var url = UrlApi.UserManagement + "/" + this.props.editContents._id;
        Request.put(url)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send(userContent)
            .end(function (err, res) {
                window.location.href = UrlRedirect.Users;
            });
    }

    handleSubmit() {
        if (this.props.modeAction === "create") {
            this.CreateUser();
        }
        else {
            this.EditUser();
        }
    }

    render() {
        var titleForm = this.props.modeAction === "create" ? "Tạo user" : "Chỉnh sửa user";
        return (
            <div className='div_createform'>
                <UserCreatorUpdaterForm
                    titleForm={titleForm}
                    stateValues={this.state}
                    handleSubmit={this.handleSubmit.bind(this)}
                    UpdateState={this.handleUpdateState.bind(this)}
                />
            </div>
        );
    }
}
var userInputsData = {
    user_type: {
        keys: ["user", "admin"],
        values: ["user", "admin"]
    }
}

export class UserCreator extends Component {
    render() {
        return (
            <UserCreatorUpdater
                modeAction={"create"}
            />
        );
    }
}

export class UserEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoad: false,
            editContents: null
        };
    }
    render() {
        var urlSplit = window.location.href.split('/');
        var paraId = urlSplit[urlSplit.length - 1];

        Request.get(UrlApi.UserManagement + "/" + paraId)
            .then((res) => {
                this.setState({
                    editContents: res.body,
                    isLoad: true
                });

            })
            .catch((e) => {
                // window.location.href = UrlRedirect.Users;
            });

        return (
            this.state.isLoad ?
                <UserCreatorUpdater
                    modeAction={"edit"}
                    editContents={this.state.editContents}
                />
                : null
        );
    }
}

export default UserCreatorUpdater;
