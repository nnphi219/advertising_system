import React, { Component } from 'react';
import Request from 'superagent';
import UrlApi, { UrlRedirect } from '../../share/UrlApi';
import { RenderInput } from '../../share/InputsRender';

import { ArrayRemoveItem } from '../../share/CommonFunction';

import './api_url.css';

class RenderProperties extends Component {
    render() {
        let props = this.props;
        let apis = props.stateValues.apis || [];
   
        let apiTokenFields = apis.map((api) => {
            return (
                <div key={api} className="token api--token">
                    <span className="token-label" style={{ maxWidth: "769px" }}>{api}</span>
                    <a name={api} className="close" tabIndex="-1" onClick={props.OnEditTokenField}>
                        <img name={api} src="/icons/icons8-edit-50.png" onClick={props.OnEditTokenField} alt="Smiley face" width="10" height="10" />
                    </a>
                    <a name={api} className="close" tabIndex="-1" onClick={props.OnRemoveTokenField}>×</a>
                </div>
            );
        });

        return (
            <div>
                <div className="api">
                    <div>
                        <RenderInput
                            nameId={"api_url"}
                            title={"Tên api"}
                            value={this.props.stateValues.api_url}
                            type={"text"}
                            className={"api_user--input"}
                            errorTitle={this.props.stateValues.error_api_url}
                            OnChangeInput={this.props.OnChangeInput}
                        />
                    </div>
                    <div className="api_tokenfield">
                        <button type="button" className="btn timeslot_button" onClick={props.OnAddTokenField}>Thêm</button>
                    </div>
                    <div className="api_user--tokenfield tokenfield div_property_margin_bottom">
                        {apiTokenFields}
                    </div>
                    <p style={{ color: "red", marginTop: "3px" }}>{this.props.error_api_url}</p>
                </div>
                <div className="api_submit">
                    <button className="btn btn-primary" onClick={props.handleSubmit}>Lưu</button>
                    <button className="btn btn-primary" onClick={props.handleCancel}>Hủy</button>
                </div>
            </div>
        );
    }
}

class ApiUrlCreatorUpdaterForm extends Component {
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
            error_api_url: ''
        };

        this.props.UpdateState(jsonState);
    }

    handleCancel() {
        window.location.href = UrlRedirect.XsystemApiUrls;
    }

    render() {
        let props = this.props;
        return (
            <div id="page-wrapper">
                <h1 className="api_title">{this.props.titleForm}</h1>
                <RenderProperties
                    OnChangeInput={this.OnChangeInput}
                    stateValues={this.props.stateValues}
                    OnAddTokenField={props.OnAddTokenField}
                    OnRemoveTokenField={props.OnRemoveTokenField}
                    OnEditTokenField={props.OnEditTokenField}
                    handleCancel={this.handleCancel}
                    handleSubmit={props.handleSubmit}
                />
            </div>
        );
    }
}

class ApiUrlCreatorUpdater extends Component {
    constructor(props) {
        super(props);

        var jsonState = {
            apis: []
        };
        this.SetInitState(jsonState);
        this.state = jsonState;
    
        this.OnAddTokenField = this.OnAddTokenField.bind(this);
        this.OnRemoveTokenField = this.OnRemoveTokenField.bind(this);
        this.OnEditTokenField = this.OnEditTokenField.bind(this);
    }

    componentDidMount() {
        Request.get(UrlApi.XsystemApiUrls)
            .set('x-auth', localStorage.getItem('x-auth'))
            .then((res) => {
                let jsonApis = res.body;
                let stringApis = jsonApis.map((jsonApi) => {
                    return jsonApi.api_url;
                });

                this.setState({
                    apis: stringApis
                });

            })
            .catch((e) => {
                // window.location.href = UrlRedirect.ApiUrls;
            });
    }

    SetInitState(jsonState) {
        jsonState.error_api_url = '';
        jsonState.api_url = '';
        jsonState.apis = this.props.editContents;
    }

    handleUpdateState(jsonState) {
        this.setState(jsonState);
    }

    GetModelStateJson() {
        let apis = this.state.apis;
        let isValid = true;
        let jsonError = {};
        if (apis.length === 0) {
            jsonError.error_api_url = "Không tồn tại api nào";
            isValid = false;
        }

        if (jsonError !== {}) {
            this.setState(jsonError);
        }

        if (isValid) {
            return apis;
        }
        else {
            return "error";
        }
    }

    UpdateApiUrl() {
        let apis = this.GetModelStateJson();
        if (apis === "error") {
            return;
        }
        
        let token = localStorage.getItem('x-auth');
        Request.post(UrlApi.XsystemApiUrlsCreateManyItem)
            .set('x-auth', token)
            .send(apis)
            .end(function (err, res) {
                if (err) {
                    console.log(err);
                }
                else {
                    window.location.href = UrlRedirect.XsystemApiUrls;
                }
            });
    }

    handleSubmit() {
        this.UpdateApiUrl();
    }

    OnAddTokenField(e) {
        let stateValues = this.state;
        let currentInputApi = stateValues.api_url.trim();
        let currentApis = stateValues.apis;
        
        if (currentInputApi === "") {
            return;
        }

        if (currentApis.indexOf(currentInputApi) > -1) {
            return;
        }

        currentApis.push(currentInputApi);
        let jsonNewState = {
            apis: currentApis,
            api_url: ''
        };

        this.handleUpdateState(jsonNewState);
        e.preventDefault();
    }

    OnRemoveTokenField(e) {
        let stateValues = this.state;
        let currentApis = stateValues.apis;

        let removedApi = e.target.name;

        ArrayRemoveItem(currentApis, removedApi);

        let jsonNewState = {
            apis: currentApis
        };

        this.handleUpdateState(jsonNewState);
        e.preventDefault();
    }

    OnEditTokenField(e) {
        let stateValues = this.state;
        let currentApis = stateValues.apis;

        let editedApi = e.target.name;
        ArrayRemoveItem(currentApis, editedApi);

        let jsonNewState = {
            api_url: editedApi,
            apis: currentApis
        };

        this.handleUpdateState(jsonNewState);
        e.preventDefault();
    }

    render() {
        var titleForm = "Cập nhật api";
        return (
            <div className='div_createform'>
                <ApiUrlCreatorUpdaterForm
                    titleForm={titleForm}
                    stateValues={this.state}
                    handleSubmit={this.handleSubmit.bind(this)}
                    UpdateState={this.handleUpdateState.bind(this)}
                    OnAddTokenField={this.OnAddTokenField}
                    OnRemoveTokenField={this.OnRemoveTokenField}
                    OnEditTokenField={this.OnEditTokenField}
                />
            </div>
        );
    }
}

export class XsystemApiUrlCreator extends Component {
    render() {
        return (
            <ApiUrlCreatorUpdater
            />
        );
    }
}