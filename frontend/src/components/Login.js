import React, { Component } from "react";
import axios from "axios";
import alertify from "alertifyjs";
import { Button, Form, FormGroup, Label, Input, Container } from "reactstrap";
import { Navigate } from "react-router-dom";

export default class Login extends Component {
  state = {
    email: "",
    password: "",
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;

    axios
      .get("http://localhost:8080/api/persons") // Tüm kullanıcıları getir
      .then((response) => {
        const persons = response.data.data;
        const user = persons.find(
          (person) => person.email === email && person.password === password
        );
        if (user) {
          alertify.success("Login successful!");
          this.props.handleLogin(user.id); // handleLogin fonksiyonunu çağır ve kullanıcı ID'sini ile
        } else {
          alertify.error("Login failed! User not found.");
        }
      })
      .catch((error) => {
        console.error("Error logging in:", error);
        alertify.error("Login failed!");
      });
  };

  render() {
    if (this.props.loggedIn) {
      return <Navigate to={"/"} />;
    }
    return (
      <Container>
        <h2>Login</h2>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              value={this.state.email}
              onChange={this.handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              value={this.state.password}
              onChange={this.handleChange}
              required
            />
          </FormGroup>
          <Button type="submit" color="primary">
            Login
          </Button>
        </Form>
      </Container>
    );
  }
}
