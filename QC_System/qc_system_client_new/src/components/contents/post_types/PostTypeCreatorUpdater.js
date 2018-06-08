import React, { Component } from 'react';
import Request from 'superagent';
import UrlApi, { UrlRedirect } from '../share/UrlApi';
import { RenderInput } from '../share/InputsRender';

import './post_type.css';

class RenderProperties extends Component {
    render() {
        var ma_loai_bai_dang_isReadOnly = this.props.modeAction === 'edit' ? 1 : 0;

        return (
            <div style={{ paddingLeft: "30px" }}>
                <RenderInput
                    nameId={"ma_loai_bai_dang"}
                    title={"Mã loại bài đăng"}
                    value={this.props.stateValues.ma_loai_bai_dang}
                    type={"text"}
                    className={"user--input"}
                    isReadOnly={ma_loai_bai_dang_isReadOnly}
                    errorTitle={this.props.stateValues.error_ma_loai_bai_dang}
                    OnChangeInput={this.props.OnChangeInput}
                />

                <RenderInput
                    nameId={"ten_loai_bai_dang"}
                    title={"Tên loại bài đăng"}
                    value={this.props.stateValues.ten_loai_bai_dang}
                    type={"text"}
                    className={"user--input"}
                    errorTitle={this.props.stateValues.error_ten_loai_bai_dang}
                    OnChangeInput={this.props.OnChangeInput}
                />
            </div>
        );
    }
}

class PostTypeCreatorUpdaterForm extends Component {
    constructor(props) {
        super(props);

        this.OnChangeInput = this.OnChangeInput.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    OnChangeInput(e) {
        var name = e.target.name;
        var value = e.target.value;
        var jsonState = {
            [name]: value,
            error_ma_loai_bai_dang: '',
            error_ten_loai_bai_dang: ''
        };

        this.props.UpdateState(jsonState);
    }

    handleCancel() {
        window.location.href = UrlRedirect.PostTypes;
    }

    render() {
        return (
            <div id="page-wrapper">
                <h1 className="post_type_title">{this.props.titleForm}</h1>
                <RenderProperties
                    OnChangeInput={this.OnChangeInput}
                    modeAction={this.props.modeAction}
                    stateValues={this.props.stateValues}
                />
                <div className="submit post_type__submit">
                    <button className="btn btn-primary" onClick={this.props.handleSubmit}>Lưu</button>
                    <button className="btn btn-primary" onClick={this.handleCancel}>Hủy</button>
                </div>
            </div>
        );
    }
}

class PostTypeCreatorUpdater extends Component {
    constructor(props) {
        super(props);

        var jsonState = {};
        this.SetInitState(jsonState);
        this.state = jsonState;

    }

    SetInitState(jsonState) {
        jsonState.error_ma_loai_bai_dang = '';
        jsonState.error_ten_loai_bai_dang = '';

        if (this.props.modeAction === "create") {
            jsonState.ma_loai_bai_dang = '';
            jsonState.ten_loai_bai_dang = '';
        }
        else if (this.props.modeAction === "edit") {
            var editContents = this.props.editContents;

            jsonState.ma_loai_bai_dang = editContents.ma_loai_bai_dang;
            jsonState.ten_loai_bai_dang = editContents.ten_loai_bai_dang;
        }
    }

    handleUpdateState(jsonState) {
        this.setState(jsonState);
    }

    GetModelStateJson() {
        var state = this.state;

        var isValid = true;
        var jsonError = {};
        if (state.ma_loai_bai_dang === "" || state.ma_loai_bai_dang.trim().includes(' ')) {
            jsonError.error_ma_loai_bai_dang = "Mã này không hợp lệ";
            isValid = false;
        }

        if (state.ten_loai_bai_dang === "") {
            jsonError.error_ten_loai_bai_dang = "Chưa nhập tên";
            isValid = false;
        }

        var content = null;

        if (jsonError !== {}) {
            this.setState(jsonError);
        }

        if (this.props.modeAction === 'edit') {
            if (isValid) {
                return {
                    ma_loai_bai_dang: state.ma_loai_bai_dang,
                    ten_loai_bai_dang: state.ten_loai_bai_dang
                };
            }
            else {
                return "error";
            }
        }

        if (isValid) {
            return Request.get(UrlApi.ReadA_Xsystem_PostType + '/' + state.ma_loai_bai_dang)
                .set('x-auth', localStorage.getItem('x-auth'))
                .then((res) => {
                    if (res.body) {
                        isValid = false;
                        this.setState({
                            error_ma_loai_bai_dang: "Mã loại bài đăng đã tồn tại!"
                        });
                        return 'error';
                    }
                    else {
                        content = {
                            ma_loai_bai_dang: state.ma_loai_bai_dang,
                            ten_loai_bai_dang: state.ten_loai_bai_dang
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

    CreatePostType() {
        this.GetModelStateJson().then((content) => {
            if (content === 'error') {
                return;
            }
            var token = localStorage.getItem('x-auth');

            Request.post(UrlApi.XsystemPostTypes)
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .set('x-auth', token)
                .send(content)
                .end(function (err, res) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        window.location.href = UrlRedirect.PostTypes;
                    }

                });
        }).catch((e) => {
            this.setState({
                error_ma_loai_bai_dang: "Mã này đã tồn tại!"
            });
        });
    }

    EditPostType() {
        var content = this.GetModelStateJson();
        if (content === 'error') {
            return;
        }

        var url = UrlApi.XsystemPostTypes + "/" + this.props.editContents._id;
        var token = localStorage.getItem('x-auth');

        Request.put(url)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .set('x-auth', token)
            .send(content)
            .end(function (err, res) {
                window.location.href = UrlRedirect.PostTypes;
            });
    }

    handleSubmit() {
        if (this.props.modeAction === "create") {
            this.CreatePostType();
        }
        else {
            this.EditPostType();
        }
    }

    render() {
        var titleForm = this.props.modeAction === "create" ? "Tạo loại bài đăng" : "Chỉnh loại bài đăng";
        return (
            <div className='div_createform'>
                <PostTypeCreatorUpdaterForm
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

export class XsystemPostTypeCreator extends Component {
    render() {
        return (
            <div className="right_col">
                <div className="row tile_count" >
                    <div className="col-md-12 col-sm-12 col-xs-12">
                        <PostTypeCreatorUpdater
                            modeAction={"create"}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export class XsystemPostTypeEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoad: false,
            editContents: null
        };
    }
    render() {
        var urlSplit = window.location.href.split('/');
        var paraId = urlSplit[urlSplit.length - 1];

        Request.get(UrlApi.XsystemPostTypes + "/" + paraId)
            .set('x-auth', localStorage.getItem('x-auth'))
            .then((res) => {
                this.setState({
                    editContents: res.body,
                    isLoad: true
                });

            })
            .catch((e) => {
                // window.location.href = UrlRedirect.PostTypes;
            });

        return (
            <div className="right_col">
                <div className="row tile_count" >
                    <div className="col-md-12 col-sm-12 col-xs-12">
                        {
                            this.state.isLoad ?
                                <PostTypeCreatorUpdater
                                    modeAction={"edit"}
                                    editContents={this.state.editContents}
                                />
                                : null
                        }
                    </div>
                </div>
            </div>
        );
    }
}
