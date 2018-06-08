import React, { Component } from 'react';
import Request from 'superagent';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';

import RenderHeader from '../share/RenderHeader';
import DeleteFormWithoutPopup from '../share/DeleteFormWithoutPopup';
import { RenderDeleteButton } from '../share/RenderEditDeleteButton';
import UrlApi, { UrlRedirect } from '../share/UrlApi';

import { HeaderForm3 } from '../share/HeaderForm/HeaderForm';
import { XsystemApiUrlCreator } from './ApiUrlCreatorUpdater';

import './api_url.css';

function RenderRow(props) {
    return (
        <tr>
            <td>{props.trContent.api_url}</td>
            <td>
                <RenderDeleteButton
                    nameId={props.trContent._id}
                    handleDeleteClick={props.handleDeleteClick}
                />
            </td>
        </tr>
    );
}

function RenderBody(props) {
    var rows = [];
    props.tbody.forEach((element, id) => {
        rows.push(
            <RenderRow
                trContent={element}
                key={id}
                handleEditClick={props.handleEditClick}
                handleDeleteClick={props.handleDeleteClick}
            />
        );
    });

    return (
        <tbody>
            {rows}
        </tbody>
    );
}

class ApiUrlContents extends Component {
    render() {
        var theader = {
            keys: ["api_url"],
            values: ["Tên api"]
        };

        return (
            <div className="table-content">
                <table className="table table-striped">
                    <RenderHeader theader={theader} />
                    <RenderBody
                        tbody={this.props.tbodyContents}
                        handleEditClick={this.props.handleEditClick}
                        handleDeleteClick={this.props.handleDeleteClick}
                    />
                </table>
            </div>
        );
    }
}

class XsystemApiUrl extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ModeAction: "",
            EditContents: null,
            tbodyContents: []
        };

        this.UpdateApi = this.UpdateApi.bind(this);
        this.EditApiUrl = this.EditApiUrl.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleCloseDeletePop = this.handleCloseDeletePop.bind(this);
        this.handleResetContentsState = this.handleResetContentsState.bind(this);
        this.deleteBySelf = this.deleteBySelf.bind(this);
    }

    componentDidMount() {
        this.getApiUrls();
    }

    getApiUrls() {
        Request.get(UrlApi.XsystemApiUrls)
            .set('x-auth', localStorage.getItem('x-auth'))
            .then((res) => {
                this.setState({
                    tbodyContents: res.body
                });
            });
    }

    UpdateApi() {
        window.location.href = UrlRedirect.XsystemCreateApiUrl;
    }

    EditApiUrl(event) {
        window.location.href = UrlRedirect.XsystemEditApiUrl + `/${event.target.name}`;
    }

    handleDeleteClick(event) {
        let selectedItemId = event.target.name;
        let selectedItem = this.state.tbodyContents.find((content) => content._id === selectedItemId);
        this.setState({
            ShowDeletePopup: !this.state.ShowDeletePopup,
            SelectedItemId: selectedItemId,
            selectedItemValue: selectedItem.api_url
        });
    }

    handleCloseDeletePop() {
        this.setState({
            ShowDeletePopup: !this.state.ShowDeletePopup
        });
    }

    handleResetContentsState() {
        this.getApiUrls();
    }

    deleteBySelf(id) {
        let $this = this;
        Request.delete(UrlApi.XsystemApiUrls)
            .set('x-auth', localStorage.getItem('x-auth'))
            .send({ apiId: id })
            .set('Accept', 'application/json')
            .end(function (err, res) {
                $this.getApiUrls();
                $this.handleCloseDeletePop();
            });
    }

    render() {
        return (
            <div className="right_col">
                <div className="row tile_count" >
                    <div className="col-md-12 col-sm-12 col-xs-12">
                        <HeaderForm3 title={"Api"} buttonTitle={"Cập nhật api"} linkTo={UrlRedirect.XsystemUpdateApiUrl} CreateItem={this.UpdateApi} />
                    </div>
                </div>
                <div className="row" >
                    <div className="col-md-12 col-sm-12 col-xs-12">
                        <ApiUrlContents
                            tbodyContents={this.state.tbodyContents}
                            handleEditClick={this.EditApiUrl}
                            handleDeleteClick={this.handleDeleteClick}
                        />
                    </div>
                </div>
                {
                    this.state.ShowDeletePopup ?
                        <DeleteFormWithoutPopup
                            url={UrlApi.XsystemApiUrls}
                            urlRedirect={UrlRedirect.XsystemApiUrls}
                            SelectedItemId={this.state.SelectedItemId}
                            selectedItemValue={this.state.selectedItemValue}
                            closeDeletePopup={this.handleCloseDeletePop}
                            resetContentState={this.handleResetContentsState}
                            isDeletedBySelf={true}
                            deleteBySelf={this.deleteBySelf}
                        />
                        : null
                }
            </div>
        );
    }
}

class ApiUrlManagement extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route exact={true} path={UrlRedirect.XsystemApiUrls} component={XsystemApiUrl} />
                    <Route path={UrlRedirect.XsystemUpdateApiUrl} component={XsystemApiUrlCreator} />
                </div>
            </BrowserRouter>
        );
    }
}

export default ApiUrlManagement;