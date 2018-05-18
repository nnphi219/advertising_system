import React, { Component } from 'react';
import Request from 'superagent';
import UrlApi, { UrlRedirect } from '../../share/UrlApi';
import { RenderInput } from '../../share/InputsRender';

import './domain_url.css';

class RenderProperties extends Component {
    render() {
        var domain_isReadOnly = this.props.modeAction === 'edit' ? 1 : 0;

        return (
            <div style={{ paddingLeft: "30px" }}>
                <RenderInput
                    nameId={"domain"}
                    title={"Tên domain"}
                    value={this.props.stateValues.domain}
                    type={"text"}
                    className={"user--input"}
                    errorTitle={this.props.stateValues.error_domain}
                    OnChangeInput={this.props.OnChangeInput}
                />
            </div>
        );
    }
}

class DomainUrlCreatorUpdaterForm extends Component {
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
            error_domain: ''
        };

        this.props.UpdateState(jsonState);
    }

    handleCancel() {
        window.location.href = UrlRedirect.XsystemDomainUrls;
    }

    render() {
        return (
            <div id="page-wrapper">
                <h1 className="post_type_title">{this.props.titleForm}</h1>
                <RenderProperties
                    OnChangeInput={this.OnChangeInput}
                    modeAction={this.props.modeAction}
                    stateValues={this.props.stateValues}
                />
                <div className="submit">
                    <button className="btn btn-primary" onClick={this.props.handleSubmit}>Lưu</button>
                    <button className="btn btn-primary" onClick={this.handleCancel}>Hủy</button>
                </div>
            </div>
        );
    }
}

class DomainUrlCreatorUpdater extends Component {
    constructor(props) {
        super(props);

        var jsonState = {};
        this.SetInitState(jsonState);
        this.state = jsonState;

    }

    SetInitState(jsonState) {
        jsonState.error_domain = '';

        if (this.props.modeAction === "create") {
            jsonState.domain = '';
        }
        else if (this.props.modeAction === "edit") {
            var editContents = this.props.editContents;

            jsonState.domain = editContents.domain;
        }
    }

    handleUpdateState(jsonState) {
        this.setState(jsonState);
    }

    GetModelStateJson() {
        var state = this.state;

        var isValid = true;
        var jsonError = {};
        if (state.domain === "" || state.domain.trim().includes(' ')) {
            jsonError.error_domain = "Mã này không hợp lệ";
            isValid = false;
        }

        var content = null;

        if (jsonError !== {}) {
            this.setState(jsonError);
        }

        if (this.props.modeAction === 'edit') {
            if (isValid) {
                return {
                    domain: state.domain
                };
            }
            else {
                return "error";
            }
        }

        if (isValid) {
            return Request.get(UrlApi.ReadA_Xsystem_DomainUrl + '/' + state.domain)
                .set('x-auth', localStorage.getItem('x-auth'))
                .then((res) => {
                    if (res.body) {
                        isValid = false;
                        this.setState({
                            error_domain: ""
                        });
                        return 'error';
                    }
                    else {
                        content = {
                            domain: state.domain
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

    CreateDomainUrl() {
        this.GetModelStateJson().then((content) => {
            if (content === 'error') {
                return;
            }
            var token = localStorage.getItem('x-auth');

            Request.post(UrlApi.XsystemDomainUrls)
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .set('x-auth', token)
                .send(content)
                .end(function (err, res) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        window.location.href = UrlRedirect.XsystemDomainUrls;
                    }

                });
        }).catch((e) => {
            this.setState({
                error_domain: "Mã này đã tồn tại!"
            });
        });
    }

    EditDomainUrl() {
        var content = this.GetModelStateJson();
        if (content === 'error') {
            return;
        }

        var url = UrlApi.XsystemDomainUrls + "/" + this.props.editContents._id;
        var token = localStorage.getItem('x-auth');

        Request.put(url)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .set('x-auth', token)
            .send(content)
            .end(function (err, res) {
                window.location.href = UrlRedirect.XsystemDomainUrls;
            });
    }

    handleSubmit() {
        if (this.props.modeAction === "create") {
            this.CreateDomainUrl();
        }
        else {
            this.EditDomainUrl();
        }
    }

    render() {
        var titleForm = this.props.modeAction === "create" ? "Tạo domain" : "Chỉnh loại domain";
        return (
            <div className='div_createform'>
                <DomainUrlCreatorUpdaterForm
                    titleForm={titleForm}
                    stateValues={this.state}
                    handleSubmit={this.handleSubmit.bind(this)}
                    UpdateState={this.handleUpdateState.bind(this)}
                    modeAction={this.props.modeAction}
                />
            </div>
        );
    }
}

export class XsystemDomainUrlCreator extends Component {
    render() {
        return (
            <DomainUrlCreatorUpdater
                modeAction={"create"}
            />
        );
    }
}

export class XsystemDomainUrlEditor extends Component {
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

        Request.get(UrlApi.XsystemDomainUrls + "/" + paraId)
            .set('x-auth', localStorage.getItem('x-auth'))
            .then((res) => {
                this.setState({
                    editContents: res.body,
                    isLoad: true
                });

            })
            .catch((e) => {
                // window.location.href = UrlRedirect.DomainUrls;
            });

        return (
            this.state.isLoad ?
                <DomainUrlCreatorUpdater
                    modeAction={"edit"}
                    editContents={this.state.editContents}
                />
                : null
        );
    }
}
