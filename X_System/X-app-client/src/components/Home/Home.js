import React, { Component } from 'react';
import Intro from '../Intro/Intro';
import MainContent from '../MainContent/MainContent';
import { BannerLeft, BannerRight } from './Advertisement_Banner';
import Banner from '../layout/Banner';
import { UrlApi } from '../share/Url';

import Request from 'superagent';

const PAGE_NAME = "trang_chu";
const BANNER_TOP_AREA = "banner_top";
const BANNER_LEFT_AREA = "banner_left";
const BANNER_RIGHT_AREA = "banner_right";


class Home extends Component {
    constructor(props) {
        super(props);

        this.state = ({
            banner_top_content: null,
            banner_left_content: null,
            banner_right_content: null,
        });

    }

    GetBannerContents(banner_top_contents, banner_left_contents, banner_right_contents) {
        let jsonState = {};
        if (banner_top_contents) {
            let thefirstBannerTopContent = banner_top_contents.contents[0];
            jsonState.banner_top_content = {
                banner_type: thefirstBannerTopContent.banner_type,
                link_page_url: thefirstBannerTopContent.link_page_url,
                resource_url: thefirstBannerTopContent.resource_url
            };
        }

        if (banner_left_contents) {
            let thefirstBannerLeftContent = banner_left_contents.contents[0];
            jsonState.banner_left_content = {
                banner_type: thefirstBannerLeftContent.banner_type,
                link_page_url: thefirstBannerLeftContent.link_page_url,
                resource_url: thefirstBannerLeftContent.resource_url
            };
        }

        if (banner_right_contents) {
            let thefirstBannerRightContent = banner_right_contents.contents[0];
            jsonState.banner_right_content = {
                banner_type: thefirstBannerRightContent.banner_type,
                link_page_url: thefirstBannerRightContent.link_page_url,
                resource_url: thefirstBannerRightContent.resource_url
            };
        }
        
        this.setState(jsonState);
    }

    GetAdvertisement() {
        let $this = this;
        let url = UrlApi.GetAdvertisement + "/" + PAGE_NAME;
        Request.get(url)
            .then((res) => {
                let jsonAdsArea = res.body;
                $this.GetBannerContents(jsonAdsArea[BANNER_TOP_AREA], jsonAdsArea[BANNER_LEFT_AREA], jsonAdsArea[BANNER_RIGHT_AREA]);
            }).catch((e) => {
                console.log('err');
            });
    }

    componentDidMount() {
        this.GetAdvertisement();
    }

    render() {
        let banner_left_content = this.state.banner_left_content;
        let banner_top_content = this.state.banner_top_content;
        let banner_right_content = this.state.banner_right_content;
        return (
            <div>
                <BannerLeft
                    banner_content={banner_left_content}
                />
                <Banner
                    banner_content={banner_top_content}
                />
                <div className="content">
                    <Intro />
                    <MainContent />
                </div>
                <BannerRight
                    banner_content={banner_right_content}
                />
            </div>
        );
    }
}

export default Home;