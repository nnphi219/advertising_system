import React, { Component } from 'react';

import './headerform.css';

class HeaderForm extends Component {
  render() {
    var buttonTitle = "Tạo " + this.props.buttonTitle;
    return (
      <div>
        <div className="header">
          <h2 className="header-title float-left">
            {this.props.title}
          </h2>
        </div>
        <div>
          <button type="button" className="btn btn-primary header--button" onClick={this.props.CreateItem}>{buttonTitle}</button>
        </div>
      </div>
    );
  }
}

export default HeaderForm;