import React, { Component } from "react";
// import { Link } from "react-router-dom";
import image from "../images/LogoImg.PNG";
import Header from "../common/Header";
import ImageSlider from "../common/ImageSlider";
import Team from "../common/Team";
import Footer from "../common/Footer";

class Home extends Component {
  render() {
    return (
      <div>
        <Header image={image} />
        <ImageSlider />
        <Team />
        <Footer image={image} />
      </div>
    );
  }
}

export default Home;
