import React from "react";
import Navbar from "../common/Navbar";
import ImageSlider from "../common/ImageSlider";
import Tournaments from "../common/Tournaments";
import Footer from "../common/Footer";

function Home() {
    return (
      <div className="bodyDiv">
        <Navbar />
        <ImageSlider />
        <Tournaments showMyTournament="false"/>
        <Footer/>
      </div>
    );
}

export default Home;
