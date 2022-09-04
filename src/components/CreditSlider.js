import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import 'swiper/scss';
import { Link } from 'react-router-dom';

SwiperCore.use([Navigation]);

const CreditSlider = ({ credits }) => {
  if (credits.length === 0) return; // don't return anything
  else if (credits.length < 8) {
    return (
      <div className='credit_list'>
        <h4 className='credit_title my-4'>Cast</h4>
        <div className='credit_scrollable_list'>
          {credits.map((credit) => {
            return credit.profile_path ? (
              <Link to={`/people/${credit.id}`} className='credit_headshot'>
                <img
                  src={`https://image.tmdb.org/t/p/w200${credit.profile_path}`}
                  alt={credit.name}
                />
                <p className='credit_name mt-3'>{credit.name}</p>
              </Link>
            ) : null;
          })}
        </div>
      </div>
    );
  }

  //just want top twenty and no null values
  const cast = credits.filter((credit, index) => {
    return credit.profile_path !== null && index < 20;
  });

  return (
    <div className='credit_slider slider'>
      <h4 className='credit_title my-4'>Cast</h4>
      <Swiper
        breakpoints={{
          320: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          480: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          820: {
            slidesPerView: 6,
            spaceBetween: 20,
          },
          1200: {
            slidesPerView: 8,
            spaceBetween: 20,
          },
        }}
        scrollbar={{ draggable: true }}
        navigation
        loop
      >
        {cast.map((credit) => {
          return (
            <SwiperSlide key={credit.id}>
              <Link to={`/people/${credit.id}`} className='credit_headshot'>
                <img
                  src={`https://image.tmdb.org/t/p/w200${credit.profile_path}`}
                  alt={credit.name}
                />
                <p className='credit_name mt-3'>{credit.name}</p>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default CreditSlider;
