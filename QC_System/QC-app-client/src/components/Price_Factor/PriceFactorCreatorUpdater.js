import React, { Component } from 'react';
import Request from 'superagent';
import NumericInput from 'react-numeric-input';
import DatePicker from 'react-date-picker';
import UrlApi from '../share/UrlApi';
import './price_factor.css';

class RenderProperties extends Component {
    constructor(props) {
        super(props);

        this.OnchangeStartDate = this.OnchangeStartDate.bind(this);
        this.OnchangeEndDate = this.OnchangeEndDate.bind(this);
    }
    TranserTimeLogToString(timeLogJson) {
        if (timeLogJson == null) {
            return "";
        }
        return `${timeLogJson.bat_dau.toString()}h-${timeLogJson.ket_thuc.toString()}h`;
    }

    OnchangeStartDate(date) {
        var e = {};
        e.target = {};
        e.target.value = date.toString();
        e.target.name = "start_date";
        this.props.OnChangeInput(e);
    }

    OnchangeEndDate(date) {
        var e = {};
        e.target = {};
        e.target.value = date;
        e.target.name = "end_date";
        this.props.OnChangeInput(e);
    }

    render() {
        var timeLog = this.TranserTimeLogToString(this.props.stateValues.khung_gio_ap_dung);

        return (
            <div>
                <div>
                    <label key={"ten_chi_so"} className="fullwidth">
                        {"Nhập tên chỉ số"}
                        <input type="text" id={"ten_chi_so"} key={"ten_chi_so"} name={"ten_chi_so"} value={this.props.stateValues.ten_chi_so} onChange={this.props.OnChangeInput} className="pricefactor--input" />
                    </label>
                </div>
                <div>
                    <label key={"ma_gia"} className="fullwidth">
                        {"Mã giá áp dụng"}
                        <select name={"ma_gia"} id={"ma_gia"} key={"ma_gia"} value={this.props.stateValues.ma_gia} onChange={this.props.OnChangeSelect} className="pricefactor--select">
                            <option value={"VIPHOME1"} >{"VIPHOME1"}</option>
                            <option value={"VIPHOME2"} >{"VIPHOME2"}</option>
                        </select>
                    </label>
                </div>
                <div>
                    <label className="fullwidth">
                        {"Đơn giá cơ bản"}
                    </label>
                    <NumericInput key={"don_gia_co_ban"} name={"don_gia_co_ban"} value={this.props.stateValues.don_gia_co_ban} onChange={this.props.OnchangeBasicPrice} className="pricefactor--input" />
                </div>
                <div>
                    <label key={"khung_gio_ap_dung"} className="fullwidth">
                        {"Khung giờ áp dụng"}
                        <select name={"khung_gio_ap_dung"} id={"ma_gia"} key={"khung_gio_ap_dung"} value={timeLog} onChange={this.props.OnChangeSelect} className="pricefactor--select">
                            <option value={"2h-4h"} >{"2h-4h"}</option>
                            <option value={"4h-6h"} >{"4h-6h"}</option>
                        </select>
                    </label>
                </div>
                <div>
                    <div className="">
                        <label className="fullwidth">
                            {"Cả ngày"}
                            <div>
                                <DatePicker key={"start_date"} name={"start_date"} value={this.props.stateValues.start_date} onChange={this.OnchangeStartDate} />
                                {" đến "}
                                <DatePicker key={"end_date"} name={"end_date"} value={this.props.stateValues.end_date} onChange={this.OnchangeEndDate} />
                            </div>
                        </label>
                    </div>
                </div>
                <div>
                    <div className="float-left">
                        <label key={"tinh"} className="fullwidth">
                            {"Áp dụng cho tỉnh thành"}
                            <input type="text" id={"tinh"} key={"tinh"} name={"tinh"} value={this.props.stateValues.tinh} onChange={this.props.OnChangeInput} className="pricefactor--input inline" />
                        </label>
                    </div>
                    <div className="float-left">
                        <label key={"quan_huyen"} className="fullwidth">
                            {"Áp dụng cho quận huyện"}
                            <input type="text" id={"quan_huyen"} key={"quan_huyen"} name={"quan_huyen"} value={this.props.stateValues.quan_huyen} onChange={this.props.OnChangeInput} className="pricefactor--input inline" />
                        </label>
                    </div>
                </div>
                <div key={"loai_gia_tri_tang_them"} name={"loai_gia_tri_tang_them"} onChange={this.props.OnChangeRadioButton}>
                    <label className="fullwidth">{"Loại giá trị tăng thêm"}</label>
                    <div className="pricefactor-radio">
                        <input type="radio" value={1} name={"loai_gia_tri_tang_them"} defaultChecked />
                        {"Tăng theo %"}
                    </div>
                    <div className="pricefactor-radio">
                        <input type="radio" value={0} name={"loai_gia_tri_tang_them"} />
                        {"Giảm theo %"}
                    </div>
                </div>
                <div>
                    <label className="fullwidth">
                        {"Phần trăm tăng/giảm (%)"}
                    </label>
                    <NumericInput key={"phan_tram_tang_giam"} name={"phan_tram_tang_giam"} value={this.props.stateValues.phan_tram_tang_giam} onChange={this.props.OnchangeRate} className="pricefactor--input" />
                </div>
                <div>
                    <label key={"gia_tri_thuc"} className="fullwidth">
                        {"Tổng tiền"}
                        <input type="text" id={"gia_tri_thuc"} key={"gia_tri_thuc"} name={"gia_tri_thuc"} onChange={this.props.OnChangeInput} readOnly className="pricefactor--input" />
                    </label>
                </div>
                <div className="submit">
                    <button className="btn btn-primary" onClick={this.props.handleSubmit}>Save</button>
                    <button className="btn btn-primary" onClick={this.props.handleClosePopup}>Cancel</button>
                </div>
            </div>
        );
    }
}

