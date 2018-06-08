import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import './headerform.css';

class HeaderForm extends Component {
  render() {
    var buttonTitle = "Tạo " + this.props.title;
    return (
      <div className="header">
        <h2 className="header-title">{this.props.title}</h2>
        <button type="button" className="btn btn-primary float-left" onClick={this.props.showCreatorUpdaterPopup}>{buttonTitle}</button>
      </div>
    );
  }
}

export class HeaderForm2 extends Component {
  render() {
    var buttonTitle = "Tạo " + this.props.buttonTitle;
    return (
      <div>
        <div className="header2">
          <h2 className="header2-title">
            {this.props.title}
          </h2>
        </div>
        <div>
          <NavLink to={this.props.linkTo} className="btn btn-primary header2--button">{buttonTitle}</NavLink>
        </div>
      </div>
    );
  }
}

export class HeaderForm3 extends Component {
  render() {
    var buttonTitle = this.props.buttonTitle;
    return (
      <div>
        <div className="header2">
          <h2 className="header2-title">
            {this.props.title}
          </h2>
        </div>
        <div>
          <NavLink to={this.props.linkTo} className="btn btn-primary header2--button">{buttonTitle}</NavLink>
        </div>
      </div>
    );
  }
}

export default HeaderForm;