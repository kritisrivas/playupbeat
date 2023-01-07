import React, { Component } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import image1 from "../images/slide_1.jpg";
import image2 from "../images/slide_2.jpg";
import image3 from "../images/slide_3.jpg";
import image4 from "../images/slide_4.jpg";
import image5 from "../images/slide_5.jpg";
import image6 from "../images/slide_6.jpg";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};
class ImageSlider extends Component {
  render() {
    return (
      <Carousel
        swipeable={false}
        draggable={false}
        showDots={true}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        autoPlay={false}
        keyBoardControl={true}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        deviceType={this.props.deviceType}
        dotListClass="custom-dot-list-style"
        // itemClass="carousel-item-padding"
      >
        <div className="each-slide">
          <div style={{ backgroundImage: `url(${image1})` }}></div>
        </div>
        <div className="each-slide">
          <div style={{ backgroundImage: `url(${image2})` }}></div>
        </div>
        <div className="each-slide">
          <div style={{ backgroundImage: `url(${image3})` }}></div>
        </div>
        <div className="each-slide">
          <div style={{ backgroundImage: `url(${image4})` }}></div>
        </div>
        <div className="each-slide">
          <div style={{ backgroundImage: `url(${image5})` }}></div>
        </div>
        <div className="each-slide">
          <div style={{ backgroundImage: `url(${image6})` }}></div>
        </div>
      </Carousel>
    );
  }
}

export default ImageSlider;
