import React, { Component } from 'react';
import Request from 'superagent';
import DatePicker from 'react-date-picker';
import UrlApi from '../share/UrlApi';
import { JsonDateToDate, DateToJsonDate, TransferTimeLogJsonToString, TransferTimeLogStringToJson } from '../share/Mapper';
import { RenderInput, RenderSelect, RenderRadioButon, RenderDate } from '../share/InputsRender';
import './user_management.css';

class RenderProperties extends Component {
    render() {
        return (
            <div style={{paddingLeft: "30px"}}>
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
                    type={"text"}
                    className={"user--input"}
                    OnChangeInput={this.props.OnChangeInput}
                />

                <RenderSelect
                    nameId={"user_type"}
                    title={"Loại user"}
                    keys={["user", "admin", "superadmin"]}
                    values={["user", "admin", "superadmin"]}
                    selectedValue={this.props.stateValues.user_type }
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
    }

    OnChangeInput(e) {
        var name = e.target.name;
        var value = e.target.value;
        var jsonState = { [name]: value };

        this.props.UpdateState(jsonState);
    }

    render() {
        return (
            <div className='popup_inner user_createform_size div_scroll_bar'>
                <h1>{this.props.titleForm}</h1>
                <RenderProperties
                    OnChangeInput={this.OnChangeInput}

                    stateValues={this.props.stateValues}
                />
                <div className="submit">
                    <button className="btn btn-primary" onClick={this.props.handleSubmit}>Save</button>
                    <button className="btn btn-primary" onClick={this.props.handleClosePopup}>Cancel</button>
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
        if (this.props.modeAction === "edit") {
            var editContents = this.props.editContents;

            jsonState.username = editContents.username; 
            jsonState.email = editContents.email;
            jsonState.user_type = editContents.user_type;
            console.log(jsonState);
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

        var $this = this;
        Request.post(UrlApi.UserManagement)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send(userContent)
            .end(function (err, res) {
                $this.props.closeCreatorUpdaterPopup();
                $this.props.resetContentState();
            });
    }

    EditUser() {
        var userContent = this.GetModelStateJson();

        var url = UrlApi.UserManagement + "/" + this.props.editContents._id;
        var $this = this;
        Request.put(url)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send(userContent)
            .end(function (err, res) {
                $this.props.closeCreatorUpdaterPopup();
                $this.props.resetContentState();
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
        var titleForm = this.props.modeAction === "create" ? "Tạo chiến dịch tin đăng" : "Chỉnh sửa chiến dịch tin đăng";
        return (
            <div className='popup'>
                <UserCreatorUpdaterForm
                    titleForm={titleForm}
                    stateValues={this.state}
                    handleClosePopup={this.props.closeCreatorUpdaterPopup}
                    handleSubmit={this.handleSubmit.bind(this)}
                    UpdateState={this.handleUpdateState.bind(this)}
                />
            </div>
        );
    }
}

export default UserCreatorUpdater;