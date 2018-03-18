import React, {Component} from "react";
import './Navigation.css';

class NavbarHeader extends Component {
    render(){
        return(
            <div className="navbar-header">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                </button>
                <a className="navbar-brand" href="/">Advertising System</a>
            </div>
        );
    }
}

class NavTopLinks extends Component {
    render(){
        return(
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
                                        <div className="progress-bar progress-bar-danger" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style={{width: '80%'}}>
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
                        <li><a href="#8"><i className="fa fa-user fa-fw"></i> User Profile</a>
                        </li>
                        <li><a href="#9"><i className="fa fa-gear fa-fw"></i> Settings</a>
                        </li>
                        <li className="divider"></li>
                        <li><a href="login.html"><i className="fa fa-sign-out fa-fw"></i> Logout</a>
                        </li>
                    </ul>
                </li>
            </ul>
        );
    }
}

class NavbarDefault extends Component {
    render(){
        return(
            <div className="navbar-default sidebar" role="navigation">
                <div className="sidebar-nav navbar-collapse">
                    <ul className="nav" id="side-menu">
                        <li>
                            <a href="/ads-area"><i className="fa fa-dashboard fa-fw"></i>Advertising Area</a>
                        </li>
                        <li>
                            <a href="/ads-area"><i className="fa fa-dashboard fa-fw"></i>Service Prices</a>
                        </li>
                        <li>
                            <a href="/ads-area"><i className="fa fa-dashboard fa-fw"></i>Price Factor</a>
                        </li>
                        <li>
                            <a href="#10"><i className="fa fa-bar-chart-o fa-fw"></i> Charts<span className="fa arrow"></span></a>
                            <ul className="nav nav-second-level">
                                <li>
                                    <a href="flot.html">Flot Charts</a>
                                </li>
                                <li>
                                    <a href="morris.html">Morris.js Charts</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
            
        );
    }
}

export const Navigation = (props) => {
    return (
        <nav className="navbar navbar-default navbar-static-top" style={{marginBottom: '0'}}>
            <NavbarHeader />
            <NavTopLinks />
            <NavbarDefault />
        </nav>
    );
};

export default Navigation;