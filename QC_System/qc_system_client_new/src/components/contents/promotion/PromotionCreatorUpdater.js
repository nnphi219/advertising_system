import React, { Component } from 'react';
import Request from 'superagent';
import UrlApi, { UrlRedirect } from '../share/UrlApi';
import { RenderInput, RenderRadioButon } from '../share/InputsRender';

import { PROMOTION_PHAN_TRAM, PROMOTION_GIA_TRI } from '../share/constant';
import './promotion_management.css';


const uuidV1 = require('uuid/v1');

class RenderProperties extends Component {

    render() {
        var stateValues = this.props.stateValues;

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
                    nameId={"mo_ta_khuyen_mai"}
                    title={"Mô tả khuyến mãi"}
                    type={"text"}
                    value={stateValues.mo_ta_khuyen_mai}
                    errorTitle={stateValues.error_mo_ta_khuyen_mai}
                    className={"promotion--input"}
                    OnChangeInput={this.props.OnChangeInput}
                />

                <RenderRadioButon
                    nameId={"loai_gia"}
                    title={"Mức giá áp dụng"}
                    keys={[PROMOTION_PHAN_TRAM, PROMOTION_GIA_TRI]}
                    values={["Phần trăm", "Giá trị"]}
                    selectedValue={stateValues.loai_gia}
                    OnChangeRadioButton={this.props.OnChangeRadioButton}
                    className={"input-radio"}
                />
                <RenderInput
                    nameId={"gia_tri"}
                    title={parseInt(stateValues.loai_gia, 10) === PROMOTION_PHAN_TRAM ? "Đơn vị (%)" : "Đơn vị (VND)"}
                    value={stateValues.gia_tri}
                    errorTitle={stateValues.error_gia_tri}
                    type={"number"}
                    className={"promotion--input"}
                    OnChangeInput={this.props.OnChangeInput}
                />
                <div>
                    <div>
                        <RenderInput
                            nameId={"code"}
                            title={"Code"}
                            value={stateValues.code}
                            type={"text"}
                            className={"promotion--input"}
                            OnChangeInput={this.props.OnChangeInput}
                            isReadOnly={1}
                        />
                    </div>

                    <button className="btn btn-primary" onClick={this.props.OnGenerateCode}>Tạo mới code</button>
                </div>

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
        this.OnGenerateCode = this.OnGenerateCode.bind(this);

    }

    OnGenerateCode() {
        var jsonState = {
            code: uuidV1()
        };

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

    onCancel() {
        window.location.href = UrlRedirect.Promotions
    }

    render() {
        return (
            <div>
                <div>
                    <a className="close popup-button-close promotion_margin_button-close" onClick={this.props.handleClosePopup}>×</a>
                    <h1>{this.props.titleForm}</h1>
                </div>
                <RenderProperties
                    OnChangeInput={this.OnChangeInput}
                    OnChangeSelect={this.OnChangeSelect}
                    OnChangeRadioButton={this.OnChangeRadioButton}
                    OnchangeStartDate={this.OnchangeStartDate}
                    OnchangeEndDate={this.OnchangeEndDate}
                    OnGenerateCode={this.OnGenerateCode}

                    stateValues={this.props.stateValues}
                    modeAction={this.props.modeAction}
                />
                <div className="promotion-submit">
                    <button className="btn btn-primary" onClick={this.props.handleSubmit}>Lưu</button>
                    <button className="btn btn-primary" onClick={this.onCancel}>Hủy</button>
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

                res.body.forEach((adsArea) => {
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
            jsonState.mo_ta_khuyen_mai = '';
            jsonState.loai_gia = PROMOTION_PHAN_TRAM;
            jsonState.code = uuidV1();
            jsonState.gia_tri = 0;
        }
        else {
            var editContents = this.props.editContents;

            jsonState.ma_khuyen_mai = editContents.ma_khuyen_mai;
            jsonState.mo_ta_khuyen_mai = editContents.mo_ta_khuyen_mai;
            jsonState.loai_gia = editContents.muc_gia_ap_dung.loai_gia;
            jsonState.gia_tri = editContents.muc_gia_ap_dung.gia_tri;
            jsonState.code = editContents.code;
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
        jsonState.error_mo_ta_khuyen_mai = '';

        return jsonState;
    }

    CheckValid(state) {
        var isValid = true;
        var jsonError = {};

        if (state.ma_khuyen_mai === "" || state.ma_khuyen_mai.trim().includes(' ')) {
            jsonError.error_ma_khuyen_mai = "Mã không hợp lệ";
            isValid = false;
        }

        if (state.mo_ta_khuyen_mai === "") {
            jsonError.error_mo_ta_khuyen_mai = "Mô tả không thể rỗng";
            isValid = false;
        }

        if (parseInt(state.gia_tri, 10) <= 0) {
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

            var promotionContent = {
                ma_khuyen_mai: state.ma_khuyen_mai,
                mo_ta_khuyen_mai: state.mo_ta_khuyen_mai,
                code: state.code,
                muc_gia_ap_dung: {
                    loai_gia: state.loai_gia,
                    gia_tri: state.gia_tri
                },
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

            Request.post(UrlApi.PromotionManagement)
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .set('x-auth', localStorage.getItem('x-auth'))
                .send(promotionContent)
                .end(function (err, res) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        window.location.href = UrlRedirect.Promotions;
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

        Request.put(url)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .set('x-auth', localStorage.getItem('x-auth'))
            .send(promotionContent)
            .end(function (err, res) {
                window.location.href = UrlRedirect.Promotions;
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
            <div>
                <PromotionCreatorUpdaterForm
                    titleForm={titleForm}
                    stateValues={this.state}
                    handleSubmit={this.handleSubmit.bind(this)}
                    UpdateState={this.handleUpdateState.bind(this)}
                    modeAction={this.props.modeAction}
                />
            </div>
        );
    }
}

export class PromotionCreator extends Component {
    render() {
        return (
            <div className="right_col">
                <div className="row" >
                    <PromotionCreatorUpdater
                        modeAction={"create"}
                    />
                </div>
            </div>
        );
    }
}

export class PromotionEditor extends Component {
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
        Request.get(UrlApi.PromotionManagement + "/" + paraId)
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
                                <PromotionCreatorUpdater
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

export default PromotionCreatorUpdater;