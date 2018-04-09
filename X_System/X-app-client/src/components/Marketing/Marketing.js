import React, { Component } from 'react';
import Request from 'superagent';
import { UrlApi } from '../share/Url';

class Marketing extends Component {
    constructor(props) {
        super(props);

        this.state = ({
            postContents: null
        });
        
        Request.get(UrlApi.Marketing)
            .then((res) => {console.log(res.body);
                this.setState({
                    postContents: res.body
                });
            }).catch((e) => {

            });
    }

    render() {
        return (
            <div>
                fefwef
            </div>
        );
    }
}

export default Marketing;