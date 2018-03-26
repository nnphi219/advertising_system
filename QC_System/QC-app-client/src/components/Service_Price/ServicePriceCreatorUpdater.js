import React, { Component } from 'react';
import Request from 'superagent';
import NumericInput from 'react-numeric-input';
import DatePicker from 'react-date-picker';
import UrlApi from '../share/UrlApi';
import './service_price.css';


class RenderProperties extends Component {
    constructor(props) {
        super(props);

        this.OnchangeStartDate = this.OnchangeStartDate.bind(this);
        this.OnchangeEndDate = this.OnchangeEndDate.bind(this);
    }
    
    OnchangeStartDate(date) {
        var e = {};
        e.target = {};
        e.target.value = date.toString();
        e.target.name = "start_date";
        this.props.OnChangeInput(e);
    }

    OnchangeEndDate(date) {
        var e = {};
        e.target = {};
        e.target.value = date;
        e.target.name = "end_date";
        this.props.OnChangeInput(e);
    }
    render() {
        return (
            <div>
                <div key="left" className="serviceprice_information_left">
                    <h2>Thông tin giá dịch vụ</h2>
                    <div>
                        <div>
                            <label className="fullwidth">
                                {"Mã dịch vụ quảng cáo"}
                                <select name={"ma_dich_vu_ap_dung"} key={"ma_dich_vu_ap_dung"} className="serviceprice--select">
                                    <option value={"VIPHOME1"} >{"VIPHOME1"}</option>
                                    <option value={"VIPHOME2"} >{"VIPHOME2"}</option>
                                </select>
                            </label>
                        </div>
                        <div>
                            <label className="fullwidth">
                                {"Nhập mã giá"}
                                <input type="text" key={"ma_gia"} name={"ma_gia"} onChange={this.props.OnChangeInput} className="serviceprice--input" />
                            </label>
                        </div>
                        <div>
                            <label  className="fullwidth">
                                {"Thời điểm đấu giá"}
                                <select name={"Start_Date"} key={"Start_Date"} className="serviceprice--select">
                                    <option value={"VIPHOME1"} >{"VIPHOME1"}</option>
                                    <option value={"VIPHOME2"} >{"VIPHOME2"}</option>
                                </select>
                            </label>
                        </div>
                        <div>
                            <div className="">
                                <label className="fullwidth">
                                    {"Thời điểm đấu giá"}
                                    <div>
                                        <input type="date" name="bday"/>
                                    </div>
                                </label>
                            </div>
                        </div>
                        <div >
                            <label className="fullwidth">{"Có thời điểm kết thúc"}</label>
                            <div className="pricefactor-radio">
                                <input type="radio" value={1} name={"loai_gia_tri_tang_them"} defaultChecked />
                                {"Có"}
                            </div>
                            <div className="pricefactor-radio">
                                <input type="radio" value={0} name={"loai_gia_tri_tang_them"} />
                                {"Không"}
                            </div>
                        </div>
                        <div>
                            <div className="">
                                <label className="fullwidth">
                                    {"Thời điểm kết thúc"}
                                    <div>
                                        <input type="date" name="bday"/>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div key="right" className="serviceprice_information_right">
                    <h2>Thông số giá</h2>
                    <div>
                        <div>
                            <label className="fullwidth">
                                {"Cơ chế hiển thị"}
                                <select  className="serviceprice--select">
                                    <option value={"VIPHOME1"} >{"VIPHOME1"}</option>
                                    <option value={"VIPHOME2"} >{"VIPHOME2"}</option>
                                </select>
                            </label>
                        </div>
                        <div >
                            <label className="fullwidth">{"Mô hình giá"}</label>
                            <div className="pricefactor-radio">
                                <input type="radio" value={1} name={""} defaultChecked />
                                {"CPD"}
                            </div>
                            <div className="pricefactor-radio">
                                <input type="radio" value={2} name={""} />
                                {"CPC"}
                            </div>
                            <div className="pricefactor-radio">
                                <input type="radio" value={3} name={""} />
                                {"CPM"}
                            </div>
                        </div>
                        <div>
                            <label className="fullwidth">
                                {"Giá"}
                                <input type="text" onChange={this.props.OnChangeInput} className="serviceprice--input" />
                            </label>
                        </div>
                        <div>
                            <label className="fullwidth">
                                {"Số ngày áp dụng"}
                                <input type="text" onChange={this.props.OnChangeInput} className="serviceprice--input" />
                            </label>
                        </div>
                        <div>
                            <label className="fullwidth">
                                {"Số lượng click / view tối đa"}
                                <input type="text" onChange={this.props.OnChangeInput} className="serviceprice--input" />
                            </label>
                        </div>
                        
                    </div>
                </div>
                <div className="submit">
                        <button className="btn btn-primary" onClick={this.props.handleSubmit}>Save</button>
                        <button className="btn btn-primary" onClick={this.props.handleClosePopup}>Cancel</button>
                </div>
            </div>
        );
    }
}

class ServicePriceCreatorUpdater extends Component {
    constructor(props) {
        super(props);

        this.OnChangeInput = this.OnChangeInput.bind(this);
    }

    OnChangeInput(e) {
        this.props.UpdateState({ [e.target.name]: e.target.value });
    }
    render() {
        return (
            <div className='popup'>
                <div className='popup_inner--serviceprice'>
                    <div>
                        <h1>Tạo giá dịch vụ</h1>
                        <RenderProperties
                                handleSubmit={this.props.handleSubmit}
                                handleClosePopup={this.props.closeCreatorUpdaterPopup}
                                OnChangeInput={this.OnChangeInput}
                        />
                    </div>
                </div>
                
            </div>
        );
    }
}

export default ServicePriceCreatorUpdater;