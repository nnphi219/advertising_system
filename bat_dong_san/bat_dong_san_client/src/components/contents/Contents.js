import React, { Component } from 'react';
import Home from './home/Home';
import Buy from './buy/Buy';
import { Route } from 'react-router-dom';
import './contents.css';
import Rent from './rent/Rent';
import LoginForm from '../users/LoginForm';
import PostManagement from './post/PostManagement';

class Contents extends Component {
    render() {
        return (
            <div className="content">
                <Route exact={true} path="/" component={Home} />
                <Route path="/buy" component={Buy} />
                <Route path="/rent" component={Rent} />
                <Route path="/posts" component={PostManagement} />
            </div>
        );
    }
}

export default Contents;