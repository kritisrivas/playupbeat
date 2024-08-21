import React from "react";
import Navbar from "../common/Navbar";
import ImageSlider from "../common/ImageSlider";
import Tournaments from "../common/Tournaments";
import Footer from "../common/Footer";

function Home() {
    return (
      <div>
        <Navbar />
        <ImageSlider />
        <Tournaments showMyTournament="false"/>
        {/*<Footer image={image} /> */}
      </div>
    );
}

export default Home;
