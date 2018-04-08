import React, { Component } from 'react';
import Intro from '../Intro/Intro';
import MainContent from '../MainContent/MainContent';

class Home extends Component {
    render() {
        return (
            <div>
                <Intro />
                <MainContent />
            </div>


        );
    }
}

export default Home;