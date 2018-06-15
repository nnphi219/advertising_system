import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { UrlRedirect } from './share/UrlApi';

import Home from './home/Home';
import DomainUrlManagement from './Domain_Url/DomainUrlManagement';
import ApiUrlManagement from './Api_Url/ApiUrlManagement';
import PostTypesManagement from './post_types/PostTypeManagement';
import AdsAreaManagement from './ads_area/AdsArea';
import ServicePriceManagement from './service_price/ServicePrice';
import PriceFactorManagement from './price_factor/PriceFactor';
import PromotionManagement from './promotion/Promotion';
import { connect } from 'react-redux';

import './contents.css';
import AdsPagesManagement from './ads_page/AdsPage';
import UserManagement from './users/UserManagement';
import PostCampaignRegister from './post_campaign/PostCampaignRegister';

import { USER_TYPE } from './share/constant';
import UserProfile from './users/UserProfile';

class Contents extends Component {
    render() {
        let user = this.props.user;
        let userIsAdmin = user && user.user_type === USER_TYPE.ADMIN ? true : false;
        
        return (
            <div>
                <Route exact={true} path="/" component={Home} />
                {
                    userIsAdmin ?
                        <Route path={UrlRedirect.Users} component={UserManagement} />
                        : <Route path={UrlRedirect.UserProfile} component={UserProfile} />
                }
                <Route path={UrlRedirect.XsystemDomainUrls} component={DomainUrlManagement} />
                <Route path={UrlRedirect.XsystemApiUrls} component={ApiUrlManagement} />
                <Route path={UrlRedirect.AdsPages} component={AdsPagesManagement} />
                <Route path={UrlRedirect.PostTypes} component={PostTypesManagement} />
                <Route path={UrlRedirect.AdsArea} component={AdsAreaManagement} />
                <Route path={UrlRedirect.ServicePrices} component={ServicePriceManagement} />
                <Route path={UrlRedirect.PriceFactors} component={PriceFactorManagement} />
                <Route path={UrlRedirect.Promotions} component={PromotionManagement} />
            </div>
        );
    }
}

export default Contents;