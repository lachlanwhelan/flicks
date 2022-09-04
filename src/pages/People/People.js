import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import Loader from '../../components/Loader';
import '../../styles/People.scss';
import ErrorPage from '../ErrorPage';

const People = () => {
    const [people, setPeople] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getPeople();
    },[])

    const getPeople = async () => {

        try{
        const response = await fetch('https://api.themoviedb.org/3/person/popular?api_key=2a5e286bb1bdc7c0bf49d7b6d0707880&language=en-US&page=1');

        const data = await response.json();

        if(!response.ok) throw response;

        setPeople(data.results);
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
    

    return (
        <main className=''>
            <section className='container people_section'>
                <h4 className='my-4'>Popular Actors</h4>
                <div className='people_list d-flex flex-wrap '>
                    {
                        people.map(person => {
                            return (
                                <Link to={`/people/${person.id}`} className='person_card m-2'>
                                    <img  src={`https://image.tmdb.org/t/p/w300${person.profile_path}`}/>
                                    <p className='credit_name mt-3'>{person.name}</p>
                                </Link>
                            )
                        })
                    }
                </div>
            </section>
        </main>
    )
}

export default People;