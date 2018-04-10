import React, { Component } from 'react';
import Request from 'superagent';
import { UrlApi, UrlRedirect } from '../share/Url';

import './post.css';

class PostDetail extends Component {
    constructor(props) {
        super(props);

        this.state = ({
            postContent: null
        });
        
        var urlSplit = window.location.href.split('/');
        var paraId = urlSplit[urlSplit.length - 1];
     
        var url = UrlApi.Post + "/" + paraId;
        Request.get(url)
        .then((res) => {
            this.setState({
                postContent: res.body
            });

        })
        .catch((e) => {
            // window.location.href = UrlRedirect.Posts;
        });

    }

    render() {
        var postContent = this.state.postContent;
        var imageUrl = "";
        if(postContent) {
            imageUrl = (postContent.imageUrls !== undefined && postContent.imageUrls !== null)
            ? postContent.imageUrls[0]
            : "";
        }
       
        return (
            postContent ?
                <div>
                    <div>
                        <h1 className="post_detail--header">{postContent.tieu_de}</h1>
                        <img className="post_detail--image" src={imageUrl} />
                    </div>
                    <div>
                        <span>
                            {postContent.noi_dung}
                        </span>

                    </div>
                </div>
                :
                null
        );
    }
}

export default PostDetail;
