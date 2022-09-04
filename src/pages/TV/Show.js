import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import CreditSlider from '../../components/CreditSlider';
import Loader from '../../components/Loader';
import MediaSlider from '../../components/MediaSlider';
import '../../styles/Media.scss';
import MediaVideos from '../../components/MediaVideos';
import { Button } from 'react-bootstrap';
import ErrorPage from '../ErrorPage';

const Show = () => {
  const { show_id } = useParams();
  const navigate = useNavigate();

  const [show, setShow] = useState(null);
  const [credits, setCredits] = useState(null);
  const [similarShows, setSimilarShows] = useState(null);
  const [videos, setVideos] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getMovieDetails();
    window.scrollTo(0, 0);
  }, [show_id]); // passing the movie id to re render component. Didn't work by itself for some reason. need to look into this.

  const getMovieDetails = async () => {
    try {
      const responses = await Promise.all([
        fetch(
          `https://api.themoviedb.org/3/tv/${show_id}?api_key=2a5e286bb1bdc7c0bf49d7b6d0707880&language=en-US`
        ),
        fetch(
          `https://api.themoviedb.org/3/tv/${show_id}/credits?api_key=2a5e286bb1bdc7c0bf49d7b6d0707880&language=en-US`
        ),
        fetch(
          `https://api.themoviedb.org/3/tv/${show_id}/similar?api_key=2a5e286bb1bdc7c0bf49d7b6d0707880&language=en-US`
        ),
        fetch(
          `https://api.themoviedb.org/3/tv/${show_id}/videos?api_key=2a5e286bb1bdc7c0bf49d7b6d0707880&language=en-US`
        ),
      ]);

      const show_details = await Promise.all(
        responses.map((response) => {
          if (response.ok) {
            return response.json();
          }
          throw response;
        })
      );

      console.log(show_details);
      setShow(show_details[0]);
      setCredits(show_details[1]);
      setSimilarShows(show_details[2].results);
      setVideos(show_details[3].results);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorPage />;
  }

  return (
    <main>
      <header
        className='media_header'
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${show.backdrop_path})`,
          backgroundSize: 'cover',
          backgroundPosition: 'left',
        }}
      >
        <div className='media_header_overlay d-flex align-items-center'>
          <div className='container px-4'>
            <div className='media_header_poster'>
              <img src={`https://image.tmdb.org/t/p/w300${show.poster_path}`} />
            </div>
          </div>
        </div>
      </header>

      <section className='media_info_section container my-5'>
        <h3 className='media_title  mt-4'>
          {show.name} ({new Date(show.first_air_date).getFullYear()})
        </h3>
        <h6 className='mb-4'>
          {show.genres.map((genre) => (
            <span className='me-2'>{genre.name}</span>
          ))}
        </h6>
        <p className='media_tagline'>{show.tagline}</p>

        <div className='media_overview'>
          <h4 className='media_overview_title'>Overview</h4>
          <p className='media_overview_text'>{show.overview}</p>
        </div>
      </section>

      <section className='container'>
        <MediaVideos videos={videos} />
        <CreditSlider credits={credits.cast} />
        <MediaSlider
          media={similarShows}
          categoryTitle='You may also like'
          mediaType='tv'
        />
      </section>
    </main>
  );
};

export default Show;
