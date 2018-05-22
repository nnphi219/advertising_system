import React, { Component } from 'react';
import Request from 'superagent';
import UrlApi from '../share/UrlApi';
import { JsonDateToDate, DateToJsonDate, TransferTimeLogStringToJson, GetDistrictsBasicOnProvince, Transfer_Provice_District_JsonToArray, GetProvinces, TransferTimeLogStringToArrayElement } from '../share/Mapper';
import { RenderInput, RenderSelect, RenderDate, RenderRadioButon } from '../share/InputsRender';
import { KHUNG_GIO, PROMOTION_PHAN_TRAM, BANNER } from '../share/constant';
import { ArrayRemoveItem, NumberFormat } from '../share/CommonFunction';

import Img from 'react-image';

const uuidv4 = require('uuid/v4');

const data_tinh_thanh_quan_huyen = require("../../data_sheet/tinh_thanh_quan_huyen.json");

function IsBannerAds(stateValues) {
    let isBannerAds = false;
    if (stateValues.AdsAreaIds !== undefined) {
        var AdsAreaIdsKeys = stateValues.AdsAreaIds.keys;
        var indexOfAdsAreas = AdsAreaIdsKeys.indexOf(stateValues.loai_dich_vu);

        if (indexOfAdsAreas !== -1) {
            if (stateValues.AdsAreaIds.adsTypes[indexOfAdsAreas].key === BANNER) {
                isBannerAds = true;
            }
        }
    }

    return isBannerAds;
}

function GetRemainingTimeSlots(array_khung_gio, selectedTimeSlots) {
    return array_khung_gio.filter((timeSlot) =>
        selectedTimeSlots.indexOf(timeSlot) > -1 ? false : true
    );
}

function GetBasicPrice(basicPriceOnTimeSlot, selectedTimeSlots) {
    return parseFloat(basicPriceOnTimeSlot) * selectedTimeSlots.length;
}

function RenderBannerOption(props) {
    let url_image = props.stateValues.url_image;
    let error_url_image = props.stateValues.error_url_image;

    return (
        <div className="post_campaign__info--content--banner">
            <label className="fullwidth post_campaign__info--content-title">
                <p>{"Url trang quảng cáo"}</p>
            </label>
            <RenderInput
                nameId={"url_redirect"}
                type={"text"}
                value={props.stateValues.url_redirect}
                className={"post--input"}
                OnChangeInput={props.OnChangeInput}
            />
            <div>
                <label className="fullwidth post_campaign__info--content-title">
                    <p>{"Hình ảnh"}</p>
                </label>
            </div>
            <div className="post_campaign__info--content--banner--file">
                <input type="file" id="file" onChange={props.OnChangeImageFile} />
                <p style={{ color: "red", marginTop: "3px" }}>{error_url_image}</p>
            </div>
            <div>
                <Img className="post_campaign__info--content--banner--image" src={url_image} style={{ marginRight: "5px" }} />
            </div>
        </div>
    );
}

function RenderPostOption(props) {
    return (
        <div className="post_campaign__info--content--postid">
            <div>
                <label className="fullwidth post_campaign__info--content-title">
                    <p>{"Mã bài đăng"}</p>
                </label>
            </div>
            <div>
                <div className="float-left">
                    <RenderSelect
                        nameId={"ma_bai_dang"}
                        keys={props.postIdKeys}
                        values={props.postIdValues}
                        selectedValue={props.stateValues.ma_bai_dang}
                        OnChangeSelect={props.OnChangeInput}
                        className={"input--select"}
                    />
                </div>
                <div className="float-left post_campaign__info--content-description">
                    {props.postDetailDescription}
                </div>
            </div>
        </div>
    );
}

