import React, { Component } from 'react';
import Request from 'superagent';

import RenderHeader from '../share/RenderHeader';
import DeleteForm from '../share/DeleteForm';
import HeadForm from '../share/HeaderForm/HeaderForm';
import RenderEditDeleteButton from '../share/RenderEditDeleteButton';
import PromotionCreatorUpdater from './PromotionCreatorUpdater';
import './promotion_management.css';

import UrlApi from '../share/UrlApi';

function RenderRow(props) {
    var status = (props.trContent.trang_thai === 1) ? "Kích hoạt" : "Đã hủy";

    var muc_gia_ap_dung = props.trContent.muc_gia_ap_dung;
    var ratesApply = muc_gia_ap_dung.gia_tri.toString() + (muc_gia_ap_dung.loai_gia == 1 ? "%" : "VND");

    var start_date = props.trContent.start_date;
    var startDate = `${start_date.day}/${start_date.month}/${start_date.year}`;

    var end_date = props.trContent.end_date;
    var endDate = `${end_date.day}/${end_date.month}/${end_date.year}`;

    return (
        <tr>
            <td>{props.trContent.ma_khuyen_mai}</td>
            <td>{props.trContent.mo_ta}</td>
            <td>{props.trContent.ma_dich_vu_ap_dung}</td>
            <td>{ratesApply}</td>
            <td>{startDate}</td>
            <td>{endDate}</td>
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

class PromotionManagementContents extends Component {

    render() {
        var theaderPromotion = ["Mã khuyến mãi", "Mô tả khuyến mãi", "Mã dịch vụ áp dụng", "Mực giá áp dụng", "Bắt đầu", "Kết thúc", "Trạng thái"];
        return (
            <div className="table-content">
                <table className="table table-striped">
                    <RenderHeader theader={theaderPromotion} />
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

class PromotionManagement extends Component {
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
        this.getPromotions();
    }

    getPromotions() {
        Request.get(UrlApi.PromotionManagement)
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
        while (i < this.state.tbodyServicePrices.length && !finishLoop) {
            var element = this.state.tbodyServicePrices[i];
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
        this.getPromotions();
    }

    handleClosePopup() {
        this.setState({
            ShowCreatorUpdaterPopup: !this.state.ShowCreatorUpdaterPopup
        });
    }

    render() {
        return (
            <div id="page-wrapper">
                <div className="row">
                    <div>
                        <HeadForm title={"khuyến mãi"} showCreatorUpdaterPopup={this.handleShowCreatorUpdaterPopup} />
                        <PromotionManagementContents
                            tbodyContents={this.state.tbodyContents}
                            handleEditClick={this.handleEditClick}
                            handleDeleteClick={this.handleDeleteClick}
                        />

                        {
                            this.state.ShowCreatorUpdaterPopup ?
                                <PromotionCreatorUpdater
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
                                    url={UrlApi.PromotionManagement}
                                    SelectedItemId={this.state.SelectedItemId}
                                    closeDeletePopup={this.handleCloseDeletePop}
                                    resetContentState={this.handleResetContentsState}
                                />
                                : null
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default PromotionManagement;