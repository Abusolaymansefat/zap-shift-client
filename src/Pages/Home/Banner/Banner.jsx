import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import BannerImg from '../../../assets/banner/banner1.png'
import BannerIm1 from '../../../assets/banner/banner2.png'
import BannerImg2 from '../../../assets/banner/banner3.png'

const Banner = () => {
    return (
        <Carousel autoPlay={true} infiniteLoop={true} showThumbs={false}>
                <div>
                    <img src={BannerImg} />
                    {/* <p className="legend">Legend 1</p> */}
                </div>
                <div>
                    <img src={BannerIm1}/>
                    {/* <p className="legend">Legend 2</p> */}
                </div>
                <div>
                    <img src={BannerImg2}/>
                    {/* <p className="legend">Legend 3</p> */}
                </div>
            </Carousel>
    );
};

export default Banner;