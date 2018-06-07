import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Home from './home/Home';
import XsystemDomainUrl from './Domain_Url/DomainUrlManagement';
import XsystemApiUrl from './Api_Url/ApiUrlManagement';

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
                <Route path="/domains" component={XsystemDomainUrl} />
                <Route path="/apiurls" component={XsystemApiUrl} />
            </div>
        );
    }
}

export default Contents;