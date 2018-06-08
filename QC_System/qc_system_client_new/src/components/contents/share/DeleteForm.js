import React, { Component } from 'react';
import Request from 'superagent';

class DeleteForm extends Component {
    constructor(props) {
        super(props);

        this.handleDeleteItem = this.handleDeleteItem.bind(this);
    }

    handleDeleteItem() {
        var url = this.props.url + "/" + this.props.SelectedItemId.toString();
        var $this = this;

        Request.delete(url)
        .send({ id: this.props.SelectedItemId })
        .set('Accept', 'application/json')
        .set('x-auth', localStorage.getItem('x-auth'))
        .end(function(err, res){
            $this.props.resetContentState();
            $this.props.closeDeletePopup();
        });
    }

    render(){
        return(
            <div className='popup'>
                <div className='popup_inner deleteform'>
                    <h2>Xác nhận</h2>
                    <div className='popup_inner--delete-content'>
                        <p>Do you want to delete {this.props.SelectedItemId}?</p>
                        <button className="btn btn-primary" onClick={this.handleDeleteItem}>Ok</button>
                        <button className="btn btn-primary" onClick={this.props.closeDeletePopup}>Cancel</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default DeleteForm;
