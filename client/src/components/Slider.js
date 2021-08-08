import React from 'react';
import {settings,responsive} from "./utils"
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import useWindowDimensions from './UseWindowDimensions';
import axios from "axios"

const SliderCompoent = ({movies}) => {
    const {height,  width } = useWindowDimensions();
    const [ userInfo, setUserInfo] = React.useState(null)
    const [Wmovies,setWMovies] = React.useState([])
    
    const newHight = (height/2)
    React.useEffect(()=>{
     
      
        if(localStorage.getItem("user")){
            setUserInfo(JSON.parse(localStorage.getItem("user")))
        }
    
     },[])
    
     React.useEffect(()=>{
        if(userInfo){
           const id = userInfo._id ;
           axios.get(`http://localhost:4000/api/movie/userWatchlist/${id}`).then(res => {
               setWMovies(res.data)
        })
    
           
        }
      
   
    },[userInfo,Wmovies])

   const addWatchList = async (item)=> {
     const {id,title,poster_path,vote_average,release_date,overview } = (item) ;
     const userId = userInfo._id ;

     const movie = {
        id,title,poster_path,vote_average,userId ,release_date,overview 
     }

   

    const res = await axios.post("http://localhost:4000/api/movie/watchlist",movie) ;


   }
     var moviesCon = [] ;

     if(Wmovies) {
        Wmovies.forEach(item =>  moviesCon.push(parseInt(item.movieId)) );
     }

    return (
        <div >
               <Carousel responsive={responsive}>
                   {movies.map(item => {
                      
                       return(
                           <div className="card" style={{marginLeft:"20px",paddingBottom:"10px",backgroundColor:"#2a2b2a"}} key={item.id}>
                           
                           <img src={`https://image.tmdb.org/t/p/w780${item.poster_path}`} alt="title" style={{height:`${newHight}px`}} />
                            <div style={{display:"flex",marginTop:"10px",paddingLeft:"10px"}}>
                            <i className="fas fa-star  " style={{color:"#d9af07"}}></i> 
                            <p className="text_color" style={{marginLeft:"5px",marginTop:"-5px"}}><b>{item.vote_average}</b></p>
                            </div>
                            <p className="text_color" style={{marginLeft:"15px",fontSize:"20px"}}>{item.title}</p>
                             <button
                             onClick={()=>  addWatchList(item)}
                             
                             style={{width:"90%",height:"50px",alignSelf:"center",color:"#595c59"}}>
                                 {moviesCon && !moviesCon.includes(item.id) ?    <i className="fas fa-plus"></i> : <i className="far fa-check-circle"></i>}
                               WatchList</button>
                          </div> 
                       )
                   })}
               </Carousel>
        </div>
    );
};

export default SliderCompoent;