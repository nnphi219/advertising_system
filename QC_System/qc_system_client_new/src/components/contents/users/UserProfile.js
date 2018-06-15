import React, { Component } from 'react';
import Request from 'superagent';
import UrlApi, { UrlRedirect } from '../share/UrlApi';
import './user.css';
import UserCreatorUpdater from './UserCreatorUpdater';
import { connect } from 'react-redux';

class UserProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoad: false,
            editContents: {}
        };
    }

    componentDidMount() {
        var paraId = this.props.user._id;
      
        Request.get(UrlApi.UserManagement + "/" + paraId)
            .set('x-auth', localStorage.getItem('x-auth'))
            .then((res) => {
                console.log(res.body);
                this.setState({
                    editContents: res.body,
                    isLoad: true
                });

            })
            .catch((e) => {
                // window.location.href = UrlRedirect.ServicePrices;
            });
    }

    render() {
        return (
            <div className="right_col">
                <div className="row tile_count" >
                    <div className="col-md-12 col-sm-12 col-xs-12">
                        {
                            this.state.isLoad ?
                                <UserCreatorUpdater
                                    isToEditProfile={true}
                                    modeAction={"edit"}
                                    editContents={this.state.editContents}
                                />
                                : null
                        }
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);