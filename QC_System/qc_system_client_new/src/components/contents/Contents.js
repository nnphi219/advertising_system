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

import './contents.css';
import AdsPagesManagement from './ads_page/AdsPage';

class Test extends Component {
    render() {
        return (
            <div className="right_col">
                This is test page!
            </div>
        );
    }
}

class Contents extends Component {
    render() {
        return (
            <div>
                <Route exact={true} path="/" component={Home} />
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