import React, { Component } from 'react';
import Request from 'superagent';
import AdsAreaCreatorUpdater from './AdsAreaCreatorUpdater';
import AdsAreaDeleteForm from './AdsAreaDelete';
import './ads_area.css';
import UrlApi from '../share/UrlApi';
import { JsonSortDateType, JsonSort } from '../share/Mapper';
import RenderHeader from '../share/RenderHeader';

function RenderEditDeleteButton(props) {
  var activeTitle = (props.trang_thai === 1) ? "Hủy" : "Kích hoạt";

  return (
    <div>
      <button key="Edit" id="Edit" name={props.nameId} type="button" className="btn btn-warning adsarea--button-edit" onClick={props.handleEditClick}>Edit</button>
      <button key="Delete" id="Delete" name={props.nameId} type="button" className="btn btn-danger adsarea--button-delete" onClick={props.handleDeleteClick}>Delete</button>
      <button key="Active" id={props.trang_thai} name={props.nameId} type="button" className="btn btn-primary adsarea--button-active" onClick={props.handleActiveClick}>{activeTitle}</button>
    </div>
  );
}

function RenderRow(props) {
  var areaSize = "";
  if (props.trContentAdsArea.kich_thuoc_vung) {
    areaSize = props.trContentAdsArea.kich_thuoc_vung.width.toString() + "x" + props.trContentAdsArea.kich_thuoc_vung.height.toString();
  }
  var status = (props.trContentAdsArea.trang_thai === 1) ? "Kích hoạt" : "Đã hủy";

  return (
    <tr>
      <td>{props.trContentAdsArea.ma_dich_vu}</td>
      <td>{props.trContentAdsArea.ten_hien_thi}</td>
      <td>{props.trContentAdsArea.loai_quang_cao.value}</td>
      <td>{props.trContentAdsArea.loai_bai_dang_ap_dung.value}</td>
      <td>{props.trContentAdsArea.loai_trang_ap_dung.value}</td>
      <td>{props.trContentAdsArea.so_luong_chia_se_vung}</td>
      <td>{props.trContentAdsArea.so_luong_tin_toi_da}</td>
      <td>{areaSize}</td>
      <td>{status}</td>
      <td>
        <RenderEditDeleteButton
          nameId={props.trContentAdsArea._id}
          handleEditClick={props.handleEditClick}
          handleDeleteClick={props.handleDeleteClick}
          handleActiveClick={props.handleActiveClick}
          trang_thai={props.trContentAdsArea.trang_thai}
        />
      </td>
    </tr>
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
        handleActiveClick={props.handleActiveClick}
      />
    );
  });

  return (
    <tbody>
      {rows}
    </tbody>
  );
}

// class AdsAreaInformation extends Component {
//   render() {
//     var informationLeft = [];
//     informationLeft.push(<p key="title">Đang áp dụng(10) Ngừng kích hoạt(3) Đã xóa(3)</p>);
//     informationLeft.push(<button key="Action" id="Action" type="button" className="btn btn-primary">Chọn hành động</button>);
//     informationLeft.push(<button key="Apply" id="Apply" type="button" className="btn btn-primary">Áp dụng</button>);
//     informationLeft.push(<button key="CreatedDate" id="CreatedDate" type="button" className="btn btn-primary">Chọn ngày tạo</button>);
//     informationLeft.push(<button key="Filter" id="Filter" type="button" className="btn btn-primary">Lọc</button>);

//     var informationRight = [];

//     return (
//       <div className="adsarea--information">
//         <div className="adsarea--information-left">
//           {informationLeft}
//         </div>
//         <div className="adsarea--information-right">
//           {informationRight}
//         </div>
//       </div>
//     );
//   }
// }

