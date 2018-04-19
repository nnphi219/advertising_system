import React, { Component } from 'react';
import '../Ads_Area/ads_area.css';

class RenderEditDeleteButton extends Component {
    render() {
        var props = this.props;
        var activeTitle = (props.trang_thai === 1) ? "Hủy" : "Kích hoạt";
        
        return (
            <div>
                <button key="Edit" id="Edit" name={props.nameId} type="button" className="btn btn-warning adsarea--button-edit" onClick={props.handleEditClick}>Edit</button>
                <button key="Delete" id="Delete" name={props.nameId} type="button" className="btn btn-danger adsarea--button-delete" onClick={props.handleDeleteClick}>Delete</button>
                <button key="Active" id={props.trang_thai} name={props.nameId} type="button" className="btn btn-primary adsarea--button-active" onClick={props.handleActiveClick}>{activeTitle}</button>
            </div>
        );
    }
}

export default RenderEditDeleteButton;