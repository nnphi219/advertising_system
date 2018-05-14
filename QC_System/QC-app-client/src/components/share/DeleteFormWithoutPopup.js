import React, { Component } from 'react';
import Request from 'superagent';

class DeleteFormWithoutPopup extends Component {
    constructor(props) {
        super(props);

        this.handleDeleteItem = this.handleDeleteItem.bind(this);
    }

    handleDeleteItem() {
        var url = this.props.url + "/" + this.props.SelectedItemId.toString();
        var $this = this;

        Request.delete(url)
        .set('x-auth', localStorage.getItem('x-auth'))
        .send({ id: this.props.SelectedItemId })
        .set('Accept', 'application/json')
        .end(function(err, res){
            $this.Rediect();
        });
    }

    Rediect(){
        window.location.href = this.props.urlRedirect;
    }

    render(){
        return(
            <div className='popup'>
                <div className='deleteform popup_inner'>
                    <h2>Xác nhận</h2>
                    <div className='popup_inner--delete-content'>
                        <p>Do you want to delete {this.props.SelectedItemId}?</p>
                        <button className="btn btn-primary deleteform--button" onClick={this.handleDeleteItem}>Ok</button>
                        <button className="btn btn-primary deleteform--button" onClick={this.props.closeDeletePopup}>Cancel</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default DeleteFormWithoutPopup;