class PriceFactorCreatorUpdaterForm extends Component {
    constructor(props) {
        super(props);

        this.OnchangeBasicPrice = this.OnchangeBasicPrice.bind(this);
        this.OnchangeRate = this.OnchangeRate.bind(this);
        this.OnChangeInput = this.OnChangeInput.bind(this);
        this.OnChangeSelect = this.OnChangeSelect.bind(this);
        this.OnChangeRadioButton = this.OnChangeRadioButton.bind(this);
    }

    OnchangeBasicPrice(number) {
        var jsonState = { "don_gia_co_ban": 0 };
        if (Number.isInteger(number)) {
            jsonState = { "don_gia_co_ban": number };

        }
        this.props.UpdateState(jsonState);
    }

    OnchangeRate(number) {
        var jsonState = { "phan_tram_tang_giam": 0 };
        if (Number.isInteger(number)) {
            jsonState = { "phan_tram_tang_giam": number };

        }
        this.props.UpdateState(jsonState);
    }

    OnChangeInput(e) {
        this.props.UpdateState({ [e.target.name]: e.target.value });
    }

    OnChangeSelect(e) {
        var name = e.target.name;
        var value = e.target.value;

        if (name === "khung_gio_ap_dung") {
            var timeLogArr = value.split("h").join("").split('-');
            value = { "bat_dau": timeLogArr[0], "ket_thuc": timeLogArr[1] };
        }

        this.props.UpdateState({ [name]: value });
    }

    OnChangeRadioButton(e) {
        this.props.UpdateState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        return (
            <div className='popup_inner--pricefactor'>
                <h1>{this.props.titleForm}</h1>
                <div className="pricefactor_information">
                    <h2>Chỉ số ảnh hưởng giá</h2>
                    <RenderProperties
                        handleSubmit={this.props.handleSubmit}
                        handleClosePopup={this.props.handleClosePopup}
                        stateValues={this.props.stateValues}

                        OnChangeInput={this.OnChangeInput}
                        OnChangeSelect={this.OnChangeSelect}
                        OnChangeRadioButton={this.OnChangeRadioButton}

                        OnchangeBasicPrice={this.OnchangeBasicPrice}
                        OnchangeRate={this.OnchangeRate}
                    />
                </div>

            </div>
        );
    }
}

class PriceFactorCreatorUpdater extends Component {
    constructor(props) {
        super(props);

        var jsonState = {};
        this.SetInitState(jsonState);
        
        this.state = jsonState;
    }

    SetInitState(jsonState) {
        var today = new Date();

        if (this.props.modeAction === "create") {
            jsonState.ma_gia = "VIPHOME1";
            jsonState.don_gia_co_ban = 0;
            jsonState.khung_gio_ap_dung = {
                bat_dau: 2,
                ket_thuc: 4
            };
            jsonState.loai_gia_tri_tang_them = 1;
            jsonState.phan_tram_tang_giam = 0;
            jsonState.start_date = today;
            jsonState.end_date = today;
            jsonState.a = today;
        }
        else {
            var editContents = this.props.editContents;
            jsonState.ten_chi_so = editContents.ten_chi_so;
            jsonState.tinh = editContents.loai_nhan_to.vi_tri.tinh;
            jsonState.quan_huyen = editContents.loai_nhan_to.vi_tri.quan_huyen;
            jsonState.ma_gia = editContents.ma_gia;
            jsonState.don_gia_co_ban = editContents.gia_tri_ap_dung;
            jsonState.khung_gio_ap_dung = editContents.loai_nhan_to.khung_gio;

            jsonState.loai_gia_tri_tang_them = 1;

            jsonState.phan_tram_tang_giam = editContents.ti_le_tinh_gia.tang === 1 ? editContents.ti_le_tinh_gia.gia_tri : editContents.ti_le_tinh_gia.gia_tri * -1;

            jsonState.start_date = editContents.start_date;
            jsonState.end_date = editContents.end_date;
        }
    }

