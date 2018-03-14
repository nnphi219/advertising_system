import React, { Component } from 'react';
import Request from 'superagent';

function RenderRow(props){
  return (
    <tr>
      <td>{props.trContentAdsArea.ads_service_id}</td>
      <td>{props.trContentAdsArea.ads_name}</td>
      <td>{props.trContentAdsArea.post_apply_type}</td>
    </tr>
  );
}

function RenderHead(props) {
  var row = [];
  props.theadAdsAreas.forEach(element => {
    row.push(<th key={element}>{element}</th>);
  });
  return(
    <thead>
      <tr>
        {row}
      </tr>
    </thead>
  );
}

function RenderBody(props) {
  var rows = [];
  props.tbodyAdsAreas.forEach((element, id) => {
    rows.push(<RenderRow trContentAdsArea={element} key={id}/>)
  });
  
  return(
    <tbody>
      {rows}
    </tbody>
  );
}

class AdsAreaContents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tbodyAdsAreas: props.tbodyAdsAreas
    };
  }

  render(){
    var theadAdsAreas = ["Firstname", "Lastname", "Email"];
    return (
      <table className="table table-striped">
        <RenderHead theadAdsAreas={theadAdsAreas}/>
        <RenderBody tbodyAdsAreas={this.props.tbodyAdsAreas}/>
      </table>
    );
  }
}

class AdsArea extends Component {
  constructor() {
    super(); 
    this.state = {
      tbodyAdsAreas: []
    };
  }

  componentDidMount(){
    this.getAdsAreas();
  }

  getAdsAreas() {
    var url = "http://localhost:8080/adsareas";
    Request.get(url)
    .then((res) => {
      this.setState({
        tbodyAdsAreas: res.body
      });
    });
  }

  render(){
    // var tbodyContents = [
    //   {"Firstname": "John", "Lastname": "Doe", "Email": "john@example.com"},
    //   {"Firstname": "Mary", "Lastname": "Moe", "Email": "mary@example.com"},
    //   {"Firstname": "July", "Lastname": "Dooley", "Email": "july@example.com"}
    // ];
    return (
      <div className="container">
        <AdsAreaContents tbodyAdsAreas={this.state.tbodyAdsAreas}/>
      </div>
    );
  }
}

export default AdsArea;