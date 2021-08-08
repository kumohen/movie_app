const express = require("express");
const router = express.Router();



const Movie = require("../models/Movie")

router.get("/all", (req, res) => {
     Movie.find().sort({ createdAt: -1 }).then(data => {
         res.status(200).json(
            data
         );
     });
 });

 router.get("/userWatchlist/:id", (req, res) => {
     
     Movie.find({owner:req.params.id}).then(data => {
         res.status(200).json(
            data
         );
     });
 });

 router.delete("/watch/:id", (req, res) => {
     console.log(  req.params.id)
    // Movie.findOneAndDelete({_id:req.params.id}).then(data => {
    //     res.status(200).json(
    //        {msg:"deleted"}
    //     );
    // });
});


router.post("/watchlist", (req, res) => {
 
     const {  id,title,poster_path,vote_average,userId,release_date,overview } =req.body ;
    
     const movie = new Movie({
          movieId:id,
            image:poster_path,
            title,release_date,overview ,
            rating:vote_average,
            owner:userId
     })
     movie.save().then(result => {
          res.status(201).json({
              message: "Done upload!",
              
          })
      }).catch(err => {
          console.log(err),
              res.status(500).json({
                  error: err
              });
      })
});



 

module.exports = router;