import React, { Component } from 'react';

class Banner extends Component {
    render() {
        let banner_top_content = this.props.banner_content;
        let image_url = banner_top_content ? banner_top_content.resource_url : '/images/layout-banner.jpg';
        console.log(image_url);
        return (
            <div>
                <div className="banner" id="banner">
                    <a>
                        <img src={image_url} className="banner--image" alt="Mountain View" width="500" height="400" />
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

export default Banner;