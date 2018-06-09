import React, { Component } from 'react';
import { QCSytemUrl } from '../../share/UrlAPI';
import "./post_campaign.css";

import { UsernameOnQcSystem } from '../../share/CommonProperty';

class PostCampaign extends Component {
    render() {
        var urlIFrame = QCSytemUrl.Post_Campaign;
        urlIFrame += "?AdminUserAuthenticate=" + UsernameOnQcSystem;
        urlIFrame += "&userAccessToken=" + localStorage.getItem('x-auth');
        urlIFrame += "&modeAction=create";

        return (
            <div>
                <section className="page-listings">
                    <div className="post">
                        <div className="div_post_campaign">
                            <iframe className="iframe_post_campaign" src={urlIFrame} title="This is a unique title">
                                <p>Your browser does not support iframes.</p>
                            </iframe>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default PostCampaign;