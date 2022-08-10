import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Loader from '../components/Loader';
import '../styles/NotFound.scss';


const NotFound = () => {
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getRandomMovie = async () => {
            
            try{
                const response = await fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=2a5e286bb1bdc7c0bf49d7b6d0707880&language=en-US&page=1');

                const movie_data = await response.json();
                
                const random_movie = movie_data.results[Math.floor(Math.random() * 20)];

                console.log(random_movie);
                setMovie(random_movie);
                setLoading(false);
            }
            catch(err){
                console.log(err);
                setError(err);
            }

            
        }
        getRandomMovie();
    },[]);

    
    if(loading){
        return <Loader/>
    }

    if(error){
        return <h1>Error!</h1>
    }

    return(
        <main className='not_found_page' style={{backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`, backgroundPosition: 'center', backgroundSize: 'cover'}}>
            <section className='not_found_overlay'>
                 <div className='not_found_group'>
                    <h1 className='not_found_title'>Lost your way?</h1>
                    <p className='not_found_text'>Sorry but we can't find that page. You'll find heaps to explore on the home page</p>
                    <Link to='/'><Button variant="light" size='lg'>Flicks Home</Button></Link>        
                 </div>
                 <p className='not_found_from'>From {movie.title}</p>
            </section> 
        </main>
    )
}




export default NotFound;