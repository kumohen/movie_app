import React,{useEffect,useState} from 'react';
import {MOVIE_API} from "../utils"
import axios from 'axios';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import useWindowDimensions from './UseWindowDimensions';
import CastSlider from "./CastSlider"

const Details = (props) => {
    const {id} = props.match.params ;
    const[movieDetails,setMovieDetails] = useState({});
 
    const {  width } = useWindowDimensions();
   

    useEffect(() => {
        axios.get(`
        https://api.themoviedb.org/3/movie/${id}?api_key=${MOVIE_API}&append_to_response=credits`)
            .then(res => {
                setMovieDetails(res.data)
                console.log(res.data)
            })
            .catch(error => console.log(error))

    }, [])

    const setType = width < 767 ? "show":"hide";
    
    return (
        <div>
            
             <div className="col-md-12" style={{padding:"10px"}}>
                 <div className="row">
                     <div className="col-md-6">
                     <img src={`https://image.tmdb.org/t/p/w780${movieDetails.poster_path}`} alt="title" style={{height:"60%",width:"98%"}} />
                     </div>
                     <div className={`col-md-6  `}> 
                         <div className={`detail_container  ${setType}`}>
                         <h4 className="text_color">{movieDetails.title}</h4>
                         <p className="text_color">{movieDetails.release_date}</p>
                         <p className="text_color"><i className="fas fa-star  " style={{color:"#d9af07"}}></i>  {movieDetails.vote_average}/10</p>
                         <p className="text_color" style={{textAlign:"justify"}}>{movieDetails.overview}</p>
                         <h3 className="text_color">Cast</h3>
                         </div>
                            <div className="row" >
                            {movieDetails.credits &&  <CastSlider movies={movieDetails.credits.cast.slice(0,20)} />  }
                               
                             {/* {movieDetails.credits && movieDetails.credits.cast.slice(0,20).map(item => (
                                 <div className="card col-md-3 " key={item.id}>
                                        <img src={`https://image.tmdb.org/t/p/w780${item.profile_path}`} alt="title" style={{height:"170px"}} />
                                        <p  style={{textAlign:"center"}}>{item.name}</p>
                                 </div>
                             ))} */}
                           </div>
                           
                     </div>
                 </div>
             </div>
        </div>
    );
};

export default Details;