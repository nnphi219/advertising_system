import React, { Component } from 'react';
import Request from 'superagent';
import UrlApi, { UrlRedirect } from '../../share/UrlApi';
import { RenderInput } from '../../share/InputsRender';

import { ArrayRemoveItem } from '../../share/CommonFunction';

import './domain_url.css';

var validUrl = require('valid-url');

class RenderProperties extends Component {
    render() {
        let props = this.props;
        let domains = props.stateValues.domains || [];
   
        let domainTokenFields = domains.map((domain) => {
            return (
                <div key={domain} className="token domain--token">
                    <span className="token-label" style={{ maxWidth: "769px" }}>{domain}</span>
                    <a name={domain} className="close" tabIndex="-1" onClick={props.OnEditTokenField}>
                        <img name={domain} src="/icons/icons8-edit-50.png" onClick={props.OnEditTokenField} alt="Smiley face" width="10" height="10" />
                    </a>
                    <a name={domain} className="close" tabIndex="-1" onClick={props.OnRemoveTokenField}>×</a>
                </div>
            );
        });

        return (
            <div>
                <div className="domain">
                    <div>
                        <RenderInput
                            nameId={"domain"}
                            title={"Tên domain"}
                            value={this.props.stateValues.domain}
                            type={"text"}
                            className={"domain_user--input"}
                            errorTitle={this.props.stateValues.error_domain}
                            OnChangeInput={this.props.OnChangeInput}
                        />
                    </div>
                    <div className="domain_tokenfield">
                        <button type="button" className="btn timeslot_button" onClick={props.OnAddTokenField}>Thêm</button>
                    </div>
                    <div className="domain_user--tokenfield tokenfield div_property_margin_bottom">
                        {domainTokenFields}
                    </div>
                    <p style={{ color: "red", marginTop: "3px" }}>{this.props.error_domain}</p>
                </div>
                <div className="domain_submit">
                    <button className="btn btn-primary" onClick={props.handleSubmit}>Lưu</button>
                    <button className="btn btn-primary" onClick={props.handleCancel}>Hủy</button>
                </div>
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
        let props = this.props;
        return (
            <div id="page-wrapper">
                <h1 className="domain_title">{this.props.titleForm}</h1>
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

class DomainUrlCreatorUpdater extends Component {
    constructor(props) {
        super(props);

        var jsonState = {
            domains: []
        };
        this.SetInitState(jsonState);
        this.state = jsonState;
    
        this.OnAddTokenField = this.OnAddTokenField.bind(this);
        this.OnRemoveTokenField = this.OnRemoveTokenField.bind(this);
        this.OnEditTokenField = this.OnEditTokenField.bind(this);
    }

    componentDidMount() {
        Request.get(UrlApi.XsystemDomainUrls)
            .set('x-auth', localStorage.getItem('x-auth'))
            .then((res) => {
                let jsonDomains = res.body;
                let stringDomains = jsonDomains.map((jsonDomain) => {
                    return jsonDomain.domain;
                });

                this.setState({
                    domains: stringDomains
                });

            })
            .catch((e) => {
                // window.location.href = UrlRedirect.DomainUrls;
            });
    }

    SetInitState(jsonState) {
        jsonState.error_domain = '';
        jsonState.domain = '';
        jsonState.domains = this.props.editContents;
    }

    handleUpdateState(jsonState) {
        this.setState(jsonState);
    }

    GetModelStateJson() {
        let domains = this.state.domains;
        let isValid = true;
        let jsonError = {};
        if (domains.length === 0) {
            jsonError.error_domain = "Không tồn tại domain nào";
            isValid = false;
        }

        if (jsonError !== {}) {
            this.setState(jsonError);
        }

        if (isValid) {
            return domains;
        }
        else {
            return "error";
        }
    }

    UpdateDomainUrl() {
        let domains = this.GetModelStateJson();
        if (domains === "error") {
            return;
        }
        console.log(domains);
        let token = localStorage.getItem('x-auth');
        Request.post(UrlApi.XsystemDomainUrlsCreateManyItem)
            .set('x-auth', token)
            .send(domains)
            .end(function (err, res) {
                if (err) {
                    console.log(err);
                }
                else {
                    window.location.href = UrlRedirect.XsystemDomainUrls;
                }
            });
    }

    handleSubmit() {
        this.UpdateDomainUrl();
    }

    OnAddTokenField(e) {
        let stateValues = this.state;
        let currentInputDomain = stateValues.domain.trim();
        let currentDomains = stateValues.domains;

        if (!validUrl.isUri(currentInputDomain)) {
            return;
        }

        if (currentDomains.indexOf(currentInputDomain) > -1) {
            return;
        }

        currentDomains.push(currentInputDomain);
        let jsonNewState = {
            domains: currentDomains,
            domain: ''
        };

        this.handleUpdateState(jsonNewState);
        e.preventDefault();
    }

    OnRemoveTokenField(e) {
        let stateValues = this.state;
        let currentDomains = stateValues.domains;

        let removedDomain = e.target.name;

        ArrayRemoveItem(currentDomains, removedDomain);

        let jsonNewState = {
            domains: currentDomains
        };

        this.handleUpdateState(jsonNewState);
        e.preventDefault();
    }

    OnEditTokenField(e) {
        let stateValues = this.state;
        let currentDomains = stateValues.domains;

        let editedDomain = e.target.name;
        ArrayRemoveItem(currentDomains, editedDomain);

        let jsonNewState = {
            domain: editedDomain,
            domains: currentDomains
        };

        this.handleUpdateState(jsonNewState);
        e.preventDefault();
    }

    render() {
        var titleForm = "Cập nhật domain";
        return (
            <div className='div_createform'>
                <DomainUrlCreatorUpdaterForm
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

export class XsystemDomainUrlCreator extends Component {
    render() {
        return (
            <DomainUrlCreatorUpdater
            />
        );
    }
}