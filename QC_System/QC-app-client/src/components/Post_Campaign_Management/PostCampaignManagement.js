import React, { Component } from 'react';
import Request from 'superagent';

import RenderHeader from '../share/RenderHeader';
import DeleteForm from '../share/DeleteForm';
import HeaderForm from '../share/HeaderForm/HeaderForm';
import RenderEditDeleteButton from '../share/RenderEditDeleteButton';
import UrlApi from '../share/UrlApi';
import { TransferFactorUnitKeyToText, JsonDateToDate, TransferdisplayMechanismToText } from '../share/Mapper';

import './post_campaign_management.css';
import PostCampaignCreatorUpdater from './PostCampaignCreatorUpdater';

function RenderRow(props) {
    var status = (props.trContent.trang_thai === 1) ? "Kích hoạt" : "Đã hủy";

    var tinh_theo_gia = TransferFactorUnitKeyToText(props.trContent.tinh_gia_theo);
    var co_che_hien_thi = TransferdisplayMechanismToText(props.trContent.co_che_hien_thi);

    var loai_nhan_to = props.trContent.loai_nhan_to;
    var khung_gio = (loai_nhan_to.khung_gio !== undefined && loai_nhan_to.khung_gio !== null) ? `${loai_nhan_to.khung_gio.bat_dau}h-${loai_nhan_to.khung_gio.ket_thuc}h` : "";
    var vi_tri = (loai_nhan_to.vi_tri !== undefined && loai_nhan_to.vi_tri !== null) ? `${loai_nhan_to.vi_tri.quan_huyen}, ${loai_nhan_to.vi_tri.tinh}` : "";

    var start_date = props.trContent.start_date;
    var startDate = `${start_date.day}/${start_date.month}/${start_date.year}`;
    var end_date = props.trContent.end_date;
    var endDate = `${end_date.day}/${end_date.month}/${end_date.year}`;

    var tong_cong = `${props.trContent.tong_cong} VND`;

    return (
        <tr>
            <td>{props.trContent.ma_chien_dich}</td>
            <td>{props.trContent.ma_bai_dang}</td>
            <td>{props.trContent.ma_khuyen_mai}</td>
            <td>{co_che_hien_thi}</td>
            <td>{tinh_theo_gia}</td>
            <td>{loai_nhan_to.thoi_luong}</td>
            <td>{khung_gio}</td>
            <td>{vi_tri}</td>
            <td>{startDate}</td>
            <td>{endDate}</td>
            <td>{tong_cong}</td>
            <td>{status}</td>
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

class PostCampaignContents extends Component {
    render() {
        var theaderPostCampaign = ["Mã chiến dịch", "Mã bài đăng", "Mã khuyến mãi", "Cơ chế hiện thị", "Tính theo giá", "Thời lượng", "Khung giờ", "Vị trí", "Bắt đầu", "Kết thúc", "Tổng tiền", "Trạng thái"];
        return (
            <div className="table-content">
                <table className="table table-striped">
                    <RenderHeader theader={theaderPostCampaign} />
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

class PostCampaignManagement extends Component {
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
        this.getPostCampaigns();
    }

    getPostCampaigns() {
        Request.get(UrlApi.PostCampaignManagement)
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
        this.getPostCampaigns();
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
                        <HeaderForm title={"chiến dịch tin đăng"} showCreatorUpdaterPopup={this.handleShowCreatorUpdaterPopup} />
                        <PostCampaignContents
                            tbodyContents={this.state.tbodyContents}
                            handleEditClick={this.handleEditClick}
                            handleDeleteClick={this.handleDeleteClick}
                          />

                        {
                            this.state.ShowCreatorUpdaterPopup ?
                                <PostCampaignCreatorUpdater
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
                                    url={UrlApi.PostCampaignManagement}
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

export default PostCampaignManagement;