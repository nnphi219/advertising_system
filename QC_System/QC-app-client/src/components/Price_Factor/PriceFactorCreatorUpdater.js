import React, { Component } from 'react';
import Request from 'superagent';
import NumericInput from 'react-numeric-input';
import DatePicker from 'react-date-picker';
import UrlApi from '../share/UrlApi';
import './price_factor.css';

import { JsonDateToDate, DateToJsonDate } from '../share/Mapper';
import { RenderInput, RenderSelect, RenderRadioButon, RenderDate } from '../share/InputsRender';
import { DescriptionDetail } from '../share/CommonComponent';
import { KHUNG_GIO } from '../share/constant';

const loai_gia_tri_tang_them_theo_phan_tram = 1;
const loai_gia_tri_tang_them_theo_gia_tri = 2;

function GetRealValue(stateValues) {
    if(stateValues.ServicePrices !== undefined){
        var indexOfServicePrice = stateValues.ServicePrices.list_ma_gia.indexOf(stateValues.ma_gia);
        var gia_co_ban = parseInt(stateValues.ServicePrices.list_gia_tri[indexOfServicePrice]);
       
        var loai_gia_tri_tang_them = stateValues.loai_gia_tri_tang_them;
        var phan_tram_tang_giam = parseFloat(stateValues.phan_tram_tang_giam) / 100;
    
        if (Math.abs(loai_gia_tri_tang_them) === 1) {
            return gia_co_ban + gia_co_ban * phan_tram_tang_giam;
        }
        else {
            return gia_co_ban + gia_co_ban * phan_tram_tang_giam;
        }
    }
    else{
        return 0;
    }
}

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
        var props = this.props;
        var stateValues = props.stateValues;
        var ma_chi_so_isReadOnly = this.props.modeAction === 'edit' ? 1 : 0;

        var realValue = GetRealValue(stateValues);

        var timeLog = this.TranserTimeLogToString(this.props.stateValues.khung_gio_ap_dung);
        var ServicePriceIdsKeys = this.props.stateValues.ServicePrices === undefined ? [] : this.props.stateValues.ServicePrices.list_ma_gia;
        var ServicePriceIdsValues = ServicePriceIdsKeys;

        var array_khung_gio = KHUNG_GIO.slice();

        var arrayServiceTitles = [];
        var don_gia_co_ban = 0;
        if (stateValues.ServicePrices !== undefined) {
            var indexOfServicePrice = stateValues.ServicePrices.list_ma_gia.indexOf(stateValues.ma_gia);
            don_gia_co_ban = stateValues.ServicePrices.list_gia_tri[indexOfServicePrice].toLocaleString();
            arrayServiceTitles.push("Cơ chế hiện thị: " + stateValues.ServicePrices.list_loai_co_che[indexOfServicePrice].value);
        }

        var loai_gia_tri_tang_them_element = [];
        var loai_gia_tri_tang_them = stateValues.loai_gia_tri_tang_them;
        loai_gia_tri_tang_them_element.push(
            <div>
                <div className="pricefactor-radio">
                    <input type="radio" value={loai_gia_tri_tang_them_theo_phan_tram} name={"loai_gia_tri_tang_them"}
                        defaultChecked={loai_gia_tri_tang_them === 1 ? true : false}
                    />
                    {"Tăng theo %"}
                </div>
                <div className="pricefactor-radio">
                    <input type="radio" value={loai_gia_tri_tang_them_theo_gia_tri} name={"loai_gia_tri_tang_them"}
                        defaultChecked={loai_gia_tri_tang_them === 2 ? true : false}
                    />
                    {"Tăng theo giá trị"}
                </div>
            </div>
        );
        loai_gia_tri_tang_them_element.push(
            <div>
                <div className="pricefactor-radio">
                    <input type="radio" value={-1 * loai_gia_tri_tang_them_theo_phan_tram} name={"loai_gia_tri_tang_them"}
                        defaultChecked={loai_gia_tri_tang_them === -1 ? true : false}
                    />
                    {"Giảm theo %"}
                </div>
                <div className="pricefactor-radio">
                    <input type="radio" value={-1 * loai_gia_tri_tang_them_theo_gia_tri} name={"loai_gia_tri_tang_them"}
                        defaultChecked={loai_gia_tri_tang_them === -2 ? true : false}
                    />
                    {"Giảm theo giá trị"}
                </div>
            </div>
        );

        return (
            <div>
                <RenderInput
                    nameId={"ma_chi_so"}
                    title={"Mã chỉ số"}
                    type={"text"}
                    value={this.props.stateValues.ma_chi_so}
                    errorTitle={stateValues.error_ma_chi_so}
                    className={"pricefactor--input"}
                    isReadOnly={ma_chi_so_isReadOnly}
                    OnChangeInput={this.props.OnChangeInput}
                />
                <RenderInput
                    nameId={"ten_chi_so"}
                    title={"Nhập tên chỉ số"}
                    type={"text"}
                    value={this.props.stateValues.ten_chi_so}
                    errorTitle={stateValues.error_ten_chi_so}
                    className={"pricefactor--input"}
                    OnChangeInput={this.props.OnChangeInput}
                />
                <RenderSelect
                    nameId={"ma_gia"}
                    title={"Mã giá áp dụng"}
                    keys={ServicePriceIdsKeys}
                    values={ServicePriceIdsValues}
                    selectedValue={this.props.stateValues.ma_gia}
                    OnChangeSelect={this.props.OnChangeSelect}
                    className={"pricefactor--select"}
                />
                <DescriptionDetail
                    arrayTitles={arrayServiceTitles}
                />
                <div>
                    <label className="fullwidth">
                        {"Đơn giá cơ bản"}
                    </label>
                    (VND)
                    <input type="number" key={"don_gia_co_ban"} name={"don_gia_co_ban"} value={don_gia_co_ban} onChange={this.props.OnchangeBasicPrice} readOnly={true} className="pricefactor--input" style={{ width: "40%" }} />
                </div>
                <RenderSelect
                    nameId={"khung_gio_ap_dung"}
                    title={"Khung giờ áp dụng"}
                    keys={array_khung_gio}
                    values={array_khung_gio}
                    selectedValue={timeLog}
                    OnChangeSelect={this.props.OnChangeSelect}
                    className={"pricefactor--select"}
                />
                <div>
                    <div className="">
                        <label className="fullwidth">
                            <div>
                                <div className={"float-left"} style={{ paddingTop: "5px" }}>
                                    {"Từ ngày"}
                                </div>
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
                    {loai_gia_tri_tang_them_element}
                </div>
                <RenderInput
                    nameId={"phan_tram_tang_giam"}
                    title={"Phần trăm tăng/giảm (%)"}
                    errorTitle={stateValues.error_phan_tram_tang_giam}
                    type={"number"}
                    value={this.props.stateValues.phan_tram_tang_giam}
                    styleCss={{ width: "30%" }}
                    className={"pricefactor--input"}
                    OnChangeInput={this.props.OnChangeInput}
                />
                <div>
                    <label key={"gia_tri_thuc"} className="fullwidth">
                        {"Giá trị thực"}
                        <input type="text" id={"gia_tri_thuc"} value={realValue} key={"gia_tri_thuc"} name={"gia_tri_thuc"} onChange={this.props.OnChangeInput} readOnly className="pricefactor--input" />
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

        var jsonState = {
            [name]: value
        };

        if (name === "ma_gia") {
            var stateValues = this.props.stateValues;
            if (stateValues.ServicePrices !== undefined) {
                var indexOfServicePrice = stateValues.ServicePrices.list_ma_gia.indexOf(value);
                jsonState.don_gia_co_ban = stateValues.ServicePrices.list_gia_tri[indexOfServicePrice];
            }
        }

        this.props.UpdateState(jsonState);
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
                    <a class="close popup-button-close pricefactor_margin_button-close" onClick={this.props.handleClosePopup}>×</a>
                    <h1>{this.props.titleForm}</h1>
                </div>
                <div className="pricefactor_information">
                    <h2>Chỉ số ảnh hưởng giá</h2>
                    <RenderProperties
                        handleSubmit={this.props.handleSubmit}
                        handleClosePopup={this.props.handleClosePopup}
                        stateValues={this.props.stateValues}
                        modeAction={this.props.modeAction}

                        OnChangeInput={this.OnChangeInput}
                        OnChangeSelect={this.OnChangeSelect}
                        OnChangeRadioButton={this.OnChangeRadioButton}

                        OnchangeBasicPrice={this.OnchangeBasicPrice}

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
        jsonState = this.SetInitState(jsonState);
        this.state = this.SetInitError(jsonState);

        this.GetServicePriceIdInfos();
    }

    GetServicePriceIdInfos() {
        var $this = this;
        Request.get(UrlApi.GetServicePriceIdInfo)
            .set('x-auth', localStorage.getItem('x-auth'))
            .then((res) => {
                var _ids = [];
                var list_ma_gia = [];
                var list_loai_co_che = [];
                var list_gia_tri = [];

                res.body.map((servicePrice) => {
                    _ids.push(servicePrice._id);
                    list_ma_gia.push(servicePrice.ma_gia);
                    list_loai_co_che.push(servicePrice.loai_co_che);
                    list_gia_tri.push(servicePrice.gia_tri);
                });

                var jsonServicePrices = {
                    ServicePrices: {
                        _ids,
                        list_ma_gia,
                        list_loai_co_che,
                        list_gia_tri
                    },

                };
                if (this.props.modeAction === "create") {
                    jsonServicePrices.ma_gia = list_ma_gia[0];
                }

                $this.setState(jsonServicePrices);
            });
    }

    SetInitState(jsonState) {
        var today = new Date();

        if (this.props.modeAction === "create") {
            jsonState.ma_chi_so = '';
            jsonState.ten_chi_so = '';
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

            var ti_le_tang = (editContents.ti_le_tinh_gia.tang === 1) ? 1 : -1;
            jsonState.loai_gia_tri_tang_them = editContents.ti_le_tinh_gia.loai_ti_le * ti_le_tang;

            jsonState.phan_tram_tang_giam = editContents.ti_le_tinh_gia.gia_tri;

            jsonState.start_date = JsonDateToDate(editContents.start_date);
            jsonState.end_date = JsonDateToDate(editContents.end_date);
        }
        jsonState.gia_tri_thuc = 0;

        return jsonState;
    }

    SetInitError(jsonState) {
        jsonState.error_ma_chi_so = '';
        jsonState.error_ten_chi_so = '';
        jsonState.error_phan_tram_tang_giam = '';

        return jsonState;
    }

    GetModelStateJson() {
        var state = this.state;
        var isValid = this.CheckValid(state);

        if (isValid) {
            var ti_le_tinh_gia__loai_ti_le = (Math.abs(state.loai_gia_tri_tang_them) === 1) ? 1 : 2;
            var phan_tram_tang_giam_iscreased = state.loai_gia_tri_tang_them >= 0 ? 1 : 0;
            var startDateJson = DateToJsonDate(state.start_date);
            var endDateJson = DateToJsonDate(state.end_date);

            var priceFactorContent = {
                ma_chi_so: state.ma_chi_so,
                ten_chi_so: state.ten_chi_so,
                ma_gia: state.ma_gia,
                loai_nhan_to: {
                    khung_gio: state.khung_gio_ap_dung,
                    vi_tri: {
                        tinh: state.tinh,
                        quan_huyen: state.quan_huyen
                    }
                },
                gia_tri_ap_dung: state.don_gia_co_ban,
                ti_le_tinh_gia: {
                    loai_ti_le: ti_le_tinh_gia__loai_ti_le,
                    tang: phan_tram_tang_giam_iscreased,
                    gia_tri: state.phan_tram_tang_giam
                },

                gia_tri_thuc: GetRealValue(state),
                start_date: startDateJson,
                end_date: endDateJson
            };

            if (this.props.modeAction === 'edit') {
                return priceFactorContent;
            }
            else {
                return Request.get(UrlApi.ReadA_PriceFactor + '/' + state.ma_chi_so)
                    .set('x-auth', localStorage.getItem('x-auth'))
                    .then((res) => {
                        if (res.body) {
                            isValid = false;
                            this.setState({
                                error_ma_chi_so: "Mã này đã tồn tại!"
                            });
                            return 'error';
                        }
                        else {
                            return priceFactorContent;
                        }

                    }).catch((e) => {
                        return 'error';
                    });
            }
        }
        else {
            if (this.props.modeAction === 'edit') {
                return "error";
            }
            else {
                return Promise.reject();
            }
        }
    }

    CheckValid(state) {
        var isValid = true;
        var jsonError = {};

        if (state.ma_chi_so === "" || state.ma_chi_so.trim().includes(' ')) {
            jsonError.error_ma_chi_so = "Mã không hợp lệ";
            isValid = false;
        }

        if (state.ten_chi_so === "") {
            jsonError.error_ten_chi_so = "Tên chỉ số được yêu cầu";
            isValid = false;
        }

        if (parseInt(state.phan_tram_tang_giam) <= 0) {
            jsonError.error_phan_tram_tang_giam = "Yêu cầu lớn hơn 0";
            isValid = false;
        }

        if (!isValid) {
            this.setState(jsonError);
        }

        return isValid;
    }

    CreatePriceFactor() {
        this.GetModelStateJson().then((priceFactorContent) => {
            if (priceFactorContent === 'error') {
                return;
            }

            var $this = this;
            Request.post(UrlApi.PriceFactor)
                .set('x-auth', localStorage.getItem('x-auth'))
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .send(priceFactorContent)
                .end(function (err, res) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        $this.props.closeCreatorUpdaterPopup();
                        $this.props.resetContentState();
                    }
                });
        }).catch((e) => {

        });
    }

    EditPriceFactor() {
        var priceFactorContent = this.GetModelStateJson();

        var url = UrlApi.PriceFactor + "/" + this.props.editContents._id;
        var $this = this;
        Request.put(url)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .set('x-auth', localStorage.getItem('x-auth'))
            .send(priceFactorContent)
            .end(function (err, res) {
                $this.props.closeCreatorUpdaterPopup();
                $this.props.resetContentState();
            });
    }

    handleUpdateState(jsonState) {
        jsonState = this.SetInitError(jsonState);
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
                    modeAction={this.props.modeAction}
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

