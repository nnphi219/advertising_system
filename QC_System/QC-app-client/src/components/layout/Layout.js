import React, { Component } from 'react';
import './layout.css';
import { NavigationAdmin } from './NavigationAdmin';
import { NavigationXSystem } from './NavigationXSystem';

class Layout extends Component {
    state = { loading: false };
    
    render() {
        var currentUrl = window.location.href;
        var systemType = currentUrl.replace('http://', "").replace("https://", "").split('/')[1];
        var navigation = <NavigationAdmin /> ;
        if(systemType === "x-system"){
            navigation = <NavigationXSystem />;
        } else if(systemType === "user-login"){
            navigation = null;
        }
      
        return (
            <div>
                {navigation}
                <div id="body" ></div>
            </div>
            
        );
    }
}

export default Layout;
