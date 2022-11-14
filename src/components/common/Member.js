import React, { Component } from "react";

class Member extends Component {
  render() {
    return (
      <div className="col-sm-4">
        <div className="team-member">
          <img
            className="mx-auto rounded-circle"
            src={this.props.image}
            alt=""
          />
          <h4>{this.props.name}</h4>
        </div>
      </div>
    );
  }
}

export default Member;
