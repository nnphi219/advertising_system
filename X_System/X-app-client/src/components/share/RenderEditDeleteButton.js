import React, { Component } from 'react';

class RenderEditDeleteButton extends Component {
    render() {
        return (
            <div>
                <button key="Edit" id="Edit" name={this.props.nameId} type="button" className="btn btn-warning adsarea--button-edit" onClick={this.props.handleEditClick}>Edit</button>
                <button key="Delete" id="Delete" name={this.props.nameId} type="button" className="btn btn-danger adsarea--button-delete" onClick={this.props.handleDeleteClick}>Delete</button>
            </div>
        );
    }
}

export default RenderEditDeleteButton;