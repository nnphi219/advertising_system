import React, { Component } from 'react';
import PostCampaignManagement from './PostCampaignManagement';
import DatePicker from 'react-date-picker';
import UrlApi from '../share/UrlApi';
import { JsonDateToDate, DateToJsonDate, TransferTimeLogJsonToString, TransferTimeLogStringToJson } from '../share/Mapper';
import { RenderInput, RenderSelect, RenderRadioButon, RenderDate } from '../share/InputsRender';
import { TransferSelectInputKeyToValue } from '../share/Mapper';

function RenderLeftForm(props) {
    var stateValues = props.stateValues;

    var AdsAreaIdsKeys = stateValues.AdsAreaIds === undefined ? [] : stateValues.AdsAreaIds.keys;
    var AdsAreaIdsValues = stateValues.AdsAreaIds === undefined ? [] : stateValues.AdsAreaIds.values;
    var khung_gio_hien_thi = TransferTimeLogJsonToString(stateValues.khung_gio_hien_thi);
    var PromotionIdsKeys = stateValues.PromotionIds === undefined ? [] : stateValues.PromotionIds.keys;
    var PromotionIdsValues = stateValues.PromotionIds === undefined ? [] : stateValues.PromotionIds.values;
    let PostIdKeys = stateValues.PostIds === undefined ? [] : stateValues.PostIds.keys;
    let PostIdValues = stateValues.PostIds === undefined ? [] : stateValues.PostIds.values;
    var trang_hien_thi = TransferSelectInputKeyToValue(
        props.stateValues.trang_hien_thi,
        ["trang_chu", "trang_tim_kiem", "trang_chi_tiet", "danh_sach_du_an"],
        ["Trang chủ", "Trang tìm kiếm", "Trang chi tiết", "Danh sách dự án"]
    );

    return (
        <div className="post_campaign--left-form">
            <RenderInput
                nameId={"ma_chien_dich"}
                title={"Mã chiến dịch"}
                type={"text"}
                value={stateValues.ma_chien_dich}
                className={"post_campaign--input"}
                OnChangeInput={props.OnChangeInput}
            />

            <RenderSelect
                nameId={"ma_bai_dang"}
                title={"Mã bài đăng"}
                keys={PostIdKeys}
                values={PostIdValues}
                selectedValue={stateValues.ma_bai_dang}
                OnChangeSelect={props.OnChangeInput}
                className={"input--select"}
            />

            <RenderSelect
                nameId={"loai_dich_vu"}
                title={"Loại dịch vụ"}
                keys={AdsAreaIdsKeys}
                values={AdsAreaIdsValues}
                selectedValue={props.stateValues.loai_dich_vu}
                OnChangeSelect={props.OnChangeInput}
                className={"input--select"}
            />

            <RenderInput
                nameId={"trang_hien_thi"}
                title={"Trang hiển thị"}
                type={"text"}
                value={trang_hien_thi}
                className={"post--input"}
                isReadOnly={1}
                OnChangeInput={props.OnChangeInput}
            />

            <RenderSelect
                nameId={"co_che_hien_thi"}
                title={"Cơ chế hiển thị"}
                keys={["doc_quyen", "co_dinh_vi_tri", "chia_se_co_dinh", "ngau_nhien"]}
                values={["Độc quyền", "Cố định vị trí", "Chia sẻ cố định", "Ngẫu nhiên"]}
                selectedValue={stateValues.co_che_hien_thi}
                OnChangeSelect={props.OnChangeInput}
                className={"input--select"}
            />

            <RenderSelect
                nameId={"tinh_gia_theo"}
                title={"Tính giá theo"}
                keys={["ngay", "click", "view"]}
                values={["Ngày", "Click", "View"]}
                selectedValue={stateValues.tinh_gia_theo}
                OnChangeSelect={props.OPostCampaignCreatorUpdaternChangeInput}
                className={"input--select"}
            />

            <RenderSelect
                nameId={"khung_gio_hien_thi"}
                title={"Khung giờ hiển thị"}
                keys={["2h-4h", "4h-6h", "6h-8h"]}
                values={["2h-4h", "4h-6h", "6h-8h"]}
                selectedValue={khung_gio_hien_thi}
                OnChangeSelect={props.OnChangeInput}
                className={"input--select"}
            />

            <RenderInput
                nameId={"lnt_tinh"}
                title={"Tỉnh thành"}
                value={stateValues.lnt_tinh}
                type={"input"}
                className={"post_campaign--input"}
                OnChangeInput={props.OnChangeInput}
            />

            <RenderInput
                nameId={"lnt_quan_huyen"}
                title={"Quận huyện"}
                value={stateValues.lnt_quan_huyen}
                type={"input"}
                className={"post_campaign--input"}
                OnChangeInput={props.OnChangeInput}
            />

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
                className={"post_campaign--input"}
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

            <RenderInput
                nameId={"don_gia_co_ban"}
                title={"Đơn giá cơ bản"}
                value={stateValues.don_gia_co_ban}
                type={"number"}
                className={"post_campaign--input"}
                OnChangeInput={props.OnChangeInput}
            />

            <RenderInput
                nameId={"thanh_tien"}
                title={"Thành tiền"}
                value={stateValues.thanh_tien}
                type={"number"}
                className={"post_campaign--input"}
                OnChangeInput={props.OnChangeInput}
                isReadOnly={1}
            />

            <RenderSelect
                nameId={"ma_khuyen_mai"}
                title={"Mã khuyến mãi"}
                keys={PromotionIdsKeys}
                values={PromotionIdsValues}
                selectedValue={stateValues.ma_khuyen_mai}
                OnChangeSelect={props.OnChangeInput}
                className={"input--select"}
            />

            <RenderInput
                nameId={"tong_cong"}
                title={"Tổng cộng"}
                value={stateValues.tong_cong}
                type={"number"}
                className={"post_campaign--input"}
                OnChangeInput={props.OnChangeInput}
                isReadOnly={1}
            />
        </div>
    );
}

