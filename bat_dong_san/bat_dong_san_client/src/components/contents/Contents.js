import React, { Component } from 'react';
import Home from './home/Home';
import Test from './test/Test';
import { Route } from 'react-router-dom';

class Contents extends Component {
    render() {
        return (
            <div className="content">
                <Route exact={true} path="/" component={Home} />
                <Route path="/test" component={Test} />
            </div>
        );
    }
}

export default Contents;