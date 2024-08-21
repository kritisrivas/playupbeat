import React from "react";
import Navbar from "../common/Navbar";
import AboutDesc from "../common/AboutDesc";
import Footer from "../common/Footer";

function About() {
  return (
    <div>
      <Navbar/>
      <AboutDesc />
      {/* <Footer image={image} /> */}
    </div>
  );
}
export default About;
