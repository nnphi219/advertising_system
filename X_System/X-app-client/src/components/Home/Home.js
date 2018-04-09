import React, { Component } from 'react';
import Intro from '../Intro/Intro';
import MainContent from '../MainContent/MainContent';
import Banner from '../layout/Banner';

class Home extends Component {
    render() {
        return (
            <div>
                <Banner />
                <Intro />
                <MainContent />
            </div>
        );
    }
}

export default Home;