    CreatePriceFactor() {
        var state = this.state;
        var phan_tram_tang_giam_iscreased = state.phan_tram_tang_giam >= 0 ? 1 : 0;

        var priceFactorContent = {
            ten_chi_so: state.ten_chi_so,
            ma_gia: state.ma_gia,
            don_gia_co_ban: state.don_gia_co_ban,
            loai_nhan_to: {
                khung_gio: state.khung_gio_ap_dung,
                vi_tri: {
                    tinh: state.tinh,
                    quan_huyen: state.quan_huyen
                }
            },
            gia_tri_ap_dung: state.don_gia_co_ban,
            ti_le_tinh_gia: {
                tang: phan_tram_tang_giam_iscreased,
                gia_tri: state.phan_tram_tang_giam
            },
            gia_tri_thuc: state.gia_tri_thuc,
            start_date: state.start_date,
            end_date: state.end_date
        }
      
        var $this = this;
        Request.post(UrlApi.PriceFactor)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send(priceFactorContent)
            .end(function (err, res) {
                $this.props.closeCreatorUpdaterPopup();
                $this.props.resetContentState();
            });
    }

    EditPriceFactor() {
        var state = this.state;
        var phan_tram_tang_giam_iscreased = state.phan_tram_tang_giam >= 0 ? 1 : 0;

        var priceFactorContent = {
            ten_chi_so: state.ten_chi_so,
            ma_gia: state.ma_gia,
            don_gia_co_ban: state.don_gia_co_ban,
            loai_nhan_to: {
                khung_gio: state.khung_gio_ap_dung,
                vi_tri: {
                    tinh: state.tinh,
                    quan_huyen: state.quan_huyen
                }
            },
            gia_tri_ap_dung: state.don_gia_co_ban,
            ti_le_tinh_gia: {
                tang: phan_tram_tang_giam_iscreased,
                gia_tri: state.phan_tram_tang_giam
            },
            gia_tri_thuc: state.gia_tri_thuc,
            start_date: state.start_date,
            end_date: state.end_date
        }

        var url = UrlApi.PriceFactor + "/" + this.props.editContents._id;
        var $this = this;
        Request.put(url)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send(priceFactorContent)
            .end(function (err, res) {
                $this.props.closeCreatorUpdaterPopup();
                $this.props.resetContentState();
            });
    }

    handleUpdateState(jsonState) {
        this.setState(jsonState);
        console.log(this.state);
    }

    handleSubmit() {
        if (this.props.modeAction === "create") {
            this.CreatePriceFactor();
        }
        else {
            this.EditPriceFactor();
        }
    }

    render() {
        var titleForm = this.props.modeAction === "create" ? "Tạo chỉ số ảnh hưởng giá" : "Chỉnh sửa chỉ số ảnh hưởng giá";
        return (
            <div className='popup'>
                <PriceFactorCreatorUpdaterForm
                    titleForm={titleForm}
                    stateValues={this.state}
                    handleSubmit={this.handleSubmit.bind(this)}
                    handleClosePopup={this.props.closeCreatorUpdaterPopup}
                    UpdateState={this.handleUpdateState.bind(this)}
                />
            </div>
        );
    }
}

// var priceFactorInputs = [
//     {
//         "description": "Nhập tên chỉ số",
//         "id": "ten_chi_so",
//         "type": "textbox"
//     },
//     {
//         "description": "Mã giá áp dụng",
//         "id": "ma_gia", //
//         "type": "combobox",
//         "values": ['VIPHOME1', 'VIPHOME2']// //get from ServicePrice, currently set default
//     },
//     {
//         "description": "Đơn giá cơ bản",
//         "id": "don_gia_co_ban",
//         "type": "textbox"
//     },
//     {
//         "description": "Khung giờ áp dụng",
//         "id": "khung_gio_ap_dung",
//         "type": "combobox",
//         "values": ["2h-4h", '4h-6h']
//     },
//     {
//         "description": "Áp dụng cho tỉnh",
//         "id": "tinh",
//         "type": "textbox"
//     },
//     {
//         "description": "Áp dụng cho quận huyện",
//         "id": "quan_huyen",
//         "type": "textbox"
//     },
//     {
//         "description": "Loại giá trị tăng thêm",
//         "id": "quan_huyen",
//         "type": "radio",
//         "values": ["Tăng theo %", "Giảm theo %"],
//         "keys": [1, 0]
//     },
//     {
//         "description": "Phần trăm tăng/giảm (%)",
//         "id": "phan_tram_tang_giam",
//         "type": "textbox"
//     },
//     {
//         "description": "Tổng tiền",
//         "id": "gia_tri_thuc",
//         "type": "textbox"
//     }
// ];

export default PriceFactorCreatorUpdater;

