import React, { Component } from 'react';
import Request from 'superagent';
import UrlApi from '../share/UrlApi';
import './price_factor.css';

import { JsonDateToDate, DateToJsonDate, TransferTimeLogStringToJson, TransferTimeLogStringToArrayElement, TransferTimeLogJsonToString } from '../share/Mapper';
import { RenderInput, RenderSelect, RenderDate } from '../share/InputsRender';
import { DescriptionDetail } from '../share/CommonComponent';
import { KHUNG_GIO } from '../share/constant';
import { Date2BiggerDate1 } from '../share/DateFormat';
import { ArrayRemoveItem } from '../share/CommonFunction';

const loai_gia_tri_tang_them_theo_phan_tram = 1;
const loai_gia_tri_tang_them_theo_gia_tri = 2;

function GetRealValue(stateValues) {
    if (stateValues.ServicePrices !== undefined) {
        var indexOfServicePrice = stateValues.ServicePrices.list_ma_gia.indexOf(stateValues.ma_gia);
        var gia_co_ban = parseInt(stateValues.ServicePrices.list_gia_tri[indexOfServicePrice], 10);

        var loai_gia_tri_tang_them = stateValues.loai_gia_tri_tang_them;
        var phan_tram_tang_giam = parseFloat(stateValues.phan_tram_tang_giam) / 100;

        if (Math.abs(loai_gia_tri_tang_them) === 1) {
            return gia_co_ban + gia_co_ban * phan_tram_tang_giam;
        }
        else {
            return gia_co_ban + gia_co_ban * phan_tram_tang_giam;
        }
    }
    else {
        return 0;
    }
}

function GetRemainingTimeSlots(array_khung_gio, selectedTimeSlots) {
    return array_khung_gio.filter((timeSlot) =>
        selectedTimeSlots.indexOf(timeSlot) > -1 ? false : true
    );
}

function TransferArrayTimeSlotJsonToArrayString(jsonArrayTimeSlots) {
    var arrayTimeSlotStrings = [];
    jsonArrayTimeSlots.forEach(jsonTimeSlot => {
        
        arrayTimeSlotStrings.push(TransferTimeLogJsonToString(jsonTimeSlot));
    });

    return arrayTimeSlotStrings;
}

function CheckSimilarArray(array1, array2) {
    console.log(array1);
    console.log(array2);
    var a = array1.slice().sort();
    var b = array2.slice().sort();
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length != b.length) return false;

    // If you don't care about the order of the elements inside
    // the array, you should sort both arrays here.

    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

class RenderProperties extends Component {
    TranserTimeSlotToString(timeSlotJson) {
        if (timeSlotJson == null) {
            return "";
        }
        return `${timeSlotJson.bat_dau.toString()}h-${timeSlotJson.ket_thuc.toString()}h`;
    }

