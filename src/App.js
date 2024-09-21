import React, { Component } from "react";
import Navi from "./Navi";
import CategoryList from "./CategoryList";
import ProductList from "./ProductList";
import { Col, Container, Row } from "reactstrap";
import alertify from "alertifyjs";
import { Routes, Route } from "react-router-dom";
import NotFound from "./NotFound";
import CartList from "./CartList";
import FormDemo1 from "./FormDemo1";
import FormDemo2 from "./FormDemo2";

export default class App extends Component {
  state = { currentCategory: "", products: [], cart: [] };

  componentDidMount() {
    this.getProducts();
  }

  changeCategory = (category) => {
    this.setState({ currentCategory: category.categoryName });
    console.log(category);
    this.getProducts(category.id);
  };  

  getProducts = (categoryId) => {
    let url = "http://localhost:3000/products";
    if (categoryId) {
      url += "?categoryId=" + categoryId;
    }
    fetch(url)
      .then((response) => response.json())
      .then((data) => this.setState({ products: data }));
  };

  addToCart = (product) => {
    let newCart = this.state.cart;

    var addedItem = newCart.find((c) => c.product.id === product.id); // gönderdiğimiz elemanı bul.
    if (addedItem) {
      addedItem.quentity += 1;
    } else {
      newCart.push({ product: product, quentity: 1 }); //gönderilen elemanı 1 adedi ile eklemiş olduk.
    }

    this.setState({ cart: newCart });

    alertify.success(product.productName + " added to cart ", 1);
  };

  removeFromCart = (product) => {
    let newCart = this.state.cart.filter((c) => c.product.id !== product.id);  //yolladığımızın dışındakileri filtrele filtrele
    this.setState({ cart: newCart });
    alertify.error(product.productName + " removed from cart ", 1);
  };

  render() { 
    let productInfo = { title: "ProductList" };
    let categoryInfo = { title: "CategoryList" };
    return (
      <div>
        <Container>
          <Navi cart={this.state.cart} removeFromCart={this.removeFromCart} />

          <Row>
            <Col xs="3">
              <CategoryList
                currentCategory={this.state.currentCategory}
                changeCategory={this.changeCategory}
                info={categoryInfo}
              />
            </Col>
            <Col xs="9">
              <Routes> 
                <Route
                  exact
                  path="/"
                  element = {
                    <ProductList
                      products={this.state.products}
                      addToCart={this.addToCart}
                      currentCategory={this.state.currentCategory}
                      changeCategory={this.changeCategory}
                      info={productInfo}
                    />
                  }
                />

                <Route
                  exact
                  path="/cart"
                  element = {
                    <CartList
                      cart = {this.state.cart}
                      removeFromCart={this.removeFromCart}
                    />
                  }
                />

                <Route exact path="/cart" element={<CartList></CartList>} />
                <Route exact path="*" element={<NotFound></NotFound>}></Route>
                <Route exact path = "/form1" element = {<FormDemo1></FormDemo1>}></Route>
                <Route exact path = "/form2" element = {<FormDemo2></FormDemo2>}></Route>
              </Routes>
            </Col>
          </Row>
        </Container> 
      </div>
    );
  }
}
