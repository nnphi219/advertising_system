import React, { Component } from 'react';

class Header extends Component {
    state = { loading: false };
    render() {
        return (
            <header>
                <div className="nav-af-header">
                    <div className="nav-af-inner">
                        <div className="container">
                            <div className="row">

                                <div className="span4">
                                    <div className="logo">
                                        <h1><a href="/">X System</a></h1>
                                    </div>
                                </div>

                                <div className="span8" style={{height: "30px", marginTop: "15px"}}>
                                    <div className="navbar">
                                        <div className="navbar-inner">
                                            <nav>
                                                <ul className="nav topnav">
                                                    <li className="dropdown active">
                                                        <a href="/">Trang chủ</a>
                                                    </li>
                                                    {/* <li className="dropdown">
                                                        <a href="#1">Features</a>
                                                        <ul className="dropdown-menu">
                                                            <li><a href="scaffolding.html">Scaffolding</a></li>
                                                            <li><a href="base-css.html">Base CSS</a></li>
                                                            <li><a href="components.html">Components</a></li>
                                                            <li><a href="icons.html">Icons</a></li>
                                                            <li><a href="list.html">Styled lists</a></li>
                                                            <li className="dropdown"><a href="#2">3rd level</a>
                                                                <ul className="dropdown-menu sub-menu">
                                                                    <li><a href="#3">Example menu</a></li>
                                                                    <li><a href="#4">Example menu</a></li>
                                                                    <li><a href="#5">Example menu</a></li>
                                                                </ul>
                                                            </li>
                                                        </ul>
                                                    </li> */}
                                                    {
                                                        this.props.isAdmin ?
                                                            <li>
                                                                <a href="/pages">Trang quảng cáo</a>
                                                            </li>
                                                            : null
                                                    }
                                                    {
                                                        this.props.isAdmin ?
                                                            <li>
                                                                <a href="/posttypes">Loại bài đăng</a>
                                                            </li>
                                                            : null
                                                    }
                                                    <li>
                                                        <a href="/tin-rao-vat">Trang rao vặt</a>
                                                    </li>
                                                    <li className="dropdown" id="UserLoginInfo">

                                                    </li>
                                                </ul>
                                            </nav>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;
