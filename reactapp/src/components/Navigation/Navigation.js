import React from "react";
import {Link} from "react-router-dom";
import './Navigation.css';

export const Navigation = (props) => {
    return (
        <nav className="navbar navbar-default" role="navigation">
                <div className="navbar-collapse collapse">
                    <ul class="nav navbar-nav">
                        <li><Link to={"/create/ads-area"} activeStyle={{color: "red"}}>Tạo Vùng Quảng Cáo</Link></li>
                    </ul>
                    <ul className="nav navbar-nav navbar-center">
                        <li><Link to={"/create/price"} activeClassName={"active"}>Tạo giá dịch vụ</Link></li>
                    </ul>
                    <ul class="nav navbar-nav navbar-right">
                        <li><Link to={"/create/price-factor"} activeClassName={"active"}>Tạo nhân tố ảnh hưởng giá</Link></li>
                    </ul>
                </div>
        </nav>
    );
};

export default Navigation;