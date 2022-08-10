import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import Button from 'react-bootstrap/Button';
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';

const Search = () => {
    const location = useLocation();
    const [searchResults, setSearchResult] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getSearchResults();
    },[]);


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
        return <h1>Error!</h1>
    }
    

    console.log(searchResults);
    return(
        <main>
            <section className='container'>
                <div className='row'>
                    <h1 className='text-center my-4'>Nothing to see yet</h1>
                    <Link to='/' className='mx-auto d-block'><Button variant="outline-danger" size='lg'>Flicks Home</Button></Link>   
                    <div className='col-md-3'>

                    </div>
                    <div className='col-md-9'>

                    </div>
                </div>
            </section>
        </main>
    )
}

export default Search;