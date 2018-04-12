import React, { Component } from 'react';
import Request from 'superagent';

import RenderHeader from '../share/RenderHeader';
import DeleteForm from '../share/DeleteForm';
import HeaderForm from '../share/HeaderForm/HeaderForm';
import RenderEditDeleteButton from '../share/RenderEditDeleteButton';
import { UrlApi, UrlRedirect } from '../share/Url';

import './post.css';

function RenderRow(props) {
    return (
        <tr>
            <td>{props.trContent.ma_bai_dang}</td>
            <td>{props.trContent.tieu_de}</td>
            <td>{props.trContent.url}</td>
            <td>{props.trContent.nguoi_tao}</td>
            <td>
                <RenderEditDeleteButton
                    nameId={props.trContent._id}
                    handleEditClick={props.handleEditClick}
                    handleDeleteClick={props.handleDeleteClick}
                />
            </td>
        </tr>
    );
}

function RenderBody(props) {
    var rows = [];
    props.tbody.forEach((element, id) => {
        rows.push(
            <RenderRow
                trContent={element}
                key={id}
                handleEditClick={props.handleEditClick}
                handleDeleteClick={props.handleDeleteClick}
            />
        );
    });

    return (
        <tbody>
            {rows}
        </tbody>
    );
}

class PostContents extends Component {
    render() {
        var theader = {
            keys: [],
            values: ["Mã bài đăng", "Tiêu đề", "url", "Người tạo"]
        };

        return (
            <div className="table-content">
                <table className="table table-striped">
                    <RenderHeader theader={theader} />
                    <RenderBody
                        tbody={this.props.tbodyContents}
                        handleEditClick={this.props.handleEditClick}
                        handleDeleteClick={this.props.handleDeleteClick}
                    />
                </table>
            </div>
        );
    }
}

class PostManagement extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ModeAction: "",
            EditContents: null,
            ShowCreatorUpdaterPopup: false,
            ShowDeletePopup: false,
            tbodyContents: []
        };

        this.CreatePost = this.CreatePost.bind(this);
        this.EditPost = this.EditPost.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleCloseDeletePop = this.handleCloseDeletePop.bind(this);
        this.handleResetContentsState = this.handleResetContentsState.bind(this);
        this.handleClosePopup = this.handleClosePopup.bind(this);
    }

    componentDidMount() {
        this.getPosts();
    }

    getPosts() {
        Request.get(UrlApi.PostManagement)
            .set('x-auth', localStorage.getItem('x-auth'))
            .then((res) => {
                this.setState({
                    tbodyContents: res.body
                });
            });
    }

    CreatePost() {
        window.location.href = UrlRedirect.CreatePost;
    }

    EditPost(event) {
        window.location.href = UrlRedirect.EditPost + `/${event.target.name}`;
    }

    handleDeleteClick(event) {
        this.setState({
            ShowDeletePopup: !this.state.ShowDeletePopup,
            SelectedItemId: event.target.name
        });
    }

    handleCloseDeletePop() {
        this.setState({
            ShowDeletePopup: !this.state.ShowDeletePopup
        });
    }

    handleResetContentsState() {
        this.getUsers();
    }

    handleClosePopup() {
        this.setState({
            ShowCreatorUpdaterPopup: !this.state.ShowCreatorUpdaterPopup
        });
    }

    render() {
        return (
            <div>
                <HeaderForm title={"Tin đăng"} buttonTitle={"tin đăng"} CreateItem={this.CreatePost} />
                <PostContents
                    tbodyContents={this.state.tbodyContents}
                    handleEditClick={this.EditPost}
                    handleDeleteClick={this.handleDeleteClick}
                />

                {/* {
                    this.state.ShowCreatorUpdaterPopup ?
                        <UserCreatorUpdater
                            modeAction={this.state.ModeAction}
                            editContents={this.state.EditContents}
                            resetContentState={this.handleResetContentsState}
                            closeCreatorUpdaterPopup={this.handleShowCreatorUpdaterPopup}
                        />
                        : null
                } */}

                {
                    this.state.ShowDeletePopup ?
                        <DeleteForm
                            url={UrlApi.PostManagement}
                            urlRedirect={UrlRedirect.Posts}
                            SelectedItemId={this.state.SelectedItemId}
                            closeDeletePopup={this.handleCloseDeletePop}
                            resetContentState={this.handleResetContentsState}
                        />
                        : null
                }
            </div>
        );
    }
}

export default PostManagement;