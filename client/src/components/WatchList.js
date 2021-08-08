import React,{useState} from 'react';
import axios from "axios"
const WatchList = () => {
    const[userInfo,setUserInfo] = useState(null);
    const [movies,setMovies] = useState([])
    React.useEffect(()=>{
     
        //console.log(localStorage.getItem("user"))
    
       
        if(localStorage.getItem("user")){
            setUserInfo(JSON.parse(localStorage.getItem("user")))
        }
    
     },[])

     React.useEffect(()=>{
         if(userInfo){
            const id = userInfo._id ;
            axios.get(`/api/movie/userWatchlist/${id}`).then(res => {
                setMovies(res.data)
         })
     
            
         }
       
    
     },[userInfo])
     
      
    return (
        <div style={{backgroundColor:"#babfbb"}}>
            <div className="col-md-8" style={{margin:"auto",backgroundColor:"#ebedeb",padding:"2%"}}>
                 <h3>Your WatchList</h3>
                {movies && movies.map(item => (
                    <div  key={item.id} className="row">
                        <div className="col-md-2">
                        <img src={`https://image.tmdb.org/t/p/w780${item.image}`} alt="title" style={{width:"100%",height:"80%"}} />
                        </div>
                        <div className="col-md-8">
                            <p style={{fontSize:"20px"}}><b>{item.title}</b></p>
                            <p>{item.release_date.toString(0,4)}</p>
                            <p>  <i className="fas fa-star  " style={{color:"#d9af07"}}></i>  {item.rating}</p>
                            <p style={{textAlign:"justify"}}>{item.overview}</p>
                        </div>
                        <hr />
                    </div>    
                ))}
            </div>
        </div>
    );
};

export default WatchList;