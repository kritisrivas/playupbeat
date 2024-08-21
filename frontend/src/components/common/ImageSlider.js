import React from "react";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const images = [
  "../images/slide_1.jpg",
  "../images/slide_2.jpg",
  "../images/slide_3.jpg",
  "../images/slide_4.jpg",
  "../images/slide_5.jpg",
  "../images/slide_6.jpeg",
];
function ImageSlider() {
    return (
      <div className="slider-container">
        <Carousel className="slider" showArrows={true} showThumbs={false} keyBoardControl={true}>
          {images.map((url, index) => (
          <div className="each-slide" key={index}>
            <img src={url} alt="event" key={index} />
          </div>
          ))}
        </Carousel>
      </div>
    );
}

export default ImageSlider;
