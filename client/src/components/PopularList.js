import React,{useEffect,useState} from 'react';
import axios from "axios"
import Aos from 'aos';
import 'aos/dist/aos.css';
import {MOVIE_API} from "../utils"
import MovieList from "./MovieList"


const PopularList = (props) => {
    const[movies,setMovies] = useState({})
    const [page,setPage] = useState(1);
    useEffect(() => {
        axios.get(`
        https://api.themoviedb.org/3/movie/popular?api_key=${MOVIE_API}&language=en-US&page=1`)
            .then(res => {
                setMovies(res.data)
            })
            .catch(error => console.log(error))

    }, [])
    const goNextPage = ()=> {
        setPage(page+1);
        console.log(page)
        axios.get(`
        https://api.themoviedb.org/3/movie/popular?api_key=${MOVIE_API}&language=en-US&page=${page}`)
            .then(res => {
                setMovies(res.data)
            })
            .catch(error => console.log(error))
    }
    const goPrevPage = ()=> {
        if(page  < 2) return ;
        setPage(page-1);
         console.log(page)
        // axios.get(`
        // https://api.themoviedb.org/3/movie/popular?api_key=${MOVIE_API}&language=en-US&page=${page}`)
        //     .then(res => {
        //         setMovies(res.data)
        //     })
        //     .catch(error => console.log(error))
    }
    return (
        <div>
            <h3>pouluar list</h3>
            <button  onClick={() => goNextPage()} >Next</button>
            <br />
            <button onClick={() => goPrevPage()}>Back</button>
            <div className="col-lg-12">

            <div className="row">

            {movies.results && movies.results.map(item => ( 
            <div  className="col-md-3" data-aos="zoom-in" key={item.id}>
                <MovieList item={item} history={props.history}  /> 
            </div> 
            ))} 

            </div>
            
            </div>
        </div>
    );
};

export default PopularList;