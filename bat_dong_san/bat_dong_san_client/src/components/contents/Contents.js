import React, { Component } from 'react';
import Home from './home/Home';
import Buy from './buy/Buy';
import { Route } from 'react-router-dom';
import './contents.css';
import Rent from './rent/Rent';
import LoginForm from '../users/LoginForm';
import PostManagement from './post/PostManagement';
import PostCampaign from './post_campaign/PostCampaign';

class Contents extends Component {
    render() {
        console.log(this.props.postContents)
        return (
            <div className="content">
                <Route exact={true} path="/" component={Home} />
                <Route path="/buy" component={Buy} />
                <Route path="/rent" component={Rent} />
                <Route path="/posts" component={PostManagement} />
                <Route path="/post-campaign" component={PostCampaign} />
            </div>
        );
    }
}

export default Contents;