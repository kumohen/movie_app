import React from 'react';
import {useRouter} from "react-router-dom"

const MovieList = (props) => {
    
    const {item,history} = props;

    
    return (
        <div onClick={() => history.push(`/detail/${item.id}`)}>
             <p>{item.title}</p>
             <img src={`https://image.tmdb.org/t/p/w780${item.poster_path}`} alt="title" style={{height:"400px",width:"98%"}} />
        </div>
    );
};

export default (MovieList);