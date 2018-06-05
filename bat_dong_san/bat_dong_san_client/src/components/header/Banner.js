import React from 'react';
import ReactDOM from 'react-dom';
import { BANNER_LEFT_WIDTH, BANNER_RIGHT_WIDTH, MAIN_CONTENT_WIDTH } from '../constant';

export class BannerLeft extends React.Component {
    constructor(props) {
        super(props);
        this.state = { width: 0, height: 0 };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: document.body.offsetWidth, height: document.body.offsetHeight  });
    }

    render() {
        let left = (this.state.width - MAIN_CONTENT_WIDTH) / 2 - BANNER_LEFT_WIDTH;

        let banner_left_content = this.props.banner_content;
        let image_url = banner_left_content ? banner_left_content.resource_image_url : 'https://file4.batdongsan.com.vn/2017/03/27/vou5EgPQ/20170327155510-d928.jpg';
        return (
            <div id="SiteLeft" className="banner-left">
                <div className="container-default">
                    <div id="ctl22_BodyContainer">
                        <div id="ban_left" className="ban_scroll" style={{ display: "block", top: "0", position: "fixed", left: left, width: BANNER_LEFT_WIDTH }}>
                            <div className="adPosition" positioncode="BANNER_POSITION_LEFT" style={{ marginBottom: 0 }}>
                                <div className="adshared">
                                    <div className="aditem" time="15" style={{ display: "block" }} src="https://file4.batdongsan.com.vn/2017/03/27/vou5EgPQ/20170327155510-d928.jpg" altsrc="https://file4.batdongsan.com.vn/2017/03/27/vou5EgPQ/20170327155510-d928.jpg" link="https://alokiddy.com.vn/" bid="3848" tip="" tp="7" w="100" h="300" k="">
                                        <a href="/click.aspx?bannerid=3848" target="_blank" title="" rel="nofollow">
                                            <img src={image_url} style={{ width: BANNER_LEFT_WIDTH }} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export class BannerRight extends React.Component {
    constructor(props) {
        super(props);
        this.state = { width: 0, height: 0 };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: document.body.offsetWidth, height: document.body.offsetHeight });
    }

    render() {
        let right = (this.state.width - MAIN_CONTENT_WIDTH) / 2 - BANNER_RIGHT_WIDTH;
        
        let banner_right_content = this.props.banner_content;
        let image_url = banner_right_content ? banner_right_content.resource_image_url : 'https://file4.batdongsan.com.vn/2018/04/26/RUFz0fap/20180426115906-0b71.jpg';
        return (
            <div id="SiteRight" className="banner-right">
                <div className="container-default">
                    <div id="ctl23_BodyContainer">
                        <div id="ban_right" className="ban_scroll" style={{ display: "block", top: 0, position: "fixed", right: right, width: BANNER_RIGHT_WIDTH }}>
                            <div className="adPosition" positioncode="BANNER_POSITION_RIGHT" style={{ marginBottom: 0 }}>
                                <div className="adshared">
                                    <div className="aditem" time="15" style={{ display: "block" }} src="https://file4.batdongsan.com.vn/2018/04/26/RUFz0fap/20180426115906-0b71.jpg" altsrc="https://file4.batdongsan.com.vn/2018/04/26/RUFz0fap/20180426115906-0b71.jpg" link="https://banxehoi.com/" bid="3713" tip="" tp="7" w="100" h="300" k="">
                                        <a href="/click.aspx?bannerid=3713" target="_blank" title="" rel="nofollow">
                                            <img src={image_url} style={{ width: BANNER_RIGHT_WIDTH }} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}