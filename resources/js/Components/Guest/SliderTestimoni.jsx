import React, { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ArrowForwardIos } from "@mui/icons-material";
import Slider from "react-slick";

function SliderTestimoni({ children }) {
    const array = [0, 1, 2, 3, 4];
    const [activeIndex, setActiveIndex] = useState(0);
    const settings = {
        dots: false,
        arrows: false,
        lazyLoad: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 2000,
        speed: 5000,
        initialSlide: 0,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
        beforeChange: (old, newIndex) => setActiveIndex(newIndex + 1),
    };
    return (
        <div>
            <Slider {...settings}>
                {array.map((item, index) => (
                    <div className="px-1">
                        <div
                            className={`${
                                activeIndex == index
                                    ? "bg-primary text-white"
                                    : "bg-white text-primary"
                            } usetransisi max-w-xl mx-auto  p-6 rounded shadow flex flex-col justify-center items-center`}
                        >
                            <img
                                src={"/storage/image/thumbnail_mobil.png"}
                                alt=""
                                className="h-24 w-24 object-cover rounded-full"
                            />
                            <p className=" italic mb-4">
                                “The courses at Mudicom are excellent. The
                                instructors are knowledgeable and the materials
                                are very useful!”
                            </p>
                            <p className="font-bold ">- John D.</p>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
}
export default SliderTestimoni;