function RenderForm(props) {
    var stateValues = props.stateValues;

    var AdsAreaIdsKeys = [];
    var AdsAreaIdsValues = [];
    var trang_hien_thi = "";

    let isBannerAds = false;

    if (stateValues.AdsAreaIds !== undefined) {
        AdsAreaIdsKeys = stateValues.AdsAreaIds.keys;
        AdsAreaIdsValues = stateValues.AdsAreaIds.values;

        var indexOfAdsAreas = AdsAreaIdsKeys.indexOf(stateValues.loai_dich_vu);

        var adsAreaDetailDescription = [];
        if (indexOfAdsAreas !== -1) {
            trang_hien_thi = stateValues.AdsAreaIds.appliedPageTypeKeys[indexOfAdsAreas].value;
            if (stateValues.AdsAreaIds.adsTypes[indexOfAdsAreas].key === BANNER) {
                isBannerAds = true;
            }
            adsAreaDetailDescription.push(<p key="1" className="margin_zero"> {"Tên dịch vụ: " + stateValues.AdsAreaIds.values[indexOfAdsAreas] + "."}</p>)
            adsAreaDetailDescription.push(<p key="2" className="margin_zero"> {"Loại quảng cáo: " + stateValues.AdsAreaIds.adsTypes[indexOfAdsAreas].value + "."}</p>)
        }
    }

    var postIdKeys = [];
    var postDetailDescription = "";

    if (stateValues.XSystemPosts !== undefined) {
        postIdKeys = stateValues.XSystemPosts.keys;

        var indexOfPost = postIdKeys.indexOf(stateValues.ma_bai_dang);
        postDetailDescription = "Tiêu đề: " + stateValues.XSystemPosts.titles[indexOfPost];
    }
    var postIdValues = postIdKeys;

    var displayModeDetailDescription = "";

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

    var originProvinceCodes = stateValues.originProvinces.codes;
    var originProvinceNames = stateValues.originProvinces.names;

    var districtsOfSelectedProvince = GetDistrictsBasicOnProvince(stateValues.lnt_tinh, stateValues.list_province_district);
    var districtCodes = districtsOfSelectedProvince.codes;
    var districtNames = districtsOfSelectedProvince.names;

    var don_gia_co_ban = GetBasicPrice(stateValues.don_gia_dich_vu, stateValues.selectedTimeSlots);
    var thanh_tien = parseInt(don_gia_co_ban, 10) + parseInt(stateValues.tong_gia_tri_anh_huong, 10);

    var promotionDetailDescription = [];
    if (stateValues.promotionInfo) {
        let promotionDetail = stateValues.promotionInfo;
        let appliedValue = promotionDetail.muc_gia_ap_dung.gia_tri + " " + (parseInt(promotionDetail.muc_gia_ap_dung.loai_gia, 10) === PROMOTION_PHAN_TRAM ? "%" : "VND");
        promotionDetailDescription.push(<p key="1" className="margin_zero"> {"Tên khuyến mãi: " + promotionDetail.mo_ta_khuyen_mai + "."}</p>)
        promotionDetailDescription.push(<p key="2" className="margin_zero"> {"Giá trị áp dụng: " + appliedValue + "."}</p>)
    }

    var renderAdsType = isBannerAds ?
        <RenderBannerOption
            stateValues={stateValues}
            OnChangeInput={props.OnChangeInput}
            OnChangeImageFile={props.OnChangeImageFile}
        /> :
        <RenderPostOption
            postIdKeys={postIdKeys}
            postIdValues={postIdValues}
            stateValues={stateValues}
            OnChangeInput={props.OnChangeInput}
            postDetailDescription={postDetailDescription}
        />;

    let positionAreaKeys = Array.from(Array(stateValues.ldv_so_luong_vung_chia_se).keys());

    return (
        <div>
            <div className="post_campaign__info--header">
                Thông tin cơ bản
            </div>
            <div className="post_campaign__info--content">
                <div className="post_campaign__info--content--adsarea">
                    <label className="fullwidth post_campaign__info--content-title">
                        <p>{"Loại dịch vụ"}</p>
                    </label>
                    <div className="float-left">
                        <div>
                            <RenderSelect
                                nameId={"loai_dich_vu"}
                                keys={AdsAreaIdsKeys}
                                values={AdsAreaIdsValues}
                                selectedValue={stateValues.loai_dich_vu}
                                OnChangeSelect={props.OnChangeInput}
                                className={"input--select"}
                            />
                        </div>
                        <label className="fullwidth post_campaign__info--content-title">
                            <p>{"Trang hiển thị"}</p>
                        </label>
                        <RenderInput
                            nameId={"trang_hien_thi"}
                            type={"text"}
                            value={trang_hien_thi}
                            className={"x_post_campaign--input post_campaign__info--displayedpast"}
                            isReadOnly={1}
                            OnChangeInput={props.OnChangeInput}
                        />
                    </div>
                    <div className="float-left post_campaign__info--content-description">
                        {adsAreaDetailDescription}
                    </div>
                </div>
                {renderAdsType}
                <div className="post_campaign__info--content--displaymode">
                    <div>
                        <label className="fullwidth post_campaign__info--content-title">
                            <p>{"Cơ chế hiển thị"}</p>
                        </label>
                    </div>
                    <div>
                        <div className="float-left">
                            <RenderSelect
                                nameId={"co_che_hien_thi"}
                                keys={["doc_quyen", "co_dinh_vi_tri", "chia_se_vi_tri_co_dinh", "ngau_nhien"]}
                                values={["Độc quyền", "Cố định vị trí", "Chia sẻ vị trí cố định", "Ngẫu nhiên"]}
                                selectedValue={stateValues.co_che_hien_thi}
                                OnChangeSelect={props.OnChangeInput}
                                className={"input--select"}
                            />
                        </div>
                        <div className="float-left post_campaign__info--content-description">
                            {displayModeDetailDescription}
                        </div>
                    </div>
                </div>
            </div>

            <div className="post_campaign__info--header">
                Cơ chế áp dụng
            </div>
            <div className="post_campaign__info--content">
                <RenderSelect
                    nameId={"tinh_gia_theo"}
                    title={"Tính giá theo"}
                    keys={["ngay", "click", "view"]}
                    values={["Ngày", "Click", "View"]}
                    selectedValue={stateValues.tinh_gia_theo}
                    OnChangeSelect={props.OnChangeInput}
                    className={"input--select"}
                />

                <RenderSelect
                    nameId={"lnt_tinh"}
                    title={"Tỉnh thành"}
                    keys={originProvinceCodes}
                    values={originProvinceNames}
                    selectedValue={stateValues.lnt_tinh}
                    OnChangeSelect={props.OnChangeInput}
                    className={"input--select"}
                />

                {
                    districtCodes.length === 0 ? null
                        :
                        <RenderSelect
                            nameId={"lnt_quan_huyen"}
                            title={"Quận huyện"}
                            keys={districtCodes}
                            values={districtNames}
                            selectedValue={stateValues.lnt_quan_huyen}
                            OnChangeSelect={props.OnChangeInput}
                            className={"input--select"}
                        />
                }

                <RenderDate
                    nameId={"ngay_bat_dau"}
                    title={"Ngày bắt đầu chiến dịch"}
                    className={"input--date"}
                    value={stateValues.ngay_bat_dau}
                    OnchangeDate={props.OnchangeStartDate}
                />

                <RenderInput
                    nameId={"thoi_luong_ap_dung"}
                    title={"Thời lượng áp dụng"}
                    value={stateValues.thoi_luong_ap_dung}
                    type={"number"}
                    className={"x_post_campaign--input"}
                    OnChangeInput={props.OnChangeInput}
                    isReadOnly={1}
                />

                <RenderDate
                    nameId={"end_date"}
                    title={"Ngày kết thúc chiến dịch"}
                    className={"input--date"}
                    value={stateValues.ngay_ket_thuc}
                    OnchangeDate={props.OnchangeEndDate}
                />

                <RenderRadioButon
                    nameId={"vi_tri_vung_chia_se"}
                    title={"Vị trí quảng cáo"}
                    keys={positionAreaKeys}
                    values={positionAreaKeys}
                    selectedValue={stateValues.vi_tri_vung_chia_se}
                    OnChangeRadioButton={props.OnChangeInput}
                    className={"input-radio"}
                />

                <div key="khung_gio_hien_thi" className="div_property_margin_bottom">
                    <div>
                        <label className="fullwidth">
                            {"Khung giờ hiển thị"}
                        </label>
                    </div>
                    <div>
                        <div className="float-left timeslot_margin_right">
                            <RenderSelect
                                nameId={"time_slot"}
                                keys={remainingTimeSlots}
                                values={remainingTimeSlots}
                                selectedValue={stateValues.time_slot}
                                OnChangeSelect={props.OnChangeInput}
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
                        <div className="float-left" style={{ paddingTop: "5px", marginLeft: "5px" }}>
                            <p style={{ color: "red", marginTop: "3px" }}>{stateValues.error_time_slots}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="post_campaign__info--header">
                Thành tiền
            </div>
            <div className="post_campaign__info--content">
                <div>
                    <div className="float-left">
                        <RenderInput
                            nameId={"don_gia_co_ban"}
                            title={"Đơn giá cơ bản"}
                            value={NumberFormat(parseInt(don_gia_co_ban, 10))}
                            type={"text"}
                            className={"x_post_campaign--input"}
                            OnChangeInput={props.OnChangeInput}
                            isReadOnly={1}
                        />
                    </div>
                    <div className="float-left">
                        <RenderInput
                            nameId={"don_gia_dich_vu"}
                            title={"Đơn giá cơ bản trên mỗi khung giờ"}
                            value={NumberFormat(parseInt(stateValues.don_gia_dich_vu, 10))}
                            type={"text"}
                            className={"x_post_campaign--input"}
                            OnChangeInput={props.OnChangeInput}
                            isReadOnly={1}
                        />
                    </div>
                </div>
                <RenderInput
                    nameId={"tong_gia_tri_anh_huong"}
                    title={"Tổng giá trị tăng thêm"}
                    value={NumberFormat(parseInt(stateValues.tong_gia_tri_anh_huong, 10))}
                    type={"text"}
                    className={"x_post_campaign--input"}
                    OnChangeInput={props.OnChangeInput}
                    isReadOnly={1}
                />

                <RenderInput
                    nameId={"thanh_tien"}
                    title={"Thành tiền"}
                    value={NumberFormat(thanh_tien)}
                    type={"text"}
                    className={"x_post_campaign--input"}
                    OnChangeInput={props.OnChangeInput}
                    isReadOnly={1}
                />

                <div>
                    <div>
                        <label className="fullwidth post_campaign__info--content-title">
                            <p>{"Mã khuyến mãi"}</p>
                        </label>
                    </div>
                    <div>
                        <div className="float-left promotion__divleft">
                            <RenderInput
                                nameId={"ma_khuyen_mai"}
                                value={stateValues.ma_khuyen_mai}
                                OnChangeInput={props.OnChangeInput}
                                className={"x_post_campaign--input x_post_campaign__promotion--input"}
                            />
                        </div>
                        <div className="float-left post_campaign__info--content-description promotion__divright">
                            {promotionDetailDescription}
                        </div>
                    </div>
                </div>

                <RenderInput
                    nameId={"tong_cong"}
                    title={"Tổng cộng"}
                    value={NumberFormat(stateValues.tong_cong)}
                    type={"text"}
                    className={"x_post_campaign--input"}
                    OnChangeInput={props.OnChangeInput}
                    isReadOnly={1}
                />
            </div>

        </div>
    );
}

