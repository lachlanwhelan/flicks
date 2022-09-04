import React from 'react';
import { Link } from 'react-router-dom';
import tmdb from '../tmdb_logo2.svg';

const Footer = () => {
    return(
        <footer className='footer py-5 mt-5'>
           <section className='container'>  
           <div className='row justify-content-center'>
                <div className='col-md-3'>
                    <a className='tmdb_logo' href='https://www.themoviedb.org/documentation/api'><img src={tmdb} alt='The movie database logo'/></a>
                </div>
                <div className='col-md-2 footer_col_title'>
                  <h4 className=''>Movies</h4>
                  <Link to='/movie'>Popular</Link>
                  <Link to='/movie/now-playing'>Now Playing</Link>
                  <Link to='/movie/upcoming'>Upcoming</Link>
                  <Link to='/movie/top-rated'>Top Rated</Link>  
                </div>

                <div className='col-md-2 footer_col_title'>
                <h4>TV</h4>
                  <Link to='/tv'>Popular</Link>
                  <Link to='/tv/airing-today'>Airing today</Link>
                  <Link to='/tv/on-the-air'>On the air</Link>
                  <Link to='/tv/top-rated'>Top Rated</Link>  
                </div>

                <div className='col-md-2 footer_col_title'>
                <h4>People</h4>
                  <Link to='/people'>Popular People</Link> 
                </div>
           </div>                
           </section>
        </footer>
    )
}

export default Footer;