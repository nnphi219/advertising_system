import React, { Component } from 'react';
import Intro from '../Intro/Intro';
import MainContent from '../MainContent/MainContent';
import Banner, { BannerLeft, BannerRight } from '../layout/Banner';

class Home extends Component {
    render() {
        return (
            <div>
                <Banner />
                <BannerLeft />
                <BannerRight />
                <div className="content">
                    <Intro />
                    <MainContent />
                </div>
            </div>
        );
    }
}

export default Home;