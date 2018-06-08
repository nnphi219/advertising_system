import React, { Component } from 'react';
import Request from 'superagent';

import  { HeaderForm2 } from '../share/HeaderForm/HeaderForm';
import RenderEditDeleteButton from '../share/RenderEditDeleteButton';
import PriceFactorCreatorUpdater, { PriceFactorCreator, PriceFactorEditor } from './PriceFactorCreatorUpdater';

import RenderHeader from '../share/RenderHeader';
import DeleteForm from '../share/DeleteForm';
import './price_factor.css';

import UrlApi, { UrlRedirect } from '../share/UrlApi';
import { BrowserRouter, Route } from 'react-router-dom';
import { TransferTimeLogJsonToString } from '../share/Mapper';

function RenderRow(props) {
    var factorType = props.trContentPriceFactor.loai_nhan_to;
    var timeSlots = factorType.khung_gio;

    var timeSlotStrings = "";
    timeSlots.forEach(timeSlot => {
        timeSlotStrings += (timeSlotStrings !== "" ? ", " : "");
        timeSlotStrings += TransferTimeLogJsonToString(timeSlot);
    });

    var location = (factorType.vi_tri !== undefined && factorType.vi_tri !== null) ? factorType.vi_tri.quan_huyen + "," + factorType.vi_tri.tinh : "";

    var rateCalculationJson = props.trContentPriceFactor.ti_le_tinh_gia;
    var rateCalculationString = (rateCalculationJson.tang === 1 ? "+ " : "- ") + rateCalculationJson.gia_tri.toString() + "%";
    var status = (props.trContentPriceFactor.trang_thai === 1) ? "Kích hoạt" : "Đã hủy";

    return (
        <tr>
            <td>{props.trContentPriceFactor.ma_chi_so}</td>
            <td>{props.trContentPriceFactor.ten_chi_so}</td>
            <td>{props.trContentPriceFactor.ma_gia}</td>
            <td>{timeSlotStrings}</td>
            <td>{location}</td>
            <td>{rateCalculationString}</td>
            <td>{status}</td>
            <td>
                <RenderEditDeleteButton
                    nameId={props.trContentPriceFactor._id}
                    handleEditClick={props.handleEditClick}
                    handleDeleteClick={props.handleDeleteClick}
                    handleActiveClick={props.handleActiveClick}

                    trang_thai={props.trContentPriceFactor.trang_thai}
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
                handleActiveClick={props.handleActiveClick}
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
            values: ["Mã nhân tố", "Tên nhân tố tính giá", "Mã giá", "Khung giờ", "Vị trí", "Tỉ lệ tính giá", "Trạng thái"]
        };

        var props = this.props;

        return (
            <div className="adsarea-content">
                <table className="table table-striped">
                    <RenderHeader theader={theadPriceFactors} />
                    <RenderBody
                        tbody={props.tbodyPriceFactors}
                        handleEditClick={props.handleEditClick}
                        handleDeleteClick={props.handleDeleteClick}
                        handleActiveClick={props.handleActiveClick}
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
        this.handleActiveClick = this.handleActiveClick.bind(this);
        this.handleCloseDeletePop = this.handleCloseDeletePop.bind(this);
        this.handleResetContentsState = this.handleResetContentsState.bind(this);

        this._onKeyDown = this._onKeyDown.bind(this);
    }

    componentDidMount() {
        this.getPriceFactors();
    }

    _onKeyDown(e) {
        if (e.key === "Escape") {
            this.setState({
                ShowCreatorUpdaterPopup: false,
                ShowDeletePopup: false
            });
        }
    }

    componentWillMount() {
        document.addEventListener("keydown", this._onKeyDown);
    }

    componentWillUnmount() {
        document.addEventListener("keydown", this._onKeyDown);
    }

    getPriceFactors() {
        Request.get(UrlApi.PriceFactor)
            .set('x-auth', localStorage.getItem('x-auth'))
            .then((res) => {
                this.setState({
                    tbodyPriceFactors: res.body
                });
            });
    }

    handleEditClick(event) {
        window.location.href = UrlRedirect.PriceFactorEditor + `/${event.target.name}`;
    }

    handleActiveClick(event) {
        var url = UrlApi.PriceFactorWithoutTimeSlots + "/" + event.target.name;
        var $this = this;
        var updatePriceFactorJson = {
            trang_thai: parseInt(event.target.id, 10) === 1 ? 0 : 1
        };

        Request.put(url)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .set('x-auth', localStorage.getItem('x-auth'))
            .send(updatePriceFactorJson)
            .end(function (err, res) {
                $this.getPriceFactors();
            });
    }

    handleDeleteClick(event) {
        let selectedItemId = event.target.name;
        let selectedItem = this.state.tbodyPriceFactors.find((content) => content._id === selectedItemId);
        this.setState({
            ShowDeletePopup: !this.state.ShowDeletePopup,
            SelectedItemId: selectedItemId,
            selectedItemValue: selectedItem.ma_chi_so
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
            <div className="right_col">
                <div className="row tile_count" >
                    <HeaderForm2
                        title={"Chỉ số ảnh hưởng giá"}
                        buttonTitle={"chỉ số"}
                        linkTo={UrlRedirect.PriceFactorCreator} />
                </div>
                <div className="row">
                    <div id="page-wrapper" onKeyDown={this.onKeyDown}>
                        <div className="row">
                            <div>
                                <PriceFactorContents
                                    tbodyPriceFactors={this.state.tbodyPriceFactors}
                                    handleEditClick={this.handleEditClick}
                                    handleDeleteClick={this.handleDeleteClick}
                                    handleActiveClick={this.handleActiveClick}
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
                                            selectedItemValue={this.state.selectedItemValue}
                                            closeDeletePopup={this.handleCloseDeletePop}
                                            resetContentState={this.handleResetContentsState}
                                        />
                                        : null
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class PriceFactorManagement extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route exact={true} path={UrlRedirect.PriceFactors} component={PriceFactor} />
                    <Route exact={true} path={UrlRedirect.PriceFactorCreator} component={PriceFactorCreator} />
                    <Route exact={true} path={UrlRedirect.PriceFactorEditor + "/:id"} component={PriceFactorEditor} />
                </div>
            </BrowserRouter>
        );
    }
}

export default PriceFactorManagement;