import React, { Component } from 'react';
import Request from 'superagent';
import DatePicker from 'react-date-picker';
import UrlApi, { UrlRedirect } from '../share/UrlApi';
import './service_price.css';
import { JsonDateToDate, DateToJsonDate, TransferSelectInputKeyToValue } from '../share/Mapper';
import { RenderInput, RenderSelect, RenderRadioButon } from '../share/InputsRender';
import { Date2GreaterThanOrEqualDate1 } from '../share/DateFormat';
import { DescriptionDetail } from '../share/CommonComponent';

class RenderLeftForm extends Component {
    render() {
        var props = this.props;
        var stateValues = props.stateValues;
        var ma_dich_vu_ap_dung = this.props.stateValues.ma_dich_vu_ap_dung === undefined ? "" : this.props.stateValues.ma_dich_vu_ap_dung;
        var AdsAreaIdsKeys = this.props.stateValues.AdsAreaIds === undefined ? [] : this.props.stateValues.AdsAreaIds.keys;
        var AdsAreaIdsValues = this.props.stateValues.AdsAreaIds === undefined ? [] : this.props.stateValues.AdsAreaIds.values;

        var ma_gia_isReadOnly = this.props.modeAction === 'edit' ? 1 : 0;

        var arrayAdsAreaTitles = [];
        if (stateValues.AdsAreaIds !== undefined) {
            var indexOfAdsArea = stateValues.AdsAreaIds.keys.indexOf(stateValues.ma_dich_vu_ap_dung);
            arrayAdsAreaTitles.push("Loại quảng cáo: " + stateValues.AdsAreaIds.list_loai_quang_cao[indexOfAdsArea]);
            arrayAdsAreaTitles.push("Trang áp dụng: " + stateValues.AdsAreaIds.list_loai_trang_ap_dung[indexOfAdsArea]);
        }

        return (
            <div key="left" className="serviceprice_information_left">
                <h2>Thông tin giá dịch vụ</h2>
                <div>
                    <RenderInput
                        nameId={"ma_gia"}
                        title={"Mã giá"}
                        value={this.props.stateValues.ma_gia}
                        errorTitle={props.stateValues.error_ma_gia}
                        type={"text"}
                        className={"serviceprice--input"}
                        isReadOnly={ma_gia_isReadOnly}
                        OnChangeInput={this.props.OnChangeInput}
                    />
                    <RenderSelect
                        nameId={"ma_dich_vu_ap_dung"}
                        title={"Dịch vụ quảng cáo"}
                        keys={AdsAreaIdsKeys}
                        values={AdsAreaIdsValues}
                        selectedValue={ma_dich_vu_ap_dung}
                        OnChangeSelect={this.props.OnChangeSelect}
                        className={"serviceprice--select"}
                    />
                    <DescriptionDetail
                        arrayTitles={arrayAdsAreaTitles}
                    />

                    <div>
                        <div className="">
                            <label className="fullwidth">
                                {"Thời điểm bắt đầu giá"}
                                <div>
                                    <DatePicker name="start_date" value={this.props.stateValues.start_date} onChange={this.props.OnchangeStartDate} className="input-date" />
                                </div>
                                <p style={{ color: "red", marginTop: "3px" }}>{stateValues.error_start_date}</p>
                            </label>
                        </div>
                    </div>
                    <RenderRadioButon
                        nameId={"co_thoi_diem_ket_thuc"}
                        title={"Có thời điểm kết thúc"}
                        keys={servicePriceInputs.co_thoi_diem_ket_thuc.keys}
                        values={servicePriceInputs.co_thoi_diem_ket_thuc.values}
                        selectedValue={this.props.stateValues.co_thoi_diem_ket_thuc}
                        OnChangeRadioButton={this.props.OnChangeRadioButton}
                        className={"input-radio"}
                    />
                    <div>
                        <div className="">
                            <label className="fullwidth">
                                {"Thời điểm kết thúc"}
                                <div>
                                    <DatePicker name="end_date" value={this.props.stateValues.end_date} onChange={this.props.OnchangeEndDate} className="input-date" />
                                </div>
                                <p style={{ color: "red", marginTop: "3px" }}>{stateValues.error_end_date}</p>
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
        var loai_co_che = {};
        loai_co_che.selectedValue = this.props.stateValues.loai_co_che === undefined ? "" : this.props.stateValues.loai_co_che;
        loai_co_che.keys = servicePriceInputs.loai_co_che.keys;
        loai_co_che.values = servicePriceInputs.loai_co_che.values;

        var props = this.props;
        return (
            <div key="right" className="serviceprice_information_right">
                <h2>Thông số giá</h2>
                <div>
                    <RenderSelect
                        nameId={"loai_co_che"}
                        title={"Cơ chế hiển thị"}
                        keys={loai_co_che.keys}
                        values={loai_co_che.values}
                        selectedValue={loai_co_che.selectedValue}
                        OnChangeSelect={this.props.OnChangeSelect}
                        className={"serviceprice--select"}
                    />
                    <RenderRadioButon
                        nameId={"loai_gia"}
                        title={"Mô hình giá"}
                        keys={servicePriceInputs.loai_gia.keys}
                        values={servicePriceInputs.loai_gia.values}
                        selectedValue={this.props.stateValues.loai_gia}
                        OnChangeRadioButton={this.props.OnChangeRadioButton}
                        className={"input-radio"}
                    />
                    <RenderInput
                        nameId={"gia_tri"}
                        title={"Giá (VND)"}
                        value={this.props.stateValues.gia_tri}
                        errorTitle={props.stateValues.error_gia_tri}
                        type={"number"}
                        className={"serviceprice--input"}
                        OnChangeInput={this.props.OnChangeInput}
                    />
                    <RenderInput
                        nameId={"so_ngay_ap_dung"}
                        title={"Số ngày áp dụng"}
                        value={this.props.stateValues.so_ngay_ap_dung}
                        errorTitle={props.stateValues.error_so_ngay_ap_dung}
                        type={"number"}
                        className={"serviceprice--input"}
                        OnChangeInput={this.props.OnChangeInput}
                    />
                    <RenderInput
                        nameId={"so_click_tren_view"}
                        title={"Số lượng click / view tối đa"}
                        value={this.props.stateValues.so_click_tren_view}
                        errorTitle={props.stateValues.error_so_click_tren_view}
                        type={"number"}
                        className={"serviceprice--input"}
                        OnChangeInput={this.props.OnChangeInput}
                    />
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
                    modeAction={this.props.modeAction}
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

    OnchangeStartDate(start_date) {
        let end_date = this.props.stateValues.end_date;
        var jsonState = {
            error_start_date: "",
            error_end_date: ""
        };

        if (Date2GreaterThanOrEqualDate1(start_date, end_date)) {
            jsonState.start_date = start_date;
        }
        else {
            jsonState.error_start_date = "Ngày bắt đầu phải bé hơn ngày kết thúc";
        }

        this.props.UpdateState(jsonState);
    }

    OnchangeEndDate(end_date) {
        let start_date = this.props.stateValues.start_date;
        var jsonState = {
            error_start_date: "",
            error_end_date: ""
        };

        if (Date2GreaterThanOrEqualDate1(start_date, end_date)) {
            jsonState.end_date = end_date;
        }
        else {
            jsonState.error_end_date = "Ngày bắt đầu phải bé hơn ngày kết thúc";
        }

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

    onCancel(){
        window.location.href = UrlRedirect.ServicePrices;
    }

    render() {
        return (
            <div>
                <div>
                    <a className="close popup-button-close serviceprice_margin_button-close" onClick={this.props.handleClosePopup}>×</a>
                    <h1>{this.props.titleForm}</h1>
                </div>
                <RenderProperties
                    OnChangeInput={this.OnChangeInput}
                    OnChangeSelect={this.OnChangeSelect}
                    OnChangeRadioButton={this.OnChangeRadioButton}
                    OnchangeStartDate={this.OnchangeStartDate}
                    OnchangeEndDate={this.OnchangeEndDate}

                    stateValues={this.props.stateValues}
                    modeAction={this.props.modeAction}
                />
                <div className="submit" style={{textAlign: "center"}}>
                    <button className="btn btn-primary" onClick={this.props.handleSubmit}>Lưu</button>
                    <button className="btn btn-primary" onClick={this.onCancel}>Hủy</button>
                </div>
            </div>
        );
    }
}

class ServicePriceCreatorUpdater extends Component {
    constructor(props) {
        super(props);

        var jsonState = {
            error_start_date: "",
            error_end_date: ""
        };
        jsonState = this.SetInitState(jsonState);
        this.state = this.SetInitError(jsonState);
        this.GetAdsAreasByUser();
    }

    GetAdsAreasByUser() {
        var $this = this;
        Request.get(UrlApi.GetAdsAreaInfo)
            .set('x-auth', localStorage.getItem('x-auth'))
            .then((res) => {
                var _ids = [];
                var keys = [];
                var values = [];
                var list_loai_trang_ap_dung = [];
                var list_loai_quang_cao = [];

                res.body.forEach((adsArea) => {
                    _ids.push(adsArea._id);
                    keys.push(adsArea.ma_dich_vu);
                    values.push(adsArea.ten_hien_thi);
                    list_loai_trang_ap_dung.push(adsArea.loai_trang_ap_dung.value);
                    list_loai_quang_cao.push(adsArea.loai_quang_cao.value);
                });

                var jsonAdsAreaIds = {
                    AdsAreaIds: {
                        _ids: _ids,
                        keys: keys,
                        values: values,
                        list_loai_trang_ap_dung: list_loai_trang_ap_dung,
                        list_loai_quang_cao: list_loai_quang_cao
                    },

                };
                if (this.props.modeAction === "create") {
                    jsonAdsAreaIds.ma_dich_vu_ap_dung = keys[0];
                }

                $this.setState(jsonAdsAreaIds);
            });
    }

    SetInitState(jsonState) {
        if (this.props.modeAction === "create") {
            jsonState.ma_gia = "";
            jsonState.loai_co_che = "doc_quyen";
            jsonState.loai_gia = "CPD";
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
            jsonState.loai_co_che = editContents.loai_co_che.key;
            jsonState.loai_gia = editContents.loai_gia;
            jsonState.gia_tri = editContents.gia_tri;
            jsonState.so_ngay_ap_dung = editContents.so_luong_don_vi_ap_dung.so_ngay_ap_dung;
            jsonState.so_click_tren_view = editContents.so_luong_don_vi_ap_dung.so_click_tren_view;
            jsonState.start_date = JsonDateToDate(editContents.start_date);

            if (editContents.end_date === undefined || editContents.end_date === "") {
                jsonState.co_thoi_diem_ket_thuc = 0;
                jsonState.end_date = new Date();
            }
            else {
                jsonState.co_thoi_diem_ket_thuc = 1;
                jsonState.end_date = JsonDateToDate(editContents.end_date);
            }
        }
        return jsonState;
    }

    handleUpdateState(jsonState) {
        jsonState = this.SetInitError(jsonState);
        this.setState(jsonState);
    }

    SetInitError(jsonState) {
        jsonState.error_ma_gia = '';
        jsonState.error_gia_tri = '';
        jsonState.error_so_ngay_ap_dung = '';
        jsonState.error_so_click_tren_view = '';

        return jsonState;
    }

    CheckValid(state) {
        var isValid = true;
        var jsonError = {};

        if (state.ma_gia === "" || state.ma_gia.trim().includes(' ')) {
            jsonError.error_ma_gia = "Mã giá không hợp lệ";
            isValid = false;
        }

        if (parseInt(state.gia_tri, 10) <= 0) {
            jsonError.error_gia_tri = "Yêu cầu lớn hơn 0";
            isValid = false;
        }

        if (parseInt(state.so_ngay_ap_dung, 10) <= 0) {
            jsonError.error_so_ngay_ap_dung = "Yêu cầu lớn hơn 0";
            isValid = false;
        }

        if (parseInt(state.so_click_tren_view, 10) <= 0) {
            jsonError.error_so_click_tren_view = "Yêu cầu lớn hơn 0";
            isValid = false;
        }

        if (!isValid) {
            this.setState(jsonError);
        }

        return isValid;
    }

    GetModelStateJson() {
        var state = this.state;
        var isValid = this.CheckValid(state);

        if (isValid) {
            var startDateJson = DateToJsonDate(state.start_date);
            var endDateJson = parseInt(state.co_thoi_diem_ket_thuc, 10) === 1 ? DateToJsonDate(state.end_date) : null;

            var servicePriceContent = {
                ma_dich_vu_ap_dung: state.ma_dich_vu_ap_dung,
                ma_gia: state.ma_gia,
                start_date: startDateJson,
                end_date: endDateJson,
                loai_gia: state.loai_gia,
                gia_tri: state.gia_tri,
                so_luong_don_vi_ap_dung: {
                    so_ngay_ap_dung: state.so_ngay_ap_dung
                }
            };
            servicePriceContent.loai_co_che = {
                key: state.loai_co_che,
                value: TransferSelectInputKeyToValue(state.loai_co_che, servicePriceInputs.loai_co_che.keys, servicePriceInputs.loai_co_che.values)
            }

            var so_click_tren_view = parseInt(state.so_click_tren_view, 10);

            if (so_click_tren_view > 0) {
                servicePriceContent.so_luong_don_vi_ap_dung.so_click_tren_view = so_click_tren_view
            }

            if (this.props.modeAction === 'edit') {
                return servicePriceContent;
            }
            else {
                return Request.get(UrlApi.ReadA_ServicePrice + '/' + state.ma_gia)
                    .set('x-auth', localStorage.getItem('x-auth'))
                    .then((res) => {
                        if (res.body) {
                            isValid = false;
                            this.setState({
                                error_ma_gia: "Mã giá đã tồn tại!"
                            });
                            return 'error';
                        }
                        else {
                            return servicePriceContent;
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

    CreateServicePrice() {
        this.GetModelStateJson().then((servicePriceContent) => {
            if (servicePriceContent === 'error') {
                return;
            }

            Request.post(UrlApi.ServicePrice)
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .set('x-auth', localStorage.getItem('x-auth'))
                .send(servicePriceContent)
                .end(function (err, res) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        // window.location.href = UrlRedirect.ServicePrices;
                    }
                });
        }).catch((e) => {
            // this.setState({
            //     error_ma_gia: "Mã này đã tồn tại!"
            // });
        });
    }

    EditServicePrice() {
        var servicePriceContent = this.GetModelStateJson();

        var url = UrlApi.ServicePrice + "/" + this.props.editContents._id;

        Request.put(url)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .set('x-auth', localStorage.getItem('x-auth'))
            .send(servicePriceContent)
            .end(function (err, res) {
                window.location.href = UrlRedirect.ServicePrices;
            });
    }

    handleSubmit() {

        if (this.props.modeAction === "create") {
            this.CreateServicePrice();
        }
        else {
            this.EditServicePrice();
        }
    }

    render() {
        var titleForm = this.props.modeAction === "create" ? "Tạo giá dịch vụ" : "Chỉnh sửa giá dịch vụ";
        return (
            <ServicePriceCreatorUpdaterForm
                titleForm={titleForm}
                stateValues={this.state}
                handleClosePopup={this.props.closeCreatorUpdaterPopup}
                handleSubmit={this.handleSubmit.bind(this)}
                UpdateState={this.handleUpdateState.bind(this)}
                modeAction={this.props.modeAction}
            />
        );
    }
}

export class ServicePriceCreator extends Component {
    render() {
        return (
            <div className="right_col">
                <div className="row" >
                    <ServicePriceCreatorUpdater
                        modeAction={"create"}
                    />
                </div>
            </div>
        );
    }
}

export class ServicePriceEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoad: false,
            editContents: {}
        };
    }

    componentDidMount() {
        var urlSplit = window.location.href.split('/');
        var paraId = urlSplit[urlSplit.length - 1];
        console.log(2);
        Request.get(UrlApi.ServicePrice + "/" + paraId)
            .set('x-auth', localStorage.getItem('x-auth'))
            .then((res) => {
                console.log(res.body);
                this.setState({
                    editContents: res.body,
                    isLoad: true
                });

            })
            .catch((e) => {
                // window.location.href = UrlRedirect.ServicePrices;
            });
    }

    render() {
        console.log(1);
        return (
            <div className="right_col">
                <div className="row tile_count" >
                    <div className="col-md-12 col-sm-12 col-xs-12">
                        {
                            this.state.isLoad ?
                                <ServicePriceCreatorUpdater
                                    modeAction={"edit"}
                                    editContents={this.state.editContents}
                                />
                                : null
                        }
                    </div>
                </div>
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
    },
    loai_co_che: {
        keys: ["doc_quyen", "co_dinh_vi_tri", "chia_se_vi_tri_co_dinh", "ngau_nhien"],
        values: ["Độc quyền", "Cố định vị trí", "Chia sẻ vị trí cố định", "Ngẫu nhiên"]
    }
};

export default ServicePriceCreatorUpdater;