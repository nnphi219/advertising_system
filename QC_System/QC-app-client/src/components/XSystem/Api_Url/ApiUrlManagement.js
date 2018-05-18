import React, { Component } from 'react';
import Request from 'superagent';

import RenderHeader from '../../share/RenderHeader';
import DeleteFormWithoutPopup from '../../share/DeleteFormWithoutPopup';
import RenderEditDeleteButton from '../../share/RenderEditDeleteButton';
import UrlApi, { UrlRedirect } from '../../share/UrlApi';

import { HeaderForm2 } from '../../share/HeaderForm/HeaderForm';

import './api_url.css';

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

class ApiUrlContents extends Component {
    render() {
        var theader = {
            keys: ["ma_loai_bai_dang", "ten_loai_bai_dang"],
            values: ["Mã loại bài đăng", "Tên loại bài đăng"]
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

        this.CreateApiUrl = this.CreateApiUrl.bind(this);
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

    CreateApiUrl() {
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
                <HeaderForm2 title={"Loại bài đăng"} buttonTitle={"loại bài đăng"} CreateItem={this.CreateApiUrl} />
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