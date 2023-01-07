import React, { Component } from "react";

import Member from "./Member";

// import team1 from "../Assets/Images/Team/1.jpg";
// import team2 from "../Assets/Images/Team/2.jpg";
import team3 from "../images/team3.jpg";

const members = [
  { name: "Krishal Shetty", image: "" }, //team1 },
  { name: "Sanjeeth Shetty", image: "" }, //team2 },
  { name: "Pawan Jaiswal", image: team3 },
];

class Team extends Component {
  render() {
    return (
      <section className="bg-light page-section" id="team">
        <div className="container">
          <div>
            <h2 className="section-heading">Our Amazing Team</h2>
          </div>
          <div className="row">
            {members.map((member, i) => {
              return <Member {...member} key={i} />;
            })}
          </div>
        </div>
      </section>
    );
  }
}

export default Team;