    render() {
        var props = this.props;
        var stateValues = props.stateValues;
        var ma_chi_so_isReadOnly = this.props.modeAction === 'edit' ? 1 : 0;

        var realValue = GetRealValue(stateValues);

        var selectedTimeSlots = stateValues.selectedTimeSlots;

        var timeSlotTokenFields = selectedTimeSlots.map((timeSlot) => {
            return (
                <div key={timeSlot} className="token">
                    <span className="token-label" style={{ maxWidth: "769px" }}>{timeSlot}</span>
                    <a name={timeSlot} className="close" tabIndex="-1" onClick={props.OnRemoveTokenField}>×</a>
                </div>
            );
        });

        var remainingTimeSlots = stateValues.remainingTimeSlots.slice();

        var ServicePriceIdsKeys = this.props.stateValues.ServicePrices === undefined ? [] : this.props.stateValues.ServicePrices.list_ma_gia;
        var ServicePriceIdsValues = ServicePriceIdsKeys;

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
            <div key={1}>
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
            <div key={2}>
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
                <div className="div_property_margin_bottom">
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
                </div>
                <div className="div_property_margin_bottom">
                    <label className="fullwidth">
                        {"Đơn giá cơ bản"}
                    </label>
                    (VND)
                    <input type="number" key={"don_gia_co_ban"} name={"don_gia_co_ban"} value={don_gia_co_ban} onChange={this.props.OnchangeBasicPrice} readOnly={true} className="pricefactor--input" style={{ width: "40%" }} />
                </div>
                <div key="khung_gio_ap_dung" className="div_property_margin_bottom">
                    <div>
                        <label className="fullwidth">
                            {"Khung giờ áp dụng"}
                        </label>
                    </div>
                    <div>
                        <div className="float-left timeslot_margin_right">
                            <RenderSelect
                                nameId={"time_slot"}
                                keys={remainingTimeSlots}
                                values={remainingTimeSlots}
                                selectedValue={stateValues.time_slot}
                                OnChangeSelect={this.props.OnChangeSelect}
                                className={"pricefactor--select"}
                            />
                        </div>
                        {
                            stateValues.allowAddTimeSlot ?
                                <div className="float-left timeslot_margin_right">
                                    <button type="button" className="btn timeslot_button" onClick={props.OnAddTokenField}>Thêm</button>
                                </div>
                                : null
                        }
                        <div className="float-left pricefactor_tokenfield tokenfield div_property_margin_bottom">
                            {timeSlotTokenFields}
                        </div>
                    </div>
                </div>
                <div key="thoi_gian_ap_dung" className="div_property_margin_bottom">
                    <div>
                        <label className="fullwidth">
                            {"Thời gian áp dụng"}
                            <p style={{ color: "red", marginTop: "3px" }}>{stateValues.error_date}</p>
                        </label>
                    </div>
                    <div className="">
                        <label className="fullwidth">
                            <div>
                                <div className={"float-left"} style={{ paddingTop: "5px", marginRight: "5px" }}>
                                    {"Từ ngày"}
                                </div>
                                <RenderDate
                                    nameId={"start_date"}
                                    className={"input--date"}
                                    divClassName={"float-left"}
                                    value={this.props.stateValues.start_date}
                                    OnchangeDate={this.props.OnchangeStartDate}
                                />
                                <div className={"float-left"} style={{ paddingTop: "5px", marginLeft: "5px", marginRight: "5px" }}>
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
                    <div className="float-left div_property_margin_bottom">
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
        this.OnAddTokenField = this.OnAddTokenField.bind(this);
        this.OnRemoveTokenField = this.OnRemoveTokenField.bind(this);
    }

    OnchangeBasicPrice(number) {
        var jsonState = { "don_gia_co_ban": 0 };
        if (Number.isInteger(number)) {
            jsonState = { "don_gia_co_ban": number };

        }
        this.props.UpdateState(jsonState);
    }

    OnchangeStartDate(start_date) {
        let end_date = this.props.stateValues.end_date;
        var jsonState = { error_date: "" };

        if (Date2BiggerDate1(start_date, end_date)) {
            jsonState.start_date = start_date;
        }
        else {
            jsonState.error_date = "Ngày bắt đầu phải bé hơn ngày kết thúc";
        }

        this.props.UpdateState(jsonState);
    }

    OnchangeEndDate(end_date) {
        let start_date = this.props.stateValues.start_date;
        var jsonState = { error_date: "" };

        if (Date2BiggerDate1(start_date, end_date)) {
            jsonState.end_date = end_date;
        }
        else {
            jsonState.error_date = "Ngày bắt đầu phải bé hơn ngày kết thúc";
        }

        this.props.UpdateState(jsonState);
    }

    OnChangeInput(e) {
        this.props.UpdateState({ [e.target.name]: e.target.value });
    }

