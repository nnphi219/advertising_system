import React, { Component } from 'react';
import Request from 'superagent';
import AdsAreaCreator from './AdsAreaCreator';

function RenderRow(props){
  var areaSize = props.trContentAdsArea.area_size.width + props.trContentAdsArea.area_size.height;
  var status = (props.trContentAdsArea.status == 1)? "Kích hoạt": "Đã hủy";
  return (
    <tr>
      <td>{props.trContentAdsArea.ads_service_id}</td>
      <td>{props.trContentAdsArea.ads_name}</td>
      <td>{props.trContentAdsArea.post_apply_type}</td>
      <td>{props.trContentAdsArea.applied_ads_page_type}</td>
      <td>{props.trContentAdsArea.area_sharing_quantity}</td>
      <td>{props.trContentAdsArea.max_post_number}</td>
      <td>{areaSize}</td>
      <td>{status}</td>
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

class AdsAreaInformation extends Component {
  render() {
    var informationLeft = [];
    informationLeft.push(<p>Đang áp dụng(10) Ngừng kích hoạt(3) Đã xóa(3)</p>);
    informationLeft.push(<button key="Action" id="Action" type="button" className="btn btn-primary">Chọn hành động</button>);
    informationLeft.push(<button key="Apply" id="Apply" type="button" className="btn btn-primary">Áp dụng</button>);
    informationLeft.push(<button key="CreatedDate" id="CreatedDate" type="button" className="btn btn-primary">Chọn ngày tạo</button>);
    informationLeft.push(<button key="Filter" id="Filter" type="button" className="btn btn-primary">Lọc</button>);

    var informationRight = [];

    return(
      <div className="adsarea--information">
        <div className="adsarea--information-left">
          {informationLeft}
        </div>
        <div className="adsarea--information-right">
          {informationRight}
        </div>
    </div>  
    );
  }
}

class AdsAreaContents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tbodyAdsAreas: props.tbodyAdsAreas
    };
  }

  render(){
    var theadAdsAreas = ["Mã dịch vụ quảng cáo", "Tên dịch vụ", "Áp dụng", "Loại trang áp dụng", "Số lượng chia sẻ vùng", "Số lượng tin tối đa", "Kích thước vùng", "Trạng thái"];
    return (
      <div className="adsarea-content">
        <AdsAreaInformation />
        <table className="table table-striped">
          <RenderHead theadAdsAreas={theadAdsAreas}/>
          <RenderBody tbodyAdsAreas={this.props.tbodyAdsAreas}/>
        </table>
      </div>
    );
  }
}

class AdsAreaHeader extends Component {
  constructor(props) {
    super(props);

    this.handleCreateAdsAreaClick = this.handleCreateAdsAreaClick.bind(this);
  }

  handleCreateAdsAreaClick(){
    this.props.showCreatorPopup();
  }

  render(){
    return (
      <div className="adsarea--header">
        <h2 className="adsarea--header-title float-left">Vùng quảng cáo</h2>
        <button type="button" className="btn btn-primary float-left" onClick={this.handleCreateAdsAreaClick}>Tạo vùng quảng cáo</button>
      </div>
    );
  }
}


class AdsArea extends Component {
  constructor() {
    super(); 
    this.state = {
      showCreatorPopup: false,
      tbodyAdsAreas: []
    };
    this.handleShowCreatorPopup = this.handleShowCreatorPopup.bind(this);
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

  handleShowCreatorPopup() {
    this.setState({
      showCreatorPopup: !this.state.showCreatorPopup
    });
  }

  render(){
    return (
      <div className="container">
        <AdsAreaHeader showCreatorPopup={this.handleShowCreatorPopup}/>
        <AdsAreaContents tbodyAdsAreas={this.state.tbodyAdsAreas}/>
        {
          this.state.showCreatorPopup ?
          <AdsAreaCreator 
            closeCreatorPopup={this.handleShowCreatorPopup}
          /> 
          : null
        }
       
      </div>
    );
  }
}

export default AdsArea;