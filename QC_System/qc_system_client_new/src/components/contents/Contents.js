import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { UrlRedirect } from './share/UrlApi';

import Home from './home/Home';
import DomainUrlManagement from './Domain_Url/DomainUrlManagement';
import ApiUrlManagement from './Api_Url/ApiUrlManagement';

import './contents.css';

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
            </div>
        );
    }
}

export default Contents;