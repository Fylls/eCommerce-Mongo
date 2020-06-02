import React, { Component } from "react";

// axios is used for creating REST api. no need here
// import axios from "axios";

import { Stitch, RemoteMongoClient } from "mongodb-stitch-browser-sdk";

import Products from "../../components/Products/Products";

class ProductsPage extends Component {
  state = { isLoading: true, products: [] };
  componentDidMount() {
    this.fetchData();
  }

  productDeleteHandler = (productId) => {};

  fetchData = () => {
    const mongodb = Stitch.defaultAppCLient().getServiceClient(
      RemoteMongoClient.factory,
      "mongodb-atlas"
    );

    mongodb
      .db("MyShop")
      .collection("products")
      .find()
      .asArray()
      .then((products) => {
        this.setState({ products: products }); // update state
      })
      .catch((err) => {
        this.props.onError("fetching products failed");
        console.log(err);
      });
  };

  render() {
    let content = <p>Loading products...</p>;

    if (!this.state.isLoading && this.state.products.length > 0) {
      content = (
        <Products
          products={this.state.products}
          onDeleteProduct={this.productDeleteHandler}
        />
      );
    }
    if (!this.state.isLoading && this.state.products.length === 0) {
      content = <p>Found no products. Try again later.</p>;
    }
    return <main>{content}</main>;
  }
}

export default ProductsPage;
