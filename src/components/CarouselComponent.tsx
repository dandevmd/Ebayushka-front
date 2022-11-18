import React, { Component } from "react";
import ReactDOM from "react-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { Timage } from "../redux/slices/productSlice";

interface IcomponentProps {
  images: Timage[];
}

const CarouselComponent: React.FC<IcomponentProps> = ({ images }) => {
  return (
    <Carousel autoPlay infiniteLoop showArrows={false}>
      {images &&
        images.map((i) => <img src={i.secure_url} key={i.public_id} />)}
        
    </Carousel>
  );
};

export default CarouselComponent;
