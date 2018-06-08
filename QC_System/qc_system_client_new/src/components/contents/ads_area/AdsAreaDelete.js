import React, { Component } from 'react';
import Request from 'superagent';
import './ads_area.css';
import UrlApi, { UrlRedirect } from '../share/UrlApi';

class AdsAreaDeleteForm extends Component {
    constructor(props) {
        super(props);

        this.handleDeleteItem = this.handleDeleteItem.bind(this);
    }

    handleDeleteItem() {
        var url = UrlApi.AdsArea + "/" + this.props.SelectedItemId.toString();
        var $this = this;

        Request.delete(url)
        .send({ id: this.props.SelectedItemId })
        .set('Accept', 'application/json')
        .set('x-auth', localStorage.getItem('x-auth'))
        .end(function(err, res){
            window.location.href = UrlRedirect.AdsArea;
        });
    }

    render(){
        return(
            <div className='popup'>
                <div className='popup_inner div_scroll_bar adsarea_deleteform_size'>
                    <h2>Xác nhận</h2>
                    <div className='popup_inner--delete-content'>
                        <p>Bạn có chắc muốn xóa {this.props.selectedItemValue}?</p>
                        <button className="btn btn-primary" onClick={this.handleDeleteItem}>Ok</button>
                        <button className="btn btn-primary" onClick={this.props.closeDeletePopup}>Cancel</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default AdsAreaDeleteForm;
