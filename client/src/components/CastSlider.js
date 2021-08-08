import React from 'react';
import {settings,responsive} from "./utils"
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import useWindowDimensions from './UseWindowDimensions';

const CastSlider = ({movies}) => {
    const {height,  width } = useWindowDimensions();
    
    const newHight = (height/2)
    console.log(movies)

    return (
        <div >
               <Carousel responsive={responsive}>
                   {movies.map(item => {
                       return(
                           <div className="card" style={{marginLeft:"5px",paddingBottom:"10px"}} key={item.id}>
                           
                           <img src={`https://image.tmdb.org/t/p/w780${item.profile_path}`} alt="title" style={{height:"170px"}} />
                            <p  style={{textAlign:"center"}}>{item.name}</p>
                           
                          </div> 
                       )
                   })}
               </Carousel>
        </div>
    );
};

export default CastSlider;