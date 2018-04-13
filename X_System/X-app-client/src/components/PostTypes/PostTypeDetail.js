import React, { Component } from 'react';
import Request from 'superagent';
import { UrlApi, UrlRedirect } from '../share/Url';

import './post_type.css';

class PostTypeDetail extends Component {
    constructor(props) {
        super(props);

        this.state = ({
            PostTypeContent: null
        });
        
        var urlSplit = window.location.href.split('/');
        var paraId = urlSplit[urlSplit.length - 1];
     
        var url = UrlApi.PostType + "/" + paraId;
        Request.get(url)
        .then((res) => {
            this.setState({
                PostTypeContent: res.body
            });

        })
        .catch((e) => {
            // window.location.href = UrlRedirect.PostTypes;
        });

    }

    render() {
        var PostTypeContent = this.state.PostTypeContent;
        var imageUrl = "";
        if(PostTypeContent) {
            imageUrl = (PostTypeContent.imageUrls !== undefined && PostTypeContent.imageUrls !== null)
            ? PostTypeContent.imageUrls[0]
            : "";
        }
       
        return (
            PostTypeContent ?
                <div>
                    <div>
                        <h1 className="PostType_detail--header">{PostTypeContent.tieu_de}</h1>
                        <img className="PostType_detail--image" src={imageUrl} />
                    </div>
                    <div>
                        <span>
                            {PostTypeContent.noi_dung}
                        </span>

                    </div>
                </div>
                :
                null
        );
    }
}

export default PostTypeDetail;