class RenderProperties extends Component {
    render() {
        var props = this.props;

        return (
            <div className="x_post_campaign">
                <div className="x_post_campaign_body">
                    <RenderForm
                        OnChangeInput={props.OnChangeInput}
                        OnChangeImageFile={props.OnChangeImageFile}
                        OnchangeStartDate={props.OnchangeStartDate}
                        OnchangeEndDate={props.OnchangeEndDate}
                        OnAddTokenField={props.OnAddTokenField}
                        OnRemoveTokenField={props.OnRemoveTokenField}

                        stateValues={props.stateValues}
                    />
                    <div className="submit">
                        <button className="btn btn-primary" onClick={this.props.handleSubmit}>Lưu</button>
                        <button className="btn btn-primary">Hủy</button>
                    </div>
                </div>
                {/* <div className="vertical_line" style="height: 45px;"></div> */}

                {/* <div className="right_border">
                    <RenderRightForm
                    />
                </div> */}
            </div>
        );
    }
}

class PostCampaignCreatorUpdaterForm extends Component {
    constructor(props) {
        super(props);

        this.OnChangeInput = this.OnChangeInput.bind(this);
        this.OnChangeImageFile = this.OnChangeImageFile.bind(this);
        this.OnchangeStartDate = this.OnchangeStartDate.bind(this);
        this.OnchangeEndDate = this.OnchangeEndDate.bind(this);
        this.OnKeyDown = this.OnKeyDown.bind(this);

        this.OnAddTokenField = this.OnAddTokenField.bind(this);
        this.OnRemoveTokenField = this.OnRemoveTokenField.bind(this);
    }

