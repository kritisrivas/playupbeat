import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <footer>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
          ></link>
          <div className="ConnectDiv">Connect With Us</div>
          <div>
            <a
              href="https://www.facebook.com/Play-UpBeat-101464911464706/"
              className="fa fa-facebook"
            >
              {" "}
            </a>
            <a
              href="https://www.instagram.com/playupbeat/"
              className="fa fa-instagram"
            >
              {" "}
            </a>
            <a href="https://twitter.com/search?lang=en" className="fa fa-twitter">
              {" "}
            </a>
          </div>
        </footer>
      </div>
    );
  }
}

export default Footer;
