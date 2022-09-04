import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../../components/Loader';
import MediaSlider from '../../components/MediaSlider';
import { formatDate } from '../../helpers';
import '../../styles/Person.scss';
import ErrorPage from '../ErrorPage';

const Person = () => {
  const { person_id } = useParams();
  const [person, setPerson] = useState(null);
  const [movieCredits, setMovieCredits] = useState(null);
  const [tvCredits, setTVCredits] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getPersonDetails();
  }, []);

  const getPersonDetails = async () => {
    try {
      const responses = await Promise.all([
        fetch(
          `https://api.themoviedb.org/3/person/${person_id}?api_key=2a5e286bb1bdc7c0bf49d7b6d0707880&language=en-US`
        ),
        fetch(
          `https://api.themoviedb.org/3/person/${person_id}/movie_credits?api_key=2a5e286bb1bdc7c0bf49d7b6d0707880&language=en-US`
        ),
        fetch(
          `https://api.themoviedb.org/3/person/${person_id}/tv_credits?api_key=2a5e286bb1bdc7c0bf49d7b6d0707880&language=en-US`
        ),
      ]);

      const person_details = await Promise.all(
        responses.map((response) => {
          if (!response.ok) throw response;
          return response.json();
        })
      );

      setPerson(person_details[0]);
      setMovieCredits(person_details[1].cast);
      setTVCredits(person_details[2].cast);
      console.log(person_details);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError(err);
      setLoading(false);
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
      <section className='container person_section'>
        <div className='row'>
          <div className='col-md-3'>
            <div className='person_img'>
              <img
                src={`https://image.tmdb.org/t/p/w300${person.profile_path}`}
              />
            </div>
            <h4 className='my-3'>Personal Info</h4>
            <p>
              <b>Known for</b>
              <br /> {person.known_for_department}
            </p>
            <p>
              <b>Gender</b>
              <br /> {person.gender === 1 ? 'Female' : 'Male'}
            </p>
            <p>
              <b>Birthday</b>
              <br /> {formatDate(person.birthday)}
            </p>
            <p>
              <b>Place of birth</b>
              <br /> {person.place_of_birth}
            </p>
          </div>
          <div className='col-md-9'>
            <h3>{person.name}</h3>
            <h4>Biography</h4>
            <p>{person.biography}</p>

            <div className='movie_credits'>
              <MediaSlider
                media={movieCredits}
                mediaType='movie'
                categoryTitle='Movies'
                lessSlides
              />
            </div>
            <div className='tv_credits'>
              <MediaSlider
                media={tvCredits}
                mediaType='tv'
                categoryTitle='TV'
                lessSlides
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Person;
