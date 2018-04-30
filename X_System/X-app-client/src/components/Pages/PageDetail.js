import React, { Component } from 'react';
import Request from 'superagent';
import { UrlApi } from '../share/Url';

import './page.css';

class PageDetail extends Component {
    constructor(props) {
        super(props);

        this.state = ({
            PageContent: null
        });
        
        var urlSplit = window.location.href.split('/');
        var paraId = urlSplit[urlSplit.length - 1];
     
        var url = UrlApi.Page + "/" + paraId;
        Request.get(url)
        .then((res) => {
            this.setState({
                pageContent: res.body
            });

        })
        .catch((e) => {
            // window.location.href = UrlRedirect.Pages;
        });

    }

    render() {
        var pageContent = this.state.pageContent;
        var imageUrl = "";
        if(pageContent) {
            imageUrl = (pageContent.imageUrls !== undefined && pageContent.imageUrls !== null)
            ? pageContent.imageUrls[0]
            : "";
        }
       
        return (
            pageContent ?
                <div>
                    <div>
                        <h1 className="page_detail--header">{pageContent.tieu_de}</h1>
                        <img className="page_detail--image" src={imageUrl} alt=""/>
                    </div>
                    <div>
                        <span>
                            {pageContent.noi_dung}
                        </span>

                    </div>
                </div>
                :
                null
        );
    }
}

export default PageDetail;
