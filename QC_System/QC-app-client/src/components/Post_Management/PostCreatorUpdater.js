import React, { Component } from 'react';
import Request from 'superagent';
import DatePicker from 'react-date-picker';
import UrlApi from '../share/UrlApi';
import { JsonDateToDate, DateToJsonDate, TransferTimeLogJsonToString, TransferTimeLogStringToJson } from '../share/Mapper';
import { RenderInput, RenderSelect, RenderRadioButon, RenderDate } from '../share/InputsRender';
import { ImageVideoUpload } from '../share/ImageGallery/ImageVideoUpload';

function RenderLeftForm(props) {

    return (
        <div className="post--left-form">
            <label>Chọn dịch vụ quảng cáo</label>

            <RenderInput
                nameId={"ma_bai_dang"}
                title={"Mã bài đăng"}
                type={"text"}
                value={props.stateValues.ma_bai_dang}
                className={"post--input"}
                OnChangeInput={props.OnChangeInput}
            />

            <RenderSelect
                nameId={"ma_dich_vu"}
                title={"Mã dịch vụ"}
                keys={["dv1", "dv2"]}
                values={["dv1", "dv2"]}
                selectedValue={props.stateValues.ma_dich_vu}
                OnChangeSelect={props.OnChangeInput}
                className={"input--select"}
            />

            <RenderInput
                nameId={"trang_hien_thi"}
                title={"Trang hiển thị"}
                type={"text"}
                value={props.stateValues.trang_hien_thi}
                className={"post--input"}
                isReadOnly={1}
                OnChangeInput={props.OnChangeInput}
            />

            <label>Thiết lập thông tin hiển thị</label>

            <RenderInput
                nameId={"tieu_de_hien_thi"}
                title={"Tiêu đề hiển thị"}
                type={"text"}
                value={props.stateValues.tieu_de_hien_thi}
                className={"post--input"}
                OnChangeInput={props.OnChangeInput}
            />

            <RenderInput
                nameId={"mo_ta_bai_dang"}
                title={"Mô tả tin được hiển thị"}
                type={"text"}
                value={props.stateValues.mo_ta_bai_dang}
                className={"post--input"}
                OnChangeInput={props.OnChangeInput}
            />

            <ImageVideoUpload
                upload_uri={UrlApi.Upload}
                base_uri={UrlApi.Base}
                Onchange={props.OnchangeImage}
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
                    OnchangeImage={this.props.OnchangeImage}
                    stateValues={this.props.stateValues}
                />
                {/* <RenderRightForm
                    OnChangeInput={this.props.OnChangeInput}
                    OnchangeStartDate={this.props.OnchangeStartDate}
                    OnchangeEndDate={this.props.OnchangeEndDate}

                    stateValues={this.props.stateValues}
                /> */}
            </div>
        );
    }
}

class PostCreatorUpdaterForm extends Component {
    constructor(props) {
        super(props);

        this.OnChangeInput = this.OnChangeInput.bind(this);
        this.OnchangeImage = this.OnchangeImage.bind(this);

        // this.OnchangeStartDate = this.OnchangeStartDate.bind(this);
        // this.OnchangeEndDate = this.OnchangeEndDate.bind(this);
    }

    OnChangeInput(e) {
        var name = e.target.name;
        var value = e.target.value;

        var jsonState = { [name]: value };
        this.props.UpdateState(jsonState);
    }

    OnchangeImage(jsonState) {
        this.props.UpdateState(jsonState);
    }

    render() {
        return (
            <div className='popup_inner--promotion'>
                <h1>{this.props.titleForm}</h1>
                <RenderProperties
                    OnChangeInput={this.OnChangeInput}
                    OnchangeImage={this.OnchangeImage}

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

class PostCreatorUpdater extends Component {
    constructor(props) {
        super(props);

        var jsonState = {};
        this.SetInitState(jsonState);
        this.state = jsonState;
    }

    SetInitState(jsonState) {
        if (this.props.modeAction === "create") {
            console.log("DO nothing");
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
    }

    handleUpdateState(jsonState) {
        this.setState(jsonState);
    }

    GetModelStateJson() {
        var state = this.state;
        var content = {
            ma_bai_dang: state.ma_bai_dang,
            ma_dich_vu: state.ma_dich_vu,
            trang_hien_thi: state.trang_hien_thi,
            tieu_de_hien_thi: state.tieu_de_hien_thi,
            mo_ta_bai_dang: state.mo_ta_bai_dang,
            anh_dai_dien: state.imageName
        };

        return content;
    }

    CreatePost() {
        var content = this.GetModelStateJson();
        console.log(content);

        var $this = this;
        Request.post(UrlApi.PostManagement)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send(content)
            .end(function (err, res) {
                $this.props.closeCreatorUpdaterPopup();
                $this.props.resetContentState();
            });
    }

    EditPost() {
        var postContent = this.GetModelStateJson();

        var url = UrlApi.PostManagement + "/" + this.props.editContents._id;
        var $this = this;
        Request.put(url)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send(postContent)
            .end(function (err, res) {
                $this.props.closeCreatorUpdaterPopup();
                $this.props.resetContentState();
            });
    }

    handleSubmit() {
        // console.log(this.state);
        // return;
        if (this.props.modeAction === "create") {
            this.CreatePost();
        }
        else {
            this.EditPost();
        }
    }

    render() {
        var titleForm = this.props.modeAction === "create" ? "Tạo chiến dịch tin đăng" : "Chỉnh sửa chiến dịch tin đăng";
        return (
            <div className='popup'>
                <PostCreatorUpdaterForm
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

export default PostCreatorUpdater;