    OnKeyDown(event) {
        if (event.keyCode === 27) {
            //Do whatever when esc is pressed
            this.props.handleClosePopup();
        }
    }

    GetPromotionByPromotionCode(code, stateValues, next) {
        Request.get(UrlApi.GetPromotionByPromotionCodeAndUsername)
            .set('promotioncode', code)
            .set('username', stateValues.XAdminUsername)
            .then((res) => {
                var promotion = res.body;

                stateValues.promotionInfo = promotion;
                next(stateValues);
            });
    }

    OnChangeImageFile(event) {
        var stateValues = this.props.stateValues;
        event.stopPropagation();
        event.preventDefault();

        var file = event.target.files[0];
        if (file) {
            const data = new FormData();
            data.append('file', file);
            data.append('filename', file.file_name || uuidv4());

            var $this = this;
            fetch(UrlApi.UploadFile, {
                method: 'POST',
                body: data,
            }).then((response) => {
                response.json().then((body) => {
                    stateValues.url_image = body.file;
                    $this.props.UpdateState(stateValues);
                });
            }).catch((e) => {
                $this.props.Onchange({ UploadImageDescription: "fail" });
            });
        }
        else {
            stateValues.url_image = '';
            this.props.UpdateState(stateValues);
        }
    }

    OnChangeInput(e) {
        var stateValues = this.props.stateValues;
        var name = e.target.name;
        var value = e.target.value;
        stateValues[name] = value;

        if (name === "khung_gio_hien_thi") {
            value = TransferTimeLogStringToJson(value);

            this.props.UpdateState(stateValues);
        }
        else if (name === "loai_dich_vu") {
            var adsAreaKeys = stateValues.AdsAreaIds.keys;
            var appliedPageTypeKeys = stateValues.AdsAreaIds.appliedPageTypeKeys;
            var indexOfValueInKeys = adsAreaKeys.indexOf(value);

            var appliedPageType = appliedPageTypeKeys[indexOfValueInKeys];
            stateValues.trang_hien_thi = appliedPageType;

            stateValues.co_che_hien_thi = stateValues.co_che_hien_thi;
            stateValues.url_image = '';
            stateValues.url_redirect = '';

            let $this = this;
            stateValues = this.props.handleUpdatePostOfSystemByServiceOnChange(stateValues, function (stateValues) {
                $this.props.GetBasicPriceByAreaAndDisplayedMode(stateValues, stateValues.co_che_hien_thi, stateValues.XAdminUsername)
                    .then((stateValues) => {
                        $this.props.CalculatedIntoMoney(stateValues, function (stateValues) {
                            $this.props.UpdateState(stateValues);
                        });
                    });
            });
        }
        else if (name === "co_che_hien_thi") {
            let $this = this;
            this.props.GetBasicPriceByAreaAndDisplayedMode(stateValues, stateValues.co_che_hien_thi, stateValues.XAdminUsername)
                .then((stateValues) => {
                    $this.props.CalculatedIntoMoney(stateValues, function (stateValues) {
                        $this.props.UpdateState(stateValues);
                    });
                });
        }
        else if (name === "ma_khuyen_mai") {
            let $this = this;
            this.GetPromotionByPromotionCode(value, stateValues, function (stateValues) {
                $this.props.UpdateState(stateValues);
            });
        }
        else {
            this.props.UpdateState(stateValues);
        }
    }

    OnchangeStartDate(date) {
        var stateValues = this.props.stateValues;
        stateValues.ngay_bat_dau = date;
        this.props.UpdateState(stateValues);
        let ngay_ket_thuc = new Date();
        let thoi_luong_ap_dung = this.props.stateValues.thoi_luong_ap_dung;
        ngay_ket_thuc.setDate(this.props.stateValues.ngay_ket_thuc.getDate() + parseInt(thoi_luong_ap_dung, 10));
        this.OnchangeEndDate(ngay_ket_thuc);
    }

