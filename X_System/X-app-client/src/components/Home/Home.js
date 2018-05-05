import React, { Component } from 'react';
import Intro from '../Intro/Intro';
import MainContent from '../MainContent/MainContent';
import Banner from '../layout/Banner';

class Home extends Component {
    render() {
        return (
            <div>
                <Banner />
                <div className="content">
                    <Intro />
                    <MainContent />
                </div>
            </div>
        );
    }
}

export default Home;