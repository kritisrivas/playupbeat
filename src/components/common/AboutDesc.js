import React, { Component } from "react";
import image from "../images/AllGames.jpg";
class AboutDesc extends Component {
  render() {
    return (
      <div>
        <img src={image} alt="All Games" width="100%" />
        <h1>About PlayUpbeat</h1>
        <p>
          PlayUpbeat is a a young company founded in 2021 by Krishal Shetty with
          a passion and love for sports. Our Primary objective is to organize
          tournaments for the sports enthusiasts. We also provide the Badminton
          coaching to develop sports persons of International Caliber. Our focus
          is to bring enthusiasts from grass-roots level to professionals.
        </p>
        <h2>Vision and Mission</h2>
        <p>
          <b>Our Vision</b> is to reach to every level of players and provide
          them the best of opportunities to shine in their own favorite sports.
        </p>
        <p>
          <b>Our Mission</b> is to is to enhance the quality of Indian
          tournaments by bringing the innovative ideas and best of experience.
        </p>
      </div>
    );
  }
}

export default AboutDesc;
