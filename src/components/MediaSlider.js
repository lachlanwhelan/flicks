import React from 'react';
import {Link} from 'react-router-dom';
import SwiperCore, {Navigation} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Fade from 'react-reveal/Fade';
import 'swiper/scss';


SwiperCore.use([Navigation]);


const MediaSlider = ({media, categoryTitle, mediaType}) => {
    
    return(
        <section className='row_slider slider'>
            <Fade><h4 className='row_slider_title my-4'>{categoryTitle}</h4></Fade>
            <Fade>
            <Swiper
            breakpoints={{
                    320:{
                        slidesPerView:2,
                        spaceBetween: 10
                    },
                    480:{
                        slidesPerView:3,
                        spaceBetween: 10
                    },
                    640:{
                        slidesPerView:4,
                        spaceBetween: 20
                    },
                    820:{
                        slidesPerView: 6,
                        spaceBetween: 20
                    },
                    1200:{
                        slidesPerView: 8,
                        spaceBetween: 20
                    }
            }}
            scrollbar={{ draggable: true }}
            navigation
            loop      
            >
            {
                media.map(mediaItem => {
                    return(
                        <SwiperSlide key={mediaItem.id}>
                            <Link className='media_link' to={`/${mediaType.toLowerCase()}/${mediaItem.id}`}>
                                <img className="row_slider_card_poster slide" src={`https://image.tmdb.org/t/p/w200${mediaItem.poster_path}`} alt={mediaItem.title}/>
                            </Link>
                            <p className='vote_average m-0'>{(mediaItem.vote_average / 10 * 100).toFixed(0)}<span className='vote_average_percentage'>%</span></p>
                            <p className='media_title m-0'>{mediaType === 'MOVIES' ? mediaItem.title : mediaItem.name}</p>
                           {/* <p className='media_date m-0'>{new Date(mediaItem.release_date).toLocaleDateString()}</p>*/}
                        </SwiperSlide>
                    )
                })
            }
            </Swiper>
            </Fade>
        </section>
    )
}

export default MediaSlider;