import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function SliderPaket({ children, setActiveIndex }) {
    const settings = {
        dots: false,
        arrows: false,
        lazyLoad: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 2000,
        speed: 5000,
        slidesToShow: 1,
        slidesToScroll: 1,

        beforeChange: (old, newIndex) => setActiveIndex(newIndex),
    };
    return (
        <div className="slider-container w-full">
            <Slider {...settings}>{children}</Slider>
        </div>
    );
}
