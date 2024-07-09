import React, { Component } from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { Link } from 'react-router-dom';

export default class NavBar extends Component {
  state = {
    dropdownOpen: false,
  };

  toggleDropdown = () => {
    this.setState((prevState) => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  };

  render() {
    const { cart, loggedIn, handleLogout } = this.props;
    const { dropdownOpen } = this.state;

    return (
      <Navbar color="light" light expand="md">
        <NavbarBrand tag={Link} to="/">
          My App
        </NavbarBrand>
        <Nav className="ml-auto" navbar>
          {!loggedIn ? (
            <>
              <NavItem>
                <NavLink tag={Link} to="/login" className="nav-link">
                  Login
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/register" className="nav-link">
                  Register
                </NavLink>
              </NavItem>
            </>
          ) : (
            <NavItem>
              <NavLink onClick={handleLogout} className="nav-link" style={{ cursor: 'pointer' }}>
                Logout
              </NavLink>
            </NavItem>
          )}
          <Dropdown isOpen={dropdownOpen} toggle={this.toggleDropdown}>
            <DropdownToggle caret>Sepet ({cart.length})</DropdownToggle>
            <DropdownMenu>
              {cart.map((item) => (
                <DropdownItem key={item.product.id}>
                  {item.product.productName} - Adet: {item.quantity}
                </DropdownItem>
              ))}
             
            </DropdownMenu>
          </Dropdown>
        </Nav>
      </Navbar>
    );
  }
}
