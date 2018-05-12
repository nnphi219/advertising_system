import React, { Component } from "react";
import UrlApi from '../share/UrlApi';
import Request from 'superagent';
import './NavigationXSystem.css';


class NavbarHeader extends Component {
    render() {
        return (
            <div className="navbar-header">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                </button>
                <a className="navbar-brand" href="/">Advertising System</a>
            </div>
        );
    }
}

class NavTopLinks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: ""
        }

        this.GetCurrentUser();
        
        this.logout = this.logout.bind(this);
    }

    GetCurrentUser(){
        var $this = this;

        Request.get(UrlApi.UserAuthen)
        .set('x-auth', localStorage.getItem('x-auth'))
        .then((res) => {
            $this.setState({
                username: res.body.username
            });
        });
    }

    logout() {
        var token = localStorage.getItem('x-auth');

        Request.delete(UrlApi.UserLogout)
            .set('x-auth', token)
            .end(function (err, res) {
                localStorage.setItem('x-auth', '');
                localStorage.setItem('x-urlapi', '');
                window.location.href = '/login';
            });
    }

    render() {
        return (
            <ul className="nav navbar-top-links navbar-right">
                <li className="dropdown">
                    <a className="dropdown-toggle" data-toggle="dropdown" href="#1">
                        <i className="fa fa-envelope fa-fw"></i> <i className="fa fa-caret-down"></i>
                    </a>
                    <ul className="dropdown-menu dropdown-messages">
                        <li>
                            <a href="#3">
                                <div>
                                    <strong>John Smith</strong>
                                    <span className="pull-right text-muted">
                                        <em>Yesterday</em>
                                    </span>
                                </div>
                                <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...</div>
                            </a>
                        </li>
                        <li className="divider"></li>
                        <li>
                            <a className="text-center" href="#2">
                                <strong>Read All Messages</strong>
                                <i className="fa fa-angle-right"></i>
                            </a>
                        </li>
                    </ul>
                </li>
                <li className="dropdown">
                    <a className="dropdown-toggle" data-toggle="dropdown" href="#4">
                        <i className="fa fa-tasks fa-fw"></i> <i className="fa fa-caret-down"></i>
                    </a>
                    <ul className="dropdown-menu dropdown-tasks">
                        <li>
                            <a href="#5">
                                <div>
                                    <p>
                                        <strong>Task 4</strong>
                                        <span className="pull-right text-muted">80% Complete</span>
                                    </p>
                                    <div className="progress progress-striped active">
                                        <div className="progress-bar progress-bar-danger" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style={{ width: '80%' }}>
                                            <span className="sr-only">80% Complete (danger)</span>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li className="divider"></li>
                        <li>
                            <a className="text-center" href="#6">
                                <strong>See All Tasks</strong>
                                <i className="fa fa-angle-right"></i>
                            </a>
                        </li>
                    </ul>
                </li>
                <li className="dropdown">
                    <a className="dropdown-toggle" data-toggle="dropdown" href="#7">
                        <i className="fa fa-user fa-fw"></i> <i className="fa fa-caret-down"></i>
                    </a>
                    <ul className="dropdown-menu dropdown-user">
                        <li><a href="#8"><i className="fa fa-user fa-fw"></i> {this.state.username}</a>
                        </li>
                        <li><a href="#9"><i className="fa fa-gear fa-fw"></i> Settings</a>
                        </li>
                        <li className="divider"></li>
                        <li>
                        <button onClick={this.logout}><i className="fa fa-sign-out fa-fw"></i>Logout</button>
                        </li>
                    </ul>
                </li>
            </ul>
        );
    }
}

class NavbarDefault extends Component {
    render() {
        return (
            <div className="navbar-default sidebar" role="navigation">
                <div className="sidebar-nav navbar-collapse">
                    <ul className="nav" id="side-menu">
                        <li>
                            <a href="/x-system/promotion-management"><i className="fa fa-dashboard fa-fw"></i>Bảng khuyến mãi</a>
                        </li>
                        <li>
                            <a href="/x-system/post-campaign-management"><i className="fa fa-dashboard fa-fw"></i>Bảng chiến dịch tin đăng</a>
                        </li>
                        <li>
                            <a href="/x-system/payment-management"><i className="fa fa-dashboard fa-fw"></i>Trang thanh toán</a>
                        </li>
                      
                    </ul>
                </div>
            </div>

        );
    }
}

export const NavigationXSystem = (props) => {
    return (
        <nav className="navbar navbar-default navbar-static-top nav-zindex" style={{ marginBottom: '0' }}>
            <NavbarHeader />
            <NavTopLinks />
            <NavbarDefault />
        </nav>
    );
};

export default NavigationXSystem;