    OnchangeEndDate(date) {
        var stateValues = this.props.stateValues;

        let ngay_bat_dau = this.props.stateValues.ngay_bat_dau;
        let thoi_luong = new Date(date - ngay_bat_dau).getDate();

        if (parseInt(date.getTime() - ngay_bat_dau.getTime(), 10) >= 0) {
            stateValues.ngay_ket_thuc = date;
            stateValues.thoi_luong_ap_dung = thoi_luong;

            this.props.UpdateState(stateValues);
        }

        // this.props.UpdateState({"thoi_luong_ap_dung": new Date(date - ngay_bat_dau).getDate()});
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

        if (selectedCurrentTimeSlot === "all") {
            selectedTimeSlots = ["all"];
            stateValues.allowAddTimeSlot = false;
        }
        else {
            selectedTimeSlots.push(selectedCurrentTimeSlot);
        }

        var remainingTimeSlots = GetRemainingTimeSlots(array_khung_gio, selectedTimeSlots);

        stateValues.selectedTimeSlots = selectedTimeSlots;
        stateValues.remainingTimeSlots = remainingTimeSlots;
        stateValues.time_slot = remainingTimeSlots.length > 0 ? remainingTimeSlots[0] : null;

        let $this = this;
        this.props.CalculatedIntoMoney(stateValues, function (stateValues) {
            $this.props.UpdateState(stateValues);
        });
    }

    OnRemoveTokenField(e) {
        var stateValues = this.props.stateValues;

        var removedTimeSlot = e.target.name;
        var selectedTimeSlots = stateValues.selectedTimeSlots.slice();
        var array_khung_gio = stateValues.array_khung_gio.slice();

        if (removedTimeSlot === "all") {
            stateValues.allowAddTimeSlot = true;
        }

        ArrayRemoveItem(selectedTimeSlots, removedTimeSlot);
        var remainingTimeSlots = GetRemainingTimeSlots(array_khung_gio, selectedTimeSlots);

        stateValues.selectedTimeSlots = selectedTimeSlots;
        stateValues.remainingTimeSlots = remainingTimeSlots;
        stateValues.time_slot = remainingTimeSlots.length > 0 ? remainingTimeSlots[0] : null;

        let $this = this;
        this.props.CalculatedIntoMoney(stateValues, function (stateValues) {
            $this.props.UpdateState(stateValues);
        });
    }

    componentDidMount() {
        document.addEventListener("keydown", this.OnKeyDown, false);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.OnKeyDown, false);
    }

    render() {
        var props = this.props;
        return (
            <div>
                <div className="x_post_campaign--title">
                    {"Tạo chiến dịch tin đăng"}
                </div>
                <div>
                    <RenderProperties
                        OnChangeInput={this.OnChangeInput}
                        OnChangeImageFile={this.OnChangeImageFile}
                        OnchangeStartDate={this.OnchangeStartDate}
                        OnchangeEndDate={this.OnchangeEndDate}
                        OnAddTokenField={this.OnAddTokenField}
                        OnRemoveTokenField={this.OnRemoveTokenField}
                        handleSubmit={this.props.handleSubmit}

                        stateValues={props.stateValues}
                    />
                </div>
            </div>
        );
    }
}

class SuccessForm extends Component {
    render() {
        return (
            <div style={{ height: "200px" }}>
                <div>
                    <p className="xpostcampaign__successform">Bài đăng tạo thành công!</p>
                </div>
                <div className="xpostcampaign__successform--button">
                    <button className="btn btn-primary" onClick={this.props.OnCreateNew}>Tạo mới</button>
                </div>
            </div>
        );
    }
}

class XPostCampaign extends Component {
    constructor(props) {
        super(props);

        var urlParams = new URLSearchParams(window.location.search);
        var modeAction = urlParams.get('modeAction');
        var XAdminUsername = urlParams.get('AdminUserAuthenticate');
        var USerOfXSysyemAccessToken = urlParams.get('userAccessToken');

        var jsonState = {
            modeAction,
            register_successfully: false,
            XAdminUsername,
            USerOfXSysyemAccessToken,
            selectedTimeSlots: [],
            allowAddTimeSlot: true,
            url_image: ''
        };

        jsonState = this.SetInitState(jsonState, modeAction);
        this.state = this.SetInitError(jsonState);

        this.handleUpdateState = this.handleUpdateState.bind(this);
        this.CalculatedIntoMoney = this.CalculatedIntoMoney.bind(this);
        this.GetBasicPriceByAreaAndDisplayedMode = this.GetBasicPriceByAreaAndDisplayedMode.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUpdatePostOfSystemByServiceOnChange = this.handleUpdatePostOfSystemByServiceOnChange.bind(this);
    }

    SetInitError(jsonState) {
        jsonState.error_time_slots = '';
        jsonState.error_url_image = '';

        return jsonState;
    }

    componentDidMount() {
        var modeAction = this.state.modeAction;
        var XAdminUsername = this.state.XAdminUsername;
        var USerOfXSysyemAccessToken = this.state.USerOfXSysyemAccessToken;
        var jsonSetInfosOfUser = {};

        var $this = this;
        this.GetInfosByUsernameOfQCSystem(jsonSetInfosOfUser, XAdminUsername, modeAction)
            .then((jsonSetInfosOfUser) => {
                this.getPostsOfXsystemByUserToken(jsonSetInfosOfUser, USerOfXSysyemAccessToken, modeAction, function (jsonSetInfosOfUser) {
                    return $this.GetBasicPriceByAreaAndDisplayedMode(jsonSetInfosOfUser, $this.state.co_che_hien_thi, XAdminUsername, USerOfXSysyemAccessToken)
                        .then((jsonSetInfosOfUser) => {
                            $this.setState(jsonSetInfosOfUser);
                        });
                });
            });
    }

