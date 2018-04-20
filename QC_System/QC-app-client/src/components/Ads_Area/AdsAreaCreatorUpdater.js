import React, { Component } from 'react';
import Request from 'superagent';
import ColorPickerInput from '../share/color_picker_input';
import UrlApi from '../share/UrlApi';
import { RenderSelect, RenderInput } from '../share/InputsRender';
import './ads_area.css';

function TransferSizeToString(size) {
    return size.width + "x" + size.height;
}

function AdsAreaRenderInput(props) {
    var classNameInput = "adsarea--input";
    if (props.inputData.type === "textbox") {
        classNameInput += (props.errorTitle !== undefined && props.errorTitle !== "") ? " input--required" : "";
    }
    if (props.inputData.type === "number") {
        if (parseFloat(props.valueInput) <= 0) {
            classNameInput += (props.errorTitle !== undefined && props.errorTitle !== "") ? " input--required" : "";
        }
    }
    console.log(props.inputData.id + " " + props.isReadOnly);
    return (
        <div>
            <label key={props.inputData.id} className="fullwidth">
                {props.inputData.description}
                <p style={{ color: "red", marginTop: "3px" }}>{props.errorTitle}</p>
                <input type={props.inputData.type} id={props.inputData.id} key={props.inputData.id} value={props.valueInput} className={classNameInput} name={props.inputData.id} onChange={props.handleOnchangeInput} readOnly={props.isReadOnly} />
            </label>
        </div>
    );
}

function RenderDoubleInputs(props) {
    var sub_ids = props.inputData.sub_ids;
    var sub_titles = props.inputData.sub_titles;
    var sub_types = props.inputData.sub_types;
    var stateValues = props.stateValues;

    return (
        <div>
            <label key={props.inputData.id} className="fullwidth">
                {props.inputData.description}
                <div>
                    <RenderInput
                        nameId={sub_ids[0]}
                        title={sub_titles[0]}
                        type={sub_types[0]}
                        value={stateValues[sub_ids[0]]}
                        divClass={"float-left"}
                        className={"adsarea--input"}
                        OnChangeInput={props.OnChangeInput}
                    />
                    <RenderInput
                        nameId={sub_ids[1]}
                        title={sub_titles[1]}
                        type={sub_types[1]}
                        value={stateValues[sub_ids[1]]}
                        divClass={"float-left"}
                        className={"adsarea--input"}
                        OnChangeInput={props.OnChangeInput}
                    />
                </div>
            </label>
        </div>
    );
}

function RenderCombobox(props) {
    var count = 0;

    var selectedValue = props.stateValues[props.inputData.id];
    if (AreaCombobox.includes(props.inputData.id)) {
        selectedValue = TransferSizeToString(selectedValue);
    }
    var keys = [];
    var values = [];

    if (props.inputData.id === "loai_trang_ap_dung") {
        keys = props.stateValues.AppliedPages.keys;
        values = props.stateValues.AppliedPages.values;
    } else if (props.inputData.id === "loai_bai_dang_ap_dung") {
        keys = props.stateValues.AppliedPostTypes.keys;
        values = props.stateValues.AppliedPostTypes.values;
    }
    else if (props.inputData.id === "font_tieu_de") {
        keys = props.stateValues.FontFamilies.keys;
        values = props.stateValues.FontFamilies.values;
        var stylesCss = keys.map((key) => {
            return {
                "fontFamily": key
            }
        });

        return (
            <RenderSelect
                nameId={props.inputData.id}
                title={props.inputData.description}
                keys={keys}
                values={values}
                stylesCss={stylesCss}
                selectedValue={selectedValue}
                OnChangeSelect={props.handleOnchangeSelect}
                className={"adsarea--select"}
            />
        );
    }
    else {
        keys = props.inputData.keys;
        values = props.inputData.values;
    }

    return (
        <RenderSelect
            nameId={props.inputData.id}
            title={props.inputData.description}
            keys={keys}
            values={values}
            selectedValue={selectedValue}
            OnChangeSelect={props.handleOnchangeSelect}
            className={"adsarea--select"}
        />
    );
}

