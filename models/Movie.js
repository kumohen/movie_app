const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types; 
const movieSchema = new mongoose.Schema({


 movieId:{
    type: String,
 },
 image:{
     type:String,
 },
 title:{
    type: String,
 },
 rating:{
     type:Number,
 },
 overview:{
    type:String
 },
 release_date:{
    type:String
 },
 owner:{
     type:String
 }
  
  
},{timestamps:true});

  module.exports =  mongoose.model("Movie", movieSchema);