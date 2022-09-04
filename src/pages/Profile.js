import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import { Button, Dropdown } from 'react-bootstrap';
import Loader from '../components/Loader';
import '../styles/Profile.scss';
import { Link } from 'react-router-dom';
import { formatDate } from '../helpers';

const Profile = () => {
  const auth = useContext(AuthContext);
  const [selection, setSelection] = useState('Favourite Movies');
  const [mediaList, setMediaList] = useState();
  const [mediaType, setMediaType] = useState('movie');
  const [loading, setLoading] = useState(true);
  const [listLoading, setListLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log(auth);
    getFavouriteMovies();
  }, []);

  const getFavouriteMovies = async () => {
    setListLoading(true);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/account/${auth.accountId}/favorite/movies?api_key=2a5e286bb1bdc7c0bf49d7b6d0707880&session_id=${auth.sessionId}&language=en-US&sort_by=created_at.asc&page=1`
      );

      const favouriteMovies = await response.json();

      console.log(favouriteMovies);
      setMediaList(favouriteMovies.results);
      setLoading(false);
      setListLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const getFavouriteTV = async () => {
    setListLoading(true);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/account/${auth.accountId}/favorite/tv?api_key=2a5e286bb1bdc7c0bf49d7b6d0707880&session_id=${auth.sessionId}&language=en-US&sort_by=created_at.asc&page=1`
      );

      const favouriteTV = await response.json();

      console.log(favouriteTV);
      setMediaList(favouriteTV.results);
      setListLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const getMovieWatchlist = async () => {
    setListLoading(true);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/account/${auth.accountId}/watchlist/movies?api_key=2a5e286bb1bdc7c0bf49d7b6d0707880&session_id=${auth.sessionId}&language=en-US&sort_by=created_at.asc&page=1`
      );

      const movieWatchlist = await response.json();

      console.log(movieWatchlist);
      setMediaList(movieWatchlist.results);
      setListLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const getTVWatchlist = async () => {
    setListLoading(true);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/account/${auth.accountId}/watchlist/tv?api_key=2a5e286bb1bdc7c0bf49d7b6d0707880&session_id=${auth.sessionId}&language=en-US&sort_by=created_at.asc&page=1`
      );

      const tvWatchlist = await response.json();

      console.log(tvWatchlist);
      setMediaList(tvWatchlist.results);
      setListLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <h1>Error!</h1>;
  }

  return (
    <main>
      <section className='container mt-5'>
        <div className='row'>
          <div className='col-md-12'>
            <header className='mt-5'>
              <h3>Hi {auth.username}</h3>
              <div className='profile-menu btn-menu'>
                <Button
                  onClick={() => {
                    getFavouriteTV(),
                      setMediaType('tv'),
                      setSelection('Favourite TV');
                  }}
                  className='m-2'
                  variant='outline-danger'
                >
                  Favourite TV
                </Button>
                <Button
                  onClick={() => {
                    getFavouriteMovies(),
                      setMediaType('movie'),
                      setSelection('Favourite Movies');
                  }}
                  className='m-2'
                  variant='outline-danger'
                >
                  Favourite Movies
                </Button>
                <Button
                  onClick={() => {
                    getMovieWatchlist(),
                      setMediaType('movie'),
                      setSelection('Movie Watchlist');
                  }}
                  className='m-2'
                  variant='outline-danger'
                >
                  Movie Watchlist
                </Button>
                <Button
                  onClick={() => {
                    getTVWatchlist(),
                      setMediaType('tv'),
                      setSelection('TV Watchlist');
                  }}
                  className='m-2'
                  variant='outline-danger'
                >
                  TV Watchlist
                </Button>
              </div>

              <Dropdown className='profile-menu select-menu'>
                <Dropdown.Toggle
                  variant='danger'
                  className=''
                  id='dropdown-basic'
                >
                  Select an option
                </Dropdown.Toggle>

                <Dropdown.Menu className=''>
                  <Button className='m-2' variant='outline-danger'>
                    Favourite TV
                  </Button>
                  <Button className='m-2' variant='outline-danger'>
                    Favourite Movies
                  </Button>
                  <Button className='m-2' variant='outline-danger'>
                    Movie Watchlist
                  </Button>
                  <Button className='m-2' variant='outline-danger'>
                    TV Watchlist
                  </Button>
                </Dropdown.Menu>
              </Dropdown>
            </header>
          </div>
        </div>

        <div className='row'>
          <h3 className='my-3'>{selection}</h3>
          <div className='profile_list d-flex flex-wrap'>
            {listLoading ? (
              <h1>LOADING</h1>
            ) : mediaList.length > 0 ? (
              mediaList.map((mediaItem) => {
                return (
                  <Link
                    className='profile_list_card d-block'
                    to={`/${mediaType}/${mediaItem.id}`}
                    key={mediaItem.id}
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w200${mediaItem.poster_path}`}
                    />
                    <p className='vote_average m-0'>
                      {((mediaItem.vote_average / 10) * 100).toFixed(0)}
                      <span className='vote_average_percentage'>%</span>
                    </p>
                    <p>
                      {mediaType === 'movie'
                        ? formatDate(mediaItem.release_date)
                        : formatDate(mediaItem.first_air_date)}
                    </p>
                  </Link>
                );
              })
            ) : (
              <h4>Nothing to see here</h4>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Profile;
