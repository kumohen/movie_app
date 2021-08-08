import React,{useContext, useState} from 'react';
import {Link,withRouter} from "react-router-dom"
import {AuthenticationContext} from "./context/auth.context"
import axios from "axios"

const Navbar = (props) => {
   
    const[userInfo,setUserInfo] = useState(null);
    const {user,onLogout} = useContext(AuthenticationContext)
    const[movies,setMovies] = useState([])

    

   
   React.useEffect(()=>{
     
    //console.log(localStorage.getItem("user"))

    if(localStorage.getItem("token")){
        props.history.push("/")  
    }
    if(localStorage.getItem("user")){
        setUserInfo(JSON.parse(localStorage.getItem("user")));
        const id = JSON.parse(localStorage.getItem("user"))._id ;
            axios.get(`/api/movie/userWatchlist/${id}`).then(res => {
                setMovies(res.data)
         })
        
    }

 },[user])



  
const handleLogout = ()=> {
    onLogout();
    props.history.push("/signin")  
}

    return (
       
        <nav className="navbar navbar-dark bg-dark navbar-expand-md">
        <Link to="/" className="navbar-brand">MovieDb</Link>
        <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbar">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-collapse collapse justify-content-between" id="navbar">
            <ul  className="navbar-nav">
            <li className="nav-item"><Link to="/" className="nav-link">Home</Link></li>
            </ul>
            <ul className="navbar-nav " style={{marginRight:"20px"}}>
               
                {userInfo === null && user === null ? (
                      <li className="nav-item"><Link to="/signin" className="nav-link">Signin</Link></li>
                ):(
                    <>
                    {!(props.location.pathname === '/signin') ?
                    <>
                    <li className="nav-item " style={{color:"#fff",fontWeight:"900",}}>
                        <Link to="/watch" className="nav-link"> 
                        <span id="watchItem">{movies && movies.length} </span> Watchlist</Link></li>
                   
                     <li className="nav-item dropdown">
                    <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false"> {userInfo && userInfo.username} </Link>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                        <li><Link className="dropdown-item" to="/watch">WatchList</Link></li>
                        <li   onClick={() => handleLogout()}>Logout</li>
                    </ul>
                </li></> : null }
                     </>
                )}
             
               
            </ul>
        </div>
    </nav>
    );
};

export default withRouter(Navbar);