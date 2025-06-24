import React from 'react';
import Marquee from 'react-fast-marquee';

import amazon from '../../../assets/brands/amazon.png';
import amazonVector from '../../../assets/brands/amazon_vector.png';
import casio from '../../../assets/brands/casio.png';
import moonstar from '../../../assets/brands/moonstar.png';
import start from '../../../assets/brands/start.png';
import randstad from '../../../assets/brands/randstad.png';
import people from '../../../assets/brands/start-people 1.png';

const logos = [amazon, amazonVector, casio, moonstar, start, randstad, people];

const ClientLogosMarquee = () => {
  return (
    <section className="py-10 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl text-primary font-bold text-center mb-12">
          Trusted by Leading Brands
        </h2>

        <Marquee pauseOnHover speed={50} gradient={false}>
          <div className="flex items-center gap-[100px]">
            {logos.map((logo, idx) => (
              <img
                key={idx}
                src={logo}
                alt={`Client Logo ${idx + 1}`}
                className="h-[24px] object-contain"
              />
            ))}
          </div>
        </Marquee>
      </div>
    </section>
  );
};

export default ClientLogosMarquee;