function RenderRadioButton(props) {
    var radioRender = [];
    var radioData = props.inputData;

    radioData.values.forEach((value, index) => {
        var radioButton = null;

        if (radioData.keys[index] === props.keySelectedItem) {
            radioRender.push(
                <div key={props.inputData.keys[index]} className="adsarea-radio">
                    <input type="radio" value={radioData.keys[index]} key={radioData.keys[index]} name={radioData.id} defaultChecked />
                    {value}
                </div>
            );
        }
        else {
            radioRender.push(
                <div key={props.inputData.keys[index]} className="adsarea-radio">
                    <input type="radio" value={radioData.keys[index]} key={radioData.keys[index]} name={radioData.id} />
                    {value}
                </div>
            );
        }

        radioRender.push(radioButton);
    });
    return (
        <div key={props.inputData.id} name={props.inputData.id} onChange={props.handleOnchangeRadioButton}>
            <label className="fullwidth">{props.inputData.description}</label>
            {radioRender}
        </div>
    );
}

function RenderProperties(props) {
    var inputs = [];
    props.inputDatas.forEach(element => {
        if (element.type === "color") {
            var valueColor = props.stateValues[element.id];
            inputs.push(<ColorPickerInput key={element.id} valueColor={valueColor} inputData={element} handleOnchangeColor={props.handleOnchangeColor} />);
        }
        else if (element.type === "combobox") {
            inputs.push(<RenderCombobox key={element.id} inputData={element} stateValues={props.stateValues} handleOnchangeSelect={props.handleOnchangeSelect} />);
        }
        else if (element.type === "radio") {
            var keySelectedItem = props.stateValues[element.id];
            inputs.push(<RenderRadioButton key={element.id} inputData={element} keySelectedItem={keySelectedItem} handleOnchangeRadioButton={props.handleOnchangeRadioButton} />);
        }
        else if (element.type === "double_inputs") {
            inputs.push(<RenderDoubleInputs inputData={element} stateValues={props.stateValues} OnChangeInput={props.handleOnchangeInput} />);
        }
        else {
            var valueInput = props.stateValues[element.id];
            var errorTitle = props.stateValues[element.errorTitleName];
            var isReadOnly = false;
            if (element.id === "ma_dich_vu") {
                isReadOnly = props.stateValues.ma_dich_vu_isReadOnly;
            }
            inputs.push(<AdsAreaRenderInput
                key={element.id}
                inputData={element}
                valueInput={valueInput}
                errorTitle={errorTitle}
                isReadOnly={isReadOnly}

                handleOnchangeInput={props.handleOnchangeInput}
            />);
        }
    });

    return (
        <div>
            {inputs}
        </div>
    );
}

class AdsAreaCreatorForm extends Component {
    constructor(props) {
        super(props);

        this.handleClosePopup = this.handleClosePopup.bind(this);
        this.handleOnchangeInput = this.handleOnchangeInput.bind(this);
        this.handleOnchangeSelect = this.handleOnchangeSelect.bind(this);
        this.handleOnchangeRadioButton = this.handleOnchangeRadioButton.bind(this);
        this.handleOnchangeColor = this.handleOnchangeColor.bind(this);
    }

    handleClosePopup() {
        this.props.handleClosePopup();
    }

    handleOnchangeInput(e) {
        var name = e.target.name;
        var value = e.target.value;
        this.props.handleUpdateState({ [name]: value });
    }

    handleOnchangeSelect(e) {
        var name = e.target.name;
        var value = e.target.value;

        this.props.handleUpdateState({ [name]: value });
    }

    handleOnchangeRadioButton(e) {
        this.props.handleUpdateState({
            [e.target.name]: e.target.value
        });
    }

    handleOnchangeColor(id, hexColor) {
        this.props.handleUpdateState({
            [id]: hexColor
        });
    }

