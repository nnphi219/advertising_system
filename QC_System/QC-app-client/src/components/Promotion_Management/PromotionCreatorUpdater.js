import React, { Component } from 'react';
import Request from 'superagent';
import DatePicker from 'react-date-picker';
import UrlApi from '../share/UrlApi';
import { JsonDateToDate, DateToJsonDate } from '../share/Mapper';
import { RenderInput, RenderSelect, RenderRadioButon, RenderDate } from '../share/InputsRender';

class RenderProperties extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="promotion_information">
                <RenderInput
                    nameId={"ma_khuyen_mai"}
                    title={"Nhập mã khuyến mãi"}
                    type={"text"}
                    value={this.props.stateValues.ma_khuyen_mai}
                    className={"promotion--input"}
                    OnChangeInput={this.props.OnChangeInput}
                />

                <RenderInput
                    nameId={"mo_ta"}
                    title={"Mô tả khuyến mãi"}
                    type={"text"}
                    value={this.props.stateValues.mo_ta}
                    className={"promotion--input"}
                    OnChangeInput={this.props.OnChangeInput}
                />

                <RenderSelect
                    nameId={"ma_dich_vu_ap_dung"}
                    title={"Mã dịch vụ quảng cáo"}
                    keys={["VIPHOME1", "VIPHOME2"]}
                    values={["VIPHOME1", "VIPHOME2"]}
                    selectedValue={this.props.stateValues.ma_dich_vu_ap_dung}
                    OnChangeSelect={this.props.OnChangeSelect}
                    className={"input--select"}
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
                    value={this.props.stateValues.gia_tri}
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
            <div className='popup_inner--promotion'>
                <h1>{this.props.titleForm}</h1>
                <RenderProperties
                    OnChangeInput={this.OnChangeInput}
                    OnChangeSelect={this.OnChangeSelect}
                    OnChangeRadioButton={this.OnChangeRadioButton}
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

class PromotionCreatorUpdater extends Component {
    constructor(props) {
        super(props);

        var jsonState = {};
        this.SetInitState(jsonState);
        this.state = jsonState;
    }

    SetInitState(jsonState) {
        if (this.props.modeAction === "create") {
            jsonState.ma_dich_vu_ap_dung = "VIPHOME1";
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
    }

    handleUpdateState(jsonState) {
        this.setState(jsonState);
    }

    GetModelStateJson() {
        var state = this.state;

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

        return promotionContent;
    }

    CreatePromotion() {
        var promotionContent = this.GetModelStateJson();

        var $this = this;
        Request.post(UrlApi.PromotionManagement)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send(promotionContent)
            .end(function (err, res) {
                $this.props.closeCreatorUpdaterPopup();
                $this.props.resetContentState();
            });
    }

    EditPromotion() {
        var promotionContent = this.GetModelStateJson();

        var url = UrlApi.PromotionManagement + "/" + this.props.editContents._id;
        var $this = this;
        Request.put(url)
            .set('Content-Type', 'application/x-www-form-urlencoded')
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
                />
            </div>
        );
    }
}

export default PromotionCreatorUpdater;