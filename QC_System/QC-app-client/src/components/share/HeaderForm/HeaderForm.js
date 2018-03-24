import React, { Component } from 'react';

import './headerform.css';

// <HeaderForm title={} showCreatorUpdaterPopup={} />

class HeaderForm extends Component {
    constructor(props) {
      super(props);
    }
  
    render(){
      var buttonTitle = "Tạo " + this.props.title;
      return (
        <div className="header">
          <h2 className="header-title float-left">{this.props.title}</h2>
          <button type="button" className="btn btn-primary float-left" onClick={this.props.showCreatorUpdaterPopup}>{buttonTitle}</button>
        </div>
      );
    }
  }

  export default HeaderForm;