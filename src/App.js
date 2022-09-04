import React, { useEffect, useState } from 'react';
import Layout from './components/Layout';
import {Routes, Route, useSearchParams, useNavigate, Navigate} from 'react-router-dom';
import Home from './pages/Home';
import Movie from './pages/Movie/Movie';
import Show from './pages/TV/Show';
import NotFound from './pages/NotFound';
import People from './pages/People/People';
import Search from './pages/Search';
import CategoryPage from './pages/CategoryPage';
import Person from './pages/People/Person';
import Profile from './pages/Profile';
import './styles/Resets.scss';
import './styles/Shared.scss';
import { AuthProvider } from './AuthContext';
import ErrorBoundary from './ErrorBoundary';



const ProtectedRoute = ({children, isAuthenticated}) => {
   if(!isAuthenticated){
    return <Navigate to='/'/>
   }

   return children;
}


const App = () => {
    let navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [signInError, setSignInError] = useState(null);
    const [user, setUser] = useState({
        isAuthenticated: false,
        username: '',
        sessionId: null,
        accountId: null
    })

    const signInUser = async () => {
       try{
            const response = await fetch('https://api.themoviedb.org/3/authentication/token/new?api_key=2a5e286bb1bdc7c0bf49d7b6d0707880');
        
            if(!response.ok) throw response;

            const token = await response.json();

            window.location.replace(`https://www.themoviedb.org/authenticate/${token.request_token}?redirect_to=https://lachlanwhelan.github.io/flicks/`);
        }
        catch(err){
            console.log(err);
            setSignInError(err);
        }

    }

    const signOutUser = async () => {
        try{
            const response = await fetch(`https://api.themoviedb.org/3/authentication/session?api_key=2a5e286bb1bdc7c0bf49d7b6d0707880`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({session_id: user.sessionId})
            });
    
            const data = await response.json();

            if(data.success){
                setUser(prevState => {
                    return {
                        ...prevState,
                        isAuthenticated: false,
                        username: '',
                        accountId: null,
                        sessionId: null,
                    }
                })
                localStorage.removeItem('user_session');
                navigate('/', {replace: true});
            }
        }
        catch(err){
            console.log(err);
        }
    }

    const createSession = async (token) => {
        
        const response = await fetch(`https://api.themoviedb.org/3/authentication/session/new?api_key=2a5e286bb1bdc7c0bf49d7b6d0707880`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({request_token: token})
        });

        const data = await response.json();
        
        const account_response = await fetch(`https://api.themoviedb.org/3/account?api_key=2a5e286bb1bdc7c0bf49d7b6d0707880&session_id=${data.session_id}`);
        
        const details = await account_response.json();

        //using local storage to persist user session
        localStorage.setItem('user_session', JSON.stringify({
            isAuthenticated: true,
            username: details.username,
            accountId: details.id,
            sessionId: data.session_id,
        }));


        setUser(prevState => {
            return {
                ...prevState,
                isAuthenticated: true,
                username: details.username,
                accountId: details.id,
                sessionId: data.session_id,
            }
        })
    }
    

 /*   const updateAuth = (session, id, isAuth) => {
        setSession(session);
        setAccountId(id);
        setIsAuthenticated(isAuth);
    }
*/ 

    useEffect(() => {
        const user_session = JSON.parse(localStorage.getItem('user_session'));

        if(user_session !== null){           
           setUser(prevState => {
            return {
                ...prevState,
                isAuthenticated: true,
                username: user_session.username,
                accountId: user_session.accountId,
                sessionId: user_session.sessionId,
            }
           })
        }else{
            const token = searchParams.get('request_token'); // this gets the token from the query string

            if(token !== null){  
                createSession(token);
                window.history.replaceState(null, "New Page Title", "/") //removes query params from url without reloading
            }
        }
    }, []);


    return(
        <AuthProvider auth={user}>
            <Layout signInUser={signInUser} signOutUser={signOutUser}>
            <ErrorBoundary>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='movie'>
                        <Route index element={<CategoryPage mediaType='movie' category='popular'/>}/>
                        <Route path='now-playing' element={<CategoryPage mediaType='movie' category='now_playing'/>}/>
                        <Route path='upcoming' element={<CategoryPage mediaType='movie' category='upcoming'/>}/>
                        <Route path='top-rated' element={<CategoryPage mediaType='movie' category='top_rated'/>}/>
                        <Route path=':movie_id' element={<Movie/>}/>
                    </Route>
                    <Route path='tv'>
                        <Route index element={<CategoryPage mediaType='tv' category='popular'/>}/>
                        <Route path='airing-today' element={<CategoryPage mediaType='tv' category='airing_today'/>}/>
                        <Route path='top-rated' element={<CategoryPage mediaType='tv' category='top_rated'/>}/>
                        <Route path='on-the-air' element={<CategoryPage mediaType='tv' category='on_the_air'/>}/>
                        <Route path=':show_id' element={<Show/>}/>
                    </Route>
                    <Route path='people'>
                        <Route index element={<People/>} />
                        <Route path=':person_id' element={<Person/>} />
                    </Route>
                    <Route path='search' element={<Search/>}/>
                    <Route path='profile' element={<ProtectedRoute isAuthenticated={user.isAuthenticated}><Profile/></ProtectedRoute>}/>
                    <Route path='*' element={<NotFound/>}/>
                </Routes>
                </ErrorBoundary>
            </Layout>
       </AuthProvider>
    )
};


export default App;