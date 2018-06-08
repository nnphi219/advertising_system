import React, { Component } from 'react';
import Request from 'superagent';
import { BrowserRouter, Route } from 'react-router-dom';

import RenderHeader from '../share/RenderHeader';
import DeleteFormWithoutPopup from '../share/DeleteFormWithoutPopup';
import RenderEditDeleteButton from '../share/RenderEditDeleteButton';
import UrlApi, { UrlRedirect } from '../share/UrlApi';
import { XsystemPageCreator, XsystemPageEditor } from './AdsPageCreatorUpdater';

import './ads_page.css';
import { HeaderForm2 } from '../share/HeaderForm/HeaderForm';

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
                    ActiveIsNotShown={true}
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
        Request.get(UrlApi.XsystemPages)
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
        window.location.href = UrlRedirect.XsystemCreatePage;
    }

    EditPage(event) {
        window.location.href = UrlRedirect.AdsPageEditor + `/${event.target.name}`;
    }

    handleDeleteClick(event) {
        let selectedItemId = event.target.name;
        let selectedItem = this.state.tbodyContents.find((content) => content._id === selectedItemId);
        this.setState({
            ShowDeletePopup: !this.state.ShowDeletePopup,
            SelectedItemId: selectedItemId,
            selectedItemValue: selectedItem.ten_trang_quang_cao
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
            <div className="right_col">
                <div className="row tile_count" >
                    <HeaderForm2
                        title={"Trang áp dụng cho quảng cáo"}
                        buttonTitle={"trang"}
                        linkTo={UrlRedirect.AdsPageCreator}
                        CreateItem={this.CreatePage} />
                </div>
                <div className="row" >
                    <div className="col-md-12 col-sm-12 col-xs-12">
                        <PageContents
                            tbodyContents={this.state.tbodyContents}
                            handleEditClick={this.EditPage}
                            handleDeleteClick={this.handleDeleteClick}
                        />
                    </div>
                </div>
                {
                    this.state.ShowDeletePopup ?
                        <DeleteFormWithoutPopup
                            url={UrlApi.XsystemPages}
                            urlRedirect={UrlRedirect.AdsPages}
                            SelectedItemId={this.state.SelectedItemId}
                            selectedItemValue={this.state.selectedItemValue}
                            closeDeletePopup={this.handleCloseDeletePop}
                            resetContentState={this.handleResetContentsState}
                        />
                        : null
                }

            </div>
        );
    }
}

class AdsPagesManagement extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route exact={true} path={UrlRedirect.AdsPages} component={XsystemPages} />
                    <Route exact={true} path={UrlRedirect.AdsPageCreator} component={XsystemPageCreator} />
                    <Route exact={true} path={UrlRedirect.AdsPageEditor + "/:id"} component={XsystemPageEditor} />
                </div>
            </BrowserRouter>
        );
    }
}

export default AdsPagesManagement;