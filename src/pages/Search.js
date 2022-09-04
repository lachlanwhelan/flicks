import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import Button from 'react-bootstrap/Button';
import Loader from '../components/Loader';
import '../styles/Search.scss';
import { Link } from 'react-router-dom';
import ImageNotFound from '../ImageNotFound.svg';
import { formatDate, truncate } from '../helpers';
import ErrorPage from './ErrorPage';

const SearchRow = ({searchOption, searchResults}) => {

    if(searchOption === 'movies')
    {
        return(
            <div>
                <h3>Movies</h3>
                {
                    searchResults[0].results.map(searchItem => {
                        
                        return(
                            <Link to={`/${searchOption}/${searchItem.id}`} className='search_item_row d-flex align-items-center my-4' key={searchItem.id}>
                                <div className='search_item_img me-3'>
                                    <img src={searchItem.poster_path ? `https://image.tmdb.org/t/p/w200${searchItem.poster_path}` : ImageNotFound}/>
                                </div>
                                <div className='search_item_info p-2'> 
                                    <h6>{searchItem.title}</h6>
                                    <p>{formatDate(searchItem.release_date)}</p>
                                    <p>{truncate(searchItem.overview)}</p>
                                </div>
                            </Link>
                        )
                    })
                }
            </div>
        )
    }
    else if(searchOption === 'tv'){
        return(
            <div>
                 <h3>TV Shows</h3>
                 {
                    searchResults[1].results.map(searchItem => {
                        
                        return(
                            <Link to={`/${searchOption}/${searchItem.id}`} className='search_item_row d-flex align-items-center my-4' key={searchItem.id}>
                                <div className='search_item_img me-3'>
                                <img src={searchItem.poster_path ? `https://image.tmdb.org/t/p/w200${searchItem.poster_path}` : ImageNotFound}/>
                                </div>
                                <div className='search_item_info p-2'> 
                                    <h6>{searchItem.name}</h6>
                                    <p>{formatDate(searchItem.first_air_date)}</p>
                                    <p>{truncate(searchItem.overview)}</p>
                                </div>
                            </Link>
                        )
                    })
                }
            </div> 
            )
    }

    return(
        <div>
        <h3>People</h3>
        {
           searchResults[2].results.map(searchItem => {
               
               return(
                   <Link to={`/${searchOption}/${searchItem.id}`} className='search_item_row d-flex align-items-center my-4' key={searchItem.id}>
                       <div className='search_item_img me-3'>
                        <img src={searchItem.profile_path ? `https://image.tmdb.org/t/p/w200${searchItem.profile_path}` : ImageNotFound}/>
                       </div>
                       <div className='search_item_info p-2'> 
                           <h6>{searchItem.name}</h6>
                           <p>{searchItem.first_air_date}</p>
                           <p>Known for {searchItem.known_for_department}</p>
                       </div>
                   </Link>
               )
           })
       }
   </div> 
    )
}

const Search = () => {
    const location = useLocation();
    const [searchResults, setSearchResult] = useState(null);
    const [searchOption, setSearchOption] = useState('movies');
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getSearchResults();
        window.scrollTo(0,0);
    },[location]);


    const getSearchResults = async () => {

        try{
            const responses = await Promise.all([
                fetch(`https://api.themoviedb.org/3/search/movie?api_key=2a5e286bb1bdc7c0bf49d7b6d0707880&language=en-US&query=${location.search.split('=')[1]}&page=1`),
                fetch(`https://api.themoviedb.org/3/search/tv?api_key=2a5e286bb1bdc7c0bf49d7b6d0707880&language=en-US&query=${location.search.split('=')[1]}&page=1`),
                fetch(`https://api.themoviedb.org/3/search/person?api_key=2a5e286bb1bdc7c0bf49d7b6d0707880&language=en-US&query=${location.search.split('=')[1]}&page=1`)
            ])

            const data = await Promise.all(responses.map(response => {
                if(response.ok){
                    return response.json();
                }

                throw response;
            }));
            
            setSearchResult(data);
            setLoading(false);
        }
        catch(err){
            console.log(err);
            setError(err);
            setLoading(false);
        }
    }

    if(loading){
        return <Loader/>
    }

    if(error){
        return <ErrorPage/>
    }
    

    return(
        <main>
            <section className='container search_section'>
                <div className='row'>
                   
                    {/*  <Link to='/' className='mx-auto d-block'><Button variant="outline-danger" size='lg'>Flicks Home</Button></Link> */}
                    <div className='col-md-3'>
                        <div className='search_result_options'>
                            <h4 className='mb-0'>Search Results</h4>
                            <Button variant='light' className='d-block w-100 rounded-0' onClick={() => setSearchOption('movies')}>Movies <span className='d-inline-block ms-2'>{searchResults[0].total_pages}</span></Button>
                            <Button variant='light' className='d-block w-100 rounded-0' onClick={() => setSearchOption('tv')}>TV Shows <span className='d-inline-block ms-2'>{searchResults[1].total_pages}</span></Button>
                            <Button variant='light' className='d-block w-100 rounded-0' onClick={() => setSearchOption('people')}>People <span className='d-inline-block ms-2'>{searchResults[2].total_pages}</span></Button>
                        </div>
                    </div>
                    <div className='col-md-9'>
                        <SearchRow searchOption={searchOption} searchResults={searchResults}/>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Search;