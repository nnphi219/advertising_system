import React, { Component } from 'react';
import {QCSytemUrl} from '../share/Url';
import "./post_campaign.css";

import IframeComm from "react-iframe-comm";

// class Post_Campaign extends Component {
//     render() {
//         return (
//             <div className="div_post_campaign">
//                 <iframe className="iframe_post_campaign" src={QCSytemUrl.Post_Campaign}>
//                     <p>Your browser does not support iframes.</p>
//                 </iframe>
//             </div>
//         );
//     }
// }

const Post_Campaign = ({}) => {
 
    // the html attributes to create the iframe with 
    // make sure you use camelCase attribute names 
    const attributes = {
        src: "https://pbojinov.github.io/iframe-communication/iframe.html",
        width: "100%",
        height: "175",
        frameBorder: 1, // show frame border just for fun... 
    };
 
    // the postMessage data you want to send to your iframe 
    // it will be send after the iframe has loaded 
    const postMessageData = "hello iframe";
 
    // parent received a message from iframe 
    const onReceiveMessage = () => {
        console.log("onReceiveMessage");
    };
 
    // iframe has loaded 
    const onReady = () => {
        console.log("onReady");
    };
 
    return (
        <IframeComm
            attributes={attributes}
            postMessageData={postMessageData}
            handleReady={onReady}
            handleReceiveMessage={onReceiveMessage}
        />
    );
};

export default Post_Campaign;