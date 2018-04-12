import React, { Component } from 'react';
import Request from 'superagent';
import { UrlApi, UrlRedirect } from '../share/Url';
import { RenderInput, RenderSelect, RenderRadioButon, RenderDate, RenderTextArea } from '../share/InputsRender';

import './page.css';

var rp = require('request-promise');

class RenderProperties extends Component {
    render() {
        return (
            <div style={{ paddingLeft: "30px" }}>
                <RenderInput
                    nameId={"ma_trang_quang_cao"}
                    title={"Mã trang quảng cáo"}
                    value={this.props.stateValues.ma_trang_quang_cao}
                    type={"text"}
                    className={"user--input"}
                    errorTitle={this.props.stateValues.error_ma_trang_quang_cao}
                    OnChangeInput={this.props.OnChangeInput}
                />

                <RenderInput
                    nameId={"ten_trang_quang_cao"}
                    title={"Tên trang quảng cáo"}
                    value={this.props.stateValues.ten_trang_quang_cao}
                    type={"text"}
                    className={"user--input"}
                    errorTitle={this.props.stateValues.error_ten_trang_quang_cao}
                    OnChangeInput={this.props.OnChangeInput}
                />
            </div>
        );
    }
}

class PageCreatorUpdaterForm extends Component {
    constructor(props) {
        super(props);

        this.OnChangeInput = this.OnChangeInput.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    OnChangeInput(e) {
        var name = e.target.name;
        var value = e.target.value;
        var jsonState = {
            [name]: value,
            error_ma_trang_quang_cao: '',
            error_ten_trang_quang_cao: ''
        };

        this.props.UpdateState(jsonState);
    }

    handleCancel() {
        window.location.href = UrlRedirect.Pages;
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

class PageCreatorUpdater extends Component {
    constructor(props) {
        super(props);

        var jsonState = {};
        this.SetInitState(jsonState);
        this.state = jsonState;

    }

    SetInitState(jsonState) {
        jsonState.error_ma_trang_quang_cao = '';
        jsonState.error_ten_trang_quang_cao = '';

        if (this.props.modeAction === "create") {
            jsonState.ma_trang_quang_cao = '';
            jsonState.ten_trang_quang_cao = '';
        }
        else if (this.props.modeAction === "edit") {
            var editContents = this.props.editContents;

            jsonState.ma_trang_quang_cao = editContents.ma_trang_quang_cao;
            jsonState.ten_trang_quang_cao = editContents.ten_trang_quang_cao;
        }
    }

    handleUpdateState(jsonState) {
        this.setState(jsonState);
    }

    GetModelStateJson() {
        var state = this.state;

        var isValid = true;
        var jsonError = {};
        if (state.ma_trang_quang_cao === "" || state.ma_trang_quang_cao.trim().includes(' ')) {
            jsonError.error_ma_trang_quang_cao = "Mã trang quảng cáo không hợp lệ";
            isValid = false;
        }

        if (state.ten_trang_quang_cao === "") {
            jsonError.error_ten_trang_quang_cao = "Chưa nhập tên trang quảng cáo";
            isValid = false;
        }

        var content = null;

        if (jsonError !== {}) {
            this.setState(jsonError);
        }

        if (isValid) {
            return Request.get(UrlApi.ReadAPage + '/' + state.ma_trang_quang_cao)
                .set('x-auth', localStorage.getItem('x-auth'))
                .then((res) => {
                    if (res.body) {
                        isValid = false;
                        this.setState({
                            error_ma_trang_quang_cao: "Mã trang đã tồn tại!"
                        });
                        return 'error';
                    }
                    else {
                        content = {
                            ma_trang_quang_cao: state.ma_trang_quang_cao,
                            ten_trang_quang_cao: state.ten_trang_quang_cao
                        };
                        return content;
                    }

                }).catch((e) => {
                    return 'error';
                });
        }
        else {
            return Promise.reject();
        }
    }

    CreatePage() {
        this.GetModelStateJson().then((content) => {
            if (content === 'error') {
                return;
            }

            var $this = this;
            var token = localStorage.getItem('x-auth');

            Request.post(UrlApi.Pages)
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .set('x-auth', token)
                .send(content)
                .end(function (err, res) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        window.location.href = UrlRedirect.Pages;
                    }

                });
        }).catch((e) => {
            this.setState({
                error_ma_trang_quang_cao: "Mã trang đã tồn tại!"
            });
        });
    }

    EditPage() {
        this.GetModelStateJson().then((content) => {
            if (content === null) {
                return;
            }

            var url = UrlApi.Pages + "/" + this.props.editContents._id;
            var $this = this;
            var token = localStorage.getItem('x-auth');

            Request.put(url)
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .set('x-auth', token)
                .send(content)
                .end(function (err, res) {
                    window.location.href = UrlRedirect.Pages;
                });
        });
    }

    handleSubmit() {
        if (this.props.modeAction === "create") {
            this.CreatePage();
        }
        else {
            this.EditPage();
        }
    }

    render() {
        var titleForm = this.props.modeAction === "create" ? "Tạo bài đăng" : "Chỉnh sửa bái đăng";
        return (
            <div className='div_createform'>
                <PageCreatorUpdaterForm
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
        keys: ["user", "admin", "superadmin"],
        values: ["user", "admin", "superadmin"]
    }
}

export class PageCreator extends Component {
    render() {
        return (
            <PageCreatorUpdater
                modeAction={"create"}
            />
        );
    }
}

export class PageEditor extends Component {
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

        Request.get(UrlApi.Pages + "/" + paraId)
            .set('x-auth', localStorage.getItem('x-auth'))
            .then((res) => {
                this.setState({
                    editContents: res.body,
                    isLoad: true
                });

            })
            .catch((e) => {
                // window.location.href = UrlRedirect.Pages;
            });

        return (
            this.state.isLoad ?
                <PageCreatorUpdater
                    modeAction={"edit"}
                    editContents={this.state.editContents}
                />
                : null
        );
    }
}
