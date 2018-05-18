import React, { Component } from 'react';
import Request from 'superagent';

import RenderHeader from '../../share/RenderHeader';
import DeleteFormWithoutPopup from '../../share/DeleteFormWithoutPopup';
import { RenderDeleteButton } from '../../share/RenderEditDeleteButton';
import UrlApi, { UrlRedirect } from '../../share/UrlApi';

import { HeaderForm3 } from '../../share/HeaderForm/HeaderForm';

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
        this.setState({
            ShowDeletePopup: !this.state.ShowDeletePopup,
            SelectedItemId: event.target.name
        });
    }

    handleCloseDeletePop() {
        this.setState({
            ShowDeletePopup: !this.state.ShowDeletePopup
        });
    }

    handleResetContentsState() {
        this.getUsers();
    }

    render() {
        return (
            <div id="page-wrapper">
                <HeaderForm3 title={"Api"} buttonTitle={"Cập nhật api"} CreateItem={this.UpdateApi} />
                <ApiUrlContents
                    tbodyContents={this.state.tbodyContents}
                    handleEditClick={this.EditApiUrl}
                    handleDeleteClick={this.handleDeleteClick}
                />

                {
                    this.state.ShowDeletePopup ?
                        <DeleteFormWithoutPopup
                            url={UrlApi.XsystemApiUrls}
                            urlRedirect={UrlRedirect.XsystemApiUrls}
                            SelectedItemId={this.state.SelectedItemId}
                            closeDeletePopup={this.handleCloseDeletePop}
                            resetContentState={this.handleResetContentsState}
                        />
                        : null
                }
            </div>
        );
    }
}

export default XsystemApiUrl;