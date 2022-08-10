

export const getAllMovies = async () => {
    
    try{
        const responses = await Promise.all([
            fetch('https://api.themoviedb.org/3/movie/latest?api_key=2a5e286bb1bdc7c0bf49d7b6d0707880&language=en-US'),
            fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=2a5e286bb1bdc7c0bf49d7b6d0707880&language=en-US&page=1'),
            fetch('https://api.themoviedb.org/3/movie/popular?api_key=2a5e286bb1bdc7c0bf49d7b6d0707880&language=en-US&page=1'),
            fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=2a5e286bb1bdc7c0bf49d7b6d0707880&language=en-US&page=1'),
            fetch('https://api.themoviedb.org/3/movie/upcoming?api_key=2a5e286bb1bdc7c0bf49d7b6d0707880&language=en-US&page=1'),
        ]);

        const movie_data = await Promise.all(responses.map(response => response.json()));

        console.log(movie_data);


    }catch(err){
        console.log(err);
    }
}

export const getAllTV = async () => {

    try{
        const responses = await Promise.all([
            fetch('https://api.themoviedb.org/3/tv/latest?api_key=2a5e286bb1bdc7c0bf49d7b6d0707880&language=en-US'),
            fetch('https://api.themoviedb.org/3/tv/airing_today?api_key=2a5e286bb1bdc7c0bf49d7b6d0707880&language=en-US&page=1'),
            fetch('https://api.themoviedb.org/3/tv/on_the_air?api_key=2a5e286bb1bdc7c0bf49d7b6d0707880&language=en-US&page=1'),
            fetch('https://api.themoviedb.org/3/tv/popular?api_key=2a5e286bb1bdc7c0bf49d7b6d0707880&language=en-US&page=1'),
            fetch('https://api.themoviedb.org/3/tv/top_rated?api_key=2a5e286bb1bdc7c0bf49d7b6d0707880&language=en-US&page=1'),
        ]);

        const tv_data = await Promise.all(responses.map(response => response.json()));

        console.log(tv_data);

    }catch(err){
        console.log(err);
    }
}


//separate movies functions

export const getNowPlayingMovies = async () => {
    
    try{
        const response = await fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=2a5e286bb1bdc7c0bf49d7b6d0707880&language=en-US&page=1');

        const now_playing_movies = await response.json();

        console.log(now_playing_movies);

        return now_playing_movies;
    }
    catch(err){
        console.log(err);
    }
}


export const getPopularMovies = async () => {
    
    try{
        const response = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=2a5e286bb1bdc7c0bf49d7b6d0707880&language=en-US&page=1');

        const popular_movies = await response.json();

        console.log(popular_movies);

        return popular_movies;
    }
    catch(err){
        console.log(err);
    }
}


export const getTopRatedMovies = async () => {
    
    try{
        const response = await fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=2a5e286bb1bdc7c0bf49d7b6d0707880&language=en-US&page=1');

        const top_rated_movies = await response.json();

        console.log(top_rated_movies);

        return top_rated_movies;
    }
    catch(err){
        console.log(err);
    }
}


export const getUpComingMovies = async () => {
    
    try{
        const response = await fetch('https://api.themoviedb.org/3/movie/upcoming?api_key=2a5e286bb1bdc7c0bf49d7b6d0707880&language=en-US&page=1');

        const up_coming_movies = await response.json();

        console.log(up_coming_movies);

        return up_coming_movies;
    }
    catch(err){
        console.log(err);
    }
}

export const getMovieDetails = async (movie_id) => {
    
    try{
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=2a5e286bb1bdc7c0bf49d7b6d0707880&language=en-US`);

        const movie_details = await response.json();

        console.log(movie_details);

        return movie_details;
    }
    catch(err){
        console.log(err);
    }
}


//seperate tv functions

export const getAiringTodayTV = async () => {
    
    try{
        const response = await fetch('https://api.themoviedb.org/3/tv/airing_today?api_key=2a5e286bb1bdc7c0bf49d7b6d0707880&language=en-US&page=1');

        const airing_today_tv = await response.json();

        console.log(airing_today_tv);

        return airing_today_tv;
    }
    catch(err){
        console.log(err);
    }
}


export const getOnTheAirTV = async () => {
    
    try{
        const response = await fetch('https://api.themoviedb.org/3/tv/on_the_air?api_key=2a5e286bb1bdc7c0bf49d7b6d0707880&language=en-US&page=1');

        const on_the_air_tv = await response.json();

        console.log(on_the_air_tv);

        return on_the_air_tv;
    }
    catch(err){
        console.log(err);
    }
}


export const getPopularTV = async () => {
    
    try{
        const response = await  fetch('https://api.themoviedb.org/3/tv/popular?api_key=2a5e286bb1bdc7c0bf49d7b6d0707880&language=en-US&page=1');

        const popular_tv = await response.json();

        console.log(popular_tv);

        return popular_tv;
    }
    catch(err){
        console.log(err);
    }
}


export const getTopRatedTV = async () => {
    
    try{
        const response = await fetch('https://api.themoviedb.org/3/tv/top_rated?api_key=2a5e286bb1bdc7c0bf49d7b6d0707880&language=en-US&page=1');

        const top_rated_tv = await response.json();

        console.log(top_rated_tv);

        return top_rated_tv;
    }
    catch(err){
        console.log(err);
    }
}
