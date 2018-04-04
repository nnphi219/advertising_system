import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './layout.css';
import { NavigationAdmin } from './NavigationAdmin';
import { NavigationXSystem } from './NavigationXSystem';

class Layout extends Component {
    state = { loading: false };

    render() {
        var currentUrl = window.location.href;
        var systemType = currentUrl.replace('http://', "").replace("https://", "").split('/')[1];
        var navigation = systemType === "x-system" ? <NavigationXSystem /> : <NavigationAdmin />;
        console.log(navigation);
        return (
            <div>
                {navigation}
                <div id="body" ></div>
            </div>
            
        );
    }
}

export default Layout;
