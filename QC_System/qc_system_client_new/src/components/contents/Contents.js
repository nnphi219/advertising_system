import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { UrlRedirect } from './share/UrlApi';

import Home from './home/Home';
import DomainUrlManagement from './Domain_Url/DomainUrlManagement';
import ApiUrlManagement from './Api_Url/ApiUrlManagement';

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
            </div>
        );
    }
}

export default Contents;