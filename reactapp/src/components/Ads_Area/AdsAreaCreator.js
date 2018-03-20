import React, { Component } from 'react';
import Request from 'superagent';

function RenderInput(props) {
    return(
        <div>
            <label key={props.inputData.id} className="fullwidth">
                {props.inputData.description}
                <input type="text" id={props.inputData.id} key={props.inputData.id} className="adsarea--input" name={props.inputData.id} onChange={props.handleOnchangeInput} />
            </label>
        </div>
    );
}

function RenderCombobox(props) {
    var tags = [];
    var isSelected = false;
    var count = 0;
    props.inputData.values.forEach(element => {
        if(!isSelected) {
            tags.push(<option key={count} value={element} defaultValue >{element}</option>);
            isSelected = !isSelected;
        }
        else{
            tags.push(<option key={count} value={element}>{element}</option>);
        }
        count++;
    });
    return(
        <div>
            <label key={props.inputData.id} className="fullwidth">
                {props.inputData.description}
                <select name={props.inputData.id} id={props.inputData.id} key={props.inputData.id} onChange={props.handleOnchangeSelect} className="adsarea--select">
                   {tags}
                </select>
            </label>
        </div>
    );
}

function RenderProperties(props) {
    var inputs = [];
    props.inputDatas.forEach(element => {
        if(element.type === "combobox"){
            inputs.push(<RenderCombobox key={element.id} inputData={element} handleOnchangeSelect={props.handleOnchangeSelect}/>);
        }
        else{
            inputs.push(<RenderInput key={element.id} inputData={element} handleOnchangeInput={props.handleOnchangeInput}/>);
        }
    });
    return (
        <div>
            {inputs}
        </div>
    );
}

class AdsAreaCreatorForm extends Component {
    constructor(props){
        super(props);

        this.handleClosePopup = this.handleClosePopup.bind(this);
        this.handleOnchangeInput = this.handleOnchangeInput.bind(this);
        this.handleOnchangeSelect = this.handleOnchangeSelect.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleClosePopup() {
        this.props.handleClosePopup();
    }

    handleSubmit() {
        this.props.handleSubmit(this.state);
    }

    handleOnchangeInput(e){
        var name = e.target.name;
        var value = e.target.value;
        this.setState({[name]: value});
    }

    handleOnchangeSelect(e){
        var name = e.target.name;
        var value = e.target.value;
        this.setState({[name]: value});
    }

    render(){
        var adsAreaInformationInputs = [
            {
                "description":"Mã dịch vụ quảng cáo",
                "id":"ads_service_id",
                "type": "textbox"

            },
            {
                "description":"Tên hiển thị",
                "id":"ads_name",
                "type": "textbox"
            },
            {
                "description":"Trang áp dụng quảng cáo",
                "id":"applied_ads_page_type",
                "type": "combobox",
                "values" : ["Trang chủ", "Trang tìm kiếm", "Trang chi tiết"]
            },
            {
                "description":"Loại bài đăng áp dụng",
                "id":"post_apply_type",
                "type": "combobox",
                "values": ["Tin bds", "Dự án"]
            },
            {
                "description":"Kích thước vùng quảng cáo",
                "id":"area_size",
                "type": "combobox",
                "values": ["180x30", "260x60"]
            },
            {
                "description":"Số chia sẻ của vùng",
                "id":"area_sharing_quantity",
                "type": "quantity"
            },
            {
                "description":"Số lượng bài đăng tối đa",
                "id":"max_post_number",
                "type": "quantity"
            }
        ];

        var adsAreaDescriptionInputs = [
            {
                "description":"Màu chữ tiêu để",
                "id":"title_color",
                "type:": "color"
            },
            {
                "description":"Phông chữ của tiêu đề",
                "id":"title_font_family",
                "type": "combobox",
                "values": ["Arial", "Time new roman"]
            },
            {
                "description":"Kích cỡ phông chữ tiêu đề",
                "id":"title_font_size",
                "type": "combobox",
                "values": [10, 20, 30]
            },
            {
                "description":"Hiệu ứng tiêu đề",
                "id":"title_effect",
                "type": "combobox",
                "values": ["Regular", "Bold", "Italic"]
            },
            {
                "description":"Số kí tự tối đa của tiêu đề",
                "id":"des_characters_quantity",
                "type": "quantity"
            },
            {
                "description":"Có viền vùng quảng cáo",
                "id":"have_border",
                "type": "radio",
                "values": ["có", "Không"]
            },
            {
                "description":"Màu viền vùng quảng cáo",
                "id":"border_color",
                "type:": "color"
            },
            {
                "description":"Kích thước viền vùng quảng cáo",
                "id":"ads_area_border_size",
                "type": "quantity"
            },
            {
                "description":"Số kí tự tối đa của xem trước bài đăng",
                "id":"preview_characters_quantity",
                "type": "quantity"
            },
            {
                "description":"Hiên thị video thay thế ảnh đại diện",
                "id":"show_video",
                "type": "radio",
                "values": ["có", "Không"]
            }
        ];
        return(
            <div className='popup_inner'>
                <div key="left" className="adsarea_information_left">
                    <h2>Thông tin vùng quảng cáo</h2>
                    <RenderProperties 
                        inputDatas={adsAreaInformationInputs} 
                        handleOnchangeInput={this.handleOnchangeInput}
                        handleOnchangeSelect={this.handleOnchangeSelect}
                    />
                </div>

                <div key="right" className="adsarea_information_right">
                    <h2>Đặc tả của vùng</h2>
                    <RenderProperties 
                        inputDatas={adsAreaDescriptionInputs}
                        handleOnchangeInput={this.handleOnchangeInput}
                        handleOnchangeSelect={this.handleOnchangeSelect}
                    />
                </div>
                <div className="text-center">
                    <button className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
                    <button className="btn btn-primary" onClick={this.handleClosePopup}>Cancel</button>
                </div>
            </div>
        );
    }
}

class AdsAreaCreator extends Component {
    constructor(props) {
      super(props);

      this.handleClosePopup = this.handleClosePopup.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleClosePopup() {
        this.props.closeCreatorPopup();
    }

    handleSubmit(adsAreaContent) {
        var areaSize = adsAreaContent.area_size;
        var areaSizeArray = areaSize.split('x');
        var areaSizeJson = {width: areaSizeArray[0], height: areaSizeArray[1]};
        adsAreaContent.area_size = areaSizeJson;

        var url = "http://localhost:8080/adsareas";
        var $this = this;
        Request.post(url)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send(adsAreaContent)
            .end(function(err, res){
                console.log(res.text);
                $this.handleClosePopup();
            });  
    }

    render() {
      return (
        <div className='popup'>
            <AdsAreaCreatorForm 
                handleClosePopup={this.handleClosePopup}
                handleSubmit={this.handleSubmit}
            />
        </div>
      );
    }
  }

  export default AdsAreaCreator;