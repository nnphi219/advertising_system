import React from 'react';
import { NavLink } from 'react-router-dom';
import { BannerLeft, BannerRight } from './Banner';
import { PAGES } from '../share/PageConfig';

class Header extends React.Component {

    redirectToLoginForm(event){
        window.location.href = '/login';
    }

    render() {
        let bannerLeft = this.props.bannerContents[PAGES.HEADER.AREAS.BANNER_LEFT];
        let bannerLeft_content = {
            resource_image_url: 'https://file4.batdongsan.com.vn/2017/03/27/vou5EgPQ/20170327155510-d928.jpg'
        };
        
        if(bannerLeft){
            bannerLeft_content = {
                resource_image_url : bannerLeft.contents[0].resource_url
            };
        }

        let bannerRight = this.props.bannerContents[PAGES.HEADER.AREAS.BANNER_RIGHT];
        let bannerRight_content = {
            resource_image_url: 'https://file4.batdongsan.com.vn/2018/04/26/RUFz0fap/20180426115906-0b71.jpg'
        };

        if(bannerRight){
            bannerRight_content = {
                resource_image_url : bannerRight.contents[0].resource_url
            };
        }

        let bannerMain = this.props.bannerContents[PAGES.HEADER.AREAS.BANNER_TOP];
        let bannerMain_content = {
            resource_image_url: '../img/hero.jpg'
        };

        if(bannerMain){
            bannerMain_content = {
                resource_image_url : bannerMain.contents[0].resource_url
            };
        }

        return (
            <div>
                <BannerLeft
                    banner_content={bannerLeft_content}
                />
                <section style={{ backgroundSize: "100% 600px", backgroundImage: `url('${bannerMain_content.resource_image_url}')` }} className="hero">
                    <header>
                        <div className="wrapper">
                            <NavLink to="/"><img src="img/logo.png" className="logo" alt="" titl="" /></NavLink>
                            <a href="#2" className="hamburger"></a>
                            <nav>
                                <ul>
                                    <li><NavLink to="/buy">Mua</NavLink></li>
                                    <li><NavLink to="/rent">Cho thuê</NavLink></li>
                                    <li><NavLink to="/posts">Quản lý tin đăng</NavLink></li>
                                    <li><NavLink to="/post-campaign">Tạo chiến dịch tin đăng</NavLink></li>
                                </ul>
                                <button className="login_btn" onClick={this.redirectToLoginForm}>Login</button>
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
            <BannerRight
                banner_content={bannerRight_content}
            />
            </div >
        );
    }
}

export default Header;