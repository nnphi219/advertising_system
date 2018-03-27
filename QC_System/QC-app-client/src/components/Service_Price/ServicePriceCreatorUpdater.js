import React, { Component } from 'react';
import Request from 'superagent';
import DatePicker from 'react-date-picker';
import UrlApi from '../share/UrlApi';
import './service_price.css';

function RenderRadioButtons(props) {
    var elementPriceTypeRadioButtons = [];

    servicePriceInputs[props.nameId].keys.forEach((key, index) => {
        if (props.defaultValue === key) {
            elementPriceTypeRadioButtons.push(
                <div key={key} className="pricefactor-radio">
                    <input type="radio" value={key} name={props.nameId} defaultChecked />
                    {servicePriceInputs[props.nameId].values[index]}
                </div>
            );
        }
        else {
            elementPriceTypeRadioButtons.push(
                <div key={key} className="pricefactor-radio">
                    <input type="radio" value={key} name={props.nameId} />
                    {servicePriceInputs[props.nameId].values[index]}
                </div>
            );
        }

    });
    return (
        elementPriceTypeRadioButtons
    );
}

class RenderLeftForm extends Component {
    render() {

        return (
            <div key="left" className="serviceprice_information_left">
                <h2>Thông tin giá dịch vụ</h2>
                <div>
                    <div>
                        <label className="fullwidth">
                            {"Mã dịch vụ quảng cáo"}
                            <select name={"ma_dich_vu_ap_dung"} key={"ma_dich_vu_ap_dung"} value={this.props.stateValues.ma_dich_vu_ap_dung} onChange={this.props.OnChangeSelect} className="serviceprice--select">
                                <option value={"VIPHOME1"} >{"VIPHOME1"}</option>
                                <option value={"VIPHOME2"} >{"VIPHOME2"}</option>
                            </select>
                        </label>
                    </div>
                    <div>
                        <label key={"ma_gia"} className="fullwidth">
                            {"Nhập mã giá"}
                            <input type="text" key={"ma_gia"} name={"ma_gia"} value={this.props.stateValues.ma_gia} onChange={this.props.OnChangeInput} className="serviceprice--input" />
                        </label>
                    </div>
                    <div>
                        <div className="">
                            <label className="fullwidth">
                                {"Thời điểm đấu giá"}
                                <div>
                                    <DatePicker name="start_date" value={this.props.stateValues.start_date} onChange={this.props.OnchangeStartDate} className="input-date"/>
                                </div>
                            </label>
                        </div>
                    </div>
                    <div key={"co_thoi_diem_ket_thuc"} name={"co_thoi_diem_ket_thuc"} onChange={this.props.OnChangeRadioButton}>
                        <label className="fullwidth">{"Có thời điểm kết thúc"}</label>
                        <RenderRadioButtons
                            nameId={"co_thoi_diem_ket_thuc"}
                            defaultValue={this.props.stateValues.co_thoi_diem_ket_thuc}
                        />
                    </div>
                    <div>
                        <div className="">
                            <label className="fullwidth">
                                {"Thời điểm kết thúc"}
                                <div>
                                    <DatePicker name="end_date" value={this.props.stateValues.end_date} onChange={this.props.OnchangeEndDate} className="input-date"/>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

class RenderRightForm extends Component {
    render() {
        return (
            <div key="right" className="serviceprice_information_right">
                <h2>Thông số giá</h2>
                <div>
                    <div>
                        <label className="fullwidth" >
                            {"Cơ chế hiển thị"}
                            <select name={"loai_co_che"} key={"loai_co_che"} value={this.props.stateValues.loai_co_che} onChange={this.props.OnChangeSelect} className="serviceprice--select">
                                <option value={"doc_quyen"} >{"Độc quyền"}</option>
                                <option value={"co_dinh_vi_tri"} >{"Cố định vị trí"}</option>
                                <option value={"chia_se_co_dinh"} >{"Chia sẻ cố định"}</option>
                                <option value={"ngau_nhien"} >{"Ngẫu nhiên"}</option>
                            </select>
                        </label>
                    </div>
                    <div key={"loai_gia"} name={"loai_gia"} onChange={this.props.OnChangeRadioButton}>
                        <label className="fullwidth">{"Mô hình giá"}</label>
                        <RenderRadioButtons
                            nameId={"loai_gia"}
                            defaultValue={this.props.stateValues.loai_gia}
                        />
                    </div>
                    <div>
                        <label className="fullwidth">
                            {"Giá (VND)"}
                        </label>
                        <input type="number" key={"gia_tri"} name={"gia_tri"} value={this.props.stateValues.gia_tri} onChange={this.props.OnChangeInput} className="serviceprice--input" />
                    </div>
                    <div>
                        <label className="fullwidth">
                            {"Số ngày áp dụng"}
                        </label>
                        <input type="number" key={"so_ngay_ap_dung"} name={"so_ngay_ap_dung"} value={this.props.stateValues.so_ngay_ap_dung} onChange={this.props.OnChangeInput} className="serviceprice--input" />
                    </div>
                    <div>
                        <label className="fullwidth">
                            {"Số lượng click / view tối đa"}
                        </label>
                        <input type="number" key={"so_click_tren_view"} name={"so_click_tren_view"} value={this.props.stateValues.so_click_tren_view} onChange={this.props.OnChangeInput} className="serviceprice--input" />
                    </div>

                </div>
            </div>
        );
    }

}

class RenderProperties extends Component {

    render() {
        return (
            <div>
                <RenderLeftForm
                    OnChangeInput={this.props.OnChangeInput}
                    OnChangeSelect={this.props.OnChangeSelect}
                    OnChangeRadioButton={this.props.OnChangeRadioButton}
                    OnchangeStartDate={this.props.OnchangeStartDate}
                    OnchangeEndDate={this.props.OnchangeEndDate}

                    stateValues={this.props.stateValues}
                />

                <RenderRightForm
                    OnChangeInput={this.props.OnChangeInput}
                    OnChangeSelect={this.props.OnChangeSelect}
                    OnChangeRadioButton={this.props.OnChangeRadioButton}
                    stateValues={this.props.stateValues}
                />
            </div>
        );
    }
}

class ServicePriceCreatorUpdaterForm extends Component {
    constructor(props) {
        super(props);

        this.OnChangeInput = this.OnChangeInput.bind(this);
        this.OnChangeSelect = this.OnChangeSelect.bind(this);
        this.OnChangeRadioButton = this.OnChangeRadioButton.bind(this);
        
        this.OnchangeStartDate = this.OnchangeStartDate.bind(this);
        this.OnchangeEndDate = this.OnchangeEndDate.bind(this);
    }

    OnchangeStartDate(date) {
        var jsonState = { "start_date": date}
        this.props.UpdateState(jsonState);
    }

    OnchangeEndDate(date) {
        var jsonState = { "end_date": date}
        this.props.UpdateState(jsonState);
    }

    OnChangeInput(e) {
        var jsonState = { [e.target.name]: e.target.value };
        this.props.UpdateState(jsonState);
    }

    OnChangeSelect(e) {
        var name = e.target.name;
        var value = e.target.value;

        this.props.UpdateState({ [name]: value });
    }

    OnChangeRadioButton(e) {
        this.props.UpdateState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        return (
            <div className='popup_inner--serviceprice'>
                <h1>{this.props.titleForm}</h1>
                <RenderProperties
                    OnChangeInput={this.OnChangeInput}
                    OnChangeSelect={this.OnChangeSelect}
                    OnChangeRadioButton={this.OnChangeRadioButton}
                    OnchangeStartDate={this.OnchangeStartDate}
                    OnchangeEndDate={this.OnchangeEndDate}

                    stateValues={this.props.stateValues}
                />
                <div className="submit">
                    <button className="btn btn-primary" onClick={this.props.handleSubmit}>Save</button>
                    <button className="btn btn-primary" onClick={this.props.handleClosePopup}>Cancel</button>
                </div>
            </div>
        );
    }
}

class ServicePriceCreatorUpdater extends Component {
    constructor(props) {
        super(props);

        var jsonState = {};
        this.SetInitState(jsonState);
        this.state = jsonState;
    }

    SetInitState(jsonState) {
        if (this.props.modeAction === "create") {
            jsonState.ma_gia = "";
            jsonState.ma_dich_vu_ap_dung = "VIPHOME1";
            jsonState.loai_co_che = "doc_quyen";
            jsonState.loai_gia = "CPC";
            jsonState.gia_tri = 0;
            jsonState.so_ngay_ap_dung = 0;
            jsonState.so_click_tren_view = 0;

            var today = new Date();
            jsonState.start_date = today;
            jsonState.end_date = today;
            jsonState.co_thoi_diem_ket_thuc = 1;
        }
        else {
            var editContents = this.props.editContents;
            
            jsonState.ma_gia = editContents.ma_gia;
            jsonState.ma_dich_vu_ap_dung = editContents.ma_dich_vu_ap_dung;
            jsonState.loai_co_che = editContents.loai_co_che;
            jsonState.loai_gia = editContents.loai_gia;
            jsonState.gia_tri = editContents.gia_tri;
            jsonState.so_ngay_ap_dung = editContents.so_luong_don_vi_ap_dung.so_ngay_ap_dung;
            jsonState.so_click_tren_view = editContents.so_luong_don_vi_ap_dung.so_click_tren_view;

            jsonState.start_date = editContents.start_date;
            jsonState.end_date = editContents.end_date;

            if(editContents.end_date === undefined){
                jsonState.co_thoi_diem_ket_thuc = 0;
            }
            else {
                jsonState.co_thoi_diem_ket_thuc = 1;
            }
        }
    }

    handleUpdateState(jsonState) {
        this.setState(jsonState);
    }

    handleSubmit() {
        if (this.props.modeAction === "create") {
            console.log(this.state);
        }
        else {
            this.EditPriceFactor();
        }
    }

    render() {
        var titleForm = this.props.modeAction === "create" ? "Tạo giá dịch vụ" : "Chỉnh sửa giá dịch vụ";
        return (
            <div className='popup'>
                <ServicePriceCreatorUpdaterForm
                    titleForm={titleForm}
                    stateValues={this.state}
                    handleClosePopup={this.props.closeCreatorUpdaterPopup}
                    handleSubmit={this.handleSubmit.bind(this)}
                    UpdateState={this.handleUpdateState.bind(this)}
                />
            </div>
        );
    }
}

var servicePriceInputs = {
    loai_gia: {
        values: ["CPD", "CPC", "CPM"],
        keys: ["CPD", "CPC", "CPM"]
    },
    co_thoi_diem_ket_thuc: {
        values: ["Có", "Không"],
        keys: [1, 0]
    }
};

export default ServicePriceCreatorUpdater;