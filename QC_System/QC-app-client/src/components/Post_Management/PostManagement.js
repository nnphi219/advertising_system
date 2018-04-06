import React, { Component } from 'react';
import Request from 'superagent';

import RenderHeader from '../share/RenderHeader';
import DeleteForm from '../share/DeleteForm';
import HeaderForm from '../share/HeaderForm/HeaderForm';
import RenderEditDeleteButton from '../share/RenderEditDeleteButton';
import UrlApi from '../share/UrlApi';
import { TransferFactorUnitKeyToText, JsonDateToDate, TransferdisplayMechanismToText, TransferSelectInputKeyToValue } from '../share/Mapper';

import './post_management.css';
import PostCreatorUpdater from './PostCreatorUpdater';

function RenderRow(props) {

    let ma_bai_dang = props.trContent.ma_bai_dang;
    let ma_dich_vu = props.trContent.ma_dich_vu;
    let trang_hien_thi = TransferSelectInputKeyToValue(
        props.trContent.trang_hien_thi,
        ["trang_chu", "trang_tim_kiem", "trang_chi_tiet", "danh_sach_du_an"],
        ["Trang chủ", "Trang tìm kiếm", "Trang chi tiết", "Danh sách dự án"]
      );
    let tieu_de_hien_thi = props.trContent.tieu_de_hien_thi;
    let mo_ta_bai_dang = props.trContent.mo_ta_bai_dang;
    let anh_dai_dien = props.trContent.anh_dai_dien;
    return (
        <tr>
            <td>{ma_bai_dang}</td>
            <td>{ma_dich_vu}</td>
            <td>{trang_hien_thi}</td>
            <td>{tieu_de_hien_thi}</td>
            <td>{mo_ta_bai_dang}</td>
            <td>{anh_dai_dien}</td>
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

class PostContents extends Component {
    render() {
        var theaderPost = ["Mã bài đăng", "Mã dịch vụ", "Trang hiển thị", "Tiêu đề hiển thị", "Mô tả bài đăng", "Ảnh đại điện"];
        return (
            <div className="table-content">
                <table className="table table-striped">
                    <RenderHeader theader={theaderPost} />
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

class PostManagement extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ModeAction: "",
            EditContents: null,
            ShowCreatorUpdaterPopup: false,
            ShowDeletePopup: false,
            tbodyContents: []
        };

        this.handleShowCreatorUpdaterPopup = this.handleShowCreatorUpdaterPopup.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleCloseDeletePop = this.handleCloseDeletePop.bind(this);
        this.handleResetContentsState = this.handleResetContentsState.bind(this);
        this.handleClosePopup = this.handleClosePopup.bind(this);
    }

    componentDidMount() {
        this.getPosts();
    }

    getPosts() {
        Request.get(UrlApi.PostManagement)
            .then((res) => {
                this.setState({
                    tbodyContents: res.body
                });
            });
    }

    handleShowCreatorUpdaterPopup() {
        this.setState({
            ShowCreatorUpdaterPopup: !this.state.ShowCreatorUpdaterPopup,
            ModeAction: "create"
        });
    }

    handleEditClick(event) {
        var nameId = event.target.name;
        var editContents = {};

        var i = 0;
        var finishLoop = false;
        while (i < this.state.tbodyContents.length && !finishLoop) {
            var element = this.state.tbodyContents[i];
            if (nameId === element._id) {
                editContents = element;
                finishLoop = true;
            }
            i++;
        }

        this.setState({
            ModeAction: "edit",
            EditContents: editContents,
            ShowCreatorUpdaterPopup: !this.state.ShowCreatorUpdaterPopup
        });
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
        this.getPosts();
    }

    handleClosePopup() {
        this.setState({
            ShowCreatorUpdaterPopup: !this.state.ShowCreatorUpdaterPopup
        });
    }

    render() {
        return (
            < div id="page-wrapper" >
                <div className="row">
                    <div>
                        <HeaderForm title={"Bảng tin đăng"} showCreatorUpdaterPopup={this.handleShowCreatorUpdaterPopup} />
                        <PostContents
                            tbodyContents={this.state.tbodyContents}
                            handleEditClick={this.handleEditClick}
                            handleDeleteClick={this.handleDeleteClick}
                        />

                        {
                            this.state.ShowCreatorUpdaterPopup ?
                                <PostCreatorUpdater
                                    modeAction={this.state.ModeAction}
                                    editContents={this.state.EditContents}
                                    resetContentState={this.handleResetContentsState}
                                    closeCreatorUpdaterPopup={this.handleShowCreatorUpdaterPopup}
                                />
                                : null
                        }

                        {
                            this.state.ShowDeletePopup ?
                                <DeleteForm
                                    url={UrlApi.PostManagement}
                                    SelectedItemId={this.state.SelectedItemId}
                                    closeDeletePopup={this.handleCloseDeletePop}
                                    resetContentState={this.handleResetContentsState}
                                />
                                : null
                        }
                    </div>
                </div>
            </div >
        );
    }
}

export default PostManagement;