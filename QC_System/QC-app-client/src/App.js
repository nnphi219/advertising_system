import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from "react-router-dom";
import AdsArea from './components/Ads_Area/AdsArea';
import PriceFactor from './components/Price_Factor/PriceFactor';
import ServicePrice from './components/Service_Price/ServicePrice';
import PostManagement from './components/Post_Management/PostManagement';
import PromotionManagement from './components/Promotion_Management/PromotionManagement';
import PostCaimpaignManagement from './components/Post_Caimpaign_Management/PostCaimpaignManagement';
import PaymentManagement from './components/Payment_Management/PaymentManagement';

class AdminTitle extends Component {
    render() {
        return (
            <div id="page-wrapper">
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">This is Admin System Page</h1>
                    </div>
                </div>
            </div>
        );
    }
}

class XSystemTitle extends Component {
    render() {
        return (
            <div id="page-wrapper">
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">This is X System Page</h1>
                    </div>
                </div>
            </div>
        );
    }
}

export class AppAdmin extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route exact={true} path={"/"} component={AdminTitle} />
                    <Route path={"/ads-area"} component={AdsArea} />
                    <Route path={"/service-price"} component={ServicePrice} />
                    <Route path={"/price-factor"} component={PriceFactor} />
                    <Route path={"/x-system/post-management"} component={PostManagement} />
                    <Route path={"/x-system/promotion-management"} component={PromotionManagement} />
                    <Route path={"/x-system/post-caimpaign-management"} component={PostCaimpaignManagement} />
                    <Route path={"/x-system/payment-management"} component={PaymentManagement} />
                    {/* <Route path={"/user/:id"} component={User} />
          <Route path={"/home"} component={Home} />
          <Route path={"home-single"} component={Home}/> */}
                </div>
            </BrowserRouter>
        );
    }
}

export class AppXSystem extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route exact={true} path={"/x-system/"} component={XSystemTitle} />
                    <Route exact={true} path={"/x-system/post-management"} component={PostManagement} />
                    <Route exact={true} path={"/x-system/promotion-management"} component={PromotionManagement} />
                    <Route exact={true} path={"/x-system/post-caimpaign-management"} component={PostCaimpaignManagement} />
                    <Route exact={true} path={"/x-system/payment-management"} component={PaymentManagement} />
                    {/* <Route path={"/user/:id"} component={User} />
          <Route path={"/home"} component={Home} />
          <Route path={"home-single"} component={Home}/> */}
                </div>
            </BrowserRouter>
        );
    }
}