    render() {
        return (
            <div className='popup_inner adsarea_createform_size'>
                <div>
                    <div>
                        <a class="close popup-button-close adsarea_margin_button-close" onClick={this.handleClosePopup}>×</a>
                        <h1>{this.props.titleForm}</h1>
                    </div>
                    <div key="left" className="adsarea_information_left">
                        <h2>Thông tin vùng quảng cáo</h2>
                        <RenderProperties
                            inputDatas={this.props.adsAreaInformationInputs}
                            handleOnchangeInput={this.handleOnchangeInput}
                            handleOnchangeSelect={this.handleOnchangeSelect}
                            handleOnchangeRadioButton={this.handleOnchangeRadioButton}
                            handleOnchangeColor={this.handleOnchangeColor}
                            stateValues={this.props.stateValues}
                        />
                    </div>

                    <div key="right" className="adsarea_information_right">
                        <h2>Đặc tả của vùng</h2>
                        <RenderProperties
                            inputDatas={this.props.adsAreaDescriptionInputs}
                            handleOnchangeInput={this.handleOnchangeInput}
                            handleOnchangeSelect={this.handleOnchangeSelect}
                            handleOnchangeRadioButton={this.handleOnchangeRadioButton}
                            handleOnchangeColor={this.handleOnchangeColor}
                            stateValues={this.props.stateValues}
                        />
                    </div>
                </div>
                <div className="submit">
                    <button className="btn btn-primary" onClick={this.props.handleSubmit}>Save</button>
                    <button className="btn btn-primary" onClick={this.handleClosePopup}>Cancel</button>
                </div>
            </div>
        );
    }
}

class AdsAreaCreatorUpdater extends Component {
    constructor(props) {
        super(props);
        var jsonState = {
            AppliedPages: {
                keys: [],
                values: []
            },
            AppliedPostTypes: {
                keys: [],
                values: []
            },
            FontFamilies: {
                keys: [],
                values: []
            },
            ktv_chieu_rong: 0,
            ktv_chieu_cao: 0
        };

        jsonState = this.SetInitState(adsAreaInformationInputs, jsonState);
        jsonState = this.SetInitState(adsAreaDescriptionInputs, jsonState);
        this.state = this.SetInitError(jsonState);

        this.GetAppliedPages();
        this.GetAppliedPostTypes();
        this.GetFontFamilies();

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUpdateState = this.handleUpdateState.bind(this);
    }

    GetAppliedPages() {
        var $this = this;
        var x_urlapi = localStorage.getItem("x-urlapi");

        Request.get(x_urlapi + "/getPages")
            .then((res) => {
                var _ids = [];
                var keys = [];
                var values = [];
                if (res.body) {
                    res.body.map((appliedPage) => {
                        _ids.push(appliedPage._id);
                        keys.push(appliedPage.ma_trang_quang_cao);
                        values.push(appliedPage.ten_trang_quang_cao);
                    });
                }


                var jsonAppliedPages = {
                    AppliedPages: {
                        _ids: _ids,
                        keys: keys,
                        values: values
                    },

                };
                if (this.props.modeAction === "create") {
                    jsonAppliedPages.loai_trang_ap_dung = keys[0];
                }

                $this.setState(jsonAppliedPages);
            });
    }

    GetAppliedPostTypes() {
        var $this = this;
        var x_urlapi = localStorage.getItem("x-urlapi");

        Request.get(x_urlapi + "/getPostTypes")
            .then((res) => {
                var _ids = [];
                var keys = [];
                var values = [];

                if (res.body) {
                    res.body.map((appliedPostType) => {
                        _ids.push(appliedPostType._id);
                        keys.push(appliedPostType.ma_loai_bai_dang);
                        values.push(appliedPostType.ten_loai_bai_dang);
                    });
                }

                var jsonAppliedPostTypes = {
                    AppliedPostTypes: {
                        _ids: _ids,
                        keys: keys,
                        values: values
                    },
                };

                if (this.props.modeAction === "create") {
                    jsonAppliedPostTypes.loai_bai_dang_ap_dung = keys[0];
                }

                $this.setState(jsonAppliedPostTypes);
            });
    }

    GetFontFamilies() {
        var $this = this;
        var x_urlapi = localStorage.getItem("x-urlapi");

        Request.get(x_urlapi + "/getfontfamilies")
            .then((res) => {
                var keys = [];
                var values = [];

                if (res.body) {
                    keys = res.body.FontFamilies;
                    values = res.body.FontFamilies;
                }

                var jsonFontFamilies = {
                    FontFamilies: {
                        keys: keys,
                        values: values
                    },
                };

                if (this.props.modeAction === "create") {
                    jsonFontFamilies.font_tieu_de = keys[0];
                }

                $this.setState(jsonFontFamilies);
            }).catch((e) => {
                console.log("err");
            });
    }

