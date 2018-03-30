import React, { Component } from 'react';
import Request from 'superagent';
import DatePicker from 'react-date-picker';
import UrlApi from '../share/UrlApi';
import { JsonDateToDate, DateToJsonDate } from '../share/Mapper';
import { RenderInput, RenderSelect, RenderRadioButon, RenderDate } from '../share/InputsRender';

class PostCampaignCreatorUpdaterForm extends Component {
    constructor(props) {
        super(props);

        // this.OnChangeInput = this.OnChangeInput.bind(this);
        // this.OnChangeSelect = this.OnChangeSelect.bind(this);
        // this.OnChangeRadioButton = this.OnChangeRadioButton.bind(this);

        // this.OnchangeStartDate = this.OnchangeStartDate.bind(this);
        // this.OnchangeEndDate = this.OnchangeEndDate.bind(this);
    }

    render() {
        return (
            <div className='popup_inner--promotion'>
                <h1>{this.props.titleForm}</h1>
            </div>
        );
    }
}

class PostCampaignCreatorUpdater extends Component {
    constructor(props) {
        super(props);

        var jsonState = {};
        this.SetInitState(jsonState);
        this.state = jsonState;
    }

    SetInitState(jsonState) {

    }

    handleUpdateState(jsonState) {
        this.setState(jsonState);
    }

    GetModelStateJson() {
    }

    CreatePostCampaign() {

    }

    EditPostCampaign() {

    }

    handleSubmit() {
        if (this.props.modeAction === "create") {
            this.CreatePostCampaign();
        }
        else {
            this.EditPostCampaign();
        }
    }

    render() {
        var titleForm = this.props.modeAction === "create" ? "Tạo chiến dịch tin đăng" : "Chỉnh sửa chiến dịch tin đăng";
        return (
            <div className='popup'>
                <PostCampaignCreatorUpdaterForm
                    titleForm={titleForm}
                    stateValues={this.state}
                    handleClosePopup={this.props.closeCreatorUpdaterPopup}
                    handleSubmit={this.handleSubmit.bind(this)}
                    UpdateState={this.handleUpdateState.bind(this)}
                />
            </div>
        );
    }
}

export default PostCampaignCreatorUpdater;