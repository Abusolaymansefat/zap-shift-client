import React from 'react';
import Banner from '../Banner/Banner';
import OurService from '../Services/OurService';
import ClientLogosMarquee from '../ClientLogosMarquee/ClientLogosMarquee';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <OurService></OurService>
            <ClientLogosMarquee></ClientLogosMarquee>
        </div>
    );
};

export default Home;