    SetInitError(jsonState) {
        jsonState.error_ma_dich_vu = '';
        jsonState.error_ten_hien_thi = '';
        jsonState.error_so_luong_chia_se_vung = '';
        jsonState.error_so_luong_tin_toi_da = '';
        jsonState.error_so_luong_chu_mo_ta = '';
        jsonState.error_kich_thuoc_vien = '';
        jsonState.error_so_luong_chu_xem_truoc = '';

        jsonState.error_ktv_chieu_rong = '';
        jsonState.error_ktv_chieu_cao = '';

        return jsonState;
    }

    SetInitState(inputs, jsonState) {
        if (this.props.modeAction === "create") {
            inputs.forEach(element => {
                if (element.type === "combobox") {
                    var theFirstValue = element.keys[0];
                    var valueState = theFirstValue;

                    jsonState[element.id] = valueState;
                }
                else if (element.type === "radio") {
                    jsonState[element.id] = element.keys[0];
                }
                else if (element.type === "color") {
                    jsonState[element.id] = "#000000";
                }
                else if (element.type === "number") {
                    jsonState[element.id] = 0;
                }
                else if (element.type === "textbox") {
                    jsonState[element.id] = "";
                }
            });

            jsonState.ma_dich_vu_isReadOnly = false;
        }
        else {
            inputs.forEach(element => {
                if (element.type === "combobox") {
                    if(element.id === "loai_trang_ap_dung" || element.id === "loai_bai_dang_ap_dung"){
                        jsonState[element.id] = this.props.editContents[element.id].key;
                    }
                    else{
                        jsonState[element.id] = this.props.editContents[element.id];
                    }
                }
                else if (element.type === "radio") {
                    var keySelectedItem = this.props.editContents[element.id];
                    keySelectedItem = (keySelectedItem === 1 || keySelectedItem === true) ? 1 : 0;
                    jsonState[element.id] = keySelectedItem;
                }
                else { //color & input
                    if (element.id === "kich_thuoc_vung") {
                        if (this.props.editContents.kich_thuoc_vung) {
                            jsonState.ktv_chieu_rong = this.props.editContents.kich_thuoc_vung.width;
                            jsonState.ktv_chieu_cao = this.props.editContents.kich_thuoc_vung.height;
                        }
                    }
                    else {
                        jsonState[element.id] = this.props.editContents[element.id];
                    }
                }
            });

            jsonState.ma_dich_vu_isReadOnly = true;
        }

        return jsonState;
    }

    handleUpdateState(jsonState) {
        jsonState = this.SetInitError(jsonState);
        this.setState(jsonState);
    }

