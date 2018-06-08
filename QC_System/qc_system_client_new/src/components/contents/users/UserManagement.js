import React, { Component } from 'react';
import Request from 'superagent';

import RenderHeader from '../share/RenderHeader';
import DeleteForm from '../share/DeleteForm';
import { HeaderForm2 } from '../share/HeaderForm/HeaderForm';
import RenderEditDeleteButton from '../share/RenderEditDeleteButton';
import UrlApi, { UrlRedirect } from '../share/UrlApi';
import { BrowserRouter, Route } from 'react-router-dom';

import './user.css';
import UserCreatorUpdater, { UserCreator, UserEditor } from './UserCreatorUpdater';

function RenderRow(props) {
    return (
        <tr>
            <td>{props.trContent.username}</td>
            <td>{props.trContent.email}</td>
            <td>{props.trContent.user_type}</td>
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

class UserContents extends Component {
    render() {
        var theader = {
            keys: [],
            values: ["User name", "Email", "Loại user"]
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

class User extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ModeAction: "",
            EditContents: null,
            ShowCreatorUpdaterPopup: false,
            ShowDeletePopup: false,
            tbodyContents: []
        };

        this.handleShowCreatorUpdaterPopup = this.handleShowCreatorUpdaterPopup.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleCloseDeletePop = this.handleCloseDeletePop.bind(this);
        this.handleResetContentsState = this.handleResetContentsState.bind(this);
        this.handleClosePopup = this.handleClosePopup.bind(this);

        this._onKeyDown = this._onKeyDown.bind(this);
    }

    componentDidMount() {
        this.getUsers();
    }

    _onKeyDown(e) {
        if (e.key === "Escape") {
            this.setState({
                ShowCreatorUpdaterPopup: false,
                ShowDeletePopup: false
            });
        }
    }

    componentWillMount() {
        document.addEventListener("keydown", this._onKeyDown);
    }

    componentWillUnmount() {
        document.addEventListener("keydown", this._onKeyDown);
    }

    getUsers() {
        Request.get(UrlApi.UserManagement)
            .then((res) => {
                this.setState({
                    tbodyContents: res.body
                });
            });
    }

    handleShowCreatorUpdaterPopup() {
        this.setState({
            ShowCreatorUpdaterPopup: !this.state.ShowCreatorUpdaterPopup,
            ModeAction: "create"
        });
    }

    handleEditClick(event) {
        window.location.href = UrlRedirect.UserEditor + `/${event.target.name}`;
    }

    handleDeleteClick(event) {
        let selectedItemId = event.target.name;
        let selectedItem = this.state.tbodyContents.find((content) => content._id === selectedItemId);
        this.setState({
            ShowDeletePopup: !this.state.ShowDeletePopup,
            SelectedItemId: selectedItemId,
            selectedItemValue: selectedItem.username
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
            <div className="right_col">
                <div className="row tile_count" >
                    <HeaderForm2
                        title={"Quản lý user"}
                        buttonTitle={"user"}
                        linkTo={UrlRedirect.UserCreator} />
                </div>
                <div className="row">
                    <div id="page-wrapper" >
                        <div className="row">
                            <div>
                                <UserContents
                                    tbodyContents={this.state.tbodyContents}
                                    handleEditClick={this.handleEditClick}
                                    handleDeleteClick={this.handleDeleteClick}
                                />

                                {
                                    this.state.ShowCreatorUpdaterPopup ?
                                        <UserCreatorUpdater
                                            modeAction={this.state.ModeAction}
                                            editContents={this.state.EditContents}
                                            resetContentState={this.handleResetContentsState}
                                            closeCreatorUpdaterPopup={this.handleShowCreatorUpdaterPopup}
                                        />
                                        : null
                                }

                                {
                                    this.state.ShowDeletePopup ?
                                        <DeleteForm
                                            url={UrlApi.UserManagement}
                                            SelectedItemId={this.state.SelectedItemId}
                                            selectedItemValue={this.state.selectedItemValue}
                                            closeDeletePopup={this.handleCloseDeletePop}
                                            resetContentState={this.handleResetContentsState}
                                        />
                                        : null
                                }
                            </div>
                        </div>
                    </div >
                </div >
            </div >
        );
    }
}

class UserManagement extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route exact={true} path={UrlRedirect.Users} component={User} />
                    <Route exact={true} path={UrlRedirect.UserCreator} component={UserCreator} />
                    <Route exact={true} path={UrlRedirect.UserEditor + "/:id"} component={UserEditor} />
                </div>
            </BrowserRouter>
        );
    }
}

export default UserManagement;