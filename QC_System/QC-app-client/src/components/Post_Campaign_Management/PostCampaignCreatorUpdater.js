import React, { Component } from 'react';
import Request from 'superagent';
import UrlApi from '../share/UrlApi';
import { JsonDateToDate, DateToJsonDate, TransferTimeLogJsonToString, TransferTimeLogStringToJson } from '../share/Mapper';
import { RenderInput, RenderSelect, RenderDate } from '../share/InputsRender';
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
                keys={["doc_quyen", "co_dinh_vi_tri", "chia_se_vi_tri_co_dinh", "ngau_nhien"]}
                values={["Độc quyền", "Cố định vị trí", "Chia sẻ vị trí cố định", "Ngẫu nhiên"]}
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
                    <RenderLeftForm
                        OnChangeInput={this.props.OnChangeInput}
                        stateValues={this.props.stateValues}
                        OnchangeStartDate={this.props.OnchangeStartDate}
                        OnchangeEndDate={this.props.OnchangeEndDate}
                    />
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
        this.handleEscEvent = this.handleEscEvent.bind(this);
    }

    handleEscEvent(event) {
        // console.log(event);
        if(event.keyCode === 27) {
            //Do whatever when esc is pressed
            this.props.handleClosePopup();
        }
    }

    OnChangeInput(e) {
        var name = e.target.name;
        var value = e.target.value;
        var jsonState = { [name]: value };

        if(name === "khung_gio_hien_thi") {
            value = TransferTimeLogStringToJson(value);
        }

        // if (name === "thoi_luong_ap_dung" ) {
        //     if (value !== "") {
        //         var ngay_bat_dau = this.props.stateValues.ngay_bat_dau;
        //         let ngay_ket_thuc = new Date();
        //         ngay_ket_thuc.setDate(ngay_bat_dau.getDate() + parseInt(value));
        //         this.OnchangeEndDate(ngay_ket_thuc);
        //     }
        // }

        if (name === "loai_dich_vu") {
            var stateValues = this.props.stateValues;
            var adsAreaKeys = stateValues.AdsAreaIds.keys;
            var appliedPageTypeKeys = stateValues.AdsAreaIds.appliedPageTypeKeys;
            var indexOfValueInKeys = adsAreaKeys.indexOf(value);

            var appliedPageType = appliedPageTypeKeys[indexOfValueInKeys];
            jsonState.trang_hien_thi = appliedPageType;
        }

        
        this.props.UpdateState(jsonState);
    }

    OnchangeStartDate(date) {
        var jsonState = { "ngay_bat_dau": date }
        this.props.UpdateState(jsonState);
        let ngay_ket_thuc = new Date();
        let thoi_luong_ap_dung = this.props.stateValues.thoi_luong_ap_dung;
        ngay_ket_thuc.setDate(this.props.stateValues.ngay_ket_thuc.getDate() + parseInt(thoi_luong_ap_dung, 10), 10);
        this.OnchangeEndDate(ngay_ket_thuc);
    }

    OnchangeEndDate(date) {
        
        let ngay_bat_dau = this.props.stateValues.ngay_bat_dau;
        let thoi_luong = new Date(date - ngay_bat_dau).getDate();
        console.log(thoi_luong);
        if (parseInt(date.getTime() - ngay_bat_dau.getTime(), 10) >= 0) {
            var jsonState = { "ngay_ket_thuc": date, "thoi_luong_ap_dung": thoi_luong };
            this.props.UpdateState(jsonState);
        }
        
        // this.props.UpdateState({"thoi_luong_ap_dung": new Date(date - ngay_bat_dau).getDate()});
    }

    componentDidMount(){
        document.addEventListener("keydown", this.handleEscEvent, false);
    }

    componentWillUnmount(){
        document.removeEventListener("keydown", this.handleEscEvent, false);
    }

    render() {
        return (
            <div className='popup_inner postcampaign_createform_size div_scroll_bar'>
                <div className='pop_up_inner_header'>
                    <h2>{this.props.titleForm}</h2>
                </div>
                <div className='pop_up_inner_body'>
                    <RenderProperties
                        OnChangeInput={this.OnChangeInput}
                        OnchangeStartDate={this.OnchangeStartDate}
                        OnchangeEndDate={this.OnchangeEndDate}
                        stateValues={this.props.stateValues}
                    />
                </div>
                <div className='pop_up_inner_footer'>
                    <div className="submit">
                        <button className="btn btn-primary" onClick={this.props.handleSubmit}>Save</button>
                        <button className="btn btn-primary" onClick={this.props.handleClosePopup}>Cancel</button>
                    </div>
                </div>   
            </div>
        );
    }
}

