import React, { Component } from 'react';
import Request from 'superagent';
import NumericInput from 'react-numeric-input';
import DatePicker from 'react-date-picker';
import UrlApi from '../share/UrlApi';
import './price_factor.css';

import { JsonDateToDate, DateToJsonDate } from '../share/Mapper';
import { RenderInput, RenderSelect, RenderRadioButon, RenderDate } from '../share/InputsRender';

class RenderProperties extends Component {
    constructor(props) {
        super(props);
    }
    TranserTimeLogToString(timeLogJson) {
        if (timeLogJson == null) {
            return "";
        }
        return `${timeLogJson.bat_dau.toString()}h-${timeLogJson.ket_thuc.toString()}h`;
    }

    render() {
        var timeLog = this.TranserTimeLogToString(this.props.stateValues.khung_gio_ap_dung);
        var ServicePriceIdsKeys = this.props.stateValues.ServicePriceIds === undefined ? [] : this.props.stateValues.ServicePriceIds.keys;
        var ServicePriceIdsValues = this.props.stateValues.ServicePriceIds === undefined ? [] : this.props.stateValues.ServicePriceIds.values;

        return (
            <div>
                <RenderInput
                    nameId={"ma_chi_so"}
                    title={"Mã chỉ số"}
                    type={"text"}
                    value={this.props.stateValues.ma_chi_so}
                    className={"pricefactor--input"}
                    OnChangeInput={this.props.OnChangeInput}
                />
                <div>
                    <label key={"ten_chi_so"} className="fullwidth">
                        {"Nhập tên chỉ số"}
                        <input type="text" id={"ten_chi_so"} key={"ten_chi_so"} name={"ten_chi_so"} value={this.props.stateValues.ten_chi_so} onChange={this.props.OnChangeInput} className="pricefactor--input" />
                    </label>
                </div>
                <RenderSelect
                    nameId={"ma_gia"}
                    title={"Mã giá áp dụng"}
                    keys={ServicePriceIdsKeys}
                    values={ServicePriceIdsValues}
                    selectedValue={this.props.stateValues.ma_gia}
                    OnChangeSelect={this.props.OnChangeSelect}
                    className={"pricefactor--select"}
                />
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
                                <RenderDate
                                    nameId={"start_date"}
                                    className={"input--date"}
                                    divClassName={"float-left"}
                                    value={this.props.stateValues.start_date}
                                    OnchangeDate={this.props.OnchangeStartDate}
                                />
                                <div className={"float-left"} style={{ paddingTop: "5px" }}>
                                    {" đến "}
                                </div>
                                <RenderDate
                                    nameId={"end_date"}
                                    className={"input--date"}
                                    divClassName={"float-left"}
                                    value={this.props.stateValues.end_date}
                                    OnchangeDate={this.props.OnchangeEndDate}
                                />
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

        this.OnchangeStartDate = this.OnchangeStartDate.bind(this);
        this.OnchangeEndDate = this.OnchangeEndDate.bind(this);
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

    OnchangeStartDate(date) {
        var jsonState = { "start_date": date }
        this.props.UpdateState(jsonState);
    }

    OnchangeEndDate(date) {
        var jsonState = { "end_date": date }
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
            <div className='popup_inner pricefactor_createform_size div_scroll_bar'>
                <div>
                    <a class="close popup-button-close pricefactor_margin_button-close" onClick={this.handleClosePopup}>×</a>
                    <h1>{this.props.titleForm}</h1>
                </div>
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

                        OnchangeStartDate={this.OnchangeStartDate}
                        OnchangeEndDate={this.OnchangeEndDate}
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
        this.state = this.SetInitState(jsonState);
        this.GetServicePriceIdInfos();
    }

    GetServicePriceIdInfos() {
        var $this = this;
        Request.get(UrlApi.GetServicePriceIdInfo)
            .then((res) => {
                var _ids = [];
                var keys = [];
                var values = [];

                res.body.map((servicePrice) => {
                    _ids.push(servicePrice._id);
                    keys.push(servicePrice.ma_gia);
                    values.push(servicePrice.ma_gia);
                });

                var jsonServicePriceIds = {
                    ServicePriceIds: {
                        _ids: _ids,
                        keys: keys,
                        values: values
                    },

                };
                if (this.props.modeAction === "create") {
                    jsonServicePriceIds.ma_gia = keys[0];
                }

                $this.setState(jsonServicePriceIds);
            });
    }

    SetInitState(jsonState) {
        var today = new Date();

        if (this.props.modeAction === "create") {
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
            if (editContents.loai_nhan_to.vi_tri !== undefined && editContents.loai_nhan_to.vi_tri !== null) {
                jsonState.tinh = editContents.loai_nhan_to.vi_tri.tinh;
                jsonState.quan_huyen = editContents.loai_nhan_to.vi_tri.quan_huyen;
            }
            jsonState.ma_chi_so = editContents.ma_chi_so;
            jsonState.ma_gia = editContents.ma_gia;
            jsonState.don_gia_co_ban = editContents.gia_tri_ap_dung;
            jsonState.khung_gio_ap_dung = editContents.loai_nhan_to.khung_gio;

            jsonState.loai_gia_tri_tang_them = 1;

            jsonState.phan_tram_tang_giam = editContents.ti_le_tinh_gia.tang === 1 ? editContents.ti_le_tinh_gia.gia_tri : editContents.ti_le_tinh_gia.gia_tri * -1;

            jsonState.start_date = JsonDateToDate(editContents.start_date);
            jsonState.end_date = JsonDateToDate(editContents.end_date);
        }

        return jsonState;
    }

    GetModelStateJson() {
        var state = this.state;
        var phan_tram_tang_giam_iscreased = state.phan_tram_tang_giam >= 0 ? 1 : 0;
        var startDateJson = DateToJsonDate(state.start_date);
        var endDateJson = DateToJsonDate(state.end_date);

        var priceFactorContent = {
            ma_chi_so: state.ma_chi_so,
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
            start_date: startDateJson,
            end_date: endDateJson
        }

        return priceFactorContent;
    }

    CreatePriceFactor() {
        var priceFactorContent = this.GetModelStateJson();

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
        var priceFactorContent = this.GetModelStateJson();

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

