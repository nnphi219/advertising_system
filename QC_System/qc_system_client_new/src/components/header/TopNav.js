import React from 'react';
import { UrlRedirect } from '../contents/share/UrlApi';
import { connect } from 'react-redux';

class LogoutDropDown extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            openLogoutDropDown: false
        };

        this.onOpenLogoutDropDown = this.onOpenLogoutDropDown.bind(this);
    }

    onOpenLogoutDropDown() {
        let {
            openLogoutDropDown
        } = this.state;

        this.setState({
            openLogoutDropDown: !openLogoutDropDown
        });
    }

    onLogout() {
        localStorage.setItem('x-auth', '');
        window.location.href = UrlRedirect.UserLogin;
    }

    render() {
        let openLogoutDropDownClassName = this.state.openLogoutDropDown ? "open" : "";
        let username = this.props.user ? this.props.user.username : "";
        return (
            <ul className="nav navbar-nav navbar-right" onClick={this.onOpenLogoutDropDown}>
                <li className={openLogoutDropDownClassName}>
                    <a href="#30" className="user-profile dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                        <img src="images/img.jpg" alt="" />{username}
                        <span className=" fa fa-angle-down"></span>
                    </a>
                    <ul className="dropdown-menu dropdown-usermenu pull-right">
                        <li><a href="#31"> Profile</a></li>
                        <li>
                            <a href="#32">
                                <span className="badge bg-red pull-right">50%</span>
                                <span>Settings</span>
                            </a>
                        </li>
                        <li><a href="#33">Help</a></li>
                        <li><a onClick={this.onLogout}><i className="fa fa-sign-out pull-right"></i> Log Out</a></li>
                    </ul>
                </li>

                <li role="presentation" className="dropdown">
                    <a href="#34" className="dropdown-toggle info-number" data-toggle="dropdown" aria-expanded="false">
                        <i className="fa fa-envelope-o"></i>
                        <span className="badge bg-green">6</span>
                    </a>
                    <ul id="menu1" className="dropdown-menu list-unstyled msg_list" role="menu">
                        <li>
                            <a>
                                <span className="image">
                                    <img src="images/img.jpg" alt="Profile2" />
                                </span>
                                <span>
                                    <span>John Smith</span>
                                    <span className="time">3 mins ago</span>
                                </span>
                                <span className="message">
                                    Film festivals used to be do-or-die moments for movie makers. They were where...
                                            </span>
                            </a>
                        </li>
                        <li>
                            <a>
                                <span className="image"><img src="images/img.jpg" alt="Profile3" /></span>
                                <span>
                                    <span>John Smith</span>
                                    <span className="time">3 mins ago</span>
                                </span>
                                <span className="message">
                                    Film festivals used to be do-or-die moments for movie makers. They were where...
                                </span>
                            </a>
                        </li>
                        <li>
                            <a>
                                <span className="image"><img src="images/img.jpg" alt="Profile4" /></span>
                                <span>
                                    <span>John Smith</span>
                                    <span className="time">3 mins ago</span>
                                </span>
                                <span className="message">
                                    Film festivals used to be do-or-die moments for movie makers. They were where...
                                </span>
                            </a>
                        </li>
                        <li>
                            <a>
                                <span className="image"><img src="images/img.jpg" alt="Profile1" /></span>
                                <span>
                                    <span>John Smith</span>
                                    <span className="time">3 mins ago</span>
                                </span>
                                <span className="message">
                                    Film festivals used to be do-or-die moments for movie makers. They were where...
                                </span>
                            </a>
                        </li>
                        <li>
                            <div className="text-center">
                                <a>
                                    <strong>See All Alerts</strong>
                                    <i className="fa fa-angle-right"></i>
                                </a>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        );
    }
}

class TopNav extends React.Component {
    render() {
        return (
            <div className="top_nav">
                <div className="nav_menu">
                    <nav>
                        <div className="nav toggle">
                            <a id="menu_toggle"><i className="fa fa-bars"></i></a>
                        </div>

                        <LogoutDropDown
                            user={this.props.user}
                        />
                    </nav>
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

export default connect(mapStateToProps, mapDispatchToProps)(TopNav);