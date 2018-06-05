import React, { Component } from 'react';
import { TEMP_PRODUCTS } from '../../constant';
import './rent.css';

class Product extends React.Component {
    render() {
        let product = this.props.product;
        return (
            <li>
                <div className="property_image">
                    <a href={"#" + product.id}>
                        <img src={product.src_img} alt="" title="" className="property_img" />
                    </a>
                </div>

                <div className="property_details">
                    <span className="price">{product.price}</span>
                    <h1 className="title">
                        <a href="#11">{product.title}</a>
                    </h1>
                    <h2 className="sub-title">{product.subtTitle}<span className="property_size">(288ftsq)</span></h2>
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

class Rent extends React.Component {
    render() {
        return (
            <div>
                <section className="page-listings">
                    <div className="wrapper post_house_sale">
                        <div className="page-rent">
                            <ProductTable />
                        </div>
                    </div>
                </section>
            </div>

        );
    }
}

export default Rent;