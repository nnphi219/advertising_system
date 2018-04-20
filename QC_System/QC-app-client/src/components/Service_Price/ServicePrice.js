import React, { Component } from 'react';
import Request from 'superagent';

import RenderHeader from '../share/RenderHeader';
import DeleteForm from '../share/DeleteForm';
import HeadForm from '../share/HeaderForm/HeaderForm';
import RenderEditDeleteButton from '../share/RenderEditDeleteButton';
import ServicePriceCreatorUpdater from './ServicePriceCreatorUpdater';
import { JsonSort, JsonSortDateType } from '../share/Mapper';
import './service_price.css';
import '../Ads_Area/ads_area.css';

import UrlApi from '../share/UrlApi';

function RenderRow(props) {
    var status = (props.trContent.trang_thai === 1) ? "Kích hoạt" : "Đã hủy";
    var availableQuantityDay = props.trContent.so_luong_don_vi_ap_dung.so_ngay_ap_dung;
    var quantityClickOnView = props.trContent.so_luong_don_vi_ap_dung.so_click_tren_view;

    var start_date = props.trContent.start_date;

    var startDate = `${start_date.day}/${start_date.month}/${start_date.year}`;

    var end_date = props.trContent.end_date;
    var endDate = "";
    if (!(end_date === undefined || end_date === null || end_date === "")) {
        endDate = `${end_date.day}/${end_date.month}/${end_date.year}`;
    }

    return (
        <tr>
            <td>{props.trContent.ma_dich_vu_ap_dung}</td>
            <td>{props.trContent.ma_gia}</td>
            <td>{props.trContent.gia_tri}</td>
            <td>{props.trContent.loai_gia}</td>
            <td>{availableQuantityDay}</td>
            <td>{quantityClickOnView}</td>
            <td>{props.trContent.loai_co_che.value}</td>
            <td>{startDate}</td>
            <td>{endDate}</td>
            <td>{status}</td>
            <td>
                <RenderEditDeleteButton
                    nameId={props.trContent._id}
                    handleEditClick={props.handleEditClick}
                    handleDeleteClick={props.handleDeleteClick}
                    handleActiveClick={props.handleActiveClick}

                    trang_thai={props.trContent.trang_thai}
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

class ServicePriceContents extends Component {

    render() {
        var theadServicePrices = {
            keys: ["ma_dich_vu_ap_dung", "ma_gia", "gia_tri", "loai_gia", "so_luong_don_vi_ap_dung.so_ngay_ap_dung", "so_luong_don_vi_ap_dung.so_click_tren_view", "loai_co_che.value", "start_date", "end_date", "trang_thai"],
            values: ["Mã dịch vụ áp dụng", "Mã giá", "Giá", "Mô hình giá", "Số ngày hiệu lực", "Số lượng click/view", "Cơ chế hiện thị", "Bắt đầu", "Kết thúc", "Trạng thái"]
        };

        var props = this.props;
        return (
            <div className="table-content">
                <table className="table table-striped">
                    <RenderHeader
                        theader={theadServicePrices}
                        OnchangeSort={props.OnchangeSort}
                    />
                    <RenderBody
                        tbody={props.tbodyServicePrices}
                        handleEditClick={props.handleEditClick}
                        handleDeleteClick={props.handleDeleteClick}
                        handleActiveClick={props.handleActiveClick}
                    />
                </table>
            </div>
        );
    }
}

class ServicePrice extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ModeAction: "",
            EditContents: null,
            ShowCreatorUpdaterPopup: false,
            ShowDeletePopup: false,
            tbodyServicePrices: [],
            IsASC: false,
            KeySort: ''
        };

        this.handleShowCreatorUpdaterPopup = this.handleShowCreatorUpdaterPopup.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleActiveClick = this.handleActiveClick.bind(this);
        this.handleCloseDeletePop = this.handleCloseDeletePop.bind(this);
        this.handleResetContentsState = this.handleResetContentsState.bind(this);
        this.handleClosePopup = this.handleClosePopup.bind(this);

        this.OnchangeSort = this.OnchangeSort.bind(this);
        this._onKeyDown = this._onKeyDown.bind(this);
    }

    componentDidMount() {
        this.getServicePrices();
    }

    _onKeyDown(e) {
        if (e.key === "Escape") {
            this.setState({
                ShowCreatorUpdaterPopup: false
            });
        }
    }

    componentWillMount() {
        document.addEventListener("keydown", this._onKeyDown);
    }

    componentWillUnmount() {
        document.addEventListener("keydown", this._onKeyDown);
    }

    handleShowCreatorUpdaterPopup() {
        this.setState({
            ShowCreatorUpdaterPopup: !this.state.ShowCreatorUpdaterPopup,
            ModeAction: "create"
        });
    }

    getServicePrices() {
        Request.get(UrlApi.ServicePrice)
            .set('x-auth', localStorage.getItem('x-auth'))
            .then((res) => {
                this.setState({
                    tbodyServicePrices: res.body
                });
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

    handleActiveClick(event) {
        var url = UrlApi.ServicePrice + "/" + event.target.name;
        var $this = this;
        var updateServicePriceJson = {
          trang_thai: parseInt(event.target.id) === 1 ? 0 : 1
        };
    
        Request.put(url)
          .set('Content-Type', 'application/x-www-form-urlencoded')
          .set('x-auth', localStorage.getItem('x-auth'))
          .send(updateServicePriceJson)
          .end(function (err, res) {
            $this.getServicePrices();
          });
    }

    handleCloseDeletePop() {
        this.setState({
            ShowDeletePopup: !this.state.ShowDeletePopup
        });
    }

    handleResetContentsState() {
        this.getServicePrices();
    }

    handleClosePopup() {
        this.setState({
            ShowCreatorUpdaterPopup: !this.state.ShowCreatorUpdaterPopup
        });
    }

    OnchangeSort(e) {
        var newKeySort = e.target.name;
        var KeySort = this.state.KeySort;
        var jsonStateSort = {
            KeySort: newKeySort
        };

        if (newKeySort === KeySort) {
            jsonStateSort.IsASC = !this.state.IsASC;
        }
        else {
            jsonStateSort.IsASC = true;
        }

        this.setState(jsonStateSort);
        e.preventDefault();
    }

    render() {
        var currentState = this.state;
        var KeySort = currentState.KeySort;
        var tbody = null;
        if (KeySort === '') {
            tbody = currentState.tbodyServicePrices;
        }
        else if (KeySort === 'start_date' || KeySort === 'end_date') {
            tbody = JsonSortDateType(currentState.tbodyServicePrices, KeySort, currentState.IsASC);
        }
        else {
            tbody = JsonSort(currentState.tbodyServicePrices, KeySort, currentState.IsASC);
        }

        return (
            <div id="page-wrapper" onKeyDown={this.onKeyDown}>
                <div className="row">
                    <div>
                        <HeadForm title={"giá dịch vụ"}
                            showCreatorUpdaterPopup={this.handleShowCreatorUpdaterPopup}
                        />

                        <ServicePriceContents
                            tbodyServicePrices={tbody}
                            handleEditClick={this.handleEditClick}
                            handleDeleteClick={this.handleDeleteClick}
                            handleActiveClick={this.handleActiveClick}
                            OnchangeSort={this.OnchangeSort}
                        />


                        {
                            this.state.ShowCreatorUpdaterPopup ?
                                <ServicePriceCreatorUpdater
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
                                    url={UrlApi.ServicePrice}
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

export default ServicePrice;