    GetBasicPriceByAreaAndDisplayedMode(jsonState, displayedMode, XAdminUsername, USerOfXSysyemAccessToken) {
        return Request.get(UrlApi.GetServicePriceByAreaIdAndDisplayMode)
            .set('Username', XAdminUsername)
            .set('adsareaId', jsonState.loai_dich_vu)
            .set('displayMode', displayedMode)
            .set('xsystem-auth', USerOfXSysyemAccessToken)
            .then((res) => {
                var servicePrice = res.body;
                if (servicePrice !== undefined && servicePrice !== null) {
                    jsonState.don_gia_dich_vu = servicePrice.gia_tri;
                    jsonState.appliedServicePriceId = servicePrice.ma_gia;
                }
                else {
                    jsonState.don_gia_dich_vu = 0;
                    jsonState.appliedServicePriceId = null;
                }

                return jsonState;
            });
    }

    CalculatedIntoMoney(jsonState, next) {
        var stateValues = this.state;

        var appliedServicePriceId = stateValues.appliedServicePriceId;
        var lnt_tinh = stateValues.lnt_tinh;
        var lnt_quan_huyen = stateValues.lnt_quan_huyen;
        var vi_tri = {
            tinh: lnt_tinh,
            quan_huyen: lnt_quan_huyen
        }

        var start_date = DateToJsonDate(stateValues.ngay_bat_dau);
        var end_date = DateToJsonDate(stateValues.ngay_ket_thuc);

        var selectedTimeSlots = stateValues.selectedTimeSlots.slice();

        var array_bat_dau = [];
        var array_ket_thuc = [];
        selectedTimeSlots.forEach(timeSlot => {
            TransferTimeLogStringToArrayElement(timeSlot, array_bat_dau, array_ket_thuc)
        });
        var khung_gio = {
            bat_dau: array_bat_dau,
            ket_thuc: array_ket_thuc
        };

        var content = {
            selectedTimeSlots: khung_gio,
            vi_tri: vi_tri,
            appliedServicePriceId: appliedServicePriceId,
            start_date: start_date,
            end_date: end_date,
            Username: stateValues.XAdminUsername,
            'xsystem-auth': stateValues.USerOfXSysyemAccessToken
        };

        Request.post(UrlApi.PriceFactorCalculateTotalAffectValue)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send(content)
            .end((err, res) => {
                jsonState.tong_gia_tri_anh_huong = res.body.total_affect_value;
                next(jsonState);
            });
    }

    GetAdsAreaInfos(jsonSetInfosOfUser, adsAreas, modeAction) {
        let _ids = [];
        let keys = [];
        let values = [];
        let appliedPageTypeKeys = [];
        let adsTypes = [];
        let post_api_urls = [];
        let max_shared_areas = [];
        let max_quantity_posts = [];

        adsAreas.forEach((adsArea) => {
            _ids.push(adsArea._id);
            keys.push(adsArea.ma_dich_vu);
            values.push(adsArea.ten_hien_thi);
            appliedPageTypeKeys.push(adsArea.loai_trang_ap_dung);
            adsTypes.push(adsArea.loai_quang_cao);
            post_api_urls.push(adsArea.tin_rao_api.domain + "/" + adsArea.tin_rao_api.url);
            max_shared_areas.push(adsArea.so_luong_chia_se_vung);
            max_quantity_posts.push(adsArea.so_luong_tin_toi_da);
        });

        jsonSetInfosOfUser.AdsAreaIds = {
            _ids,
            keys,
            values,
            appliedPageTypeKeys,
            adsTypes,
            post_api_urls,
            max_shared_areas,
            max_quantity_posts
        };

        if (modeAction === "create") {
            jsonSetInfosOfUser.loai_dich_vu = keys[0];
            jsonSetInfosOfUser.trang_hien_thi = appliedPageTypeKeys[0];
            jsonSetInfosOfUser.ldv_so_luong_vung_chia_se = max_shared_areas[0];
        }

        return jsonSetInfosOfUser;
    }

    getPostsOfXsystemByUserToken(jsonSetInfosOfUser, USerOfXSysyemAccessToken, modeAction, next) {
        let adsAreaIds = jsonSetInfosOfUser.AdsAreaIds;
        let loai_dich_vu = jsonSetInfosOfUser.loai_dich_vu;
        let indexOfServiceType = adsAreaIds.keys.indexOf(loai_dich_vu);

        if (indexOfServiceType === -1) {
            jsonSetInfosOfUser.XSystemPosts = {
                _ids: [],
                keys: [],
                titles: []
            };
            jsonSetInfosOfUser.ma_bai_dang = '';
            next(jsonSetInfosOfUser);
        }

        let post_api_url = adsAreaIds.post_api_urls[indexOfServiceType];

        return Request.get(post_api_url)
            .set('xsystem-auth', USerOfXSysyemAccessToken)
            .then((res) => {
                var _ids = [];
                var keys = [];
                var titles = [];

                var xSystemPosts = res.body;
                if (xSystemPosts) {
                    xSystemPosts.forEach((xSystemPost) => {
                        _ids.push(xSystemPost._id);
                        keys.push(xSystemPost.ma_bai_dang);
                        titles.push(xSystemPost.tieu_de);
                    });

                    jsonSetInfosOfUser.XSystemPosts = {
                        _ids,
                        keys,
                        titles
                    };

                    if (modeAction === "create") {
                        jsonSetInfosOfUser.ma_bai_dang = keys[0];
                    }

                    next(jsonSetInfosOfUser);
                }
                else {
                    jsonSetInfosOfUser.XSystemPosts = {
                        _ids: [],
                        keys: [],
                        titles: []
                    };
                    jsonSetInfosOfUser.ma_bai_dang = '';
                    next(jsonSetInfosOfUser);
                }
            });
    }

