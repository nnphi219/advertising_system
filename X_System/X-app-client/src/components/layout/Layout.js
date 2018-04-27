import React, { Component } from 'react';
import App from '../../App';
import Header from './Header';
import Footer from './Footer';
import './layout.css';

class Layout extends Component {
    state = { loading: false };

    render() {
        return (
            <div>
                <Header
                    isAdmin={this.props.isAdmin}
                />
                <div id="body" />
                <Footer />
            </div>
        );
    }
}

export default Layout;
