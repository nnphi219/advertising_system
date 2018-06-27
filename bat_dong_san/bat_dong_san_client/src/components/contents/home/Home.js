import React from 'react';
import './home.css';
import { TEMP_PRODUCTS } from '../../constant';
import { URL_API } from '../../share/UrlAPI';
import { PAGES } from '../../share/PageConfig';
import Request from 'superagent';
import { ListPostContentToListProduct } from '../../share/CommonFunction';

class Product extends React.Component {
    render() {
        let product = this.props.product;
        return (
            <li>
                <a href={"#" + product.id}>
                    {/* <img src={product.src_img} alt="" title="" className="property_img" /> */}
                    <img src={'img/property_1.jpg'} alt="" title="" className="property_img" />
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

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            products: []
        };
    }

    getHomeAdvertising() {
        let $this = this;
        let url = URL_API.GetAdvertisement + "/" + PAGES.HOME.NAME_ID;
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
        this.getHomeAdvertising();
    }

    render() {
        return (
            <div>
                <section className="listings">
                    <div className="wrapper post_house_sale">
                        <div className="title">
                            <p>Tin bán nhà</p>
                        </div>
                        <ProductTable
                            products={this.state.products}
                        />
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