import React from 'react';
import Fade from 'react-reveal/Fade';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay } from 'swiper';
import 'swiper/scss';
import '../styles/Carousel.scss';
import { Link } from 'react-router-dom';
import GenreRow from './GenreRow';
import { truncate, formatDate } from '../helpers';

SwiperCore.use([Autoplay]);

const CarouselInfo = ({ mediaType, media, genres }) => {
  formatDate(media.release_date);

  if (mediaType === 'movie') {
    return (
      <div className='carousel_info_group'>
        <h5 className='carouse_release_date'>
          {formatDate(media.release_date)}
        </h5>
        <h1 className='carousel_title display-4'>{media.title}</h1>
        <h5 className='carousel_genres'>
          <GenreRow media={media} genres={genres} />
        </h5>
        <p className='carousel_overview'>{truncate(media.overview)}</p>
      </div>
    );
  }

  return (
    <div className='carousel_info_group'>
      <h5 className='carouse_release_date'>
        {new Date(media.first_air_date).toLocaleDateString()}
      </h5>
      <h1 className='carousel_title display-4'>{media.name}</h1>
      <h5 className='carousel_genres'>
        <GenreRow media={media} genres={genres} />
      </h5>
      <p className='carousel_overview'>{truncate(media.overview)}</p>
    </div>
  );
};

const Carousel = ({ slides, genres, mediaType }) => {
  return (
    <Swiper className='carousel' loop autoplay={true} navigation={false}>
      <Fade>
        {slides.map((slide) => {
          return (
            <SwiperSlide
              className='carousel_slide'
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${slide.backdrop_path})`,
              }}
              key={slide.id}
            >
              <Link
                className='carousel_slide_overlay'
                to={`/${mediaType}/${slide.id}`}
              >
                <CarouselInfo
                  mediaType={mediaType}
                  media={slide}
                  genres={genres}
                />
              </Link>
            </SwiperSlide>
          );
        })}
      </Fade>
    </Swiper>
  );
};

export default Carousel;
