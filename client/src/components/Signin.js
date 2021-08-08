import React,{useState,useContext} from 'react';
import {AuthenticationContext} from "./context/auth.context"
import { Link } from "react-router-dom";


const Signin = ({history}) => {
    const [email, setEmail] = useState("mahen123@gmail.com");
    const [password, setPassword] = useState("123456");

    const {onLogin} = useContext(AuthenticationContext)

    const userSignup = ()=> {
        const user = {
            email,password
        }
       onLogin(user).then(res => {
           if(res.userInfo){
            history.push("/")
           }
       })

      

    //   if(userInfo !== undefined){
    //     history.push("/")
    //   }
        // 
    }
  
    return (
       <div className="login_container">
           <div className="card shadow-lg p-3 mb-5 bg-body rounded">
             <br />
             <br />
           <div className="mb-2">
                            <input required type="text" placeholder="email" className="form-control" 
                            value={email} onChange={(e)=> setEmail(e.target.value)}  />
                         </div>
                        
                         <div>
                         <input required type="text" placeholder="password" className="form-control" 
                        value={password} onChange={(e)=> setPassword(e.target.value)}  />
                         </div>

                        
                       
                        <button onClick={()=> userSignup()} className="btn btn-primary mt-3">Login</button>
                        <br />
                        <Link to="/signup">Go to register page</Link>
           </div>
       </div>
      
    );
};

export default Signin;