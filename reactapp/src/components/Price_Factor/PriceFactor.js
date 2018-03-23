import React, { Component } from 'react';
import HeadForm from '../share/HeaderForm/HeaderForm';
import './price_factor.css';

class PriceFactor extends Component {
    constructor(props) {
        super(props);
        
        this.showCreatorPopup = this.showCreatorPopup.bind(this);
    }


    showCreatorPopup(){
        console.log("click creator");
    }

    render() {
        return (
            <div id="page-wrapper">
                <div className="row">
                    <div>
                        <HeadForm title={"chỉ số ảnh hưởng"} showCreatorPopup={this.showCreatorPopup} />
                    </div>
                </div>
            </div>
        );
    }
}

export default PriceFactor;