    OnChangeSelect(e) {
        var name = e.target.name;
        var value = e.target.value;

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

    OnAddTokenField(e) {
        var stateValues = this.props.stateValues;
        var selectedCurrentTimeSlot = stateValues.time_slot;

        if (selectedCurrentTimeSlot === null) {
            e.preventDefault();
            return;
        }

        var selectedTimeSlots = stateValues.selectedTimeSlots.slice();
        var array_khung_gio = stateValues.array_khung_gio.slice();

        var jsonState = {};
        if (selectedCurrentTimeSlot === "all") {
            selectedTimeSlots = ["all"];
            jsonState.allowAddTimeSlot = false;
        }
        else {
            selectedTimeSlots.push(selectedCurrentTimeSlot);
        }

        var remainingTimeSlots = GetRemainingTimeSlots(array_khung_gio, selectedTimeSlots);

        jsonState.selectedTimeSlots = selectedTimeSlots;
        jsonState.remainingTimeSlots = remainingTimeSlots;
        jsonState.time_slot = remainingTimeSlots.length > 0 ? remainingTimeSlots[0] : null;

        this.props.UpdateState(jsonState);
    }

    OnRemoveTokenField(e) {
        var stateValues = this.props.stateValues;
        var removedTimeSlot = e.target.name;
        var selectedTimeSlots = stateValues.selectedTimeSlots.slice();
        var array_khung_gio = stateValues.array_khung_gio.slice();
        var jsonState = {};

        if (removedTimeSlot === "all") {
            jsonState.allowAddTimeSlot = true;
        }

        ArrayRemoveItem(selectedTimeSlots, removedTimeSlot);
        var remainingTimeSlots = GetRemainingTimeSlots(array_khung_gio, selectedTimeSlots);

        jsonState.selectedTimeSlots = selectedTimeSlots;
        jsonState.remainingTimeSlots = remainingTimeSlots;
        jsonState.time_slot = remainingTimeSlots.length > 0 ? remainingTimeSlots[0] : null;

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
                    <a className="close popup-button-close pricefactor_margin_button-close" onClick={this.props.handleClosePopup}>×</a>
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
                        OnAddTokenField={this.OnAddTokenField}
                        OnRemoveTokenField={this.OnRemoveTokenField}
                    />
                </div>

            </div>
        );
    }
}

class PriceFactorCreatorUpdater extends Component {
    constructor(props) {
        super(props);

        var jsonState = {
            selectedTimeSlots: [],
            allowAddTimeSlot: true,
            error_date: ""
        };
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

                res.body.forEach((servicePrice) => {
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
        var array_khung_gio = KHUNG_GIO.slice();

        jsonState.array_khung_gio = array_khung_gio;
        if (this.props.modeAction === "create") {
            jsonState.ma_chi_so = '';
            jsonState.ten_chi_so = '';
            jsonState.don_gia_co_ban = 0;

            jsonState.remainingTimeSlots = array_khung_gio;
            jsonState.time_slot = array_khung_gio[0];

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

            jsonState.remainingTimeSlots = array_khung_gio;

            var currentSelectedTimeSlots = TransferArrayTimeSlotJsonToArrayString(editContents.loai_nhan_to.khung_gio);
            var currentSelectedTimeSlotsWithAll = currentSelectedTimeSlots.slice();
            currentSelectedTimeSlotsWithAll.push("all");
         
            if (CheckSimilarArray(currentSelectedTimeSlotsWithAll, jsonState.remainingTimeSlots)) {
                jsonState.selectedTimeSlots = ["all"];
                jsonState.allowAddTimeSlot = false;
            }
            else {
                jsonState.selectedTimeSlots = currentSelectedTimeSlots;
            }

            jsonState.remainingTimeSlots = GetRemainingTimeSlots(array_khung_gio, jsonState.selectedTimeSlots);
            jsonState.time_slot = jsonState.remainingTimeSlots[0];

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

            var khung_gio = {};
            var remainingTimeSlots = state.remainingTimeSlots;
            var selectedTimeSlots = state.selectedTimeSlots;

            if (selectedTimeSlots.length === 1 && selectedTimeSlots[0] === "all") {
                selectedTimeSlots = remainingTimeSlots;
            }
            var array_bat_dau = [];
            var array_ket_thuc = [];
            selectedTimeSlots.forEach(timeSlot => {
                TransferTimeLogStringToArrayElement(timeSlot, array_bat_dau, array_ket_thuc)
            });
            khung_gio.bat_dau = array_bat_dau;
            khung_gio.ket_thuc = array_ket_thuc;

            var priceFactorContent = {
                ma_chi_so: state.ma_chi_so,
                ten_chi_so: state.ten_chi_so,
                ma_gia: state.ma_gia,
                loai_nhan_to: {
                    khung_gio: khung_gio,
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

        if (parseInt(state.phan_tram_tang_giam, 10) <= 0) {
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

