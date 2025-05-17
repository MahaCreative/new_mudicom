import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { usePage } from "@inertiajs/react";
export default function Jumbotron() {
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
    };
    const { slider } = usePage().props;
    return (
        <div className="slider-container w-full">
            <Slider {...settings}>
                {slider.map((item, key) => (
                    <div className="">
                        <img
                            src={"/storage/" + item.thumbnail}
                            alt=""
                            className="w-full h-[600px] object-cover"
                        />
                    </div>
                ))}
            </Slider>
        </div>
    );
}
