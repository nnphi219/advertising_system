import React, { Component } from 'react';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';
import { RenderSelect, RenderTextArea } from '../../share/InputRenders';
import { POST_TYPES } from '../../constant';
import { URL_API } from '../../share/UrlAPI';
import './post.css';

const uuidv4 = require('uuid/v4');

export class PostCreator extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loai_bai_dang: 'tin_ban_nha'
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);
    }

    uploadImages(imageFile, next) {
        const data = new FormData();
        data.append('file', imageFile);
        data.append('filename', imageFile.file_name || uuidv4());

        fetch(URL_API.UploadFile, {
            method: 'POST',
            body: data,
        }).then((response) => {
            response.json().then((body) => {
                next(body.file);
            });
        }).catch((e) => {

        });
    }

    onSubmit(event) {
        let ma_bai_dang = this.ma_bai_dang.value;
        let tieu_de = this.tieu_de.value;
        let noi_dung = this.noi_dung.value;
        let loai_bai_dang = this.state.loai_bai_dang;
        let imageFile = this.imageFile.files[0];

        this.uploadImages(imageFile, function (fileName) {
            let data = {
                ma_bai_dang, tieu_de, noi_dung,
                ma_loai_bai_dang: loai_bai_dang,
                imageUrl: fileName
            };

            let accessTolen = localStorage.getItem('x-auth');

            fetch(URL_API.PostManagement, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth': accessTolen
                }
            }).then(res => res.json())
                .then(data => {
                    window.location.href = '/posts';
                }).catch(err => {
                    console.log(err);
                });
        });
    }

    onChangeInput(event) {
        this.setState({
            loai_bai_dang: event.target.value
        });
    }

    render() {
        let title = "Tạo mới bài đăng";
        return (
            <div className="post-add-form">
                <div>
                    <span className="post-title">{title}</span>
                </div>
                <div>
                    <span className="txt1 p-b-11">
                        Mã bài đăng
                    </span>
                    <div className="wrap-input100 validate-input m-b-36">
                        <input className="input100" type="text" name="ma_bai_dang" ref={ma_bai_dang => this.ma_bai_dang = ma_bai_dang} />
                        <span className="focus-input100"></span>
                    </div>

                    <span className="txt1 p-b-11">
                        Loại bài đăng
                    </span>
                    <RenderSelect
                        nameId={"loai_bai_dang"}
                        keys={POST_TYPES.keys}
                        values={POST_TYPES.values}
                        selectedValue={this.state.loai_bai_dang}
                        OnChangeSelect={this.onChangeInput}
                        className={"input100"}
                    />

                    <span className="txt1 p-b-11">
                        Tiêu đề
                    </span>
                    <div className="wrap-input100 validate-input m-b-36">
                        <input className="input100" type="text" name="username" ref={tieu_de => this.tieu_de = tieu_de} />
                        <span className="focus-input100"></span>
                    </div>

                    <span className="txt1 p-b-11">
                        Nội dung
                    </span>
                    <div className="wrap-input100 validate-input m-b-36">
                        <input type="file" id="file" ref="fileUploader" ref={imageFile => this.imageFile = imageFile} />
                        <span className="focus-input100"></span>
                    </div>

                    <span className="txt1 p-b-11">
                        Nội dung
                    </span>
                    <div className="wrap-input100 validate-input m-b-36">
                        <textarea rows="4" cols="50" className="input100" ref={noi_dung => this.noi_dung = noi_dung} style={{ height: "120px", paddingTop: "10px" }} />
                        <span className="focus-input100"></span>
                    </div>

                </div>
                <div className="post-add-submit">
                    {/* <NavLink to="/posts" className="nav-link" onClick={this.onSubmit}>Lưu</NavLink> */}
                    <button className="nav-link" onClick={this.onSubmit}>Lưu</button>
                    <NavLink to="/posts" className="nav-link">Hủy</NavLink>
                </div>
            </div>
        );
    }
}

function renderPost(post) {
    return (
        <tr key={post._id} className="row100 body">
            <td className="cell100 column1">{post.ma_bai_dang}</td>
            <td className="cell100 column2">{post.ma_loai_bai_dang}</td>
            <td className="cell100 column3">{post.tieu_de}</td>
        </tr>
    );
}

class PostList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: []
        };
    }

    getPosts() {
        let accessTolen = localStorage.getItem('x-auth');

        fetch(URL_API.PostManagement, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'x-auth': accessTolen
            }
        }).then(res => res.json())
            .then(results => {
                this.setState({
                    posts: results
                });
            }).catch(err => {
                console.log(err);
            });
    }

    componentDidMount() {
        this.getPosts();
    }

    render() {
        var trContentElements = [];
        this.state.posts.forEach(post => {
            trContentElements.push(renderPost(post));
        });
        return (
            <div className="page-rent">
                <div>
                    <span className="post-title">Quản lý bài đăng</span>
                </div>
                <div className="post-add">
                    <NavLink to="/posts/create" className="nav-link">Thêm mới</NavLink>
                </div>
                <div className="limiter" style={{ width: "100%" }}>
                    <div className="container-table100">
                        <div className="wrap-table100">
                            <div className="table100 ver5 m-b-110">
                                <div className="table100-head">
                                    <table>
                                        <thead>
                                            <tr className="row100 head">
                                                <th className="cell100 column1">Mã bài đăng</th>
                                                <th className="cell100 column2">Loại bài đăng</th>
                                                <th className="cell100 column3">Tiêu đề</th>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>

                                <div className="table100-body js-pscroll">
                                    <table>
                                        <tbody>
                                            {trContentElements}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class PostManagement extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <section className="page-listings">
                        <div className="post">
                            <Route exact={true} path="/posts" component={PostList} />
                            <Route path="/posts/create" component={PostCreator} />
                        </div>
                    </section>
                </div>
            </BrowserRouter>
        );
    }
}

export default PostManagement;