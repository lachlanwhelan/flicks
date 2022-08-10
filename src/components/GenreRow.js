import React from 'react';


const GenreRow = ({media, genres}) => {
          //genres                            
          return media.genre_ids.map((id, index) => {
            return (
                 genres.map(genre => {
                    if(genre.id === id){
                         return <span className='carousel_genre_item'> {genre.name} &nbsp;</span>    
                     }
                 })
            )
             
         })
    
}

export default GenreRow;