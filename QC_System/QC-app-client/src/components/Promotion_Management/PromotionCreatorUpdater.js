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
                    value={""}
                    className={"promotion--input"}
                    OnChangeInput={this.props.OnChangeInput}
                />

                <RenderInput
                    nameId={"mo_ta"}
                    title={"Mô tả khuyến mãi"}
                    value={""}
                    className={"promotion--input"}
                    OnChangeInput={this.props.OnChangeInput}
                />

                <RenderSelect
                    nameId={"ma_dich_vu_ap_dung"}
                    title={"Mã dịch vụ quảng cáo"}
                    keys={["VIPHOME1", "VIPHOME2"]}
                    values={["VIPHOME1", "VIPHOME2"]}
                    selectedValue={"VIPHOME1"}
                    OnChangeSelect={this.props.OnChangeSelect}
                    className={"input--select"}
                />

                <RenderRadioButon
                    nameId={"loai_gia"}
                    title={"Mức giá áp dụng"}
                    keys={[1, 0]}
                    values={["Phần trăm", "Giá trị"]}
                    selectedValue={1}
                    OnChangeSelect={this.props.OnChangeSelect}
                    className={"input-radio"}
                />
                <RenderInput
                    nameId={"gia_tri"}
                    value={""}
                    className={"promotion--input"}
                    OnChangeInput={this.props.OnChangeInput}
                />

                <RenderDate
                    nameId={"start_date"}
                    title={"Ngày bắt đầu"}
                    className={"input--date"}
                />

                <RenderDate
                    nameId={"end_date"}
                    title={"Ngày kết thúc"}
                    className={"input--date"}
                />
            </div>
        );
    }
}

class PromotionCreatorUpdaterForm extends Component {
    constructor(props) {
        super(props);

        // this.OnChangeInput = this.OnChangeInput.bind(this);
        // this.OnChangeSelect = this.OnChangeSelect.bind(this);
        // this.OnChangeRadioButton = this.OnChangeRadioButton.bind(this);

        // this.OnchangeStartDate = this.OnchangeStartDate.bind(this);
        // this.OnchangeEndDate = this.OnchangeEndDate.bind(this);
    }

    render() {
        return (
            <div className='popup_inner--promotion'>
                <h1>{this.props.titleForm}</h1>
                <RenderProperties
                    // OnChangeInput={this.OnChangeInput}
                    // OnChangeSelect={this.OnChangeSelect}
                    // OnChangeRadioButton={this.OnChangeRadioButton}
                    // OnchangeStartDate={this.OnchangeStartDate}
                    // OnchangeEndDate={this.OnchangeEndDate}

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
    s
    constructor(props) {
        super(props);

        var jsonState = {};
        this.SetInitState(jsonState);
        this.state = jsonState;
    }

    SetInitState(jsonState) {
    }

    handleUpdateState(jsonState) {
        this.setState(jsonState);
    }

    GetModelStateJson() {
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