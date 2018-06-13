import React from 'react';
import { NavLink } from 'react-router-dom';
import { UrlRedirect } from '../../components/contents/share/UrlApi';
import { connect } from 'react-redux';
import { USER_TYPE } from '../contents/share/constant';

class LeftNav extends React.Component {
    render() {
        let username = this.props.user ? this.props.user.username : "";
        let userIsAdmin = this.props.user && this.props.user.user_type === USER_TYPE.ADMIN ? true : false;

        return (
            <div className="col-md-3 left_col">
                <div className="left_col scroll-view">
                    <div className="navbar nav_title" style={{ border: 0 }}>
                        <a href="index.html" className="site_title"><i className="fa fa-paw"></i> <span>Gentelella Alela!</span></a>
                    </div>

                    <div className="clearfix"></div>

                    <div className="profile clearfix">
                        <div className="profile_pic">
                            <img src="images/img.jpg" alt="..." className="img-circle profile_img" />
                        </div>
                        <div className="profile_info">
                            <span>Welcome,</span>
                            <h2>{username}</h2>
                        </div>
                    </div>

                    <br />

                    <div id="sidebar-menu" className="main_menu_side hidden-print main_menu">
                        <div className="menu_section">
                            <h3>General</h3>
                            <ul className="nav side-menu">
                                <li>
                                    <NavLink to="/">
                                        <i className="fa fa-home">
                                        </i>
                                        Trang chủ
                                        <span className="fa fa-chevron-down">
                                        </span>
                                    </NavLink>
                                    <ul className="nav child_menu">
                                        <li><a href="index.html">Dashboard</a></li>
                                        <li><a href="index2.html">Dashboard2</a></li>
                                        <li><a href="index3.html">Dashboard3</a></li>
                                    </ul>
                                </li>
                                {
                                    userIsAdmin ?
                                        <li>
                                            <NavLink to={UrlRedirect.Users}>Quản lý user</NavLink>
                                        </li>
                                        : null
                                }
                                <li>
                                    <NavLink to={UrlRedirect.XsystemDomainUrls}>Domain</NavLink>
                                </li>
                                <li>
                                    <NavLink to={UrlRedirect.XsystemApiUrls}>Api</NavLink>
                                </li>
                                <li>
                                    <NavLink to={UrlRedirect.AdsPages}>Quản lý trang quảng cáo</NavLink>
                                </li>
                                <li>
                                    <NavLink to={UrlRedirect.PostTypes}>Quản lý loại bài đăng</NavLink>
                                </li>
                                <li>
                                    <NavLink to={UrlRedirect.AdsArea}>Quản lý dịch vụ</NavLink>
                                </li>
                                <li>
                                    <NavLink to={UrlRedirect.ServicePrices}>Giá dịch vụ</NavLink>
                                </li>
                                <li>
                                    <NavLink to={UrlRedirect.PriceFactors}>Chỉ số ảnh hưởng gía</NavLink>
                                </li>
                                <li>
                                    <NavLink to={UrlRedirect.Promotions}>Bảng khuyến mãi</NavLink>
                                </li>
                            </ul>
                        </div>
                        <div className="menu_section">
                            <h3>Live On</h3>
                            <ul className="nav side-menu">
                                <li><a><i className="fa fa-bug"></i> Additional Pages <span className="fa fa-chevron-down"></span></a>
                                    <ul className="nav child_menu">
                                        <li><a href="e_commerce.html">E-commerce</a></li>
                                        <li><a href="projects.html">Projects</a></li>
                                        <li><a href="project_detail.html">Project Detail</a></li>
                                        <li><a href="contacts.html">Contacts</a></li>
                                        <li><a href="profile.html">Profile</a></li>
                                    </ul>
                                </li>
                                <li><a><i className="fa fa-windows"></i> Extras <span className="fa fa-chevron-down"></span></a>
                                    <ul className="nav child_menu">
                                        <li><a href="page_403.html">403 Error</a></li>
                                        <li><a href="page_404.html">404 Error</a></li>
                                        <li><a href="page_500.html">500 Error</a></li>
                                        <li><a href="plain_page.html">Plain Page</a></li>
                                        <li><a href="login.html">Login Page</a></li>
                                        <li><a href="pricing_tables.html">Pricing Tables</a></li>
                                    </ul>
                                </li>
                                <li><a><i className="fa fa-sitemap"></i> Multilevel Menu <span className="fa fa-chevron-down"></span></a>
                                    <ul className="nav child_menu">
                                        <li>
                                            <a href="#level1_1">Level One</a>
                                        </li>
                                        <li><a>Level One<span className="fa fa-chevron-down"></span></a>
                                            <ul className="nav child_menu">
                                                <li className="sub_menu"><a href="level2.html">Level Two</a>
                                                </li>
                                                <li><a href="#level2_1">Level Two</a>
                                                </li>
                                                <li><a href="#level2_2">Level Two</a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li><a href="#level1_2">Level One</a>
                                        </li>
                                    </ul>
                                </li>
                                <li><a href="#1"><i className="fa fa-laptop"></i> Landing Page <span className="label label-success pull-right">Coming Soon</span></a></li>
                            </ul>
                        </div>

                    </div>
                    <div className="sidebar-footer hidden-small">
                        <a data-toggle="tooltip" data-placement="top" title="Settings">
                            <span className="glyphicon glyphicon-cog" aria-hidden="true"></span>
                        </a>
                        <a data-toggle="tooltip" data-placement="top" title="FullScreen">
                            <span className="glyphicon glyphicon-fullscreen" aria-hidden="true"></span>
                        </a>
                        <a data-toggle="tooltip" data-placement="top" title="Lock">
                            <span className="glyphicon glyphicon-eye-close" aria-hidden="true"></span>
                        </a>
                        <a data-toggle="tooltip" data-placement="top" title="Logout" href="login.html">
                            <span className="glyphicon glyphicon-off" aria-hidden="true"></span>
                        </a>
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

export default connect(mapStateToProps, mapDispatchToProps)(LeftNav);