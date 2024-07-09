import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';

export default class ProductList extends Component {
  render() {
    const { products, currentCategory, info, addToCart } = this.props;

    return (
      <div>
        <h3>
          {info.title} - {currentCategory ? currentCategory : 'All Products'}
        </h3>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id}>
                <th scope="row">{index + 1}</th>
                <td>{product.productName}</td>
                <td>{product.price}</td>
                <td>{product.stock}</td>
                <td>
                  <Button onClick={() => addToCart(product)} color="info">
                    Add 
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}
