import React, { Component } from 'react';

class Banner extends Component {
    render() {
        return (
            <div>
                <div className="banner" id="banner">
                    <a>
                        <img src="/images/layout-banner.jpg" className="banner--image" alt="Mountain View" width="500" height="400" />
                    </a>
                </div>
                <div style={{ float: 'right' }}>
                    <a href='/posts' className="btn btn-success" style={{ marginRight: '10px' }}>Quản lý tin đăng</a>
                    <a href='/post-campaign' className="btn btn-success">Tạo chiến dịch tin đăng</a>
                </div>
            </div>
        );
    }
}

export class BannerLeft extends Component {
    render() {
        return (
            <div id="ban_left" className="ban_scroll" style={{ display: "block", top: "100px", position: "fixed", left: "165px" }}>
                <div className="adPosition" positioncode="BANNER_POSITION_LEFT" style={{ marginBottom: "0px" }}>
                    <div className="adshared">
                        <div className="aditem" time="15" style={{ display: "block" }} src="https://file4.batdongsan.com.vn/2017/03/27/vou5EgPQ/20170327155510-d928.jpg" altsrc="https://file4.batdongsan.com.vn/2017/03/27/vou5EgPQ/20170327155510-d928.jpg" link="https://alokiddy.com.vn/" bid="3848" tip="" tp="7" w="100" h="300" k="">
                            <a href="/click.aspx?bannerid=3848" target="_blank" title="" rel="nofollow">
                                <img src="https://file4.batdongsan.com.vn/2017/03/27/vou5EgPQ/20170327155510-d928.jpg" style={{ maxWidth: "100%", height: "300px" }} />
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
        return (
            <div id="ban_left" className="ban_scroll" style={{ display: "block", top: "100px", position: "fixed", right: "98px" }}>
                <div className="adPosition" positioncode="BANNER_POSITION_LEFT" style={{ marginBottom: "0px" }}>
                    <div className="adshared">
                        <div className="aditem" time="15" style={{ display: "block" }} src="https://file4.batdongsan.com.vn/2017/03/27/vou5EgPQ/20170327155510-d928.jpg" altsrc="https://file4.batdongsan.com.vn/2017/03/27/vou5EgPQ/20170327155510-d928.jpg" link="https://alokiddy.com.vn/" bid="3848" tip="" tp="7" w="100" h="300" k="">
                            <a href="/click.aspx?bannerid=3848" target="_blank" title="" rel="nofollow">
                                <img src="https://file4.batdongsan.com.vn/2017/03/27/vou5EgPQ/20170327155510-d928.jpg" style={{ maxWidth: "100%", height: "300px" }} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Banner;