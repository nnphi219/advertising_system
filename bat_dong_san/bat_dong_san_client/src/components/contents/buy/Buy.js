import React, { Component } from 'react';
import { TEMP_PRODUCTS } from '../../constant';
import { URL_API } from '../../share/UrlAPI';
import { PAGES } from '../../share/PageConfig';
import Request from 'superagent';
import { ListPostContentToListProduct } from '../../share/CommonFunction';
import './buy.css';

class Product extends React.Component {
    render() {
        let product = this.props.product;
        return (
            <li>
                <div className="property_image">
                    <a href={"#" + product.id}>
                        {/* <img src={product.src_img} alt="" title="" className="property_img" /> */}
                        <img src={'img/property_1.jpg'} alt="" title="" className="property_img" />
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
        let products = this.props.products;
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

class Buy extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            products: []
        };
    }

    getBuyAdvertising() {
        let $this = this;
        let url = URL_API.GetAdvertisement + "/" + PAGES.BUY.NAME_ID;
        Request.get(url)
            .then((res) => {
                let jsonAdsArea = res.body;
                let postIds = res.body.tin_rao.contents;

                let data = {
                    postIds: postIds
                };

                Request.post(URL_API.GetPostsByPostIds)
                    .set('Content-Type', 'application/x-www-form-urlencoded')
                    .send(data)
                    .end(function (err, res) {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            let products = ListPostContentToListProduct(res.body);
                            let newProducts = {
                                products: products
                            }

                            $this.setState(newProducts);
                        }
                    });


            }).catch((e) => {
                console.log('err');
            });
    }

    componentDidMount() {
        this.getBuyAdvertising();
    }

    render() {
        return (
            <div>
                <section className="page-listings">
                    <div className="wrapper post_house_sale">
                        <div className="page-buy">
                            <ProductTable
                                products={this.state.products}
                            />
                        </div>
                    </div>
                </section>
            </div>

        );
    }
}

export default Buy;