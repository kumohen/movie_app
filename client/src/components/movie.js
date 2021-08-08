import React, { useEffect, useState } from 'react';
import axios from "axios"
import Aos from 'aos';
import 'aos/dist/aos.css';
import {MOVIE_API} from "../utils"
import MovieList from "./MovieList"
import UpMovieList from "./UpMovieList"
import useWindowDimensions from './UseWindowDimensions';
import SliderCompoent from "./Slider"


// 0b4f6d4114eccb8a9421cf3964ad4e0f
// https://api.themoviedb.org/3/movie/550?api_key=0b4f6d4114eccb8a9421cf3964ad4e0f
// for trading  https://api.themoviedb.org/3/trending/all/day?api_key=0b4f6d4114eccb8a9421cf3964ad4e0f
// for top rated https://api.themoviedb.org/3/movie/top_rated?api_key=${MOVIE_API}&language=en-US&page=1
// upcoming movie https://api.themoviedb.org/3/movie/upcoming?api_key=${MOVIE_API}&language=en-US&page=1
// best movie from 2010   https://api.themoviedb.org/3/discover/movie?api_key=${MOVIE_API}&primary_release_year=2010&sort_by=vote_average.desc
// scifi   https://api.themoviedb.org/3/discover/movie?api_key=${MOVIE_API}&with_genres=878&with_cast=500&sort_by=vote_average.desc

const Movie = (props) => {
    Aos.init();
    const [name,setName] = useState("")
    const [Trading,setTrading] = useState({});
    const[upMovie,setUpMovie] = useState({})
    const[movies,setMovies] = useState({})
    const[scifi,setScifi] = useState([])
    const [loading,setLoading] = useState(false);
    const {  width } = useWindowDimensions();
    useEffect(() => {
        axios.get(`
       
        https://api.themoviedb.org/3/trending/all/day?api_key=0b4f6d4114eccb8a9421cf3964ad4e0f
`)
            .then(res => {
              setTrading(res.data)
            })
            .catch(error => console.log(error))

            axios.get(`
       
          https://api.themoviedb.org/3/discover/movie?api_key=${MOVIE_API}&with_genres=878&with_cast=500&sort_by=vote_average.desc
    `)
                .then(res => {
                  setScifi(res.data)
                })
                .catch(error => console.log(error))

                axios.get(`
       
                 https://api.themoviedb.org/3/movie/upcoming?api_key=${MOVIE_API}&language=en-US&page=1
          `)
                      .then(res => {
                        console.log(res.data)
                        setUpMovie(res.data)
                      })
                      .catch(error => console.log(error))

    }, [])
    
    const handleSubmit = ()=> {
           if(!name) return 
           setLoading(true);

        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API}&language=en-US&query=${name}&page=1&include_adult=false`)
            .then(res => {
              if(res.data ){
                setLoading(false)
              } 
              setMovies(res.data)

            })
            .catch(error => console.log(error))
    }
    
     const handleMovie = (type)=>{
      setLoading(true);
        axios.get(`
        https://api.themoviedb.org/3/movie/${type}?api_key=${MOVIE_API}&language=en-US&page=1`)
        .then(res => {
          if(res.data ){
            setLoading(false)
          } 
          setMovies(res.data)
        })
        .catch(error => console.log(error))
     }

  
const height = width < 767 ? "40px":"60px";
const setType = width < 767 ? null:"s_btn";

const renderList = Trading.results && Trading.results.map(item => ( 

  <div   key={item.id} style={{marginRight:"10px",height:"100px",width:"500px"}}>
      <UpMovieList item={item} history={props.history} /> 
  </div> 
    ))

    return (
        <div>
         
            <div  className="col-md-10" style={{margin:"auto"}}>
              
            {/* <button onClick={() => handleMovie("popular")}> popular movie </button>
               <button onClick={() => handleMovie("popular")}>trading</button>
               <button onClick={() => handleMovie("top_rated")}>top rated</button>
               <button onClick={() => handleMovie("upcoming")}>upcoming</button>
               <button onClick={() => handleMovie("popular")}>scifi</button> */}
            <br />
            <div className="col-md-8" style={{margin:"auto"}}>

            <div className="input-group">
    <input type="text" className="form-control" placeholder="Search movie " onChange={e => setName(e.target.value)} />
    <div className="input-group-append">
      <button className="btn btn-secondary" type="button" onClick={handleSubmit}>
        <i className="fa fa-search"></i>
      </button>
    </div>
  </div>
  
            {/* <div   style={{display:"flex",flexDirection:"row",marginLeft:"2%",marginRight:"2%",marginTop:"2%"}}>
            <input placeholder="Search the movie" type="text"   onChange={e => setName(e.target.value)} className="form-control" style={{ height:`${height}` }} />

            <button onClick={handleSubmit} className= {`btn btn-primary ${setType}`} style={{width:"7%"}} >   search</button>
            </div> */}
            </div>  
            <br />
             
              {loading   ? (
                <div className="spinner-border text-danger" role="status">


                <span className="visually-hidden"></span>
              </div>
              )  : (
                 <div className="col-lg-12">

                 <div className="row">
 
                 {movies.results && movies.results.map(item => ( 
                 <div  className="col-md-3" data-aos="zoom-in" key={item.id}>
                      <MovieList item={item} history={props.history} /> 
                  </div> 
                   ))} 
 
              </div>
              </div>
              )}


             <div>
             </div>
                
             </div>
             
            <div >
               <h3 style={{textAlign:"center",color:"white",marginBottom:"30px",marginTop:"30px"}}>Trading movie</h3>
            
               { Trading.results  && <SliderCompoent movies={Trading.results}   />}
               <br />
               <h3 style={{textAlign:"center",color:"white",marginBottom:"30px"}}>Scifi movie</h3>
               { scifi.results  && <SliderCompoent movies={scifi.results}   />}
               <h3 style={{textAlign:"center",color:"white",marginBottom:"30px"}}>Upcoming movie</h3>
               { upMovie.results  && <SliderCompoent movies={upMovie.results}   />}
                
             </div>
            
             </div>
    );
};

export default Movie;