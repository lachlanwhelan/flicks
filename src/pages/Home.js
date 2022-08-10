import React, { useEffect, useState } from 'react';
import Carousel from '../components/Carousel';
import MediaSlider from '../components/MediaSlider';
import Loader from '../components/Loader';
import { Button } from 'react-bootstrap';

const Home = () => {
    const [mediaType, setMediaType] = useState('MOVIES');
    const [media, setMedia] = useState(null);
    const [genres, setGenres] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        setLoading(true);
        
        if(mediaType === 'MOVIES'){
            getAllMovies();
        }else{
            getAllTV();
        }

    }, [mediaType]);


    const getAllMovies = async () => {
    
        try{
            const responses = await Promise.all([
                fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=2a5e286bb1bdc7c0bf49d7b6d0707880&language=en-US&page=1'),
                fetch('https://api.themoviedb.org/3/movie/popular?api_key=2a5e286bb1bdc7c0bf49d7b6d0707880&language=en-US&page=1'),
                fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=2a5e286bb1bdc7c0bf49d7b6d0707880&language=en-US&page=1'),
                fetch('https://api.themoviedb.org/3/movie/upcoming?api_key=2a5e286bb1bdc7c0bf49d7b6d0707880&language=en-US&page=1'),
                fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=2a5e286bb1bdc7c0bf49d7b6d0707880&language=en-US')
            ]);
    
            const movie_data = await Promise.all(responses.map(response => {
                if(response.ok){
                    return response.json()
                }
                throw response;
            }));
    
            const genres = movie_data.pop();

            setGenres(genres.genres);
            setMedia(movie_data);

            setLoading(false);
    
        }catch(err){
            console.log(err);
            setError(err);
        }
    }
    

    const getAllTV = async () => {

        try{
            const responses = await Promise.all([
                fetch('https://api.themoviedb.org/3/tv/airing_today?api_key=2a5e286bb1bdc7c0bf49d7b6d0707880&language=en-US&page=1'),
                fetch('https://api.themoviedb.org/3/tv/popular?api_key=2a5e286bb1bdc7c0bf49d7b6d0707880&language=en-US&page=1'),
                fetch('https://api.themoviedb.org/3/tv/top_rated?api_key=2a5e286bb1bdc7c0bf49d7b6d0707880&language=en-US&page=1'),
                fetch('https://api.themoviedb.org/3/tv/on_the_air?api_key=2a5e286bb1bdc7c0bf49d7b6d0707880&language=en-US&page=1'),
                fetch('https://api.themoviedb.org/3/genre/tv/list?api_key=2a5e286bb1bdc7c0bf49d7b6d0707880&language=en-US')
            ]);
    
            const tv_data = await Promise.all(responses.map(response => {
                if(response.ok){
                    return response.json();
                }

                throw response;
            }));

            const genres = tv_data.pop();
    
            //console.log(genres);
            //setGenres(genres);
            setMedia(tv_data);
            setLoading(false);
    
        }catch(err){
            console.log(err);
            setLoading(false);
            setError(err);
        }
    }


    if(loading){
        return <Loader/>
    }

    if(error){
        return <h1>Error!</h1>
    }
    
    return(
        <main>
            <Carousel slides={media[3].results} genres={genres} mediaType={mediaType}/>
        
            <div className='my-1 d-flex justify-content-center'>
                <Button className='flicks_btn text-white' variant='outline-danger' size='lg' onClick={() => setMediaType('MOVIES')}>Movies</Button>
                <Button className='flicks_btn text-white' variant='outline-danger' size='lg' onClick={() => setMediaType('TV')}>TV</Button>
            </div>
            
            <section className='container'>
            {
                mediaType === "MOVIES" ?
                    <>
                        <MediaSlider media={media[0].results} categoryTitle='Now Playing' mediaType={mediaType}/>
                        <MediaSlider media={media[1].results} categoryTitle='Popular' mediaType={mediaType}/>
                        <MediaSlider media={media[2].results} categoryTitle='Top Rated' mediaType={mediaType}/>
                        <MediaSlider media={media[3].results} categoryTitle='Up Coming' mediaType={mediaType}/>
                    </>
                    :
                   <>
                        <MediaSlider media={media[0].results} categoryTitle='Airing Today' mediaType={mediaType}/>
                        <MediaSlider media={media[2].results} categoryTitle='Popular' mediaType={mediaType}/>
                        <MediaSlider media={media[3].results} categoryTitle='Top Rated' mediaType={mediaType}/>
                        <MediaSlider media={media[1].results} categoryTitle='On the Air' mediaType={mediaType}/>
                   </>
            }
            </section>

        </main>
    )
}

export default Home;