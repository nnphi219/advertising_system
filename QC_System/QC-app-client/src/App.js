import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from "react-router-dom";
import AdsArea from './components/Ads_Area/AdsArea';
import PriceFactor from './components/Price_Factor/PriceFactor';
import ServicePrice from './components/Service_Price/ServicePrice';
import PostManagement from './components/Post_Management/PostManagement';
import PromotionManagement from './components/Promotion_Management/PromotionManagement';
import PostCampaignManagement from './components/Post_Campaign_Management/PostCampaignManagement';
import PaymentManagement from './components/Payment_Management/PaymentManagement';
import UserManagement from './components/User/UserManagement';
import UserLogin from './components/User/UserLogin';
import UserRegister from './components/User/UserRegister';
import XPostCampaign from './components/Post_Campaign_Management/XPostCampaign';
import XsystemPages from './components/XSystem/Xsystem_Pages/XsystemPageManagement';
import XsystemPageDetail from './components/XSystem/Xsystem_Pages/XsystemPageDetail';
import { XsystemPageCreator, XsystemPageEditor } from './components/XSystem/Xsystem_Pages/XsystemPageCreatorUpdater';
import XsystemPostTypes from './components/XSystem/Post_Types/XsystemPostTypeManagement';
import XsystemPostTypeDetail from './components/XSystem/Post_Types/PostTypeDetail';
import { XsystemPostTypeCreator, XsystemPostTypeEditor } from './components/XSystem/Post_Types/XsystemPostTypeCreatorUpdater';
import XsystemDomainUrl from './components/XSystem/Domain_Url/DomainUrlManagement';
import XsystemApiUrl from './components/XSystem/Api_Url/ApiUrlManagement';
import { XsystemDomainUrlCreator, XsystemDomainUrlEditor } from './components/XSystem/Domain_Url/DomainUrlCreatorUpdater';

class AdminTitle extends Component {
    render() {
        return (
            <div id="page-wrapper">
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">This is Admin System Page</h1>
                    </div>
                    <button
                        type='button'
                        onClick={() => {
                            // context.history.push === history.push
                            window.location.href = '/ads-area';
                        }}
                    />
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

                    <Route exact={true} path={"/login"} component={UserLogin} />
                    <Route exact={true} path={"/register"} component={UserRegister} />
                    <Route exact={true} path={"/post-campaign"} component={XPostCampaign} />

                    <Route path={"/users-management"} component={UserManagement} />
                    <Route path={"/ads-area"} component={AdsArea} />
                    <Route path={"/service-price"} component={ServicePrice} />
                    <Route path={"/price-factor"} component={PriceFactor} />
                    <Route path={"/post-management"} component={PostManagement} />
                    <Route path={"/promotion-management"} component={PromotionManagement} />
                    <Route path={"/post-campaign-management"} component={PostCampaignManagement} />
                    <Route path={"/payment-management"} component={PaymentManagement} />

                    <Route exact={true} path={"/xsystem-pages"} component={XsystemPages} />
                    <Route exact={true} path={"/xsystem-page/:id"} component={XsystemPageDetail} />
                    <Route exact={true} path={"/xsystem-pages/create"} component={XsystemPageCreator} />
                    <Route exact={true} path={"/xsystem-pages/edit/:id"} component={XsystemPageEditor} />

                    <Route exact={true} path={"/xsystem-posttypes"} component={XsystemPostTypes} />
                    <Route exact={true} path={"/xsystem-posttypes/:id"} component={XsystemPostTypeDetail} />
                    <Route exact={true} path={"/xsystem-posttypes/create"} component={XsystemPostTypeCreator} />
                    <Route exact={true} path={"/xsystem-posttypes/edit/:id"} component={XsystemPostTypeEditor} />

                    <Route exact={true} path={"/domain-urls"} component={XsystemDomainUrl} />
                    <Route exact={true} path={"/domain-urls/create"} component={XsystemDomainUrlCreator} />
                    <Route exact={true} path={"/domain-urls/edit/:id"} component={XsystemDomainUrlEditor} />

                    <Route exact={true} path={"/api-urls"} component={XsystemApiUrl} />
                    <Route exact={true} path={"/api-urls/create"} component={XsystemApiUrl} />
                    <Route exact={true} path={"/api-urls/edit/:id"} component={XsystemApiUrl} />
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
                    <Route path={"/x-system/post-management"} component={PostManagement} />
                    <Route path={"/x-system/promotion-management"} component={PromotionManagement} />
                    <Route path={"/x-system/post-campaign-management"} component={PostCampaignManagement} />
                    <Route path={"/x-system/payment-management"} component={PaymentManagement} />
                </div>
            </BrowserRouter>
        );
    }
}


