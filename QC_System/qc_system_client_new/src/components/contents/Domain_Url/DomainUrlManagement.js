import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Request from 'superagent';

import RenderHeader from '../share/RenderHeader';
import DeleteFormWithoutPopup from '../share/DeleteFormWithoutPopup';
import { RenderDeleteButton } from '../share/RenderEditDeleteButton';
import UrlApi, { UrlRedirect } from '../share/UrlApi';

import { HeaderForm3 } from '../share/HeaderForm/HeaderForm';

import './domain_url.css';
import { XsystemDomainUrlCreator } from './DomainUrlCreatorUpdater';

function RenderRow(props) {
    return (
        <tr>
            <td>{props.trContent.domain}</td>
            <td>
                <RenderDeleteButton
                    nameId={props.trContent._id}
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

class DomainUrlContents extends Component {
    render() {
        var theader = {
            keys: ["domain"],
            values: ["Tên domain"]
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

class XsystemDomainUrl extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ModeAction: "",
            EditContents: null,
            tbodyContents: []
        };

        this.UpdateDomain = this.UpdateDomain.bind(this);
        this.EditDomainUrl = this.EditDomainUrl.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleCloseDeletePop = this.handleCloseDeletePop.bind(this);
        this.handleResetContentsState = this.handleResetContentsState.bind(this);
        this.deleteBySelf = this.deleteBySelf.bind(this);
    }

    componentDidMount() {
        this.getDomainUrls();
    }

    getDomainUrls() {
        Request.get(UrlApi.XsystemDomainUrls)
            .set('x-auth', localStorage.getItem('x-auth'))
            .then((res) => {
                this.setState({
                    tbodyContents: res.body
                });
            });
    }

    UpdateDomain() {
        window.location.href = UrlRedirect.XsystemCreateDomainUrl;
    }

    EditDomainUrl(event) {
        window.location.href = UrlRedirect.XsystemEditDomainUrl + `/${event.target.name}`;
    }

    handleDeleteClick(event) {
        let selectedItemId = event.target.name;
        let selectedItem = this.state.tbodyContents.find((content) => content._id === selectedItemId);
        this.setState({
            ShowDeletePopup: !this.state.ShowDeletePopup,
            SelectedItemId: selectedItemId,
            selectedItemValue: selectedItem.domain
        });
    }

    handleCloseDeletePop() {
        this.setState({
            ShowDeletePopup: !this.state.ShowDeletePopup
        });
    }

    handleResetContentsState() {
        this.getDomainUrls();
    }

    deleteBySelf(id) {
        let $this = this;
        Request.delete(UrlApi.XsystemDomainUrls)
            .set('x-auth', localStorage.getItem('x-auth'))
            .send({ domainId: id })
            .set('Accept', 'application/json')
            .end(function (err, res) {
                $this.getDomainUrls();
                $this.handleCloseDeletePop();
            });
    }

    render() {
        return (
            <div className="right_col">
                <div className="row tile_count" >
                    <div className="col-md-12 col-sm-12 col-xs-12">
                        <HeaderForm3
                            title={"Domain"}
                            buttonTitle={"Cập nhật domain"}
                            linkTo={UrlRedirect.XsystemUpdateDomainUrl}
                            CreateItem={this.UpdateDomain} />
                    </div>
                </div>
                <div className="row" >
                    <div className="col-md-12 col-sm-12 col-xs-12">
                        <DomainUrlContents
                            tbodyContents={this.state.tbodyContents}
                            handleEditClick={this.EditDomainUrl}
                            handleDeleteClick={this.handleDeleteClick}
                        />
                    </div>
                </div>
                {
                    this.state.ShowDeletePopup ?
                        <DeleteFormWithoutPopup
                            url={UrlApi.XsystemDomainUrls}
                            urlRedirect={UrlRedirect.XsystemDomainUrls}
                            SelectedItemId={this.state.SelectedItemId}
                            selectedItemValue={this.state.selectedItemValue}
                            closeDeletePopup={this.handleCloseDeletePop}
                            resetContentState={this.handleResetContentsState}
                            isDeletedBySelf={true}
                            deleteBySelf={this.deleteBySelf}
                        />
                        : null
                }
            </div>
        );
    }
}

class DomainUrlManagement extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route exact={true} path={UrlRedirect.XsystemDomainUrls} component={XsystemDomainUrl} />
                    <Route path={UrlRedirect.XsystemUpdateDomainUrl} component={XsystemDomainUrlCreator} />
                </div>
            </BrowserRouter>
        );
    }
}

export default DomainUrlManagement;