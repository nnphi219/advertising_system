import React, { Component } from 'react';
import Request from 'superagent';
import './price_factor.css';

class RenderProperTies extends Component {
    constructor(props) {
        super(props);

    }

    TranserTimeLogToString(timeLogJson){
        return `${timeLogJson.bat_dau.toString()}h-${timeLogJson.ket_thuc.toString()}h`;
    }

    render() {
        var timeLog = this.TranserTimeLogToString(this.props.stateValues.khung_gio_ap_dung);
        
        return (
            <div>
                <div>
                    <label key={"ten_chi_so"} className="fullwidth">
                        {"Nhập tên chỉ số"}
                        <input type="text" id={"ten_chi_so"} key={"ten_chi_so"} name={"ten_chi_so"} value={this.props.stateValues.ten_chi_so} className="pricefactor--input" />
                    </label>
                </div>
                <div>
                    <label key={"ma_gia"} className="fullwidth">
                        {"Mã giá áp dụng"}
                        <select name={"ma_gia"} id={"ma_gia"} key={"ma_gia"} value={this.props.stateValues.ma_gia} className="pricefactor--select">
                            <option value={"VIPHOME1"} >{"VIPHOME1"}</option>
                            <option value={"VIPHOME2"} >{"VIPHOME2"}</option>
                        </select>
                    </label>
                </div>
                <div>
                    <label key={"don_gia_co_ban"} className="fullwidth">
                        {"Đơn giá cơ bản"}
                        <input type="text" id={"don_gia_co_ban"} key={"don_gia_co_ban"} name={"don_gia_co_ban"} value={this.props.stateValues.don_gia_co_ban} className="pricefactor--input" />
                    </label>
                </div>
                <div>
                    <label key={"khung_gio_ap_dung"} className="fullwidth">
                        {"Khung giờ áp dụng"}
                        <select name={"khung_gio_ap_dung"} id={"ma_gia"} key={"khung_gio_ap_dung"} value={timeLog} className="pricefactor--select">
                            <option value={"2h-4h"} >{"2h-4h"}</option>
                            <option value={"4h-6h"} >{"4h-6h"}</option>
                        </select>
                    </label>
                </div>
                <div>
                    <div className="float-left">
                        <label key={"tinh"} className="fullwidth">
                            {"Áp dụng cho tỉnh thành"}
                            <input type="text" id={"tinh"} key={"tinh"} name={"tinh"} value={this.props.stateValues.tinh} className="pricefactor--input inline" />
                        </label>
                    </div>
                    <div className="float-left">
                        <label key={"quan_huyen"} className="fullwidth">
                            {"Áp dụng cho quận huyện"}
                            <input type="text" id={"quan_huyen"} key={"quan_huyen"} name={"quan_huyen"} value={this.props.stateValues.quan_huyen} className="pricefactor--input inline" />
                        </label>
                    </div>
                </div>
                <div key={"loai_gia_tri_tang_them"} name={"loai_gia_tri_tang_them"}>
                    <label className="fullwidth">{"Loại giá trị tăng thêm"}</label>
                    <div className="pricefactor-radio">
                        <input type="radio" value={1} name={"loai_gia_tri_tang_them"} defaultChecked />
                        {"Tăng theo %"}
                    </div>
                    <div className="pricefactor-radio">
                        <input type="radio" value={1} name={"loai_gia_tri_tang_them"} />
                        {"Giảm theo %"}
                    </div>
                </div>
                <div>
                    <label key={"phan_tram_tang_giam"} className="fullwidth">
                        {"Phần trăm tăng/giảm (%)"}
                        <input type="text" id={"phan_tram_tang_giam"} key={"phan_tram_tang_giam"} value={this.props.stateValues.phan_tram_tang_giam} name={"phan_tram_tang_giam"} className="pricefactor--input" />
                    </label>
                </div>
                <div>
                    <label key={"gia_tri_thuc"} className="fullwidth">
                        {"Tổng tiền"}
                        <input type="text" id={"gia_tri_thuc"} key={"gia_tri_thuc"} name={"gia_tri_thuc"} className="pricefactor--input" />
                    </label>
                </div>
                <div className="submit">
                    <button className="btn btn-primary" onClick={this.props.handleSubmit}>Save</button>
                    <button className="btn btn-primary" onClick={this.props.handleClosePopup}>Cancel</button>
                </div>
            </div>
        );
    }
}

class PriceFactorCreatorUpdaterForm extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='popup_inner--pricefactor'>
                <h1>{this.props.titleForm}</h1>
                <div className="pricefactor_information">
                    <h2>Chỉ số ảnh hưởng giá</h2>
                    <RenderProperTies
                        handleSubmit={this.props.handleSubmit}
                        handleClosePopup={this.props.handleClosePopup}
                        stateValues={this.props.stateValues}
                    />
                </div>

            </div>
        );
    }
}

class PriceFactorCreatorUpdater extends Component {
    constructor(props) {
        super(props);
        
        var jsonState = {};
        this.SetInitState(jsonState);
        this.state = jsonState;
    }

    SetInitState(jsonState) {
        if (this.props.modeAction === "create") {
            jsonState.ma_gia = "VIPHOME1";
            jsonState.don_gia_co_ban = 0;
            jsonState.khung_gio_ap_dung = {
                bat_dau: 2,
                ket_thuc: 4
            };
            jsonState.loai_gia_tri_tang_them = 1;
            jsonState.phan_tram_tang_giam = 0;
        }
        else {

        }
    }

    handleSubmit() {
        console.log("submit");
    }

    render() {
        var titleForm = this.props.modeAction === "create" ? "Tạo chỉ số ảnh hưởng giá" : "Chỉnh sửa chỉ số ảnh hưởng giá";
        return (
            <div className='popup'>
                <PriceFactorCreatorUpdaterForm
                    modeAction
                    titleForm={titleForm}
                    stateValues={this.state}
                    handleSubmit={this.handleSubmit.bind(this)}
                    handleClosePopup={this.props.closeCreatorUpdaterPopup}
                />
            </div>
        );
    }
}

var priceFactorInputs = [
    {
        "description": "Nhập tên chỉ số",
        "id": "ten_chi_so",
        "type": "textbox"
    },
    {
        "description": "Mã giá áp dụng",
        "id": "ma_gia", //
        "type": "combobox",
        "values": ['VIPHOME1', 'VIPHOME2']// //get from ServicePrice, currently set default
    },
    {
        "description": "Đơn giá cơ bản",
        "id": "don_gia_co_ban",
        "type": "textbox"
    },
    {
        "description": "Khung giờ áp dụng",
        "id": "khung_gio_ap_dung",
        "type": "combobox",
        "values": ["2h-4h", '4h-6h']
    },
    {
        "description": "Áp dụng cho tỉnh",
        "id": "tinh",
        "type": "textbox"
    },
    {
        "description": "Áp dụng cho quận huyện",
        "id": "quan_huyen",
        "type": "textbox"
    },
    {
        "description": "Loại giá trị tăng thêm",
        "id": "quan_huyen",
        "type": "radio",
        "values": ["Tăng theo %", "Giảm theo %"],
        "keys": [1, 0]
    },
    {
        "description": "Phần trăm tăng/giảm (%)",
        "id": "phan_tram_tang_giam",
        "type": "textbox"
    },
    {
        "description": "Tổng tiền",
        "id": "gia_tri_thuc",
        "type": "textbox"
    }
];

export default PriceFactorCreatorUpdater;

