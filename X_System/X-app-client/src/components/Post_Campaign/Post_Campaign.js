import React, { Component } from 'react';
import {QCSytemUrl} from '../share/Url';
import "./post_campaign.css";

class Post_Campaign extends Component {
    render() {
        return (
            <div className="div_post_campaign">
                <iframe className="iframe_post_campaign" src={QCSytemUrl.Post_Campaign}>
                    <p>Your browser does not support iframes.</p>
                </iframe>
            </div>
        );
    }
}

export default Post_Campaign;