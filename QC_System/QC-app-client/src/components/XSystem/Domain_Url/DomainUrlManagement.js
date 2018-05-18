import React, { Component } from 'react';
import Request from 'superagent';

import RenderHeader from '../../share/RenderHeader';
import DeleteFormWithoutPopup from '../../share/DeleteFormWithoutPopup';
import RenderEditDeleteButton from '../../share/RenderEditDeleteButton';
import UrlApi, { UrlRedirect } from '../../share/UrlApi';

import { HeaderForm2 } from '../../share/HeaderForm/HeaderForm';

import './domain_url.css';

function RenderRow(props) {
    return (
        <tr>
            <td>{props.trContent.ma_loai_bai_dang}</td>
            <td>{props.trContent.ten_loai_bai_dang}</td>
            <td>
                <RenderEditDeleteButton
                    nameId={props.trContent._id}
                    handleEditClick={props.handleEditClick}
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

class DomainUrlContents extends Component {
    render() {
        var theader = {
            keys: ["domain"],
            values: ["Tên domain"]
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

class XsystemDomainUrl extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ModeAction: "",
            EditContents: null,
            tbodyContents: []
        };

        this.CreateDomainUrl = this.CreateDomainUrl.bind(this);
        this.EditDomainUrl = this.EditDomainUrl.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleCloseDeletePop = this.handleCloseDeletePop.bind(this);
        this.handleResetContentsState = this.handleResetContentsState.bind(this);
    }

    componentDidMount() {
        this.getDomainUrls();
    }

    getDomainUrls() {
        Request.get(UrlApi.XsystemDomainUrls)
            .set('x-auth', localStorage.getItem('x-auth'))
            .then((res) => {
                this.setState({
                    tbodyContents: res.body
                });
            });
    }

    CreateDomainUrl() {
        window.location.href = UrlRedirect.XsystemCreateDomainUrl;
    }

    EditDomainUrl(event) {
        window.location.href = UrlRedirect.XsystemEditDomainUrl + `/${event.target.name}`;
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
                <HeaderForm2 title={"Domain"} buttonTitle={"domain"} CreateItem={this.CreateDomainUrl} />
                <DomainUrlContents
                    tbodyContents={this.state.tbodyContents}
                    handleEditClick={this.EditDomainUrl}
                    handleDeleteClick={this.handleDeleteClick}
                />

                {
                    this.state.ShowDeletePopup ?
                        <DeleteFormWithoutPopup
                            url={UrlApi.XsystemDomainUrls}
                            urlRedirect={UrlRedirect.XsystemDomainUrls}
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

export default XsystemDomainUrl;