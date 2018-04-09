import React, { Component } from 'react';
import Request from 'superagent';

import RenderHeader from '../share/RenderHeader';
import DeleteForm from '../share/DeleteForm';
import HeaderForm from '../share/HeaderForm/HeaderForm';
import RenderEditDeleteButton from '../share/RenderEditDeleteButton';
import { UrlApi, UrlRedirect } from '../share/Url';
import { TransferFactorUnitKeyToText, JsonDateToDate, TransferdisplayMechanismToText } from '../share/Mapper';

import './user.css';
import UserCreatorUpdater from './UserCreatorUpdater';

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

class UserManagement extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ModeAction: "",
            EditContents: null,
            ShowCreatorUpdaterPopup: false,
            ShowDeletePopup: false,
            tbodyContents: []
        };

        this.CreateUser = this.CreateUser.bind(this);
        this.EditUser = this.EditUser.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleCloseDeletePop = this.handleCloseDeletePop.bind(this);
        this.handleResetContentsState = this.handleResetContentsState.bind(this);
        this.handleClosePopup = this.handleClosePopup.bind(this);
    }

    componentDidMount() {
        this.getUsers();
    }

    getUsers() {
        Request.get(UrlApi.UserManagement)
            .then((res) => {
                this.setState({
                    tbodyContents: res.body
                });
            });
    }

    CreateUser() {
        window.location.href = UrlRedirect.CreateUser;
    }

    EditUser(event) {
        window.location.href = UrlRedirect.EditUser + `/${event.target.name}`;
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
                <HeaderForm title={"user"} CreateItem={this.CreateUser} />
                <UserContents
                    tbodyContents={this.state.tbodyContents}
                    handleEditClick={this.EditUser}
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
                            closeDeletePopup={this.handleCloseDeletePop}
                            resetContentState={this.handleResetContentsState}
                        />
                        : null
                }
            </div>
        );
    }
}

export default UserManagement;