function RenderRightForm(props) {
    return (
        <div className="post_campaign--right-form">
            {/* <RenderInput
                nameId={"tong_cong"}
                title={"Tổng cộng"}
                type={"number"}
                className={"post_campaign--input"}
                OnChangeInput={props.OnChangeInput}
                isReadOnly={1}
            /> */}
        </div>
    )
}

class RenderProperties extends Component {
    render() {
        return (
            <div>
                <div className="left_border">
                    {/* <RenderLeftForm
                        OnChangeInput={this.props.OnChangeInput}
                        OnchangeStartDate={this.props.OnchangeStartDate}
                        OnchangeEndDate={this.props.OnchangeEndDate}
                    /> */}
                    {"fef"}
                </div>
                {/* <div className="vertical_line" style="height: 45px;"></div> */}

                <div className="right_border">
                    <RenderRightForm
                    />
                </div>
            </div>
        );
    }
}

class PostCampaignCreatorUpdaterForm extends Component {
    constructor(props) {
        super(props);

        this.OnChangeInput = this.OnChangeInput.bind(this);
        this.OnchangeStartDate = this.OnchangeStartDate.bind(this);
        this.OnchangeEndDate = this.OnchangeEndDate.bind(this);
        this.OnKeyDown = this.OnKeyDown.bind(this);
    }

    OnKeyDown(event) {
        // console.log(event);
        if (event.keyCode === 27) {
            //Do whatever when esc is pressed
            this.props.handleClosePopup();
        }
    }

    OnChangeInput(e) {
        var name = e.target.name;
        var value = e.target.value;
        var jsonState = { [name]: value };

        if (name === "khung_gio_hien_thi") {
            value = TransferTimeLogStringToJson(value);
        }

        if (name === "loai_dich_vu") {
            var stateValues = this.props.stateValues;
            var adsAreaKeys = stateValues.AdsAreaIds.keys;
            var appliedPageTypeKeys = stateValues.AdsAreaIds.appliedPageTypeKeys;
            var indexOfValueInKeys = adsAreaKeys.indexOf(value);

            var appliedPageType = appliedPageTypeKeys[indexOfValueInKeys];
            jsonState.trang_hien_thi = appliedPageType;
        }
    }

    OnchangeStartDate(date) {
        var jsonState = { "ngay_bat_dau": date }
        this.props.UpdateState(jsonState);
        let ngay_ket_thuc = new Date();
        let thoi_luong_ap_dung = this.props.stateValues.thoi_luong_ap_dung;
        ngay_ket_thuc.setDate(this.props.stateValues.ngay_ket_thuc.getDate() + parseInt(thoi_luong_ap_dung));
        this.OnchangeEndDate(ngay_ket_thuc);
    }

    OnchangeEndDate(date) {

        let ngay_bat_dau = this.props.stateValues.ngay_bat_dau;
        let thoi_luong = new Date(date - ngay_bat_dau).getDate();
        console.log(thoi_luong);
        if (parseInt(date.getTime() - ngay_bat_dau.getTime()) >= 0) {
            var jsonState = { "ngay_ket_thuc": date, "thoi_luong_ap_dung": thoi_luong };
            this.props.UpdateState(jsonState);
        }

        // this.props.UpdateState({"thoi_luong_ap_dung": new Date(date - ngay_bat_dau).getDate()});
    }

    componentDidMount() {
        document.addEventListener("keydown", this.OnKeyDown, false);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.OnKeyDown, false);
    }

    render() {
        return (
            <div>
                <div>
                    <RenderProperties
                        OnChangeInput={this.OnChangeInput}
                        OnchangeStartDate={this.OnchangeStartDate}
                        OnchangeEndDate={this.OnchangeEndDate}
                    />
                </div>
                <div>
                    <div className="submit">
                        <button className="btn btn-primary">Save</button>
                        <button className="btn btn-primary">Cancel</button>
                    </div>
                </div>
            </div>
        );
    }
}

class XPostCampaign extends Component {
    render() {
        var urlParams = new URLSearchParams(window.location.search);
        var modeAction = urlParams.get('modeAction');
        var XAdminUsername = urlParams.get('AdminUserAuthenticate');
        var USerOfXSysyemAccessToken = urlParams.get('userAccessToken');
        return (
            <PostCampaignCreatorUpdaterForm
            />
        );
    }
}

export default XPostCampaign;