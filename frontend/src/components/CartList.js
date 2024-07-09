import React, { Component } from 'react';
import axios from 'axios';
import { Table } from 'reactstrap';

export default class CartList extends Component {
  state = {
    cartItems: []
  };

  componentDidMount() {
    this.fetchCartItems();
  }

  fetchCartItems = () => {
    axios.get(`http://localhost:8080/cart`, {
      params: {
        userId: this.props.userId
      }
    })
    .then(response => {
      console.log("Fetched cart items from database:", response.data);
      const cartItems = Array.isArray(response.data) ? response.data : [];
      // Filter duplicate products by using Set
      const uniqueCartItems = new Set();
      cartItems.forEach(item => {
        uniqueCartItems.add(item.productId); // Add productId to Set to ensure uniqueness
      });
      // Convert Set back to array of unique items
      const uniqueCartArray = Array.from(uniqueCartItems);
      this.setState({ cartItems: uniqueCartArray });
    })
    .catch(error => {
      console.error("Error fetching cart items:", error);
    });
  };

  render() {
    return (
      <div>
        <h2>Shopping Cart</h2>
        <Table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              {/* Add more table headers as needed */}
            </tr>
          </thead>
          <tbody>
            {this.state.cartItems.map(itemId => {
              // Find the product details for each itemId
              const itemDetails = this.props.cart.find(item => item.product.id === itemId);
              if (!itemDetails) return null; // If details not found, skip rendering
              return (
                <tr key={itemId}>
                  <td>{itemDetails.product.productName}</td>
                  <td>{itemDetails.product.price}</td>
                  {/* Add more table cells for additional product details */}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  }
}
