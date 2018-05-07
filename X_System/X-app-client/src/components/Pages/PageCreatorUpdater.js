import React, { Component } from 'react';
import Request from 'superagent';
import { UrlApi, UrlRedirect } from '../share/Url';
import { RenderInput } from '../share/InputsRender';

import './page.css';

function GetAdsAreaModel(arrayJsonAdsAreas) {
    var array_ma_vung = [];
    var array_ten_vung = [];
    arrayJsonAdsAreas.forEach(JsonAdsArea => {
        array_ma_vung.push(JsonAdsArea.ma_vung);
        array_ten_vung.push(JsonAdsArea.ten_vung);
    });
    return {
        ma_vung: array_ma_vung,
        ten_vung: array_ten_vung
    }
}

function CheckArrayAdsAreasContainsElement(adsAreas, newAdsAreaId) {
    var adsAreaInArray = adsAreas.find((adsArea) => {
        return adsArea.ma_vung === newAdsAreaId
    });

    if (adsAreaInArray) {
        return true;
    }
    else {
        return false;
    }
}

function AdsAreaArrayRemoveItem(adsAreas, itemId) {
    var i = 0;
    var isFinished = false;
    while (!isFinished && i < adsAreas.length) {
        var adsArea = adsAreas[i];

        if (adsArea.ma_vung === itemId) {
            isFinished = true;
            adsAreas.splice(i, 1);
        }

        i++;
    }
}

