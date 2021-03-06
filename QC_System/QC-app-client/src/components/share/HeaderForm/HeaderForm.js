import React, { Component } from 'react';

import './headerform.css';

class HeaderForm extends Component {
  render() {
    var buttonTitle = "Tạo " + this.props.title;
    return (
      <div className="header">
        <h2 className="header-title float-left">{this.props.title}</h2>
        <button type="button" className="btn btn-primary float-left" onClick={this.props.showCreatorUpdaterPopup}>{buttonTitle}</button>
      </div>
    );
  }
}

export class HeaderForm2 extends Component {
  render() {
    var buttonTitle = "Tạo " + this.props.buttonTitle;
    return (
      <div className="header2">
        <h2 className="header2-title float-left">
          {this.props.title}
          <button type="button" className="btn btn-primary header2--button" onClick={this.props.CreateItem}>{buttonTitle}</button>
        </h2>
      </div>
    );
  }
}

export class HeaderForm3 extends Component {
  render() {
    var buttonTitle = this.props.buttonTitle;
    return (
      <div className="header2">
        <h2 className="header2-title float-left">
          {this.props.title}
          <button type="button" className="btn btn-primary header2--button" onClick={this.props.CreateItem}>{buttonTitle}</button>
        </h2>
      </div>
    );
  }
}

export default HeaderForm;