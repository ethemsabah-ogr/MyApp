import React, { Component } from "react";
import axios from "axios";
import alertify from "alertifyjs";
import { Button, Form, FormGroup, Label, Input, Container } from "reactstrap";
import { Navigate } from "react-router-dom";

export default class Register extends Component {
  state = {
    fullName: "",
    email: "",
    password: "",
    registeredIn:false
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { fullName, email, password } = this.state;

    axios
      .post("http://localhost:8080/api/register", {
        fullName,
        email,
        password,
      })
      .then((response) => {
        alertify.success("Registration successful!");
        this.setState({registeredIn:true})
        // Başarılı kayıt sonrası yapılacak işlemler (örn. giriş sayfasına yönlendirme)
      })
      .catch((error) => {
        console.error("Error registering:", error);
        alertify.error("Registration failed!");
      });
  };

  render() {
    if(this.state.registeredIn){
      return <Navigate to={"/login"}/>
    }
    return (
      <Container>
        <h2>Register</h2>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="full_name">Full Name</Label>
            <Input
              type="text"
              name="fullName"
              id="fullName"
              placeholder="Enter your full name"
              value={this.state.fullName}
              onChange={this.handleChange}
              required
            />
          </FormGroup>
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
          <Button type="submit" color="primary">Register</Button>
        </Form>
      </Container>
    );
  }
}