class RenderProperties extends Component {
    render() {
        let props = this.props;
        let stateValues = props.stateValues;
        let ma_trang_quang_cao_isReadOnly = props.modeAction === 'edit' ? 1 : 0;

        let asdAreas = stateValues.adsAreas;
        let adsAreaTokenFields = asdAreas.map((adsArea) => {
            var displayAdsArea = `${adsArea.ma_vung} (${adsArea.ten_vung})`;
            return (
                <div key={adsArea.ma_vung} className="token">
                    <span className="token-label" style={{ maxWidth: "769px" }}>{displayAdsArea}</span>
                    <a name={adsArea.ma_vung} className="close" tabIndex="-1" onClick={props.OnRemoveTokenField}>×</a>
                </div>
            );
        });

        return (
            <div style={{ paddingLeft: "30px" }}>
                <RenderInput
                    nameId={"ma_trang_quang_cao"}
                    title={"Mã trang quảng cáo"}
                    value={this.props.stateValues.ma_trang_quang_cao}
                    type={"text"}
                    className={"user--input"}
                    isReadOnly={ma_trang_quang_cao_isReadOnly}
                    errorTitle={this.props.stateValues.error_ma_trang_quang_cao}
                    OnChangeInput={this.props.OnChangeInput}
                />

                <RenderInput
                    nameId={"ten_trang_quang_cao"}
                    title={"Tên trang quảng cáo"}
                    value={this.props.stateValues.ten_trang_quang_cao}
                    type={"text"}
                    className={"user--input"}
                    errorTitle={this.props.stateValues.error_ten_trang_quang_cao}
                    OnChangeInput={this.props.OnChangeInput}
                />

                <div key="vung_quang_cao" style={{ height: "220px" }}>
                    <div>
                        <label className="fullwidth">
                            {"Định nghĩa vùng quảng cáo"}
                        </label>
                    </div>
                    <div style={{ height: "120px" }}>
                        <div>
                            <div className="float-left page__area_margin_right">
                                <RenderInput
                                    nameId={"ma_vung"}
                                    title={"Mã vùng"}
                                    value={stateValues.ma_vung}
                                    type={"text"}
                                    className={"user--input"}
                                    errorTitle={stateValues.error_ma_vung}
                                    OnChangeInput={props.OnChangeInput}
                                />
                            </div>

                            <div className="float-left">
                                <RenderInput
                                    nameId={"ten_vung"}
                                    title={"Tên vùng"}
                                    value={stateValues.ten_vung}
                                    type={"text"}
                                    className={"user--input"}
                                    errorTitle={stateValues.error_ten_vung}
                                    OnChangeInput={props.OnChangeInput}
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <button className="btn btn-primary" onClick={props.OnAddTokenField}>Thêm vùng</button>
                        </div>
                        <div className="float-left page--tokenfield system_tokenfield tokenfield div_property_margin_bottom">
                            {adsAreaTokenFields}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class PageCreatorUpdaterForm extends Component {
    constructor(props) {
        super(props);

        this.OnChangeInput = this.OnChangeInput.bind(this);
        this.handleCancel = this.handleCancel.bind(this);

        this.OnAddTokenField = this.OnAddTokenField.bind(this);
        this.OnRemoveTokenField = this.OnRemoveTokenField.bind(this);
    }

    OnChangeInput(e) {
        var name = e.target.name;
        var value = e.target.value;
        var jsonState = {
            [name]: value,
            error_ma_trang_quang_cao: '',
            error_ten_trang_quang_cao: '',
            error_ma_vung: '',
            error_ten_vung: ''
        };

        this.props.UpdateState(jsonState);
    }



    handleCancel() {
        window.location.href = UrlRedirect.Pages;
    }

    GetAdsAreaState(stateValues) {
        let isValid = true;
        let ma_vung = stateValues.ma_vung.trim();
        let ten_vung = stateValues.ten_vung.trim();

        if (ma_vung === "" || ma_vung.trim().includes(' ')) {
            stateValues.error_ma_vung = "Mã vùng không hợp lệ";
            isValid = false;
        }

        if (ten_vung === "") {
            stateValues.error_ten_vung = "Chưa nhập tên vùng quảng cáo";
            isValid = false;
        }

        if (CheckArrayAdsAreasContainsElement(stateValues.adsAreas, ma_vung)) {
            isValid = false;
        }

        if (isValid) {
            stateValues.ma_vung = '';
            stateValues.ten_vung = '';

            return {
                ma_vung: ma_vung,
                ten_vung: ten_vung
            }
        }
        else {
            return null;
        }
    }

    OnAddTokenField(e) {
        var stateValues = this.props.stateValues;
        var addedAdsAreas = stateValues.adsAreas;

        if (addedAdsAreas === null) {
            e.preventDefault();
            return;
        }

        var newAdsArea = this.GetAdsAreaState(stateValues);
        if (newAdsArea) {
            addedAdsAreas.push(newAdsArea);
        }

        this.props.UpdateState(stateValues);
    }

    OnRemoveTokenField(e) {
        var stateValues = this.props.stateValues;

        var removedAdsAreaId = e.target.name.trim();
        var adsAreas = stateValues.adsAreas;

        AdsAreaArrayRemoveItem(adsAreas, removedAdsAreaId);

        this.props.UpdateState(stateValues);
    }


    render() {
        return (
            <div>
                <div>
                    <h1>{this.props.titleForm}</h1>
                    <RenderProperties
                        OnChangeInput={this.OnChangeInput}
                        modeAction={this.props.modeAction}
                        stateValues={this.props.stateValues}

                        OnAddTokenField={this.OnAddTokenField}
                        OnRemoveTokenField={this.OnRemoveTokenField}
                    />
                </div>
                <div className="page__submit">
                    <button className="btn btn-primary page__submit-button" onClick={this.props.handleSubmit}>Save</button>
                    <button className="btn btn-primary" onClick={this.handleCancel}>Cancel</button>
                </div>
            </div>
        );
    }
}

class PageCreatorUpdater extends Component {
    constructor(props) {
        super(props);

        var jsonState = {
            adsAreas: []
        };
        this.SetInitState(jsonState);
        this.state = jsonState;

    }

    SetInitState(jsonState) {
        jsonState.error_ma_trang_quang_cao = '';
        jsonState.error_ten_trang_quang_cao = '';
        jsonState.error_ma_vung = '';
        jsonState.error_ten_vung = '';

        jsonState.ma_vung = '';
        jsonState.ten_vung = '';

        if (this.props.modeAction === "create") {
            jsonState.ma_trang_quang_cao = '';
            jsonState.ten_trang_quang_cao = '';
        }
        else if (this.props.modeAction === "edit") {
            var editContents = this.props.editContents;

            jsonState.ma_trang_quang_cao = editContents.ma_trang_quang_cao;
            jsonState.ten_trang_quang_cao = editContents.ten_trang_quang_cao;
            jsonState.adsAreas = editContents.vung_quang_cao ? editContents.vung_quang_cao : [];
        }
    }

    handleUpdateState(jsonState) {
        this.setState(jsonState);
    }

    GetModelStateJson() {
        var state = this.state;

        var isValid = true;
        var jsonError = {};
        if (state.ma_trang_quang_cao === "" || state.ma_trang_quang_cao.trim().includes(' ')) {
            jsonError.error_ma_trang_quang_cao = "Mã trang quảng cáo không hợp lệ";
            isValid = false;
        }

        if (state.ten_trang_quang_cao === "") {
            jsonError.error_ten_trang_quang_cao = "Chưa nhập tên trang quảng cáo";
            isValid = false;
        }

        var content = null;

        if (jsonError !== {}) {
            this.setState(jsonError);
        }

        if (this.props.modeAction === 'edit') {
            if (isValid) {
                return {
                    ma_trang_quang_cao: state.ma_trang_quang_cao,
                    ten_trang_quang_cao: state.ten_trang_quang_cao,
                    vung_quang_cao: GetAdsAreaModel(state.adsAreas)
                };
            }
            else {
                return "error";
            }
        }

        if (isValid) {
            return Request.get(UrlApi.ReadAPage + '/' + state.ma_trang_quang_cao)
                .set('x-auth', localStorage.getItem('x-auth'))
                .then((res) => {
                    if (res.body) {
                        isValid = false;
                        this.setState({
                            error_ma_trang_quang_cao: "Mã trang đã tồn tại!"
                        });
                        return 'error';
                    }
                    else {
                        content = {
                            ma_trang_quang_cao: state.ma_trang_quang_cao,
                            ten_trang_quang_cao: state.ten_trang_quang_cao,
                            vung_quang_cao: GetAdsAreaModel(state.adsAreas)
                        };
                        return content;
                    }

                }).catch((e) => {
                    return 'error';
                });
        }
        else {
            return Promise.reject();
        }
    }

    CreatePage() {
        this.GetModelStateJson().then((content) => {
            if (content === 'error') {
                return;
            }

            var token = localStorage.getItem('x-auth');

            Request.post(UrlApi.Pages)
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .set('x-auth', token)
                .send(content)
                .end(function (err, res) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        window.location.href = UrlRedirect.Pages;
                    }
                });
        }).catch((e) => {
            this.setState({
                error_ma_trang_quang_cao: "Mã trang đã tồn tại!"
            });
        });
    }

    EditPage() {
        var content = this.GetModelStateJson();
        if (content === 'error') {
            return;
        }

        var url = UrlApi.Pages + "/" + this.props.editContents._id;
        var token = localStorage.getItem('x-auth');

        Request.put(url)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .set('x-auth', token)
            .send(content)
            .end(function (err, res) {
                window.location.href = UrlRedirect.Pages;
            });
    }

    handleSubmit() {
        if (this.props.modeAction === "create") {
            this.CreatePage();
        }
        else {
            this.EditPage();
        }
    }

    render() {
        var titleForm = this.props.modeAction === "create" ? "Tạo trang áp dụng quảng cáo" : "Chỉnh sửa trang áp dụng quảng cáo";
        return (
            <div className='div_createform'>
                <PageCreatorUpdaterForm
                    titleForm={titleForm}
                    stateValues={this.state}
                    handleSubmit={this.handleSubmit.bind(this)}
                    UpdateState={this.handleUpdateState.bind(this)}
                    modeAction={this.props.modeAction}
                />
            </div>
        );
    }
}

export class PageCreator extends Component {
    render() {
        return (
            <PageCreatorUpdater
                modeAction={"create"}
            />
        );
    }
}

export class PageEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoad: false,
            editContents: {}
        };
    }

    componentDidMount() {
        var urlSplit = window.location.href.split('/');
        var paraId = urlSplit[urlSplit.length - 1];

        Request.get(UrlApi.Pages + "/" + paraId)
            .set('x-auth', localStorage.getItem('x-auth'))
            .then((res) => {
                this.setState({
                    editContents: res.body,
                    isLoad: true
                });

            })
            .catch((e) => {
                // window.location.href = UrlRedirect.Pages;
            });
    }

    render() {
        return (
            this.state.isLoad ?
                <PageCreatorUpdater
                    modeAction={"edit"}
                    editContents={this.state.editContents}
                />
                : null
        );
    }
}
