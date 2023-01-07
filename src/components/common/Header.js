import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <div className="menuWrapper" id="mainNav">
        <img src={this.props.image} alt="logo" className="headerData" />
        <nav>
          <Link className="menuLinks" to="/">
            Home
          </Link>
          <Link className="menuLinks" to="/schedule">
            Schedule
          </Link>
          <Link className="menuLinks" to="/about">
            About
          </Link>
          <Link className="menuLinks" to="/gallery">
            Gallery
          </Link>
          <Link className="menuLinks" to="/contact">
            Contact Us
          </Link>
        </nav>
      </div>
    );
  }
}

export default Header;
