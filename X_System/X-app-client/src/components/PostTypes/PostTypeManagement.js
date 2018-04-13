import React, { Component } from 'react';
import Request from 'superagent';

import RenderHeader from '../share/RenderHeader';
import DeleteForm from '../share/DeleteForm';
import HeaderForm from '../share/HeaderForm/HeaderForm';
import RenderEditDeleteButton from '../share/RenderEditDeleteButton';
import { UrlApi, UrlRedirect } from '../share/Url';
// import { PostTypeCreator, PostTypeEditor } from './PostTypeCreatorUpdater';

import './post_type.css';

function RenderRow(props) {
    return (
        <tr>
            <td>{props.trContent.ma_loai_bai_dang}</td>
            <td>{props.trContent.ten_loai_bai_dang}</td>
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

class PostTypeContents extends Component {
    render() {
        var theader = {
            keys: ["ma_loai_bai_dang", "ten_loai_bai_dang"],
            values: ["Mã loại bài đăng", "Tên loại bài đăng"]
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

class PostTypeManagement extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ModeAction: "",
            EditContents: null,
            tbodyContents: []
        };

        this.CreatePostType = this.CreatePostType.bind(this);
        this.EditPostType = this.EditPostType.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleCloseDeletePop = this.handleCloseDeletePop.bind(this);
        this.handleResetContentsState = this.handleResetContentsState.bind(this);
    }

    componentDidMount() {
        this.getPostTypes();
    }

    getPostTypes() {
        Request.get(UrlApi.PostTypes)
            .set('x-auth', localStorage.getItem('x-auth'))
            .then((res) => {
                this.setState({
                    tbodyContents: res.body
                });
            });
    }

    CreatePostType() {
        window.location.href = UrlRedirect.CreatePostType;
    }

    EditPostType(event) {
        window.location.href = UrlRedirect.EditPostType + `/${event.target.name}`;
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

    render() {
        return (
            <div>
                <HeaderForm title={"Loại bài đăng"} buttonTitle={"loại bài đăng"} CreateItem={this.CreatePostType} />
                <PostTypeContents
                    tbodyContents={this.state.tbodyContents}
                    handleEditClick={this.EditPostType}
                    handleDeleteClick={this.handleDeleteClick}
                />

                {
                    this.state.ShowDeletePopup ?
                        <DeleteForm
                            url={UrlApi.PostTypes}
                            urlRedirect={UrlRedirect.PostTypes}
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

export default PostTypeManagement;