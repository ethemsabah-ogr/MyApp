import React, { Component } from "react";
import axios from "axios";
import alertify from "alertifyjs";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import {
  Col,
  Container,
  Row,
} from "reactstrap";
import NavBar from "./components/NavBar";
import CategoryList from "./components/CategoryList";
import ProductList from "./components/ProductList";
import AdminPanel from "./components/AdminPanel";
import Register from "./components/Register";
import Login from "./components/Login";

export default class App extends Component {
  state = {
    currentCategory: "",
    products: [],
    categories: [],
    cart: [],
    userId: "", // Kullanıcı ID'si
    loggedIn: false,
  };

  componentDidMount() {
    this.getCategories();
    this.getProducts();
  }

  getCategories = () => {
    axios
      .get("http://localhost:8080/api/categories")
      .then((response) => {
        this.setState({ categories: response.data.data });
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };

  getProducts = (categoryId) => {
    let url = "http://localhost:8080/api/products";
    if (categoryId) {
      url += "?categoryId=" + categoryId;
    }
    axios
      .get(url)
      .then((response) => {
        this.setState({ products: response.data.data });
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };

  changeCategory = (category) => {
    this.setState({ currentCategory: category.categoryName });
    this.getProducts(category.id);
  };

  addToCart = (product) => {
    let newCart = [...this.state.cart];
    let addedItem = newCart.find((c) => c.product.id === product.id);

    if (addedItem) {
      addedItem.quantity += 1;
      addedItem.total = addedItem.quantity * product.price; // Total değerini güncelle
      console.log("Updated item in cart:", addedItem);
    } else {
      newCart.push({ product: product, quantity: 1, total: product.price }); // Yeni ürünü sepete ekle
      console.log("Added new item to cart:", product);
    }

    this.setState({ cart: newCart }, () => {
      console.log("New cart state:", this.state.cart);
    });

    // Veritabanına gönder
    axios.post("http://localhost:8080/api/carts", {
      productId: product.id,
      userId: this.state.userId, // Kullanıcı ID'sini burada belirtin
      quantity: addedItem ? addedItem.quantity : 1,
      total: addedItem ? addedItem.total : product.price, // Total değeri iletiliyor
    })
      .then(response => {
        console.log("Product added to cart in database:", response.data);
        alertify.success(product.productName + " added to cart!");

        // Veritabanından ürünleri çek
        axios.get(`http://localhost:8080/api/cart`, {
          params: {
            userId: this.state.userId
          }
        })
          .then(cartResponse => {
            console.log("Fetched cart items from database:", cartResponse.data);
            const cartItems = Array.isArray(cartResponse.data) ? cartResponse.data : [];
            cartItems.forEach(item => {
              if (item.productId === product.id) {
                console.log("Removing duplicate item from cart:", item.product);
                this.removeFromCart2(item.product);
              }
            });
          })
          .catch(cartError => {
            console.error("Error fetching cart items:", cartError);
          });
      })
      .catch(error => {
        console.error("Error adding to cart:", error);
        alertify.error("Error adding to cart!");
      });
  };

  removeFromCart2 = (product) => {
    let newCart = this.state.cart.filter(item => item.product.id !== product.id);
    this.setState({ cart: newCart }, () => {
      console.log("Updated cart after removal:", this.state.cart);
    });
  
    console.log("Removing product from database:", product);
  
    axios.delete(`http://localhost:8080/api/carts/${product.id}`, {
      data: { userId: this.state.userId } // userId'yi 'data' olarak gönder
    })
      .then(response => {
        console.log("Product removed from cart in database:", response.data);
        alertify.success(product.productName + " removed from cart!");
      })
      .catch(error => {
        console.error("Error removing from cart:", error);
        alertify.error("Error removing from cart!");
      });
  };
  
  



  removeFromCart = (product) => {
    let newCart = this.state.cart.filter((c) => c.product.id !== product.id);
    this.setState({ cart: newCart });
    alertify.error(product.productName + " removed from cart!");
  };

  handleLogin = (userId) => {
    this.setState({ loggedIn: true, userId: userId });
  };

  handleLogout = () => {
    this.setState({ loggedIn: false, userId: "" });
    alertify.success("Logged out successfully!");
  };

  render() {
    let productInfo = { title: "ProductList" };
    let categoryInfo = { title: "CategoryList" };

    return (
      <Router>
        <div>
          <Container>
            <NavBar
              cart={this.state.cart}
              loggedIn={this.state.loggedIn}
              handleLogout={this.handleLogout}
            />
            <Row>
              <Col xs="3">
                <CategoryList
                  currentCategory={this.state.currentCategory}
                  changeCategory={this.changeCategory}
                  categories={this.state.categories}
                  info={categoryInfo}
                />
              </Col>
              <Col xs="9">
                <Routes>
                  <Route
                    exact
                    path="/"
                    element={
                      <ProductList
                        products={this.state.products}
                        addToCart={this.addToCart}
                        currentCategory={this.state.currentCategory}
                        info={productInfo}
                      />
                    }
                  />
                  
                  <Route exact path="/admin" element={<AdminPanel />} />
                  <Route exact path="/register" element={<Register />} />
                  <Route
                    exact
                    path="/login"
                    element={<Login handleLogin={this.handleLogin} loggedIn={this.state.loggedIn} />}
                  />
                </Routes>
              </Col>
            </Row>
          </Container>
        </div>
      </Router>
    );
  }
}
