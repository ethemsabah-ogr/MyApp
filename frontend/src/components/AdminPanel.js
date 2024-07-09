import React, { Component } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button, Table } from 'reactstrap';
import axios from 'axios';

export default class AdminPanel extends Component {
  state = {
    productName: '',
    price: '',
    stock: '',
    categoryId: '',
    categoryName: '',
    products: [],
    categories: [],
    selectedProductId: null,
    selectedCategoryId: null,
    selectedProduct: {},
    selectedCategory: {}
  };

  componentDidMount() {
    this.fetchProducts();
    this.fetchCategories();
  }

  fetchProducts = () => {
    axios.get('http://localhost:8080/api/products')
      .then(response => {
        this.setState({ products: response.data.data });
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  };

  fetchCategories = () => {
    axios.get('http://localhost:8080/api/categories')
      .then(response => {
        this.setState({ categories: response.data.data });
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
  
    // Değerlerin türlerini kontrol ederek uygun şekilde güncelleme yapın
    if (name === 'price') {
      this.setState({ [name]: parseFloat(value) });
    } else if (name === 'stock' || name === 'categoryId') {
      this.setState({ [name]: parseInt(value) });
    } else {
      this.setState({ [name]: value });
    }
  };

  handleProductSubmit = (e) => {
    e.preventDefault();
    const { productName, price, stock, categoryId, selectedProductId } = this.state;
    console.log(typeof this.state.price);
    console.log(typeof this.state.stock);

    if (selectedProductId) {
      axios.patch(`http://localhost:8080/api/products/${selectedProductId}`, { productName, price, stock, categoryId })
        .then(response => {
          console.log('Product updated successfully:', response.data);
          this.fetchProducts();
          this.setState({ productName: '', price: '', stock: '', categoryId: '', selectedProductId: null });
        })
        .catch(error => {
          console.error('Error updating product:', error);
        });
    } else {
      axios.post('http://localhost:8080/api/products', { productName, categoryId, price,stock })
        .then(response => {
          console.log('Product added successfully:', response.data);
          this.fetchProducts();
          this.setState({ productName: '', price: '', stock: '', categoryId: '' });
        })
        .catch(error => {
          console.error('Error adding product:', error);
        });
    }
  };

  handleCategorySubmit = (e) => {
    e.preventDefault();
    const { categoryName, selectedCategoryId } = this.state;

    if (selectedCategoryId) {
      axios.patch(`http://localhost:8080/api/categories/${selectedCategoryId}`, { categoryName })
        .then(response => {
          console.log('Category updated successfully:', response.data);
          this.fetchCategories();
          this.setState({ categoryName: '', selectedCategoryId: null });
        })
        .catch(error => {
          console.error('Error updating category:', error);
        });
    } else {
      axios.post('http://localhost:8080/api/categories', { categoryName })
        .then(response => {
          console.log('Category added successfully:', response.data);
          this.fetchCategories();
          this.setState({ categoryName: '' });
        })
        .catch(error => {
          console.error('Error adding category:', error);
        });
    }
  };

  handleProductSelect = (product) => {
    this.setState({
      selectedProduct: product,
      productName: product.productName,
      price: product.price,
      stock: product.stock,
      categoryId: product.categoryId,
      selectedProductId: product.id
    });
  };

  handleCategorySelect = (category) => {
    this.setState({
      selectedCategory: category,
      categoryName: category.categoryName,
      selectedCategoryId: category.id
    });
  };

  handleProductDelete = (productId) => {
    axios.delete(`http://localhost:8080/api/products/${productId}`)
      .then(response => {
        console.log('Product deleted successfully:', response.data);
        this.fetchProducts();
      })
      .catch(error => {
        console.error('Error deleting product:', error);
      });
  };

  handleCategoryDelete = (categoryId) => {
    axios.delete(`http://localhost:8080/api/categories/${categoryId}`)
      .then(response => {
        console.log('Category deleted successfully:', response.data);
        this.fetchCategories();
      })
      .catch(error => {
        console.error('Error deleting category:', error);
      });
  };

  render() {
    const { productName, price, stock, categoryId, categoryName, products, categories } = this.state;

    return (
      <Container>
        <Row className="mt-5">
          <Col md={6}>
            <h2>Add/Update Product</h2>
            <Form onSubmit={this.handleProductSubmit}>
              <FormGroup>
                <Label for="productName">Product Name</Label>
                <Input type="text" name="productName" id="productName" value={productName} onChange={this.handleChange} />
              </FormGroup>
              <FormGroup>
                <Label for="price">Price</Label>
                <Input type="number" name="price" id="price" value={price} onChange={this.handleChange} />
              </FormGroup>
              <FormGroup>
                <Label for="stock">Stock</Label>
                <Input type="number" name="stock" id="stock" value={stock} onChange={this.handleChange} />
              </FormGroup>
              <FormGroup>
                <Label for="categoryId">Category ID</Label>
                <Input type="number" name="categoryId" id="categoryId" value={categoryId} onChange={this.handleChange} />
              </FormGroup>
              <Button color="primary">{this.state.selectedProductId ? 'Update' : 'Add'} Product</Button>
            </Form>
          </Col>
          <Col md={6}>
            <h2>Add/Update Category</h2>
            <Form onSubmit={this.handleCategorySubmit}>
              <FormGroup>
                <Label for="categoryName">Category Name</Label>
                <Input type="text" name="categoryName" id="categoryName" value={categoryName} onChange={this.handleChange} />
              </FormGroup>
              <Button color="primary">{this.state.selectedCategoryId ? 'Update' : 'Add'} Category</Button>
            </Form>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col>
            <h2>Products</h2>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Category ID</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.productName}</td>
                    <td>{product.price}</td>
                    <td>{product.stock}</td>
                    <td>{product.categoryId}</td>
                    <td>
                      <Button color="primary" onClick={() => this.handleProductSelect(product)}>Update</Button>
                      <Button color="danger" onClick={() => this.handleProductDelete(product.id)}>Delete</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col>
            <h2>Categories</h2>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Category Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map(category => (
                  <tr key={category.id}>
                    <td>{category.id}</td>
                    <td>{category.categoryName}</td>
                    <td>
                      <Button color="primary" onClick={() => this.handleCategorySelect(category)}>Update</Button>
                      <Button color="danger" onClick={() => this.handleCategoryDelete(category.id)}>Delete</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    );
  }
}
