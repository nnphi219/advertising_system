import React, { Component } from 'react';
import Request from 'superagent';

function RenderRow(props){
  return (
    <tr>
      <td>{props.trContent.Firstname}</td>
      <td>{props.trContent.Lastname}</td>
      <td>{props.trContent.Email}</td>
    </tr>
  );
}

function RenderHead(props) {
  var row = [];
  props.thead.forEach(element => {
    row.push(<th>{element}</th>);
  });
  return(
    <thead>
        {row}
    </thead>
  );
}

function RenderBody(props) {
  var rows = [];
  props.tbody.forEach(element => {
    rows.push(<RenderRow trContent={element} />)
  });
  return(
    <tbody>
      {rows}
    </tbody>
  );
}

class AdsAreaContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tbodyContents: props.tbodyContents
    };
  }

  render(){
    var theadContent = ["Firstname", "Lastname", "Email"];
    return (
      <table className="table table-striped">
        <RenderHead thead={theadContent}/>
        <RenderBody tbody={this.state.tbodyContents}/>
      </table>
    );
  }
}

class AdsArea extends Component {
  constructor() {
    super(); 
    this.state = {
      AdsAreaContents: []
    };
  }

  componentDidMount(){
    this.getAdsAreas();
  }

  getAdsAreas() {
    var url = "http://localhost:8080/adsareas";
    Request.get(url).then((res) => {
      this.setState({
        AdsAreaContents: res
      });
    });
  }

  render(){
    var tbodyContents = [
      {"Firstname": "John", "Lastname": "Doe", "Email": "john@example.com"},
      {"Firstname": "Mary", "Lastname": "Moe", "Email": "mary@example.com"},
      {"Firstname": "July", "Lastname": "Dooley", "Email": "july@example.com"}
    ];

    return (
      <div className="container">
        {/* <AdsAreaContent tbodyContents={this.state.AdsAreaContents}/> */}
        <p>ppp</p>
      </div>
    );
  }
}

export default AdsArea;