    handleUpdatePostOfSystemByServiceOnChange(stateValues, next) {
        let loai_dich_vu = stateValues.loai_dich_vu;
        if (loai_dich_vu === BANNER) {
            next(stateValues);
        }
        else {
            let USerOfXSysyemAccessToken = stateValues.USerOfXSysyemAccessToken;
            this.getPostsOfXsystemByUserToken(stateValues, USerOfXSysyemAccessToken, "create", function (stateValues) {
                next(stateValues);
            });
        }
    }

    GetInfosByUsernameOfQCSystem(jsonSetInfosOfUser, XAdminUsername, modeAction) {
        return Request.get(UrlApi.GetInfosByUserName)
            .set('Username', XAdminUsername)
            .then((res) => {
                var infos = res.body;
                var user = infos.user;

                jsonSetInfosOfUser.XsystemUrlApi = user.UrlApi;

                jsonSetInfosOfUser = this.GetAdsAreaInfos(jsonSetInfosOfUser, infos.adsAreaInfos, modeAction);

                return jsonSetInfosOfUser;
            });
    }

    GetPromotionIdInfos() {
        var $this = this;
        Request.get(UrlApi.GetPromotionIdInfos)
            .then((res) => {
                var _ids = [];
                var keys = [];
                var values = [];

                res.body.forEach((promotion) => {
                    _ids.push(promotion._id);
                    keys.push(promotion.ma_khuyen_mai);
                    values.push(promotion.mo_ta);
                });

                var jsonPromotionIds = {
                    PromotionIds: {
                        _ids: _ids,
                        keys: keys,
                        values: values
                    },

                };
                if (this.props.modeAction === "create") {
                    jsonPromotionIds.ma_khuyen_mai = keys[0];
                }

                $this.setState(jsonPromotionIds);
            });
    }

    SetInitState(jsonState, modeAction) {
        var array_khung_gio = KHUNG_GIO.slice();

        jsonState.list_province_district = Transfer_Provice_District_JsonToArray(data_tinh_thanh_quan_huyen);
        jsonState.originProvinces = GetProvinces(jsonState.list_province_district);

        jsonState.array_khung_gio = array_khung_gio
        if (modeAction === "create") {
            jsonState.ma_bai_dang = "";
            jsonState.co_che_hien_thi = "doc_quyen";

            jsonState.tong_gia_tri_anh_huong = 0;

            jsonState.tinh_gia_theo = "ngay";

            jsonState.lnt_tinh = "";
            jsonState.lnt_quan_huyen = "";
            jsonState.time_slot = array_khung_gio[0];

            jsonState.thoi_luong_ap_dung = 1;

            var today = new Date();
            let tomorrow = new Date();
            tomorrow.setDate(today.getDate() + jsonState.thoi_luong_ap_dung);
            jsonState.ngay_bat_dau = (today);
            jsonState.ngay_ket_thuc = (tomorrow);
            jsonState.tong_cong = 0;
            jsonState.ma_khuyen_mai = "";

            jsonState.remainingTimeSlots = array_khung_gio;
            jsonState.time_slot = array_khung_gio[0];
        }
        else {
            var editContents = this.props.editContents;

            jsonState.ma_bai_dang = editContents.ma_bai_dang;
            jsonState.ma_khuyen_mai = editContents.ma_khuyen_mai;
            jsonState.co_che_hien_thi = editContents.co_che_hien_thi;
            jsonState.tinh_gia_theo = editContents.tinh_gia_theo;
            jsonState.don_gia_co_ban = editContents.don_gia_co_ban;
            jsonState.tong_cong = editContents.tong_cong;

            jsonState.start_date = JsonDateToDate(editContents.start_date);
            jsonState.end_date = JsonDateToDate(editContents.end_date);

            var loai_nhan_to = editContents.loai_nhan_to;
            if (loai_nhan_to !== undefined && loai_nhan_to !== null) {
                if (loai_nhan_to.thoi_luong !== undefined && loai_nhan_to.thoi_luong !== null) {
                    jsonState.lnt_thoi_luong = loai_nhan_to.thoi_luong;
                }
                jsonState.khung_gio_hien_thi = loai_nhan_to.khung_gio;
                if (loai_nhan_to.vi_tri !== undefined && loai_nhan_to.vi_tri !== null) {
                    jsonState.lnt_tinh = loai_nhan_to.vi_tri.tinh;
                    jsonState.lnt_quan_huyen = loai_nhan_to.vi_tri.quan_huyen;
                }
            }
        }

        return jsonState;
    }

