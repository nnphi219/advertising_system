import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from '../../App';
import Header from './Header';
import Footer from './Footer';
import './layout.css';

class Layout extends Component {
    state = { loading: false };

    render() {
        return (
            <div>
                <Header />
                <div id="body" />
                <Footer />
            </div>
        );
    }
}

export default Layout;
