import React, { Component } from 'react';
import Request from 'superagent';
import DatePicker from 'react-date-picker';
import UrlApi from '../share/UrlApi';
import { JsonDateToDate, DateToJsonDate } from '../share/Mapper';
import { RenderInput, RenderSelect, RenderRadioButon, RenderDate } from '../share/InputsRender';
import { DescriptionDetail } from '../share/CommonComponent';

class RenderProperties extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var props = this.props;
        var stateValues = this.props.stateValues;
        var AdsAreaIdsKeys = this.props.stateValues.AdsAreaIds === undefined ? [] : this.props.stateValues.AdsAreaIds.keys;
        var AdsAreaIdsValues = this.props.stateValues.AdsAreaIds === undefined ? [] : this.props.stateValues.AdsAreaIds.values;

        var arrayAdsAreaTitles = [];
        if (stateValues.AdsAreaIds !== undefined) {
            var indexOfAdsArea = stateValues.AdsAreaIds.keys.indexOf(stateValues.ma_dich_vu_ap_dung);
            arrayAdsAreaTitles.push("Loại quảng cáo: " + stateValues.AdsAreaIds.list_loai_quang_cao[indexOfAdsArea]);
            arrayAdsAreaTitles.push("Trang áp dụng: " + stateValues.AdsAreaIds.list_loai_trang_ap_dung[indexOfAdsArea]);
        }

        var ma_khuyen_mai_isReadOnly = this.props.modeAction === 'edit' ? 1 : 0;
        return (
            <div className="promotion_information">
                <RenderInput
                    nameId={"ma_khuyen_mai"}
                    title={"Nhập mã khuyến mãi"}
                    type={"text"}
                    value={stateValues.ma_khuyen_mai}
                    errorTitle={stateValues.error_ma_khuyen_mai}
                    className={"promotion--input"}
                    isReadOnly={ma_khuyen_mai_isReadOnly}
                    OnChangeInput={this.props.OnChangeInput}
                />

                <RenderInput
                    nameId={"mo_ta"}
                    title={"Mô tả khuyến mãi"}
                    type={"text"}
                    value={stateValues.mo_ta}
                    errorTitle={stateValues.error_mo_ta}
                    className={"promotion--input"}
                    OnChangeInput={this.props.OnChangeInput}
                />

                <RenderSelect
                    nameId={"ma_dich_vu_ap_dung"}
                    title={"Mã dịch vụ quảng cáo"}
                    keys={AdsAreaIdsKeys}
                    values={AdsAreaIdsValues}
                    selectedValue={this.props.stateValues.ma_dich_vu_ap_dung}
                    OnChangeSelect={this.props.OnChangeSelect}
                    className={"input--select"}
                />
                <DescriptionDetail
                    arrayTitles={arrayAdsAreaTitles}
                />
                <RenderRadioButon
                    nameId={"loai_gia"}
                    title={"Mức giá áp dụng"}
                    keys={[1, 0]}
                    values={["Phần trăm", "Giá trị"]}
                    selectedValue={this.props.stateValues.loai_gia}
                    OnChangeRadioButton={this.props.OnChangeRadioButton}
                    className={"input-radio"}
                />
                <RenderInput
                    nameId={"gia_tri"}
                    value={stateValues.gia_tri}
                    errorTitle={stateValues.error_gia_tri}
                    type={"number"}
                    className={"promotion--input"}
                    OnChangeInput={this.props.OnChangeInput}
                />

                <RenderDate
                    nameId={"start_date"}
                    title={"Ngày bắt đầu"}
                    className={"input--date"}
                    value={this.props.stateValues.start_date}
                    OnchangeDate={this.props.OnchangeStartDate}
                />

                <RenderDate
                    nameId={"end_date"}
                    title={"Ngày kết thúc"}
                    className={"input--date"}
                    value={this.props.stateValues.end_date}
                    OnchangeDate={this.props.OnchangeEndDate}
                />
            </div>
        );
    }
}

class PromotionCreatorUpdaterForm extends Component {
    constructor(props) {
        super(props);

        this.OnChangeInput = this.OnChangeInput.bind(this);
        this.OnChangeSelect = this.OnChangeSelect.bind(this);
        this.OnChangeRadioButton = this.OnChangeRadioButton.bind(this);

        this.OnchangeStartDate = this.OnchangeStartDate.bind(this);
        this.OnchangeEndDate = this.OnchangeEndDate.bind(this);
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
        var jsonState = { [e.target.name]: e.target.value };
        this.props.UpdateState(jsonState);
    }

    OnChangeSelect(e) {
        var jsonState = { [e.target.name]: e.target.value };
        this.props.UpdateState(jsonState);
    }

    OnChangeRadioButton(e) {
        var jsonState = { [e.target.name]: e.target.value };
        this.props.UpdateState(jsonState);
    }

    render() {
        return (
            <div className='popup_inner promotion_createform_size div_scroll_bar'>
                <div>
                    <a class="close popup-button-close promotion_margin_button-close" onClick={this.props.handleClosePopup}>×</a>
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
                <div className="submit">
                    <button className="btn btn-primary" onClick={this.props.handleSubmit}>Save</button>
                    <button className="btn btn-primary" onClick={this.props.handleClosePopup}>Cancel</button>
                </div>
            </div>
        );
    }
}

