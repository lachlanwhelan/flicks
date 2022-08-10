import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Loader from '../../components/Loader';

const OnTheAir = () => {
    const [page, setPage] = useState(1);
    const [media, setMedia] = useState(null);
    const [genres, setGenres] = useState(null);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getOnTheAirTV();
    },[page]);

    const getOnTheAirTV = async () => {
        try{
            const responses = await Promise.all([
                fetch(`https://api.themoviedb.org/3/tv/on_the_air?api_key=2a5e286bb1bdc7c0bf49d7b6d0707880&language=en-US&page=${page}`),
                fetch('https://api.themoviedb.org/3/genre/tv/list?api_key=2a5e286bb1bdc7c0bf49d7b6d0707880&language=en-US')
            ]);

            const tv_data = await Promise.all(responses.map(response => {
                if(response.ok){
                    return response.json()
                }
                throw response;
            }));

            /*
                  if(selectedGenre !== null){
                const filteredMovies = movie_data[0].results.filter(movie => {  

                    return movie.genre_ids.includes(selectedGenre);
                    
                    //return movie.genre_ids.filter(id => id === selectedGenre);
                })

                console.log(filteredMovies);

                setMedia(filteredMovies);

            }else{
                setMedia(prevState => {
                    if(prevState === null){
                        return movie_data[0].results;
                    }
                    //appending new movie array to current array
                    return [...prevState, ...movie_data[0].results];
                });
            }
            */

            setMedia(prevState => {
                if(prevState === null){
                    return tv_data[0].results;
                }
                //appending new movie array to current array
                return [...prevState, ...tv_data[0].results];
            });
            
            setGenres(tv_data[1].genres);
            setLoading(false);
        }
        catch(err){
            setError(err);
        }
    }

    const setPageNumber = () => {
        setPage(prevState => prevState + 1);
    }

    if(loading){
        return <Loader/>
    }

    if(error){
        return <h1>Error!</h1>
    }

    return(
        <main>
            <section className='container mt-5'>
           <div className='row'>
             <div className='col-md-3'>
            <h4 className='mb-4'>On the Air</h4>
            <p className='m-0'>Filter by genre</p>
            <div className='genres_filter_group d-flex align-items-center'>
                {
                    genres.map(genre => {
                        return <Button className='genre_filter_btn d-block m-2' onClick={() => setSelectedGenre(genre.id)} variant='outline-danger' key={genre.id}>{genre.name}</Button>
                    })
                }
            </div>

            </div>
                <div className='col-md-9'>
                    <div className='media_list d-flex flex-wrap justify-content-around align-items-center'>
                        {
                            media.map(mediaItem => {
                                console.log(mediaItem.id);
                                return(
                                    <Link className='media_list_item' to={`/movies/${mediaItem.id}`} key={mediaItem.id}>
                                        <img src={`https://image.tmdb.org/t/p/w200${mediaItem.poster_path}`}/>
                                    </Link>
                                )
                            })
                        }
                    </div>

                    <Button className='load_more_btn d-block mx-auto mt-3' onClick={setPageNumber} variant='outline-danger' size='lg'>Load more</Button>
                </div>
           </div>
               
            </section>
        </main>
    )
}

export default OnTheAir;