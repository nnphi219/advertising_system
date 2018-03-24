import React, { Component } from 'react';
import Request from 'superagent';
import ColorPickerInput from '../share/color_picker_input';

function TransferSizeToString(size) {
    return size.width + "x" + size.height;
}

function RenderInput(props) {
    return (
        <div>
            <label key={props.inputData.id} className="fullwidth">
                {props.inputData.description}
                <input type="text" id={props.inputData.id} key={props.inputData.id} value={props.valueInput} className="adsarea--input" name={props.inputData.id} onChange={props.handleOnchangeInput} />
            </label>
        </div>
    );
}

function RenderCombobox(props) {
    var tags = [];
    var count = 0;
    var selectedValue = props.valueCombobox;
    if (AreaCombobox.includes(props.inputData.id)) {
        selectedValue = TransferSizeToString(selectedValue);
    }

    props.inputData.values.forEach(value => {
        tags.push(<option key={count} value={value} >{value}</option>);
        count++;
    });

    return (
        <div>
            <label key={props.inputData.id} className="fullwidth">
                {props.inputData.description}
                <select name={props.inputData.id} id={props.inputData.id} value={selectedValue} key={props.inputData.id} onChange={props.handleOnchangeSelect} className="adsarea--select">
                    {tags}
                </select>
            </label>
        </div>
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
            var valueCombobox = props.stateValues[element.id];
            inputs.push(<RenderCombobox key={element.id} inputData={element} valueCombobox={valueCombobox} handleOnchangeSelect={props.handleOnchangeSelect} />);
        }
        else if (element.type === "radio") {
            var keySelectedItem = props.stateValues[element.id];
            inputs.push(<RenderRadioButton key={element.id} inputData={element} keySelectedItem={keySelectedItem} handleOnchangeRadioButton={props.handleOnchangeRadioButton} />);
        }
        else {
            var valueInput = props.stateValues[element.id];
            inputs.push(<RenderInput key={element.id} inputData={element} valueInput={valueInput} handleOnchangeInput={props.handleOnchangeInput} />);
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

        if (name === "area_size") {
            var areaSizeArray = value.split('x');
            value = { width: areaSizeArray[0], height: areaSizeArray[1] };
        }
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
            <div className='popup_inner'>
                <div>
                    <h1>{this.props.titleForm}</h1>
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
        var jsonState = {};
        this.SetInitState(adsAreaInformationInputs, jsonState);
        this.SetInitState(adsAreaDescriptionInputs, jsonState);
        this.state = jsonState;

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUpdateState = this.handleUpdateState.bind(this);
    }

    SetInitState(inputs, jsonState) {
        if (this.props.modeAction === "create") {
            inputs.forEach(element => {
                if (element.type === "combobox") {
                    var theFirstValue = element.values[0];
                    var valueState = theFirstValue;

                    if (element.id === "area_size") {
                        var areaSizeArray = theFirstValue.split('x');
                        valueState = { width: areaSizeArray[0], height: areaSizeArray[1] };
                    }
                    jsonState[element.id] = valueState;
                }
                else if (element.type === "radio") {
                    jsonState[element.id] = element.keys[0];
                }
                else if (element.type === "color") {
                    jsonState[element.id] = "#000000";
                }
            });
        }
        else {
            inputs.forEach(element => {
                if (element.type === "combobox") {
                    jsonState[element.id] = this.props.editContents[element.id];
                }
                else if (element.type === "radio") {
                    var keySelectedItem = this.props.editContents[element.id];
                    keySelectedItem = (keySelectedItem === 1 || keySelectedItem === true) ? 1 : 0;
                    jsonState[element.id] = keySelectedItem;
                }
                else { //color & input
                    jsonState[element.id] = this.props.editContents[element.id];
                }
            });
        }

    }

    handleUpdateState(jsonState) {
        this.setState(jsonState);
    }

    CreateAdsArea() {
        var adsAreaContent = this.state;

        var url = "http://localhost:8080/adsareas";
        var $this = this;
        Request.post(url)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send(adsAreaContent)
            .end(function (err, res) {
                $this.props.closeCreatorPopup();
                $this.props.resetContentState();
            });
    }

    EditAdsArea() {
        var adsAreaContent = this.state;

        var url = "http://localhost:8080/adsareas/" + this.props.editContents._id;
        var $this = this;
        Request.put(url)
            .set('Content-Type', 'application/x-www-form-urlencoded')
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
        "id": "ads_service_id",
        "type": "textbox"

    },
    {
        "description": "Tên hiển thị",
        "id": "ads_name",
        "type": "textbox"
    },
    {
        "description": "Trang áp dụng quảng cáo",
        "id": "applied_ads_page_type",
        "type": "combobox",
        "values": ["Trang chủ", "Trang tìm kiếm", "Trang chi tiết"]
    },
    {
        "description": "Loại bài đăng áp dụng",
        "id": "post_apply_type",
        "type": "combobox",
        "values": ["Tin bds", "Dự án"]
    },
    {
        "description": "Kích thước vùng quảng cáo",
        "id": "area_size",
        "type": "combobox",
        "values": ["180x30", "260x60"]
    },
    {
        "description": "Số chia sẻ của vùng",
        "id": "area_sharing_quantity",
        "type": "quantity"
    },
    {
        "description": "Số lượng bài đăng tối đa",
        "id": "max_post_number",
        "type": "quantity"
    }
];

var adsAreaDescriptionInputs = [
    {
        "description": "Màu chữ tiêu để",
        "id": "title_color",
        "type": "color"
    },
    {
        "description": "Phông chữ của tiêu đề",
        "id": "title_font_family",
        "type": "combobox",
        "values": ["Arial", "Time new roman"]
    },
    {
        "description": "Kích cỡ phông chữ tiêu đề",
        "id": "title_font_size",
        "type": "combobox",
        "values": [10, 20, 30]
    },
    {
        "description": "Hiệu ứng tiêu đề",
        "id": "title_effect",
        "type": "combobox",
        "values": ["Regular", "Bold", "Italic"]
    },
    {
        "description": "Số kí tự tối đa của tiêu đề",
        "id": "des_characters_quantity",
        "type": "quantity"
    },
    {
        "description": "Có viền vùng quảng cáo",
        "id": "have_border",
        "type": "radio",
        "values": ["có", "Không"],
        "keys": [1, 0]
    },
    {
        "description": "Màu viền vùng quảng cáo",
        "id": "border_color",
        "type": "color"
    },
    {
        "description": "Kích thước viền vùng quảng cáo",
        "id": "border_size",
        "type": "quantity"
    },
    {
        "description": "Số kí tự tối đa của xem trước bài đăng",
        "id": "preview_characters_quantity",
        "type": "quantity"
    },
    {
        "description": "Hiên thị video thay thế ảnh đại diện",
        "id": "show_video",
        "type": "radio",
        "values": ["có", "Không"],
        "keys": [1, 0]
    }
];

var AreaCombobox = [
    "area_size"
];

export default AdsAreaCreatorUpdater;