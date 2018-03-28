import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './layout.css';
import { Navigation } from '../Navigation/Navigation';

class Layout extends Component {
    state = { loading: false };

    render() {
        return (
            <div>
                <Navigation />
                <div id="body" ></div>
            </div>
            
        );
    }
}

export default Layout;
