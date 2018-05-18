import React, { Component } from 'react';
import Request from 'superagent';

import RenderHeader from '../../share/RenderHeader';
import DeleteFormWithoutPopup from '../../share/DeleteFormWithoutPopup';
import { RenderDeleteButton } from '../../share/RenderEditDeleteButton';
import UrlApi, { UrlRedirect } from '../../share/UrlApi';

import { HeaderForm3 } from '../../share/HeaderForm/HeaderForm';

import './domain_url.css';

function RenderRow(props) {
    return (
        <tr>
            <td>{props.trContent.domain}</td>
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

        this.UpdateDomain = this.UpdateDomain.bind(this);
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

    UpdateDomain() {
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
                <HeaderForm3 title={"Domain"} buttonTitle={"Cập nhật domain"} CreateItem={this.UpdateDomain} />
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