import React from 'react';
import { NavLink } from 'react-router-dom';
import { BannerLeft, BannerRight } from './Banner';

class Header extends React.Component {
    render() {
        return (
            <div>
                <BannerLeft />
                <section style={{background: "url('../img/hero.jpg') no-repeat bottom center"}} className="hero">
                    <header>
                        <div className="wrapper">
                            <a href="#1"><img src="img/logo.png" className="logo" alt="" titl="" /></a>
                            <a href="#2" className="hamburger"></a>
                            <nav>
                                <ul>
                                    <li><a href="#3">Buy</a></li>
                                    <li><a href="#4">Rent</a></li>
                                    <li><a href="#5">Sell</a></li>
                                    <li><a href="#6">About</a></li>
                                    <li><a href="#7">Contact</a></li>
                                    <li><NavLink to="/test">Test</NavLink></li>
                                </ul>
                                <a href="#8" className="login_btn">Login</a>
                            </nav>
                        </div>
                    </header>

                    <section className="caption">
                        <h2 className="caption">Find You Dream Home</h2>
                        <h3 className="properties">Appartements - Houses - Mansions</h3>
                    </section>
                </section>

                <section className="search">
                    <div className="wrapper">
                        <form action="#" method="post">
                            <input type="text" id="search" name="search" placeholder="What are you looking for?" autoComplete="off" />
                            <input type="submit" id="submit_search" name="submit_search" />
                        </form>
                        <a href="#9" className="advanced_search_icon" id="advanced_search_btn"></a>
                    </div>

                    <div className="advanced_search">
                        <div className="wrapper">
                            <span className="arrow"></span>
                            <form action="#" method="post">
                                <div className="search_fields">
                                    <input type="text" className="float" id="check_in_date" name="check_in_date" placeholder="Check In Date" autoComplete="off" />

                                    <hr className="field_sep float" />

                                    <input type="text" className="float" id="check_out_date" name="check_out_date" placeholder="Check Out Date" autoComplete="off" />
                                </div>
                                <div className="search_fields">
                                    <input type="text" className="float" id="min_price" name="min_price" placeholder="Min. Price" autoComplete="off" />

                                    <hr className="field_sep float" />

                                    <input type="text" className="float" id="max_price" name="max_price" placeholder="Max. price" autoComplete="off" />
                                </div>
                                <input type="text" id="keywords" name="keywords" placeholder="Keywords" autoComplete="off" />
                                <input type="submit" id="submit_search" name="submit_search" />
                            </form>
                        </div>
                    </div>
                </section>
                <BannerRight />
            </div>
        );
    }
}

export default Header;