class PostCampaignCreatorUpdater extends Component {
    constructor(props) {
        super(props);

        var jsonState = {};
        this.state = this.SetInitState(jsonState);
        this.GetAdsAreaInfos();
        this.GetPostId();
        this.GetPromotionIdInfos();
    }

    GetAdsAreaInfos() {
        var $this = this;
        Request.get(UrlApi.GetAdsAreaInfo)
            .then((res) => {
                var _ids = [];
                var adsAreaIdkeys = [];
                var adsAreaIdvalues = [];
                var appliedPageTypeKeys = [];

                res.body.forEach((adsArea) => {
                    _ids.push(adsArea._id);
                    adsAreaIdkeys.push(adsArea.ma_dich_vu);
                    adsAreaIdvalues.push(adsArea.ten_hien_thi);
                    appliedPageTypeKeys.push(adsArea.loai_trang_ap_dung);
                });

                var jsonAdsAreaIds = {
                    AdsAreaIds: {
                        _ids: _ids,
                        keys: adsAreaIdkeys,
                        values: adsAreaIdvalues,
                        appliedPageTypeKeys: appliedPageTypeKeys
                    }
                };
                if (this.props.modeAction === "create") {
                    jsonAdsAreaIds.ma_dich_vu = adsAreaIdkeys[0];
                    jsonAdsAreaIds.trang_hien_thi = appliedPageTypeKeys[0];
                }
                $this.setState(jsonAdsAreaIds);
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

    GetPostId() {
        // Hardcode here to test
        this.setState({
            PostIds: {
                PostIdKeys: ["bd1", "bd2", "bd3"],
                PostIdValues: ["Bài đăng 1", "Bài đăng 2", "Bài đăng 3"]
            }
        });
    }

    SetInitState(jsonState) {
        if (this.props.modeAction === "create") {
            jsonState.ma_chien_dich = "";
            jsonState.ma_bai_dang = "bd1";
            // jsonState.loai_dich_vu = "";
            jsonState.co_che_hien_thi = "doc_quyen";
            jsonState.tinh_gia_theo = "ngay";
            jsonState.vi_tri = {
                tinh: "",
                quan_huyen: ""
            }
            jsonState.khung_gio_hien_thi = {
                bat_dau: 2,
                ket_thuc: 4
            }
            jsonState.thoi_luong_ap_dung = 1;
            jsonState.don_gia_co_ban = 0;
            var today = new Date();
            let tomorrow = new Date();
            tomorrow.setDate(today.getDate() + jsonState.thoi_luong_ap_dung);
            jsonState.ngay_bat_dau = (today);
            jsonState.ngay_ket_thuc = (tomorrow);
            jsonState.thanh_tien = 0;
            jsonState.tong_cong = 0;
            jsonState.ma_khuyen_mai = "";
        }
        else {
            var editContents = this.props.editContents;

            jsonState.ma_chien_dich = editContents.ma_chien_dich;
            jsonState.ma_bai_dang = editContents.ma_bai_dang;
            jsonState.ma_khuyen_mai = editContents.ma_khuyen_mai;
            jsonState.co_che_hien_thi = editContents.co_che_hien_thi;
            jsonState.tinh_gia_theo = editContents.tinh_gia_theo;
            jsonState.don_gia_co_ban = editContents.don_gia_co_ban;
            jsonState.thanh_tien = editContents.thanh_tien;
            jsonState.tong_cong = editContents.tong_cong;

            jsonState.start_date = JsonDateToDate(editContents.start_date);
            jsonState.end_date = JsonDateToDate(editContents.end_date);

            var loai_nhan_to = editContents.loai_nhan_to;
            if(loai_nhan_to !== undefined && loai_nhan_to !== null) {
                if(loai_nhan_to.thoi_luong !== undefined && loai_nhan_to.thoi_luong !== null) {
                    jsonState.lnt_thoi_luong = loai_nhan_to.thoi_luong;
                }
                jsonState.khung_gio_hien_thi = loai_nhan_to.khung_gio;
                if(loai_nhan_to.vi_tri !== undefined && loai_nhan_to.vi_tri !== null) {
                    jsonState.lnt_tinh = loai_nhan_to.vi_tri.tinh;
                    jsonState.lnt_quan_huyen = loai_nhan_to.vi_tri.quan_huyen;
                }
            }
        }

        return jsonState;
    }

    handleUpdateState(jsonState) {
        this.setState(jsonState);
    }

    GetModelStateJson() {
        var state = this.state;
        console.log(state);
        
        var startDateJson = DateToJsonDate(state.ngay_bat_dau);
        var endDateJson = DateToJsonDate(state.ngay_ket_thuc);

        var loai_nhan_to = {
            khung_gio: state.khung_gio_hien_thi
        };
        if (state.lnt_thoi_luong !== undefined && state.lnt_thoi_luong !== null && parseInt(state.lnt_thoi_luong, 10) !== 0) {
            loai_nhan_to.thoi_luong = state.lnt_thoi_luong;
        }
       
        var postCampaignContent = {
            ma_chien_dich: state.ma_chien_dich,
            ma_bai_dang: state.ma_bai_dang,
            loai_dich_vu: state.loai_dich_vu,
            trang_hien_thi: state.trang_hien_thi,
            co_che_hien_thi: state.co_che_hien_thi,
            tinh_gia_theo: state.tinh_gia_theo,
            vi_tri: state.vi_tri,
            khung_gio_hien_thi: state.khung_gio_hien_thi,
            ngay_bat_dau: startDateJson,
            ngay_ket_thuc: endDateJson,
            don_gia_co_ban: state.don_gia_co_ban,
            thanh_tien: state.thanh_tien,
            ma_khuyen_mai: state.ma_khuyen_mai,
            tong_cong: state.tong_cong,
            dang_kich_hoat: 1
        };

        if(state.lnt_tinh !== undefined && state.lnt_tinh !== null && state.lnt_tinh !== "") {
            var vi_tri = {};
            vi_tri.tinh = state.lnt_tinh;
            if(state.lnt_quan_huyen !== undefined && state.lnt_quan_huyen !== null && state.lnt_quan_huyen !== "") {
                vi_tri.quan_huyen = state.lnt_quan_huyen;
            }

            postCampaignContent["vi_tri"] = vi_tri;
        }

        return postCampaignContent;
    }

    CreatePostCampaign() {
        var postCampaignContent = this.GetModelStateJson();
 
        var $this = this;
        Request.post(UrlApi.PostCampaignManagement)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send(postCampaignContent)
            .end(function (err, res) {
                $this.props.closeCreatorUpdaterPopup();
                $this.props.resetContentState();
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
        if (this.props.modeAction === "create") {
            this.CreatePostCampaign();
        }
        else {
            this.EditPostCampaign();
        }
    }

    render() {
        var titleForm = this.props.modeAction === "create" ? "Tạo chiến dịch tin đăng" : "Chỉnh sửa chiến dịch tin đăng";
        return (
            <div className='popup'>
                <PostCampaignCreatorUpdaterForm
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

export default PostCampaignCreatorUpdater;