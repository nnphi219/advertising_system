import React, { Component } from 'react';
import Request from 'superagent';
import { UrlApi } from '../share/Url';
import './marketing_boostrap.css';

const PAGE_NAME = 'trang_rao_vat';
const MARKETING_AREA = 'tin_rao_vat';

class RenderAPost extends Component {
    render() {
        var post = this.props.post;
        return (
            <div className="col-lg-3 col-md-6 mb-4">
                <div className="card h-100">
                    {/* <a href={`/post/${post._id}`}><img className="card-img-top" src={imgUrl} alt="" /></a> */}
                    <a href={`/post/${post._id}`}><img className="card-img-top" src={"/images/images2.jpg"} alt="" /></a>
                    <div className="card-body">
                        <h4 className="card-title">
                            <a href={`/post/${post._id}`}>{post.tieu_de}</a>
                        </h4>
                    </div>
                    <div className="card-footer">
                        <small className="text-muted">&#9733; &#9733; &#9733; &#9733; &#9734;</small>
                    </div>
                </div>
            </div>
        );
    }
}

class RenderPosts extends Component {
    render() {
        var posts = this.props.posts !== null ? this.props.posts : [];
        var elements = [];

        posts.forEach(post => {
            elements.push(<RenderAPost key={post.ma_bai_dang} post={post} />);
        });

        return (
            <div className="row">
                {elements}
            </div>
        );
    }
}

class Marketing extends Component {
    constructor(props) {
        super(props);

        this.state = ({
            postContents: null
        });

    }

    GetPosts(jsonAdsAreaInfo) {
        let jsonReq = {
            postIds: jsonAdsAreaInfo.contents.posts
        };

        var $this = this;
        Request.post(UrlApi.GetPostsByPostIds)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send(jsonReq)
            .end(function (err, res) {
                console.log(1);
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(res.body);
                    $this.setState({
                        postContents: res.body
                    });
                }
            });
    }

    GetAdvertisement() {
        let url = UrlApi.GetAdvertisement + "/" + PAGE_NAME;

        let $this = this;
        Request.get(url)
            .then((res) => {
                let jsonAdsArea = res.body;
                $this.GetPosts(jsonAdsArea[MARKETING_AREA]);
            }).catch((e) => {
                console.log('err');
            });
    }

    componentDidMount() {
        this.GetAdvertisement();
    }

    render() {
        console.log(this.state.postContents);
        return (
            <div>
                <h1>Tin rao vặt</h1>
                <RenderPosts
                    posts={this.state.postContents}
                />
            </div>

        );
    }
}

export default Marketing;