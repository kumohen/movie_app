import React from 'react';

const UpMovieList = ({item,history}) => {
    return (
        <div onClick={() => history.push(`/detail/${item.id}`)}>
           
             <img src={`https://image.tmdb.org/t/p/w780${item.poster_path}`} alt="title" style={{height:"",width:"100%"}} />
        </div>
    );
};

export default UpMovieList;