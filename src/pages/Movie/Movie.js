import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import CreditSlider from '../../components/CreditSlider';
import Loader from '../../components/Loader';
import MediaSlider from '../../components/MediaSlider';
import '../../styles/Media.scss';
import MediaVideos from '../../components/MediaVideos';
import { Button } from 'react-bootstrap';
import ErrorPage from '../ErrorPage';

const Movie = () => {
  const { movie_id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [similarMovies, setSimilarMoives] = useState(null);
  const [videos, setVideos] = useState(null);
  const [reviews, setReviews] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getMovieDetails();
    window.scrollTo(0, 0);
  }, [movie_id]); // passing the movie id to re render component. Didn't work by itself for some reason. need to look into this.

  const getMovieDetails = async () => {
    try {
      const responses = await Promise.all([
        fetch(
          `https://api.themoviedb.org/3/movie/${movie_id}?api_key=2a5e286bb1bdc7c0bf49d7b6d0707880&language=en-US`
        ),
        fetch(
          `https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=2a5e286bb1bdc7c0bf49d7b6d0707880&language=en-US`
        ),
        fetch(
          `https://api.themoviedb.org/3/movie/${movie_id}/similar?api_key=2a5e286bb1bdc7c0bf49d7b6d0707880&language=en-US`
        ),
        fetch(
          `https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=2a5e286bb1bdc7c0bf49d7b6d0707880&language=en-US`
        ),
        fetch(
          `https://api.themoviedb.org/3/movie/${movie_id}/reviews?api_key=2a5e286bb1bdc7c0bf49d7b6d0707880&language=en-US&page=1`
        ),
      ]);

      const movie_details = await Promise.all(
        responses.map((response) => {
          if (response.ok) {
            return response.json();
          }
          throw response;
        })
      );

      setMovie(movie_details[0]);
      setCredits(movie_details[1]);
      setSimilarMoives(movie_details[2].results);
      setVideos(movie_details[3].results);
      setReviews(movie_details[4].results);
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
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        <Button
          className='back_btn'
          variant='outline-danger'
          onClick={() => navigate(-1)}
        >
          Go back
        </Button>
        <div className='media_header_overlay d-flex align-items-center'>
          <div className='container'>
            <div className='media_header_poster'>
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              />
            </div>
          </div>
        </div>
      </header>

      <section className='media_info_section container my-5'>
        <h3 className='media_title title_accent  mt-4'>
          {movie.title} ({new Date(movie.release_date).getFullYear()})
        </h3>
        <h6 className='mb-4'>
          {movie.genres.map((genre) => (
            <span className='me-2'>{genre.name}</span>
          ))}
        </h6>
        <p className='media_tagline'>{movie.tagline}</p>

        <div className='media_overview'>
          <h4 className='media_overview_title'>Overview</h4>
          <p className='media_overview_text'>{movie.overview}</p>
        </div>

        <div className='media_reviews'></div>
      </section>

      <section className='container'>
        <MediaVideos videos={videos} />
        <CreditSlider credits={credits.cast} />
        <MediaSlider
          media={similarMovies}
          categoryTitle='You may also like'
          mediaType='movie'
        />
      </section>
    </main>
  );
};

export default Movie;
