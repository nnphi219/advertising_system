import React, { Component } from 'react';

import './headerform.css';

// <HeaderForm title={} showCreatorUpdaterPopup={} />

class HeaderForm extends Component {
  render() {
    var buttonTitle = "Tạo " + this.props.title;
    return (
      <div className="header">
        <h2 className="header-title float-left">
          {this.props.title}
          <button type="button" className="btn btn-primary header--button" onClick={this.props.CreateItem}>{buttonTitle}</button>
        </h2>
      </div>
    );
  }
}

export default HeaderForm;