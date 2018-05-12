import React, { Component } from 'react';
import './home.css';

export class BannerLeft extends Component {
    render() {
        let banner_left_content = this.props.banner_content;
        let image_url = banner_left_content ? banner_left_content.resource_url : 'https://file4.batdongsan.com.vn/2017/03/27/vou5EgPQ/20170327155510-d928.jpg';
        return (
            <div id="home_banner_left" className="home_banner_left">
                <div className="adPosition" positioncode="BANNER_POSITION_LEFT" style={{ marginBottom: "0px" }}>
                    <div className="adshared">
                        <div className="aditem" time="15" style={{ display: "block" }} src="https://file4.batdongsan.com.vn/2017/03/27/vou5EgPQ/20170327155510-d928.jpg" altsrc="https://file4.batdongsan.com.vn/2017/03/27/vou5EgPQ/20170327155510-d928.jpg" link="https://alokiddy.com.vn/" bid="3848" tip="" tp="7" w="100" h="300" k="">
                            <a href="/click.aspx?bannerid=3848" target="_blank" title="" rel="nofollow">
                                <img className="home_banner_left--image" src={image_url} alt="" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export class BannerRight extends Component {
    render() {
        let banner_right_content = this.props.banner_content;
        let image_url = banner_right_content ? banner_right_content.resource_url : 'https://file4.batdongsan.com.vn/2017/03/27/vou5EgPQ/20170327155510-d928.jpg';
        return (
            <div id="home_banner_right" className="home_banner_right" >
                <div className="adPosition" positioncode="BANNER_POSITION_LEFT" style={{ marginBottom: "0px" }}>
                    <div className="adshared">
                        <div className="aditem" time="15" style={{ display: "block" }} src="https://file4.batdongsan.com.vn/2017/03/27/vou5EgPQ/20170327155510-d928.jpg" altsrc="https://file4.batdongsan.com.vn/2017/03/27/vou5EgPQ/20170327155510-d928.jpg" link="https://alokiddy.com.vn/" bid="3848" tip="" tp="7" w="100" h="300" k="">
                            <a href="/click.aspx?bannerid=3848" target="_blank" title="" rel="nofollow">
                                <img className="home_banner_right--image" src={image_url} alt="" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}