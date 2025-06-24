import React from 'react';
import Banner from '../Banner/Banner';
import OurService from '../Services/OurService';
import ClientLogosMarquee from '../ClientLogosMarquee/ClientLogosMarquee';
import Benefits from '../Benefits/Benefits';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <OurService></OurService>
            <ClientLogosMarquee></ClientLogosMarquee>
            <Benefits></Benefits>
        </div>
    );
};

export default Home;