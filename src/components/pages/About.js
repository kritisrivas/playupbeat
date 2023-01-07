import React, { Component } from "react";
import Header from "../common/Header";
import image from "../images/LogoImg.PNG";
import AboutDesc from "../common/AboutDesc";
import Footer from "../common/Footer";

class About extends Component {
  render() {
    return (
      <div>
        <Header image={image} />
        <AboutDesc />
        <Footer image={image} />
      </div>
    );
  }
}
export default About;
