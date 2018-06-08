import React, { Component } from 'react';
import Request from 'superagent';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';

import RenderHeader from '../share/RenderHeader';
import DeleteFormWithoutPopup from '../share/DeleteFormWithoutPopup';
import RenderEditDeleteButton from '../share/RenderEditDeleteButton';
import UrlApi, { UrlRedirect } from '../share/UrlApi';

import { HeaderForm2 } from '../share/HeaderForm/HeaderForm';

import './post_type.css';
import { XsystemPostTypeEditor, XsystemPostTypeCreator } from './PostTypeCreatorUpdater';

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
                    ActiveIsNotShown={true}
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

class XsystemPostTypes extends Component {
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
        Request.get(UrlApi.XsystemPostTypes)
            .set('x-auth', localStorage.getItem('x-auth'))
            .then((res) => {
                this.setState({
                    tbodyContents: res.body
                });
            });
    }

    CreatePostType() {
        window.location.href = UrlRedirect.XsystemCreatePostType;
    }

    EditPostType(event) {
        window.location.href = UrlRedirect.PostTypeEditor + `/${event.target.name}`;
    }

    handleDeleteClick(event) {
        let selectedItemId = event.target.name;
        let selectedItem = this.state.tbodyContents.find((content) => content._id === selectedItemId);
        this.setState({
            ShowDeletePopup: !this.state.ShowDeletePopup,
            SelectedItemId: selectedItemId,
            selectedItemValue: selectedItem.ten_loai_bai_dang
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
            <div className="right_col">
                <div className="row tile_count" >
                    <HeaderForm2 
                    title={"Loại bài đăng"} 
                    buttonTitle={"loại bài đăng"} 
                    linkTo={UrlRedirect.PostTypeCreator}
                    CreateItem={this.CreatePostType} />
                </div>
                <PostTypeContents
                    tbodyContents={this.state.tbodyContents}
                    handleEditClick={this.EditPostType}
                    handleDeleteClick={this.handleDeleteClick}
                />

                {
                    this.state.ShowDeletePopup ?
                        <DeleteFormWithoutPopup
                            url={UrlApi.XsystemPostTypes}
                            urlRedirect={UrlRedirect.PostTypes}
                            SelectedItemId={this.state.SelectedItemId}
                            selectedItemValue={this.state.selectedItemValue}
                            closeDeletePopup={this.handleCloseDeletePop}
                            resetContentState={this.handleResetContentsState}
                        />
                        : null
                }
            </div>
        );
    }
}

class PostTypesManagement extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route exact={true} path={UrlRedirect.PostTypes} component={XsystemPostTypes} />
                    <Route exact={true} path={UrlRedirect.PostTypeCreator} component={XsystemPostTypeCreator} />
                    <Route exact={true} path={UrlRedirect.PostTypeEditor + "/:id"} component={XsystemPostTypeEditor} />
                </div>
            </BrowserRouter>
        );
    }
}

export default PostTypesManagement;