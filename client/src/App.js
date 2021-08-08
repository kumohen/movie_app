import logo from './logo.svg';
import './App.css';
import Movie from './components/movie';
import PopularList from "./components/PopularList"
import Details from "./components/Details"
import {BrowserRouter as Router,Route,Switch } from 'react-router-dom';
import Signin from "./components/Signin"
import SignUp from './components/Signup';
import WatchList from "./components/WatchList"
import Navbar from "./components/Navbar"
//import Navbar from "./Navbar"


function App() {
  return (
   <div>
      <Router>
            <Navbar/>  
            <Switch>
                <Route exact path="/" component ={Movie}/>
                <Route exact path="/detail/:id" component ={Details}/>
                <Route exact path="/popular" component={PopularList}/>
                <Route exact path="/signin" component={Signin}/>
                <Route exact path="/signup" component={SignUp}/>
                <Route exact path="/watch" component={WatchList}/>

                </Switch> 
            </Router>    
   </div>
  );
}

export default App;
