import React, { Component } from 'react';
import axios from 'axios';
import { ListGroup, ListGroupItem } from 'reactstrap';

export default class CategoryList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      categories: []
    };
  }

  componentDidMount() {
    // Axios ile kategorileri çekme
    axios.get('http://localhost:8080/categories')
      .then(response => {
        // Başarılı cevap geldiğinde verileri state'e kaydetme
        this.setState({ categories: response.data.data }); // Veri yapısına göre response.data.data şeklinde alınabilir
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }

  render() {
    const { categories } = this.state;

    return (
      <div>
        <h2>{this.props.info.title}</h2>
        <ListGroup>
          <ListGroupItem style={{ cursor: 'pointer' }} onClick={()=> this.props.changeCategory("")}>All Products</ListGroupItem>
          {categories.map(category => (
            <ListGroupItem
              style={{ cursor: 'pointer', }}
              active={category.id === this.props.currentCategory}
              onClick={() => this.props.changeCategory(category)}
              key={category.id}>
              {category.categoryName}
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
    );
  }
}
