import React, { Component } from 'react';
import Request from 'superagent';

import RenderHeader from '../../share/RenderHeader';
import DeleteFormWithoutPopup from '../../share/DeleteFormWithoutPopup';
import RenderEditDeleteButton from '../../share/RenderEditDeleteButton';
import UrlApi, { UrlRedirect } from '../../share/UrlApi';

import './xsystempage.css';
import { HeaderForm2 } from '../../share/HeaderForm/HeaderForm';

function RenderRow(props) {
    return (
        <tr>
            <td>{props.trContent.ma_trang_quang_cao}</td>
            <td>{props.trContent.ten_trang_quang_cao}</td>
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

class PageContents extends Component {
    render() {
        var theader = {
            keys: ["ma_trang_quang_cao", "ten_trang_quang_cao"],
            values: ["Mã trang quảng cáo", "Tên trang quảng cáo"]
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

class XsystemPages extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ModeAction: "",
            EditContents: null,
            tbodyContents: []
        };

        this.CreatePage = this.CreatePage.bind(this);
        this.EditPage = this.EditPage.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleCloseDeletePop = this.handleCloseDeletePop.bind(this);
        this.handleResetContentsState = this.handleResetContentsState.bind(this);
    }

    componentDidMount() {
        this.getPages();
    }

    getPages() {
        Request.get(UrlApi.Pages)
            .set('x-auth', localStorage.getItem('x-auth'))
            .then((res) => {
                if (res.body) {
                    this.setState({
                        tbodyContents: res.body
                    });
                }
            });
    }

    CreatePage() {
        window.location.href = UrlRedirect.CreatePage;
    }

    EditPage(event) {
        window.location.href = UrlRedirect.EditPage + `/${event.target.name}`;
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
                <HeaderForm2 title={"Trang áp dụng cho quảng cáo"} buttonTitle={"trang"} CreateItem={this.CreatePage} />
                <PageContents
                    tbodyContents={this.state.tbodyContents}
                    handleEditClick={this.EditPage}
                    handleDeleteClick={this.handleDeleteClick}
                />

                {
                    this.state.ShowDeletePopup ?
                        <DeleteFormWithoutPopup
                            url={UrlApi.Pages}
                            urlRedirect={UrlRedirect.Pages}
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

export default XsystemPages;