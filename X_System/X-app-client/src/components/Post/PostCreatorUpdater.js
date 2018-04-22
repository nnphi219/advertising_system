import React, { Component } from 'react';
import Request from 'superagent';
import { UrlApi, UrlRedirect } from '../share/Url';
import { RenderInput, RenderDate, RenderTextArea } from '../share/InputsRender';

import './post.css';
import Img from 'react-image';

var rp = require('request-promise');
var FileSaver = require('file-saver');

class RenderProperties extends Component {
    render() {
        var props = this.props;
        var imageUrls = props.stateValues.imageUrls;
        var renderImages = [];
        imageUrls.forEach(imageUrl => {
            renderImages.push(<Img key={imageUrl} src={imageUrl} style={{ marginRight: "5px" }} />);
        });

        return (
            <div style={{ paddingLeft: "30px" }}>
                <RenderInput
                    nameId={"ma_bai_dang"}
                    title={"Mã bài đăng"}
                    value={this.props.stateValues.ma_bai_dang}
                    type={"text"}
                    className={"user--input"}
                    OnChangeInput={this.props.OnChangeInput}
                />

                <RenderInput
                    nameId={"tieu_de"}
                    title={"Tiêu đề"}
                    value={this.props.stateValues.tieu_de}
                    type={"text"}
                    className={"user--input"}
                    OnChangeInput={this.props.OnChangeInput}
                />
                <div>
                    <div>
                        {"Hình ảnh"}
                    </div>
                    <div>
                        <input type="file" id="file" ref="fileUploader" onChange={props.OnChangeImageFile} />
                    </div>

                    {renderImages}
                </div>
                <RenderTextArea
                    nameId={"noi_dung"}
                    title={"Nội dung"}
                    value={this.props.stateValues.noi_dung}
                    type={"text"}
                    className={"textarea--input"}
                    OnChangeInput={this.props.OnChangeInput}
                />
            </div>
        );
    }
}

class PostCreatorUpdaterForm extends Component {
    constructor(props) {
        super(props);

        this.OnChangeInput = this.OnChangeInput.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    OnChangeInput(e) {
        var name = e.target.name;
        var value = e.target.value;
        var jsonState = { [name]: value };

        this.props.UpdateState(jsonState);
    }

    handleCancel() {
        window.location.href = UrlRedirect.Posts;
    }

    render() {
        var props = this.props;
        return (
            <div>
                <h1>{this.props.titleForm}</h1>
                <RenderProperties
                    OnChangeInput={this.OnChangeInput}
                    OnChangeImageFile={props.OnChangeImageFile}

                    stateValues={props.stateValues}
                />
                <div className="submit">
                    <button className="btn btn-primary" onClick={props.handleSubmit}>Save</button>
                    <button className="btn btn-primary" onClick={this.handleCancel}>Cancel</button>
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

        this.OnChangeImageFile = this.OnChangeImageFile.bind(this);
    }

    SetInitState(jsonState) {
        if (this.props.modeAction === "create") {
            jsonState.imageUrls = [];
        }
        else if (this.props.modeAction === "edit") {
            var editContents = this.props.editContents;

            jsonState.ma_bai_dang = editContents.ma_bai_dang;
            jsonState.tieu_de = editContents.tieu_de;
            jsonState.noi_dung = editContents.noi_dung;
            jsonState.imageUrls = editContents.imageUrls;
        }
    }

    OnChangeImageFile(event) {
        event.stopPropagation();
        event.preventDefault();
        var file = event.target.files[0];

        FileSaver.saveAs(file, '/images/' + file.name);

        var imageUrls = this.state.imageUrls;
        imageUrls.push('/images/' + file.name);
        this.setState({
            imageUrls: imageUrls
        });
    }

    handleUpdateState(jsonState) {
        this.setState(jsonState);
    }

    GetModelStateJson() {
        var state = this.state;

        var content = {
            ma_bai_dang: state.ma_bai_dang,
            tieu_de: state.tieu_de,
            noi_dung: state.noi_dung,
            url: `/post/${state.ma_bai_dang}`,
            imageUrls: state.imageUrls
        };

        return content;
    }

    CreatePost() {
        var content = this.GetModelStateJson();
   
        var $this = this;
        var token = localStorage.getItem('x-auth');

        Request.post(UrlApi.PostManagement)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .set('x-auth', token)
            .send(content)
            .end(function (err, res) {
                if (err) {
                    console.log(err);
                }
                else {
                    window.location.href = UrlRedirect.Posts;
                }

            });
    }

    EditPost() {
        var content = this.GetModelStateJson();

        var url = UrlApi.PostManagement + "/" + this.props.editContents._id;
        var $this = this;
        var token = localStorage.getItem('x-auth');

        Request.put(url)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .set('x-auth', token)
            .send(content)
            .end(function (err, res) {
                window.location.href = UrlRedirect.Posts;
            });
    }

    handleSubmit() {
        if (this.props.modeAction === "create") {
            this.CreatePost();
        }
        else {
            this.EditPost();
        }
    }

    render() {
        var titleForm = this.props.modeAction === "create" ? "Tạo bài đăng" : "Chỉnh sửa bái đăng";
        return (
            <div className='div_createform'>
                <PostCreatorUpdaterForm
                    titleForm={titleForm}
                    stateValues={this.state}
                    handleSubmit={this.handleSubmit.bind(this)}
                    UpdateState={this.handleUpdateState.bind(this)}

                    OnChangeImageFile={this.OnChangeImageFile}
                />
            </div>
        );
    }
}
var userInputsData = {
    user_type: {
        keys: ["user", "admin"],
        values: ["user", "admin"]
    }
}

export class PostCreator extends Component {
    render() {
        return (
            <PostCreatorUpdater
                modeAction={"create"}
            />
        );
    }
}

export class PostEditor extends Component {
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

        Request.get(UrlApi.PostManagement + "/" + paraId)
            .set('x-auth', localStorage.getItem('x-auth'))
            .then((res) => {
                this.setState({
                    editContents: res.body,
                    isLoad: true
                });

            })
            .catch((e) => {
                // window.location.href = UrlRedirect.Posts;
            });

        return (
            this.state.isLoad ?
                <PostCreatorUpdater
                    modeAction={"edit"}
                    editContents={this.state.editContents}
                />
                : null
        );
    }
}
