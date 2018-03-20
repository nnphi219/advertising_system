import React, { Component } from 'react';
import Request from 'superagent';
import AdsAreaCreator from './AdsAreaCreator';

function RenderEditDeleteButton(props) {
  return(
    <div>
      <button key="Edit" id="Edit" name={props.nameId} type="button" className="btn btn-warning adsarea--button-edit" onClick={props.handleEditClick}>Edit</button>
      <button key="Delete" id="Delete" name={props.nameId} type="button" className="btn btn-danger adsarea--button-delete" onClick={props.handleDeleteClick}>Delete</button>
    </div>
  );
}

function RenderRow(props){
  var areaSize = props.trContentAdsArea.area_size.width + props.trContentAdsArea.area_size.height;
  var status = (props.trContentAdsArea.status === 1)? "Kích hoạt": "Đã hủy";
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
      <td>
        <RenderEditDeleteButton 
          nameId={props.trContentAdsArea._id}
          handleEditClick={props.handleEditClick}
          handleDeleteClick={props.handleDeleteClick}
        />
      </td>
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
    rows.push(
      <RenderRow 
        trContentAdsArea={element} 
        key={id} 
        handleEditClick={props.handleEditClick}
        handleDeleteClick={props.handleDeleteClick}
      />
    );
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
    informationLeft.push(<p key="title">Đang áp dụng(10) Ngừng kích hoạt(3) Đã xóa(3)</p>);
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
    var theadAdsAreas = ["Mã dịch vụ quảng cáo", "Tên dịch vụ", "Áp dụng", "Loại trang áp dụng", "Số lượng chia sẻ vùng", "Số lượng tin tối đa", "Kích thước vùng", "Trạng thái"];
    return (
      <div className="adsarea-content">
        <AdsAreaInformation />
        <table className="table table-striped">
          <RenderHead theadAdsAreas={theadAdsAreas}/>
          <RenderBody 
            tbodyAdsAreas={this.state.tbodyAdsAreas}
            handleEditClick={this.props.handleEditClick}
            handleDeleteClick={this.props.handleDeleteClick}
          />
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
      showCreatorPopup: false
    };
    this.handleShowCreatorPopup = this.handleShowCreatorPopup.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  handleShowCreatorPopup() {
    this.setState({
      showCreatorPopup: !this.state.showCreatorPopup
    });
  }

  handleEditClick(event){
    var name = event.target.name;
    var value = event.target.value;
    var key = event.target.key;
    console.log(name);
    console.log(value);
    console.log(key);
  }

  handleDeleteClick(event){
    console.log(event.target.name);
  }

  render(){
    return (
      <div id="page-wrapper">
          <div className="row">
              <div>
                <AdsAreaHeader showCreatorPopup={this.handleShowCreatorPopup}/>
                <AdsAreaContents 
                  handleEditClick={this.handleEditClick}
                  handleDeleteClick={this.handleDeleteClick}
                />
                
                {
                  this.state.showCreatorPopup ?
                  <AdsAreaCreator 
                    closeCreatorPopup={this.handleShowCreatorPopup}
                  /> 
                  : null
                }
              </div>
          </div>
      </div>
      
    );
  }
}

export default AdsArea;