    CheckValid(state) {
        var isValid = true;
        var jsonError = {};

        if (state.ma_dich_vu === "" || state.ma_dich_vu.trim().includes(' ')) {
            jsonError.error_ma_dich_vu = "Mã dịch vụ không hợp lệ";
            isValid = false;
        }

        if (state.ten_hien_thi === "") {
            jsonError.error_ten_hien_thi = "Tên dịch vụ được yêu cầu";
            isValid = false;
        }

        if (state.ktv_chieu_rong === "") {
            jsonError.error_ktv_chieu_rong = "Yêu cầu lớn hơn 0";
            isValid = false;
        }

        if (state.ktv_chieu_cao === "") {
            jsonError.error_ktv_chieu_cao = "Yêu cầu lớn hơn 0";
            isValid = false;
        }

        if (parseInt(state.so_luong_chia_se_vung) <= 0) {
            jsonError.error_so_luong_chia_se_vung = "Yêu cầu lớn hơn 0";
            isValid = false;
        }

        if (parseInt(state.so_luong_tin_toi_da) <= 0) {
            jsonError.error_so_luong_tin_toi_da = "Yêu cầu lớn hơn 0";
            isValid = false;
        }

        if (parseInt(state.so_luong_chu_mo_ta) <= 0) {
            jsonError.error_so_luong_chu_mo_ta = "Yêu cầu lớn hơn 0";
            isValid = false;
        }

        if (parseInt(state.kich_thuoc_vien) <= 0) {
            jsonError.error_kich_thuoc_vien = "Yêu cầu lớn hơn 0";
            isValid = false;
        }

        if (parseInt(state.so_luong_chu_xem_truoc) <= 0) {
            jsonError.error_so_luong_chu_xem_truoc = "Yêu cầu lớn hơn 0";
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
            var indexOfAppliedPage = state.AppliedPages.keys.indexOf(state.loai_trang_ap_dung);
            var indexOfAppliedPostType = state.AppliedPostTypes.keys.indexOf(state.loai_bai_dang_ap_dung);

            var adsAreaContent = {
                ma_dich_vu: state.ma_dich_vu,
                ten_hien_thi: state.ten_hien_thi,
                loai_quang_cao: state.loai_quang_cao,
                loai_trang_ap_dung: {
                    key: state.loai_trang_ap_dung,
                    value: state.AppliedPages.values[indexOfAppliedPage]
                },
                loai_bai_dang_ap_dung: {
                    key: state.loai_bai_dang_ap_dung,
                    value: state.AppliedPostTypes.values[indexOfAppliedPostType]
                },
                kich_thuoc_vung: {
                    width: parseInt(state.ktv_chieu_rong),
                    height: parseInt(state.ktv_chieu_cao)
                },
                so_luong_chia_se_vung: state.so_luong_chia_se_vung,
                so_luong_tin_toi_da: state.so_luong_tin_toi_da,
                mau_chu_tieu_de: state.mau_chu_tieu_de,
                font_tieu_de: state.font_tieu_de,
                font_size_tieu_de: state.font_size_tieu_de,
                hieu_ung_tieu_de: state.hieu_ung_tieu_de,
                so_luong_chu_mo_ta: state.so_luong_chu_mo_ta,
                co_vien: state.co_vien,
                mau_vien: state.mau_vien,
                kich_thuoc_vien: state.kich_thuoc_vien,
                so_luong_chu_xem_truoc: state.so_luong_chu_xem_truoc,
                hien_thi_video_thay_the_anh: state.hien_thi_video_thay_the_anh
            };

            if (this.props.modeAction === 'edit') {
                return adsAreaContent;
            }
            else {
                return Request.get(UrlApi.ReadA_AdsArea + '/' + state.ma_dich_vu)
                    .set('x-auth', localStorage.getItem('x-auth'))
                    .then((res) => {
                        if (res.body) {
                            isValid = false;
                            this.setState({
                                error_ma_dich_vu: "Mã trang đã tồn tại!"
                            });
                            return 'error';
                        }
                        else {
                            return adsAreaContent;
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

    CreateAdsArea() {
        this.GetModelStateJson().then((adsAreaContent) => {
            if (adsAreaContent === 'error') {
                return;
            }

            var $this = this;
            Request.post(UrlApi.AdsArea)
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .set('x-auth', localStorage.getItem('x-auth'))
                .send(adsAreaContent)
                .end(function (err, res) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        $this.props.closeCreatorPopup();
                        $this.props.resetContentState();
                    }
                });
        }).catch((e) => {
            // this.setState({
            //     error_ma_dich_vu: "Mã này đã tồn tại!"
            // });
        });
    }

    EditAdsArea() {
        var adsAreaContent = this.GetModelStateJson();

        var url = UrlApi.AdsArea + "/" + this.props.editContents._id;
        var $this = this;
        Request.put(url)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .set('x-auth', localStorage.getItem('x-auth'))
            .send(adsAreaContent)
            .end(function (err, res) {
                $this.props.closeCreatorPopup();
                $this.props.resetContentState();
            });
    }

    handleSubmit() {
        if (this.props.modeAction === "create") {
            this.CreateAdsArea();
        }
        else {
            this.EditAdsArea();
        }
    }

    render() {
        var titleForm = this.props.modeAction === "create" ? "Tạo vùng quảng cáo" : "Chỉnh sửa vùng quảng cáo";
        return (
            <div className='popup'>
                <AdsAreaCreatorForm
                    titleForm={titleForm}
                    stateValues={this.state}
                    adsAreaInformationInputs={adsAreaInformationInputs}
                    adsAreaDescriptionInputs={adsAreaDescriptionInputs}

                    handleClosePopup={this.props.closeCreatorPopup}
                    handleSubmit={this.handleSubmit}
                    handleUpdateState={this.handleUpdateState}
                />
            </div>
        );
    }
}

var adsAreaInformationInputs = [
    {
        "description": "Mã dịch vụ quảng cáo",
        "id": "ma_dich_vu",
        "type": "textbox",
        "errorTitleName": "error_ma_dich_vu",
        "required": true
    },
    {
        "description": "Tên hiển thị",
        "id": "ten_hien_thi",
        "type": "textbox",
        "errorTitleName": "error_ten_hien_thi",
        "required": true
    },
    {
        "description": "Loại quảng cáo",
        "id": "loai_quang_cao",
        "type": "combobox",
        "keys": ["banner", "tin_rao"],
        "values": ["banner", "Tin rao"]
    },
    {
        "description": "Trang áp dụng quảng cáo",
        "id": "loai_trang_ap_dung",
        "type": "combobox",
        "keys": ["trang_chu", "trang_tim_kiem", "trang_chi_tiet", "danh_sach_du_an"],
        "values": ["Trang chủ", "Trang tìm kiếm", "Trang chi tiết", "Danh sách dự án"]
    },
    {
        "description": "Loại bài đăng áp dụng",
        "id": "loai_bai_dang_ap_dung",
        "type": "combobox",
        "keys": ["tin_bds", "du_an"],
        "values": ["Tin bds", "Dự án"]
    },
    {
        "description": "Kích thước vùng quảng cáo",
        "id": "kich_thuoc_vung",
        "type": "double_inputs",
        "sub_ids": ["ktv_chieu_rong", "ktv_chieu_cao"],
        "sub_titles": ["Chiều rộng", "Chiều cao"],
        "sub_types": ["number", "number"],
        "required": true
    },
    {
        "description": "Số chia sẻ của vùng",
        "id": "so_luong_chia_se_vung",
        "type": "number",
        "errorTitleName": "error_so_luong_chia_se_vung",
        "required": true
    },
    {
        "description": "Số lượng bài đăng tối đa",
        "id": "so_luong_tin_toi_da",
        "type": "number",
        "errorTitleName": "error_so_luong_tin_toi_da",
        "required": true
    }
];

var adsAreaDescriptionInputs = [
    {
        "description": "Màu chữ tiêu để",
        "id": "mau_chu_tieu_de",
        "type": "color"
    },
    {
        "description": "Phông chữ của tiêu đề",
        "id": "font_tieu_de",
        "type": "combobox",
        "keys": ["Arial", "Time new roman"],
        "values": ["Arial", "Time new roman"]
    },
    {
        "description": "Kích cỡ phông chữ tiêu đề",
        "id": "font_size_tieu_de",
        "type": "combobox",
        "keys": [10, 20, 30],
        "values": [10, 20, 30]
    },
    {
        "description": "Hiệu ứng tiêu đề",
        "id": "hieu_ung_tieu_de",
        "type": "combobox",
        "keys": ["Regular", "Bold", "Italic"],
        "values": ["Regular", "Bold", "Italic"],
        "required": true
    },
    {
        "description": "Số kí tự tối đa của tiêu đề",
        "id": "so_luong_chu_mo_ta",
        "type": "number",
        "errorTitleName": "error_so_luong_chu_mo_ta",
        "required": true
    },
    {
        "description": "Có viền vùng quảng cáo",
        "id": "co_vien",
        "type": "radio",
        "values": ["có", "Không"],
        "keys": [1, 0]
    },
    {
        "description": "Màu viền vùng quảng cáo",
        "id": "mau_vien",
        "type": "color"
    },
    {
        "description": "Kích thước viền vùng quảng cáo",
        "id": "kich_thuoc_vien",
        "type": "number",
        "errorTitleName": "error_kich_thuoc_vien",
        "required": true
    },
    {
        "description": "Số kí tự tối đa của xem trước bài đăng",
        "id": "so_luong_chu_xem_truoc",
        "type": "number",
        "errorTitleName": "error_so_luong_chu_xem_truoc",
        "required": true
    },
    {
        "description": "Hiên thị video thay thế ảnh đại diện",
        "id": "hien_thi_video_thay_the_anh",
        "type": "radio",
        "values": ["có", "Không"],
        "keys": [1, 0]
    }
];

var AreaCombobox = [
    "kich_thuoc_vung"
];

export default AdsAreaCreatorUpdater;