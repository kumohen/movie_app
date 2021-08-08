import React,{useState,useContext} from 'react';
import { Link } from "react-router-dom";
import {AuthenticationContext} from "./context/auth.context"

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [username, setUsername] = useState("");

    const {onRegister} = useContext(AuthenticationContext)

    const userRegistration = () => {
        const user = {
            email,password,username 
        }
        onRegister(user)
    }

    return (
       <div className="login_container">
           <div className="card shadow-lg p-3 mb-5 bg-body rounded">
          
         
                         <div>
                         <input required type="text" placeholder="Username" className="form-control" 
                        value={username} onChange={(e)=> setUsername(e.target.value)}  />
                         </div>
                         <div >
                            <input required type="text" placeholder="email" className="form-control" 
                            value={email} onChange={(e)=> setEmail(e.target.value)}  />
                         </div>
                         <div>
                         <input required type="text" placeholder="password" className="form-control" 
                        value={password} onChange={(e)=> setPassword(e.target.value)}  />
                         </div>
                      

                        
                       
                        <button onClick={()=> userRegistration()} className="btn btn-primary mt-3">Signup</button>
                        <br />
                        <Link to="/signin">Go to login page</Link>
           </div>
       </div>
      
    );
};

export default SignUp;