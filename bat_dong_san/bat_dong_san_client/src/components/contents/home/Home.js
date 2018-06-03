import React from 'react';
import './home.css';

class Home extends React.Component {
    render() {
        return (
            <div>
                <section className="listings">
                    <div className="wrapper post_house_sale">
                        <div className="title">
                            <p>Tin bán nhà</p>
                        </div>
                        <ul className="properties_list">
                            <li>
                                <a href="#10">
                                    <img src="img/property_1.jpg" alt="" title="" className="property_img" />
                                </a>
                                <span className="price">$2500</span>
                                <div className="property_details">
                                    <h1>
                                        <a href="#11">Fuisque dictum tortor at purus libero</a>
                                    </h1>
                                    <h2>2 kitchens, 2 bed, 2 bath... <span className="property_size">(288ftsq)</span></h2>
                                </div>
                            </li>
                            <li>
                                <a href="#12">
                                    <img src="img/property_2.jpg" alt="" title="" className="property_img" />
                                </a>
                                <span className="price">$1000</span>
                                <div className="property_details">
                                    <h1>
                                        <a href="#13">Fuisque dictum tortor at purus libero</a>
                                    </h1>
                                    <h2>2 kitchens, 2 bed, 2 bath... <span className="property_size">(288ftsq)</span></h2>
                                </div>
                            </li>
                            <li>
                                <a href="#14">
                                    <img src="img/property_3.jpg" alt="" title="" className="property_img" />
                                </a>
                                <span className="price">$500</span>
                                <div className="property_details">
                                    <h1>
                                        <a href="#15">Fuisque dictum tortor at purus libero</a>
                                    </h1>
                                    <h2>2 kitchens, 2 bed, 2 bath... <span className="property_size">(288ftsq)</span></h2>
                                </div>
                            </li>
                            <li>
                                <a href="#16">
                                    <img src="img/property_1.jpg" alt="" title="" className="property_img" />
                                </a>
                                <span className="price">$2500</span>
                                <div className="property_details">
                                    <h1>
                                        <a href="#17">Fuisque dictum tortor at purus libero</a>
                                    </h1>
                                    <h2>2 kitchens, 2 bed, 2 bath... <span className="property_size">(288ftsq)</span></h2>
                                </div>
                            </li>
                            <li>
                                <a href="#18">
                                    <img src="img/property_2.jpg" alt="" title="" className="property_img" />
                                </a>
                                <span className="price">$1000</span>
                                <div className="property_details">
                                    <h1>
                                        <a href="#19">Fuisque dictum tortor at purus libero</a>
                                    </h1>
                                    <h2>2 kitchens, 2 bed, 2 bath... <span className="property_size">(288ftsq)</span></h2>
                                </div>
                            </li>
                            <li>
                                <a href="#20">
                                    <img src="img/property_3.jpg" alt="" title="" className="property_img" />
                                </a>
                                <span className="price">$500</span>
                                <div className="property_details">
                                    <h1>
                                        <a href="#21">Fuisque dictum tortor at purus libero</a>
                                    </h1>
                                    <h2>2 kitchens, 2 bed, 2 bath... <span className="property_size">(288ftsq)</span></h2>
                                </div>
                            </li>
                            <li>
                                <a href="#22">
                                    <img src="img/property_1.jpg" alt="" title="" className="property_img" />
                                </a>
                                <span className="price">$2500</span>
                                <div className="property_details">
                                    <h1>
                                        <a href="#23">Fuisque dictum tortor at purus libero</a>
                                    </h1>
                                    <h2>2 kitchens, 2 bed, 2 bath... <span className="property_size">(288ftsq)</span></h2>
                                </div>
                            </li>
                            <li>
                                <a href="#24">
                                    <img src="img/property_2.jpg" alt="" title="" className="property_img" />
                                </a>
                                <span className="price">$1000</span>
                                <div className="property_details">
                                    <h1>
                                        <a href="#25">Fuisque dictum tortor at purus libero</a>
                                    </h1>
                                    <h2>2 kitchens, 2 bed, 2 bath... <span className="property_size">(288ftsq)</span></h2>
                                </div>
                            </li>
                            <li>
                                <a href="#26">
                                    <img src="img/property_3.jpg" alt="" title="" className="property_img" />
                                </a>
                                <span className="price">$500</span>
                                <div className="property_details">
                                    <h1>
                                        <a href="#27">Fuisque dictum tortor at purus libero</a>
                                    </h1>
                                    <h2>2 kitchens, 2 bed, 2 bath... <span className="property_size">(288ftsq)</span></h2>
                                </div>
                            </li>
                        </ul>
                        <div className="more_listing">
                            <a href="#28" className="more_listing_btn">View More Listings</a>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default Home;