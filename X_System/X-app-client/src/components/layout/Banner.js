import React, { Component } from 'react';

class Banner extends Component {
    render() {
        return (
            <div className="banner" id="banner">
                <a>
                    <img src="/images/images.jpg" className="banner--image" alt="Mountain View" width="500" height="377" />
                </a>
            </div>
        );
    }
}

export default Banner;