    GetTotalHaveToPay(stateValues) {
        let don_gia_co_ban = GetBasicPrice(stateValues.don_gia_dich_vu, stateValues.selectedTimeSlots);
        let thanh_tien = parseInt(don_gia_co_ban, 10) + parseInt(stateValues.tong_gia_tri_anh_huong, 10);

        if (stateValues.promotionInfo) {
            let muc_gia_ap_dung = stateValues.promotionInfo.muc_gia_ap_dung;

            if (parseInt(muc_gia_ap_dung.loai_gia, 10) === PROMOTION_PHAN_TRAM) {
                return thanh_tien - thanh_tien * muc_gia_ap_dung.gia_tri;
            }
            else {
                return thanh_tien - muc_gia_ap_dung.gia_tri;
            }
        }
        else {
            return thanh_tien;
        }
    }

    handleUpdateState(jsonState) {
        jsonState = this.SetInitError(jsonState);
        jsonState.tong_cong = this.GetTotalHaveToPay(jsonState);

        this.setState(jsonState);
    }

    CheckValid(state) {
        var isValid = true;
        var jsonError = {};

        if (state.selectedTimeSlots.length === 0) {
            jsonError.error_time_slots = "Chưa chọn khung giờ hiện thị";
            isValid = false;
        }

        if (IsBannerAds(state)) {
            if (state.url_image === "") {
                jsonError.error_url_image = "Hình ảnh được yêu cầu";
                isValid = false;
            }
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
            var startDateJson = DateToJsonDate(state.ngay_bat_dau);
            var endDateJson = DateToJsonDate(state.ngay_ket_thuc);

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

            var trang_hien_thi = '';
            if (state.AdsAreaIds !== undefined) {
                let AdsAreaIdsKeys = state.AdsAreaIds.keys;

                var indexOfAdsAreas = AdsAreaIdsKeys.indexOf(state.loai_dich_vu);

                if (indexOfAdsAreas !== -1) {
                    trang_hien_thi = state.AdsAreaIds.appliedPageTypeKeys[indexOfAdsAreas].key;
                }
            }

            var postCampaignContent = {
                loai_dich_vu: state.loai_dich_vu,
                trang_hien_thi: trang_hien_thi,
                co_che_hien_thi: state.co_che_hien_thi,
                tinh_gia_theo: state.tinh_gia_theo,
                khung_gio_hien_thi: khung_gio,
                ngay_bat_dau: startDateJson,
                ngay_ket_thuc: endDateJson,
                don_gia_dich_vu: state.don_gia_dich_vu,
                ma_khuyen_mai: state.ma_khuyen_mai,
                gia_tri_tang_them: state.tong_gia_tri_anh_huong,
                tong_cong: state.tong_cong,
                x_admin_username: state.XAdminUsername,
                x_user_accessToken: state.USerOfXSysyemAccessToken,
                trang_thai: 1
            };

            if (state.lnt_tinh && state.lnt_tinh != "") {
                var vi_tri = {
                    tinh: state.lnt_tinh,
                    quan_huyen: state.lnt_quan_huyen
                };

                if (state.quan_huyen && state.quan_huyen != "") {
                    vi_tri.quan_huyen = state.lnt_quan_huyen;
                }

                postCampaignContent.vi_tri = vi_tri;
            }


            if (IsBannerAds(state)) {
                postCampaignContent.url_image = state.url_image;
                postCampaignContent.url_redirect = state.url_redirect;
            }
            else {
                postCampaignContent.ma_bai_dang = state.ma_bai_dang;
            }

            return postCampaignContent;
        }
        else {
            return null;
        }
    }

    CreatePostCampaign() {
        var postCampaignContent = this.GetModelStateJson();
        if (postCampaignContent === null) {
            return;
        }

        var $this = this;
        Request.post(UrlApi.PostCampaignforXsystem)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send(postCampaignContent)
            .end(function (err, res) {
                if (err) {
                    console.log(err);
                }
                else {
                    $this.setState({
                        register_successfully: true
                    });
                }
            });
    }

    EditPostCampaign() {
        var postCampaignContent = this.GetModelStateJson();

        var url = UrlApi.PostCampaignManagement + "/" + this.props.editContents._id;
        var $this = this;
        Request.put(url)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send(postCampaignContent)
            .end(function (err, res) {
                $this.props.closeCreatorUpdaterPopup();
                $this.props.resetContentState();
            });
    }

    handleSubmit() {
        this.CreatePostCampaign();
    }

    OnCreateNew() {
        this.setState({
            register_successfully: false
        });
    }

    render() {
        return (
            this.state.register_successfully ?
                <SuccessForm
                    OnCreateNew={this.OnCreateNew.bind(this)}
                />
                :
                <PostCampaignCreatorUpdaterForm
                    stateValues={this.state}

                    UpdateState={this.handleUpdateState}
                    CalculatedIntoMoney={this.CalculatedIntoMoney}
                    GetBasicPriceByAreaAndDisplayedMode={this.GetBasicPriceByAreaAndDisplayedMode}
                    handleUpdatePostOfSystemByServiceOnChange={this.handleUpdatePostOfSystemByServiceOnChange}

                    handleSubmit={this.handleSubmit}
                />

        );
    }
}

export default XPostCampaign;