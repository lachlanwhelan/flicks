import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Loader from '../components/Loader';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import '../styles/CategoryPage.scss';
import { formatDate } from '../helpers';
import UserActionMenu from '../components/UserActionMenu';
import ErrorPage from './ErrorPage';

//custom hook - https://stackoverflow.com/questions/53446020/how-to-compare-oldvalues-and-newvalues-on-react-hooks-useeffect/57706747#57706747
const usePrevious = (value) => {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
};

const CategoryPage = (props) => {
  const { mediaType, category } = props;
  const prevProps = usePrevious({ mediaType, category });
  const location = useLocation();

  const [page, setPage] = useState(1);
  const [media, setMedia] = useState(null);
  const [genres, setGenres] = useState(null);
  const [sortOption, setSortOption] = useState(1);
  const [genreFilters, setGenreFilters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /*
    useEffect(() => {
        setLoading(true)
        if(typeof prevProps !== 'undefined' && prevProps.category !== category){   
            clearState();
            getCategory();
        }else{
            getCategory();
        }
    },[page, props]); 
  */ //if page number or props updates rerender component

  useEffect(() => {
    console.log(page);

    if (typeof prevProps !== 'undefined') {
      if (
        prevProps.category !== category ||
        prevProps.mediaType !== mediaType
      ) {
        clearState();
      }
    }

    getCategory();
  }, [page, location]);

  const getCategory = async () => {
    try {
      const responses = await Promise.all([
        fetch(
          `https://api.themoviedb.org/3/${mediaType}/${category}?api_key=2a5e286bb1bdc7c0bf49d7b6d0707880&language=en-US&page=${page}`
        ),
        fetch(
          `https://api.themoviedb.org/3/genre/${mediaType}/list?api_key=2a5e286bb1bdc7c0bf49d7b6d0707880&language=en-US`
        ),
      ]);

      const data = await Promise.all(
        responses.map((response) => {
          if (response.ok) {
            return response.json();
          }
          throw response;
        })
      );

      setMedia((prevState) => {
        if (prevState === null) {
          return data[0].results;
        } else if (sortOption !== null) {
          return sortAndFilterSearch([...prevState, ...data[0].results]);
        } else {
          //appending new movie array to current array
          return [...prevState, ...data[0].results];
        }
      });

      console.log(data);
      setGenres(data[1].genres);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
      setError(err);
    }
  };

  const clearState = () => {
    setPage(1);
    setMedia(null);
    setGenres(null);
    setLoading(true);
  };

  const setPageNumber = () => {
    setPage((prevState) => prevState + 1);
  };

  const sortAndFilterSearch = (list) => {
    switch (parseInt(sortOption)) {
      case 1:
        list.sort((a, b) => {
          return a.vote_average - b.vote_average;
        });
        break;

      case 2:
        list.sort((a, b) => {
          return b.vote_average - a.vote_average;
        });
        break;

      case 3:
        list.sort((a, b) => {
          if (mediaType === 'movie')
            return new Date(a.release_date) - new Date(b.release_date);

          return new Date(a.first_air_date) - new Date(b.first_air_date);
        });
        break;

      case 4:
        list.sort((a, b) => {
          if (mediaType === 'movie')
            return new Date(b.release_date) - new Date(a.release_date);

          return new Date(b.first_air_date) - new Date(a.first_air_date);
        });
        break;

      case 5:
        list.sort((a, b) => {
          return a.popularity - b.popularity;
        });
        break;

      case 6:
        list.sort((a, b) => {
          return b.popularity - a.popularity;
        });
        break;

      case 7:
        list.sort((a, b) => {
          if (mediaType === 'movie') return a.title.localeCompare(b.title);
          return a.name.localeCompare(b.name);
        });
        break;

      case 8:
        list.sort((a, b) => {
          if (mediaType === 'movie') return b.title.localeCompare(a.title);
          return b.name.localeCompare(a.name);
        });
        break;

      default:
        return list;
    }

    //not sure how to do the filters
    //1. media list
    //2. media listitem > genre ids
    //3. filters list

    return list;
  };

  const handleGenreOnClick = (e) => {
    let genre_id = e.target.value;
    let list = genreFilters;
    let index = list.indexOf(genre_id); // if id is not in array it index of will return -1

    if (index > -1) {
      list.splice(index, 1);
      e.target.classList.remove('selected');
    } else {
      e.target.classList.add('selected');
      setGenreFilters((prevState) => {
        return [...prevState, e.target.value];
      });
    }
  };

  const handleSearchSubmit = () => {
    setMedia(sortAndFilterSearch([...media]));
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorPage />;
  }

  return (
    <main>
      <section className='container categories_section'>
        <div className='row'>
          <div className='col-md-3'>
            <div className='sort_form'>
              <h3 className='mb-4 category_title title_accent'>
                {category.replace(/_/g, ' ')}
              </h3>
              <Accordion defaultActiveKey='0' flush>
                <Accordion.Item eventKey='0'>
                  <Accordion.Header>
                    <b>Sort</b>
                  </Accordion.Header>
                  <Accordion.Body>
                    <label className='mb-2'>Sort results by</label>
                    <Form.Select
                      aria-label='Default select example'
                      value={sortOption}
                      onChange={(e) => {
                        setSortOption(e.target.value);
                        console.log('test');
                      }}
                    >
                      <option value='1'>Rating Ascending</option>
                      <option value='2'>Rating Descending</option>
                      <option value='3'>Release Date Ascending</option>
                      <option value='4'>Release Date Descending</option>
                      <option value='5'>Popularity Ascending</option>
                      <option value='6'>Popularity Descending</option>
                      <option value='7'>Title (A-Z)</option>
                      <option value='8'>Title (Z-A)</option>
                    </Form.Select>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey='1'>
                  <Accordion.Header>
                    <b>Filter</b>
                  </Accordion.Header>
                  <Accordion.Body>
                    <label className='mb-2'>Genres</label>
                    <ul className='genre_list p-0 d-flex flex-wrap'>
                      {genres.map((genre) => {
                        return (
                          <li className='m-1' key={genre.id}>
                            <button
                              className='genre_btn'
                              onClick={handleGenreOnClick}
                              value={genre.id}
                              variant='outline-danger'
                            >
                              {genre.name}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>

              <Button
                onClick={handleSearchSubmit}
                variant='outline-danger w-100 my-2'
                size='lg'
              >
                Search
              </Button>
            </div>
          </div>
          <div className='col-md-9'>
            <div className='category_list d-flex flex-wrap justify-content-around align-items-center'>
              {media.map((mediaItem) => {
                return (
                  <div className='category_list_item'>
                    <Link
                      className=''
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
                    <UserActionMenu
                      mediaType={mediaType}
                      mediaId={mediaItem.id}
                    />
                  </div>
                );
              })}
            </div>

            <Button
              className='load_more_btn d-block mx-auto mt-3'
              onClick={setPageNumber}
              variant='outline-danger'
              size='lg'
            >
              Load more
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CategoryPage;
