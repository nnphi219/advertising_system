import React, { Component } from 'react';
import Request from 'superagent';
import DatePicker from 'react-date-picker';
import UrlApi from '../share/UrlApi';
import { JsonDateToDate, DateToJsonDate, TransferTimeLogJsonToString, TransferTimeLogStringToJson } from '../share/Mapper';
import { RenderInput, RenderSelect, RenderRadioButon, RenderDate } from '../share/InputsRender';

function RenderLeftForm(props) {
    var stateValues = props.stateValues;
    
    var lnt_khung_gio = TransferTimeLogJsonToString(stateValues.lnt_khung_gio);
    var PromotionIdsKeys = stateValues.PromotionIds === undefined ? [] : stateValues.PromotionIds.keys;
    var PromotionIdsValues = stateValues.PromotionIds === undefined ? [] : stateValues.PromotionIds.values;


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
                keys={["bd1", "bd2"]}
                values={["bd1", "bd2"]}
                selectedValue={stateValues.ma_bai_dang}
                OnChangeSelect={props.OnChangeInput}
                className={"input--select"}
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

            <RenderSelect
                nameId={"co_che_hien_thi"}
                title={"Cơ chế hiện thị"}
                keys={["doc_quyen", "co_dinh_vi_tri", "chia_se_co_dinh", "ngau_nhien"]}
                values={["Độc quyền", "Cố định vị trí", "Chia sẻ cố định", "Ngẫu nhiên"]}
                selectedValue={stateValues.co_che_hien_thi}
                OnChangeSelect={props.OnChangeInput}
                className={"input--select"}
            />

            <RenderSelect
                nameId={"tinh_gia_theo"}
                title={"Tính giá theo"}
                keys={["thoi_luong", "khung_gio", "vi_tri"]}
                values={["Thời lượng", "Khung giờ", "Vị trí"]}
                selectedValue={stateValues.tinh_gia_theo}
                OnChangeSelect={props.OnChangeInput}
                className={"input--select"}
            />

            <RenderInput
                nameId={"lnt_thoi_luong"}
                title={"Thời lượng"}
                value={stateValues.lnt_thoi_luong}
                type={"number"}
                className={"post_campaign--input"}
                OnChangeInput={props.OnChangeInput}
            />

            <RenderSelect
                nameId={"lnt_khung_gio"}
                title={"Khung giờ"}
                keys={["2h-4h", "4h-6h", "6h-8h"]}
                values={["2h-4h", "4h-6h", "6h-8h"]}
                selectedValue={lnt_khung_gio}
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
        </div>
    );
}

function RenderRightForm(props) {
    var stateValues = props.stateValues;

    return (
        <div className="post_campaign--right-form">
            <RenderInput
                nameId={"don_gia_co_ban"}
                title={"Đơn giá cơ bản"}
                value={stateValues.don_gia_co_ban}
                type={"number"}
                className={"post_campaign--input"}
                OnChangeInput={props.OnChangeInput}
            />

            <RenderDate
                nameId={"start_date"}
                title={"Ngày bắt đầu"}
                className={"input--date"}
                value={stateValues.start_date}
                OnchangeDate={props.OnchangeStartDate}
            />

            <RenderDate
                nameId={"end_date"}
                title={"Ngày kết thúc"}
                className={"input--date"}
                value={stateValues.end_date}
                OnchangeDate={props.OnchangeEndDate}
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

class RenderProperties extends Component {
    render() {
        return (
            <div>
                <RenderLeftForm
                    OnChangeInput={this.props.OnChangeInput}
                    stateValues={this.props.stateValues}
                />
                <RenderRightForm
                    OnChangeInput={this.props.OnChangeInput}
                    OnchangeStartDate={this.props.OnchangeStartDate}
                    OnchangeEndDate={this.props.OnchangeEndDate}

                    stateValues={this.props.stateValues}
                />
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
    }

    OnChangeInput(e) {
        var name = e.target.name;
        var value = e.target.value;

        if(name === "lnt_khung_gio") {
            value = TransferTimeLogStringToJson(value);
        }

        var jsonState = { [name]: value };
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

    render() {
        return (
            <div className='popup_inner postcampaign_createform_size div_scroll_bar'>
                <h1>{this.props.titleForm}</h1>
                <RenderProperties
                    OnChangeInput={this.OnChangeInput}
                    OnchangeStartDate={this.OnchangeStartDate}
                    OnchangeEndDate={this.OnchangeEndDate}

                    stateValues={this.props.stateValues}
                />
                <div className="submit">
                    <button className="btn btn-primary" onClick={this.props.handleSubmit}>Save</button>
                    <button className="btn btn-primary" onClick={this.props.handleClosePopup}>Cancel</button>
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
        this.GetPromotionIdInfos();
    }

    GetPromotionIdInfos() {
        var $this = this;
        Request.get(UrlApi.GetPromotionIdInfos)
            .then((res) => {
                var _ids = [];
                var keys = [];
                var values = [];
           
                res.body.map((promotion) => {
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

    SetInitState(jsonState) {
        if (this.props.modeAction === "create") {
            jsonState.ma_bai_dang = "bd1";
            jsonState.ma_khuyen_mai = "km1";
            jsonState.co_che_hien_thi = "doc_quyen";
            jsonState.tinh_gia_theo = "thoi_luong";
            jsonState.lnt_thoi_luong = 0;
            jsonState.lnt_khung_gio = {
                bat_dau: 2,
                ket_thuc: 4
            }

            jsonState.don_gia_co_ban = 0;
            var today = new Date();
            jsonState.start_date = today;
            jsonState.end_date = today;
            jsonState.thanh_tien = 0;
            jsonState.tong_cong = 0;
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
                jsonState.lnt_khung_gio = loai_nhan_to.khung_gio;
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

        var startDateJson = DateToJsonDate(state.start_date);
        var endDateJson = DateToJsonDate(state.end_date);

        var loai_nhan_to = {
            khung_gio: state.lnt_khung_gio
        };
        if (state.lnt_thoi_luong !== undefined && state.lnt_thoi_luong !== null && parseInt(state.lnt_thoi_luong) !== 0) {
            loai_nhan_to.thoi_luong = state.lnt_thoi_luong;
        }
       
        if(state.lnt_tinh !== undefined && state.lnt_tinh !== null && state.lnt_tinh !== "") {
            loai_nhan_to.vi_tri = {};
            loai_nhan_to.vi_tri.tinh = state.lnt_tinh;
            if(state.lnt_quan_huyen !== undefined && state.lnt_quan_huyen !== null && state.lnt_quan_huyen !== "") {
                loai_nhan_to.vi_tri.quan_huyen = state.lnt_quan_huyen;
            }
        }

        var postCampaignContent = {
            ma_chien_dich: state.ma_chien_dich,
            ma_bai_dang: state.ma_bai_dang,
            ma_khuyen_mai: state.ma_khuyen_mai,
            co_che_hien_thi: state.co_che_hien_thi,
            tinh_gia_theo: state.tinh_gia_theo,
            loai_nhan_to: loai_nhan_to,
            don_gia_co_ban: state.don_gia_co_ban,
            start_date: startDateJson,
            end_date: endDateJson,
            thanh_tien: state.thanh_tien,
            tong_cong: state.tong_cong
        };

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