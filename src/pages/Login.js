import React from 'react';
import { Button } from 'react-bootstrap';


const Login = () => {

    const createRequestToken = async () => {
        
        try{
            const response = await fetch('https://api.themoviedb.org/3/authentication/token/new?api_key=2a5e286bb1bdc7c0bf49d7b6d0707880');

            if(!response.ok) throw response;
            
            const token = await response.json();

            //console.log(request_token); 

            window.location.replace(`https://www.themoviedb.org/authenticate/${token.request_token}?redirect_to=http://localhost:8080`);

        }
        catch(err){
            console.log(err);
        }
        
    }

    return(
        <main className='mt-5'>
            
            <Button onClick={createRequestToken}>Login</Button>

        </main>
    )
};

export default Login;