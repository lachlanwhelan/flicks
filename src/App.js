import React from 'react';
import Layout from './components/Layout';
import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Movie from './pages/Movie/Movie';
import Show from './pages/TV/Show';
import './styles/Resets.scss';
import './styles/Shared.scss';
import Popular from './pages/Movie/Popular';
import NowPlaying from './pages/Movie/NowPlaying';
import Upcoming from './pages/Movie/Upcoming';
import TopRated from './pages/Movie/TopRated';
import PopularTV from './pages/TV/Popular';
import AiringToday from './pages/TV/AiringToday';
import TopRatedTV from './pages/TV/TopRated';
import OnTheAir from './pages/TV/OnTheAir';
import NotFound from './pages/NotFound';
import People from './pages/People/People';
import Search from './pages/Search';

//2a5e286bb1bdc7c0bf49d7b6d0707880

const App = () => {
    return(
       <Layout>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='movies'>
                    <Route index element={<Popular/>}/>
                    <Route path='now-playing' element={<NowPlaying/>}/>
                    <Route path='upcoming' element={<Upcoming/>}/>
                    <Route path='top-rated' element={<TopRated/>}/>
                    <Route path=':movie_id' element={<Movie/>}/>
                </Route>
                <Route path='tv'>
                    <Route index element={<PopularTV/>}/>
                    <Route path='airing-today' element={<AiringToday/>}/>
                    <Route path='top-rated' element={<TopRatedTV/>}/>
                    <Route path='on-the-air' element={<OnTheAir/>}/>
                    <Route path=':show_id' element={<Show/>}/>
                </Route>
                <Route path='people' element={<People/>}/>
                <Route path='search' element={<Search/>}/>
                <Route path='*' element={<NotFound/>}/>
            </Routes>
       </Layout>
    )
};


export default App;