import React, { Component } from 'react';
import Request from 'superagent';

import RenderHeader from '../share/RenderHeader';
import DeleteForm from '../share/DeleteForm';
import HeadForm from '../share/HeaderForm/HeaderForm';
import RenderEditDeleteButton from '../share/RenderEditDeleteButton';

import UrlApi from '../share/UrlApi';

function RenderRow(props) {
    var status = (props.trContent.trang_thai === 1) ? "Kích hoạt" : "Đã hủy";
    var availableQuantityDay = 0;
    var today = new Date();
    var day = `${today.getFullYear.toString()}/${today.getMonth.toString()}/${today.getDay.toString()}`;

    return (
        <tr>
            <td>{props.trContent.ma_dich_vu_ap_dung}</td>
            <td>{props.trContent.ma_gia}</td>
            <td>{props.trContent.gia_tri}</td>
            <td>{props.trContent.loai_gia}</td>
            <td>{availableQuantityDay}</td>
            <td>{props.trContent.so_luong_don_vi_ap_dung.gia_tri}</td>
            <td>{props.trContent.loai_co_che}</td>
            <td>{day}</td>
            <td>{day}</td>
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

    handleDeleteClick() {

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
                    </div>
                </div>
            </div>
        );
    }
}

export default ServicePrice;