class PromotionCreatorUpdater extends Component {
    constructor(props) {
        super(props);

        var jsonState = {};
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

                res.body.map((adsArea) => {
                    _ids.push(adsArea._id);
                    keys.push(adsArea.ma_dich_vu);
                    values.push(adsArea.ten_hien_thi);
                    list_loai_trang_ap_dung.push(adsArea.loai_trang_ap_dung.value);
                    list_loai_quang_cao.push(adsArea.loai_quang_cao);
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
            jsonState.ma_khuyen_mai = '';
            jsonState.mo_ta = '';
            jsonState.loai_gia = 1;
            jsonState.gia_tri = 0;

            var today = new Date();
            jsonState.start_date = today;
            jsonState.end_date = today;
        }
        else {
            var editContents = this.props.editContents;

            jsonState.ma_khuyen_mai = editContents.ma_khuyen_mai;
            jsonState.mo_ta = editContents.mo_ta;
            jsonState.ma_dich_vu_ap_dung = editContents.ma_dich_vu_ap_dung;
            jsonState.loai_gia = editContents.muc_gia_ap_dung.loai_gia;
            jsonState.gia_tri = editContents.muc_gia_ap_dung.gia_tri;
            jsonState.start_date = JsonDateToDate(editContents.start_date);
            jsonState.end_date = JsonDateToDate(editContents.end_date);
        }

        return jsonState;
    }

    handleUpdateState(jsonState) {
        jsonState = this.SetInitError(jsonState);
        this.setState(jsonState);
    }

    SetInitError(jsonState) {
        jsonState.error_ma_khuyen_mai = '';
        jsonState.error_gia_tri = '';
        jsonState.error_mo_ta = '';

        return jsonState;
    }

    CheckValid(state) {
        var isValid = true;
        var jsonError = {};

        if (state.ma_khuyen_mai === "" || state.ma_khuyen_mai.trim().includes(' ')) {
            jsonError.error_ma_khuyen_mai = "Mã không hợp lệ";
            isValid = false;
        }

        if (state.mo_ta === "") {
            jsonError.error_mo_ta = "Mô tả không thể rỗng";
            isValid = false;
        }

        if (parseInt(state.gia_tri) <= 0) {
            jsonError.error_gia_tri = "Yêu cầu lớn hơn 0";
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
            var endDateJson = DateToJsonDate(state.end_date);

            var promotionContent = {
                ma_khuyen_mai: state.ma_khuyen_mai,
                mo_ta: state.mo_ta,
                ma_dich_vu_ap_dung: state.ma_dich_vu_ap_dung,
                muc_gia_ap_dung: {
                    loai_gia: state.loai_gia,
                    gia_tri: state.gia_tri
                },
                start_date: startDateJson,
                end_date: endDateJson
            };

            if (this.props.modeAction === 'edit') {
                return promotionContent;
            }
            else {
                return Request.get(UrlApi.ReadA_Promotion + '/' + state.ma_khuyen_mai)
                    .set('x-auth', localStorage.getItem('x-auth'))
                    .then((res) => {
                        if (res.body) {
                            isValid = false;
                            this.setState({
                                error_ma_khuyen_mai: "Mã này đã tồn tại!"
                            });
                            return 'error';
                        }
                        else {
                            return promotionContent;
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

    CreatePromotion() {
        this.GetModelStateJson().then((promotionContent) => {
            if (promotionContent === "error") {
                return;
            }

            var $this = this;
            Request.post(UrlApi.PromotionManagement)
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .set('x-auth', localStorage.getItem('x-auth'))
                .send(promotionContent)
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
            // this.setState({
            //     error_ma_gia: "Mã này đã tồn tại!"
            // });
        });
    }

    EditPromotion() {
        var promotionContent = this.GetModelStateJson();

        var url = UrlApi.PromotionManagement + "/" + this.props.editContents._id;
        var $this = this;
        Request.put(url)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .set('x-auth', localStorage.getItem('x-auth'))
            .send(promotionContent)
            .end(function (err, res) {
                $this.props.closeCreatorUpdaterPopup();
                $this.props.resetContentState();
            });
    }

    handleSubmit() {
        if (this.props.modeAction === "create") {
            this.CreatePromotion();
        }
        else {
            this.EditPromotion();
        }
    }

    render() {
        var titleForm = this.props.modeAction === "create" ? "Tạo khuyến mãi" : "Chỉnh sửa khuyến mãi";
        return (
            <div className='popup'>
                <PromotionCreatorUpdaterForm
                    titleForm={titleForm}
                    stateValues={this.state}
                    handleClosePopup={this.props.closeCreatorUpdaterPopup}
                    handleSubmit={this.handleSubmit.bind(this)}
                    UpdateState={this.handleUpdateState.bind(this)}
                    modeAction={this.props.modeAction}
                />
            </div>
        );
    }
}

export default PromotionCreatorUpdater;