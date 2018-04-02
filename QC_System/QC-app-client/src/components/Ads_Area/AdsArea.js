import React, { Component } from 'react';
import Request from 'superagent';
import AdsAreaCreatorUpdater from './AdsAreaCreatorUpdater';
import AdsAreaDeleteForm from './AdsAreaDelete';
import './ads_area.css';
import { TransferSelectInputKeyToValue } from '../share/Mapper';

function RenderEditDeleteButton(props) {
  return (
    <div>
      <button key="Edit" id="Edit" name={props.nameId} type="button" className="btn btn-warning adsarea--button-edit" onClick={props.handleEditClick}>Edit</button>
      <button key="Delete" id="Delete" name={props.nameId} type="button" className="btn btn-danger adsarea--button-delete" onClick={props.handleDeleteClick}>Delete</button>
    </div>
  );
}

function RenderRow(props) {
  var areaSize = props.trContentAdsArea.kich_thuoc_vung.width.toString() + "x" + props.trContentAdsArea.kich_thuoc_vung.height.toString();
  var status = (props.trContentAdsArea.status === 1) ? "Kích hoạt" : "Đã hủy";
  var loai_trang_ap_dung = TransferSelectInputKeyToValue(
    props.trContentAdsArea.loai_trang_ap_dung,
    ["trang_chu", "trang_tim_kiem", "trang_chi_tiet"],
    ["Trang chủ", "Trang tìm kiếm", "Trang chi tiết"]
  );
  var loai_bai_dang_ap_dung = TransferSelectInputKeyToValue(
    props.trContentAdsArea.loai_bai_dang_ap_dung,
    ["tin_bds", "du_an"],
    ["Tin bds", "Dự án"]
  );

  return (
    <tr>
      <td>{props.trContentAdsArea.ma_dich_vu}</td>
      <td>{props.trContentAdsArea.ten_hien_thi}</td>
      <td>{loai_bai_dang_ap_dung}</td>
      <td>{loai_trang_ap_dung}</td>
      <td>{props.trContentAdsArea.so_luong_chia_se_vung}</td>
      <td>{props.trContentAdsArea.so_luong_tin_toi_da}</td>
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
  return (
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

  return (
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

    return (
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
  render() {
    var theadAdsAreas = ["Mã dịch vụ quảng cáo", "Tên dịch vụ", "Áp dụng", "Loại trang áp dụng", "Số lượng chia sẻ vùng", "Số lượng tin tối đa", "Kích thước vùng", "Trạng thái"];
    return (
      <div className="adsarea-content">
        
        <table className="table table-striped">
          <RenderHead theadAdsAreas={theadAdsAreas} />
          <RenderBody
            tbodyAdsAreas={this.props.tbodyAdsAreas}
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

  handleCreateAdsAreaClick() {
    this.props.showCreatorPopup();
  }

  render() {
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
      ModeAction: "",
      EditContents: null,
      ShowCreatorPopup: false,
      ShowDeletePopup: false,
      SelectedItemId: null,
      tbodyAdsAreas: []
    };
    this.handleShowCreatorPopup = this.handleShowCreatorPopup.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleCloseDeletePop = this.handleCloseDeletePop.bind(this);
    this.handleResetContentsState = this.handleResetContentsState.bind(this);
  }

  componentDidMount() {
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
      ShowCreatorPopup: !this.state.ShowCreatorPopup,
      ModeAction: "create"
    });
  }

  handleEditClick(event) {
    var nameId = event.target.name;
    var editContents = {};

    var i = 0;
    var finishLoop = false;
    while (i < this.state.tbodyAdsAreas.length && !finishLoop) {
      var element = this.state.tbodyAdsAreas[i];
      if (nameId === element._id) {
        editContents = element;
        finishLoop = true;
      }
      i++;
    }

    this.setState({
      ModeAction: "edit",
      EditContents: editContents,
      ShowCreatorPopup: !this.state.ShowCreatorPopup
    });
  }

  handleDeleteClick(event) {
    this.setState({
      ShowDeletePopup: !this.state.ShowDeletePopup,
      SelectedItemId: event.target.name
    });
  }

  handleCloseDeletePop() {
    this.setState({
      ShowDeletePopup: !this.state.ShowDeletePopup
    });
  }

  handleResetContentsState() {
    this.getAdsAreas();
  }

  render() {
    return (
      <div id="page-wrapper">
        <div className="row">
          <div>
            <AdsAreaHeader showCreatorPopup={this.handleShowCreatorPopup} />
            <AdsAreaContents
              tbodyAdsAreas={this.state.tbodyAdsAreas}
              handleEditClick={this.handleEditClick}
              handleDeleteClick={this.handleDeleteClick}
            />

            {
              this.state.ShowCreatorPopup ?
                <AdsAreaCreatorUpdater
                  modeAction={this.state.ModeAction}
                  editContents={this.state.EditContents}
                  resetContentState={this.handleResetContentsState}
                  closeCreatorPopup={this.handleShowCreatorPopup}
                />
                : null
            }

            {
              this.state.ShowDeletePopup ?
                <AdsAreaDeleteForm
                  SelectedItemId={this.state.SelectedItemId}
                  closeDeletePopup={this.handleCloseDeletePop}
                  resetContentState={this.handleResetContentsState}
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