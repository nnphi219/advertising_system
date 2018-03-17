import React, { Component } from 'react';
import Request from 'superagent';

function RenderInput(props) {
    return(
        <div>
            <label className="fullwidth">
                {props.inputData.description}
                <input type="text" id={props.inputData.id} className="adsarea--input" name={props.inputData.id} onChange={props.handleOnchange} />
            </label>
        </div>
    );
}

function RenderProperties(props) {
    var inputs = [];
    props.inputDatas.forEach(element => {
        inputs.push(<RenderInput inputData={element} handleOnchange={props.handleOnchange}/>)
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
        this.handleOnchange = this.handleOnchange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleClosePopup() {
        this.props.handleClosePopup();
    }

    handleSubmit() {
        this.props.handleSubmit(this.state);
    }

    handleOnchange(e){
        var name = e.target.name;
        var value = e.target.value;
        this.setState({[name]: value});
    }

    render(){
        var adsAreaInformationInputs = [
            {
                "description":"Mã dịch vụ quảng cáo",
                "id":"ads_service_id"

            },
            {
                "description":"Tên hiển thị",
                "id":"ads_name"

            },
            {
                "description":"Trang áp dụng quảng cáo",
                "id":"applied_ads_page_type"

            },
            {
                "description":"Loại bài đăng  áp dụng",
                "id":"post_apply_type"

            },
            {
                "description":"Kích thước vùng quảng cáo",
                "id":"area_size"

            },
            {
                "description":"Số chia sẻ của vùng",
                "id":"area_sharing_quantity"

            },
            {
                "description":"Số lượng bài đăng tối đa",
                "id":"max_post_number"

            }
        ];

        var adsAreaDescriptionInputs = [
            {
                "description":"Màu chữ tiêu để",
                "id":"title_color"
            },
            {
                "description":"Phông chữ của tiêu đề",
                "id":"title_font_family"
            },
            {
                "description":"Kích cỡ phông chữ tiêu đề",
                "id":"title_font_size"

            },
            {
                "description":"Hiệu ứng tiêu đề",
                "id":"title_effect"

            },
            {
                "description":"Số kí tự tối đa của tiêu đề",
                "id":"des_characters_quantity"

            },
            {
                "description":"Có viền vùng quảng cáo",
                "id":"have_border"

            },
            {
                "description":"Màu viền vùng quảng cáo",
                "id":"border_color"
            },
            {
                "description":"Kích thước viền vùng quảng cáo",
                "id":"ads_area_border_size"
            }
        ];
        return(
            <div className='popup_inner'>
                <div className="adsarea_information_left">
                    <h2>Thông tin vùng quảng cáo</h2>
                    <RenderProperties 
                        inputDatas={adsAreaInformationInputs} 
                        handleOnchange={this.handleOnchange}
                    />
                </div>

                <div className="adsarea_information_right">
                    <h2>Đặc tả của vùng</h2>
                    <RenderProperties 
                        inputDatas={adsAreaDescriptionInputs}
                        handleOnchange={this.handleOnchange}
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
        var url = "http://localhost:8080/adsareas";
        Request.post(url)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send(adsAreaContent)
            .end(function(err, res){
                console.log(res.text);
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