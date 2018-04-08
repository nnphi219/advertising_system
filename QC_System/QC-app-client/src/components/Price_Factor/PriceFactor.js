import React, { Component } from 'react';
import Request from 'superagent';

import HeadForm from '../share/HeaderForm/HeaderForm';
import RenderEditDeleteButton from '../share/RenderEditDeleteButton';
import PriceFactorCreatorUpdater from './PriceFactorCreatorUpdater';

import RenderHeader from '../share/RenderHeader';
import DeleteForm from '../share/DeleteForm';
import './price_factor.css';
import '../Ads_Area/ads_area.css';

import UrlApi from "../share/UrlApi";

function RenderRow(props) {
    var factorType = props.trContentPriceFactor.loai_nhan_to;
    var timeLot = `${factorType.khung_gio.bat_dau.toString()}h-${factorType.khung_gio.ket_thuc.toString()}h`;
    var location = (factorType.vi_tri !== undefined && factorType.vi_tri !== null) ? factorType.vi_tri.quan_huyen + "," + factorType.vi_tri.tinh : "";

    var rateCalculationJson = props.trContentPriceFactor.ti_le_tinh_gia;
    var rateCalculationString = (rateCalculationJson.tang === 1 ? "+ " : "- ") + rateCalculationJson.gia_tri.toString() + "%";
    var status = (props.trContentPriceFactor.trang_thai === 1) ? "Kích hoạt" : "Đã hủy";

    return (
        <tr>
            <td>{props.trContentPriceFactor.ten_chi_so}</td>
            <td>{props.trContentPriceFactor.ma_gia}</td>
            <td>{timeLot}</td>
            <td>{location}</td>
            <td>{rateCalculationString}</td>
            <td>{status}</td>
            <td>
                <RenderEditDeleteButton
                    nameId={props.trContentPriceFactor._id}
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
                trContentPriceFactor={element}
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

class PriceFactorContents extends Component {

    render() {
        var theadPriceFactors = {
            keys: [],
            values: ["Tên nhân tố tính giá", "Mã giá", "Khung giờ", "Vị trí", "Tỉ lệ tính giá", "Trạng thái"]
        };

        return (
            <div className="adsarea-content">
                <table className="table table-striped">
                    <RenderHeader theader={theadPriceFactors} />
                    <RenderBody
                        tbody={this.props.tbodyPriceFactors}
                        handleEditClick={this.props.handleEditClick}
                        handleDeleteClick={this.props.handleDeleteClick}
                    />
                </table>
            </div>
        );
    }
}

class PriceFactor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ModeAction: "",
            EditContents: null,
            ShowCreatorUpdaterPopup: false,
            ShowDeletePopup: false,
            tbodyPriceFactors: []
        };

        this.handleShowCreatorUpdaterPopup = this.handleShowCreatorUpdaterPopup.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleCloseDeletePop = this.handleCloseDeletePop.bind(this);
        this.handleResetContentsState = this.handleResetContentsState.bind(this);
    }

    componentDidMount() {
        this.getPriceFactors();
    }

    getPriceFactors() {
        Request.get(UrlApi.PriceFactor)
            .then((res) => {
                this.setState({
                    tbodyPriceFactors: res.body
                });
            });
    }

    handleEditClick(event) {
        var nameId = event.target.name;
        var editContents = {};
        console.log(nameId);
        var i = 0;
        var finishLoop = false;
        while (i < this.state.tbodyPriceFactors.length && !finishLoop) {
            var element = this.state.tbodyPriceFactors[i];
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


    handleShowCreatorUpdaterPopup() {
        this.setState({
            ShowCreatorUpdaterPopup: !this.state.ShowCreatorUpdaterPopup,
            ModeAction: "create"
        });
    }

    handleCloseDeletePop() {
        this.setState({
            ShowDeletePopup: !this.state.ShowDeletePopup
        });
    }

    handleResetContentsState() {
        this.getPriceFactors();
    }

    render() {
        return (
            <div id="page-wrapper">
                <div className="row">
                    <div>
                        <HeadForm title={"chỉ số ảnh hưởng"} showCreatorUpdaterPopup={this.handleShowCreatorUpdaterPopup} />
                        <PriceFactorContents
                            tbodyPriceFactors={this.state.tbodyPriceFactors}
                            handleEditClick={this.handleEditClick}
                            handleDeleteClick={this.handleDeleteClick}
                        />

                        {
                            this.state.ShowCreatorUpdaterPopup ?
                                <PriceFactorCreatorUpdater
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
                                    url={UrlApi.PriceFactor}
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

export default PriceFactor;