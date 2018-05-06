import React, { Component } from 'react';
import Request from 'superagent';
import { UrlApi } from '../share/Url';
import './marketing_boostrap.css';

class RenderAPost extends Component {
    render() {
        var post = this.props.post;
        var imgUrl = post.imageUrls !== [] ? post.imageUrls[0] : "http://placehold.it/700x400";
        console.log(imgUrl);
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
        var posts = this.props.posts !== null ? this.props.posts: [];
        var elements = [];
        posts.forEach(post => {
            elements.push(<RenderAPost post={post} />);
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

        Request.get(UrlApi.Marketing)
            .then((res) => {
                this.setState({
                    postContents: res.body
                });
            }).catch((e) => {

            });
    }

    componentDidMount(){
        // Request.get
        //truyen trang_rao_vat
    }

    render() {
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