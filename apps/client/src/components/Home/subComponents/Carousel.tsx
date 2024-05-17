'use client';
import React from 'react';
import CarouselReact from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import css from './Carousel.module.css';
import Image from 'next/image';

const Carousel = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <CarouselReact rewind autoPlay autoPlaySpeed={3000} responsive={responsive}>
      <Image
        src="/images/carousel/carousel1.webp"
        alt="logo"
        layout="fill"
        className={css.image}
      />
      <Image
        src="/images/carousel/carousel2.webp"
        alt="logo"
        layout="fill"
        className={css.image}
      />
      <Image
        src="/images/carousel/carousel3.webp"
        alt="logo"
        layout="fill"
        className={css.image}
      />
      <Image
        src="/images/carousel/carousel4.webp"
        alt="logo"
        layout="fill"
        className={css.image}
      />
      <Image
        src="/images/carousel/carousel5.webp"
        alt="logo"
        layout="fill"
        className={css.image}
      />
    </CarouselReact>
  );
};

export default Carousel;
