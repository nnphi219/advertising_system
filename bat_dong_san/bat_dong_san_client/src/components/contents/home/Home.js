import React from 'react';
import './home.css';
import { TEMP_PRODUCTS } from '../../constant';

class Product extends React.Component {
    render() {
        let product = this.props.product;
        return (
            <li>
                <a href={"#" + product.id}>
                    <img src={product.src_img} alt="" title="" className="property_img" />
                </a>
                <span className="price">{product.price}</span>
                <div className="property_details">
                    <h1>
                        <a href="#11">{product.title}</a>
                    </h1>
                    <h2>{product.subtTitle}<span className="property_size">(288ftsq)</span></h2>
                </div>
            </li>
        );
    }
}

class ProductTable extends React.Component {
    render() {
        let products = TEMP_PRODUCTS;
        let productElements = [];
        products.forEach(product => {
            productElements.push(
                <Product key={product.id}
                    product={product}
                />
            );
        });
        return (
            <ul className="properties_list">
                {productElements}
            </ul>
        );
    }
}

class Home extends React.Component {
    render() {
        return (
            <div>
                <section className="listings">
                    <div className="wrapper post_house_sale">
                        <div className="title">
                            <p>Tin bán nhà</p>
                        </div>
                        <ProductTable />
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