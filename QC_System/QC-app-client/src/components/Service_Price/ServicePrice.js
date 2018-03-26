import React, { Component } from 'react';
import Request from 'superagent';

import RenderHeader from '../share/RenderHeader';
import DeleteForm from '../share/DeleteForm';
import HeadForm from '../share/HeaderForm/HeaderForm';
import RenderEditDeleteButton from '../share/RenderEditDeleteButton';
import ServicePriceCreatorUpdater from './ServicePriceCreatorUpdater';
import './service_price.css';
import '../Ads_Area/ads_area.css';

import UrlApi from '../share/UrlApi';

function RenderRow(props) {
    var status = (props.trContent.trang_thai === 1) ? "Kích hoạt" : "Đã hủy";
    var availableQuantityDay = 0;
    var today = new Date();
    //var day = `${today.getFullYear.toLocaleDateString()}/${today.getMonth.toString()}/${today.getDay.toString()}`;

    return (
        <tr>
            <td>{props.trContent.ma_dich_vu_ap_dung}</td>
            <td>{props.trContent.ma_gia}</td>
            <td>{props.trContent.gia_tri}</td>
            <td>{props.trContent.loai_gia}</td>
            <td>{availableQuantityDay}</td>
            <td>{props.trContent.so_luong_don_vi_ap_dung.gia_tri}</td>
            <td>{props.trContent.loai_co_che}</td>
            <td>{today.toLocaleDateString()} {today.toLocaleTimeString()}</td>
            <td>{today.toLocaleDateString()} {today.toLocaleTimeString()}</td>
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

class ServicePriceContents extends Component {

    render() {
        var theadServicePrices = ["Mã dịch vụ áp dụng", "Mã giá", "Giá", "Mô hình giá", "Số ngày hiệu lực", "Số lượng click/view", "Cơ chế hiện thị", "Bắt đầu", "Kết thúc", "Trạng thái"];
        return (
            <div className="adsarea-content">
                <table className="table table-striped">
                    <RenderHeader theader={theadServicePrices} />
                    <RenderBody
                        tbody={this.props.tbodyServicePrices}
                        handleEditClick={this.props.handleEditClick}
                        handleDeleteClick={this.props.handleDeleteClick}
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
            tbodyServicePrices: []
        };

        this.handleShowCreatorUpdaterPopup = this.handleShowCreatorUpdaterPopup.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleCloseDeletePop = this.handleCloseDeletePop.bind(this);
        this.handleResetContentsState = this.handleResetContentsState.bind(this);
        this.handleClosePopup = this.handleClosePopup.bind(this);
    }

    componentDidMount() {
        this.getServicePrices();
    }

    handleShowCreatorUpdaterPopup() {
        this.setState({
            ShowCreatorUpdaterPopup: !this.state.ShowCreatorUpdaterPopup,
            ModeAction: "create"
        });
    }

    getServicePrices() {
        Request.get(UrlApi.ServicePrice)
            .then((res) => {
                this.setState({
                    tbodyServicePrices: res.body
                });
            });
    }

    handleEditClick() {

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
        this.getServicePrices();
    }

    handleClosePopup(){
        this.setState({
            ShowCreatorUpdaterPopup: !this.state.ShowCreatorUpdaterPopup
        });
    }

    render() {
        return (
            <div id="page-wrapper">
                <div className="row">
                    <div>
                        <HeadForm title={"giá dịch vụ"} showCreatorUpdaterPopup={this.handleShowCreatorUpdaterPopup} />
                        <ServicePriceContents
                            tbodyServicePrices={this.state.tbodyServicePrices}
                            handleEditClick={this.handleEditClick}
                            handleDeleteClick={this.handleDeleteClick}
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