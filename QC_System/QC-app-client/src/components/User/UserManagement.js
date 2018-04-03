import React, { Component } from 'react';
import Request from 'superagent';

import RenderHeader from '../share/RenderHeader';
import DeleteForm from '../share/DeleteForm';
import HeaderForm from '../share/HeaderForm/HeaderForm';
import RenderEditDeleteButton from '../share/RenderEditDeleteButton';
import UrlApi from '../share/UrlApi';
import { TransferFactorUnitKeyToText, JsonDateToDate, TransferdisplayMechanismToText } from '../share/Mapper';

import './user_management.css';
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
        var theader = ["User name", "Email", "Loại user"];
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

        this.handleShowCreatorUpdaterPopup = this.handleShowCreatorUpdaterPopup.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
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

    handleShowCreatorUpdaterPopup() {
        this.setState({
            ShowCreatorUpdaterPopup: !this.state.ShowCreatorUpdaterPopup,
            ModeAction: "create"
        });
    }

    handleEditClick(event) {
        var nameId = event.target.name;
        var editContents = {};

        var i = 0;
        var finishLoop = false;
        while (i < this.state.tbodyContents.length && !finishLoop) {
            var element = this.state.tbodyContents[i];
            if (nameId === element._id) {
                editContents = element;
                finishLoop = true;
            }
            i++;
        }

        this.setState({
            ModeAction: "edit",
            EditContents: editContents,
            ShowCreatorUpdaterPopup: !this.state.ShowCreatorUpdaterPopup
        });
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
            < div id="page-wrapper" >
                <div className="row">
                    <div>
                        <HeaderForm title={"user"} showCreatorUpdaterPopup={this.handleShowCreatorUpdaterPopup} />
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
                                    closeDeletePopup={this.handleCloseDeletePop}
                                    resetContentState={this.handleResetContentsState}
                                />
                                : null
                        }
                    </div>
                </div>
            </div >
        );
    }
}

export default UserManagement;