class AdsAreaContents extends Component {
  render() {
    var theadAdsAreas = {
      keys: ['ma_dich_vu', 'ten_hien_thi', 'loai_quang_cao.key', 'loai_bai_dang_ap_dung', 'loai_trang_ap_dung', 'so_luong_chia_se_vung', 'so_luong_tin_toi_da', 'kich_thuoc_vung.width', 'trang_thai'],
      values: ["Mã dịch vụ quảng cáo", "Tên dịch vụ", "Loại quảng cáo", "Áp dụng", "Loại trang áp dụng", "Số lượng chia sẻ vùng", "Số lượng tin tối đa", "Kích thước vùng", "Trạng thái"]
    };

    var props = this.props;

    return (
      <div className="adsarea-content">

        <table className="table table-striped">
          <RenderHeader
            theader={theadAdsAreas}
            OnchangeSort={props.OnchangeSort}
          />
          <RenderBody
            tbodyAdsAreas={this.props.tbodyAdsAreas}
            handleEditClick={this.props.handleEditClick}
            handleDeleteClick={this.props.handleDeleteClick}
            handleActiveClick={this.props.handleActiveClick}
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
      tbodyAdsAreas: [],
      IsASC: false,
      KeySort: ''
    };
    this.handleShowCreatorPopup = this.handleShowCreatorPopup.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleActiveClick = this.handleActiveClick.bind(this);
    this.handleCloseDeletePop = this.handleCloseDeletePop.bind(this);
    this.handleResetContentsState = this.handleResetContentsState.bind(this);

    this.OnchangeSort = this.OnchangeSort.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);
  }

  componentDidMount() {
    this.getAdsAreas();
  }

  _onKeyDown(e) {
    if (e.key === "Escape") {
      this.setState({
        ShowCreatorPopup: false,
        ShowDeletePopup: false
      });
    }
  }

  componentWillMount(){
    document.addEventListener("keydown", this._onKeyDown);
  }

  componentWillUnmount(){
    document.addEventListener("keydown", this._onKeyDown);
  }

  getAdsAreas() {
    var url = "http://localhost:8080/adsareas";
    Request.get(url)
      .set('x-auth', localStorage.getItem('x-auth'))
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

  handleActiveClick(event) {
    var url = UrlApi.AdsArea + "/" + event.target.name;
    var $this = this;
    var updateAdsAreaJson = {
      trang_thai: parseInt(event.target.id, 10) === 1 ? 0 : 1
    };

    Request.put(url)
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('x-auth', localStorage.getItem('x-auth'))
      .send(updateAdsAreaJson)
      .end(function (err, res) {
        $this.getAdsAreas();
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

  OnchangeSort(e) {
    var newKeySort = e.target.name;
    var KeySort = this.state.KeySort;
    var jsonStateSort = {
      KeySort: newKeySort
    };

    if (newKeySort === KeySort) {
      jsonStateSort.IsASC = !this.state.IsASC;
    }
    else {
      jsonStateSort.IsASC = true;
    }

    this.setState(jsonStateSort);
    e.preventDefault();
  }

  render() {
    var currentState = this.state;
    var KeySort = currentState.KeySort;
    var tbody = null;
    if (KeySort === '') {
      tbody = currentState.tbodyAdsAreas;
    }
    else if (KeySort === 'start_date' || KeySort === 'end_date') {
      tbody = JsonSortDateType(currentState.tbodyAdsAreas, KeySort, currentState.IsASC);
    }
    else {
      tbody = JsonSort(currentState.tbodyAdsAreas, KeySort, currentState.IsASC);
    }

    return (
      <div id="page-wrapper" onKeyDown={this.onKeyDown}>
        <div className="row">
          <div>
            <AdsAreaHeader showCreatorPopup={this.handleShowCreatorPopup} />
            <AdsAreaContents
              tbodyAdsAreas={tbody}
              handleEditClick={this.handleEditClick}
              handleDeleteClick={this.handleDeleteClick}
              handleActiveClick={this.handleActiveClick}
              OnchangeSort={this.OnchangeSort}
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