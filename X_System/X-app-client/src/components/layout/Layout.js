import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import './layout.css';

class Layout extends Component {
    state = { loading: false };

    render() {
        return (
            <div>
                <div>

                    <Header
                        isAdmin={this.props.isAdmin}
                    />
                </div>
                <div id="body" />
                <Footer />
            </div>
        );
    }
}

export default Layout;
