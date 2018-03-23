import React, { Component } from 'react';

import '../../Ads_Area/ads_area.css';

// <HeaderForm title={} showCreatorPopup={} />

class HeaderForm extends Component {
    constructor(props) {
      super(props);
    }
  
    render(){
      var buttonTitle = "Tạo " + this.props.title;
      return (
        <div className="adsarea--header">
          <h2 className="adsarea--header-title float-left">{this.props.title}</h2>
          <button type="button" className="btn btn-primary float-left" onClick={this.props.showCreatorPopup}>{buttonTitle}</button>
        </div>
      );
    }
  }

  export default HeaderForm;