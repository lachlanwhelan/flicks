import React from 'react';
import { Link } from 'react-router-dom';
import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Fade from 'react-reveal/Fade';
import 'swiper/scss';
import '../styles/Slider.scss';
import UserActionMenu from './UserActionMenu';

SwiperCore.use([Navigation]);

const MediaSlider = ({ media, categoryTitle, mediaType, lessSlides }) => {
  return (
    <section className='slider'>
      <Fade>
        <h4 className='slider_title my-4'>{categoryTitle}</h4>
      </Fade>
      <Fade>
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
            1200: lessSlides
              ? {
                  slidesPerView: 6,
                  spaceBetween: 20,
                }
              : {
                  slidesPerView: 8,
                  spaceBetween: 20,
                },
          }}
          scrollbar={{ draggable: true }}
          navigation
          loop
        >
          {media.map((mediaItem) => {
            if (mediaItem.poster_path === null) return;

            return (
              <SwiperSlide className='media_slider' key={mediaItem.id}>
                <Link
                  className='media_slider_link'
                  to={`/${mediaType}/${mediaItem.id}`}
                >
                  <img
                    className='media_slider_poster slide'
                    src={`https://image.tmdb.org/t/p/w200${mediaItem.poster_path}`}
                    alt={mediaItem.title}
                  />
                </Link>
                <p className='vote_average m-0'>
                  {((mediaItem.vote_average / 10) * 100).toFixed(0)}
                  <span className='vote_average_percentage'>%</span>
                </p>
                <p className='media_slider_title m-0'>
                  {mediaType === 'movie' ? mediaItem.title : mediaItem.name}
                </p>
                {/* <p className='media_date m-0'>{new Date(mediaItem.release_date).toLocaleDateString()}</p>*/}
                <UserActionMenu mediaType={mediaType} mediaId={mediaItem.id} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Fade>
    </section>
  );
};

export default MediaSlider;
