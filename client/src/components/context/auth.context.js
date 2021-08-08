import React, { useState, createContext } from "react";
import axios from "axios"
export const AuthenticationContext = createContext();


export const AuthenticationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);



  const onLogin = async (user) => {
    setIsLoading(true);
  
    const res =  await axios.post("/api/users/signin",user);
    
    if(res.data){
        localStorage.setItem("token",res.data.token)
        localStorage.setItem("user",JSON.stringify(res.data.user))
        setUser(res.data.user)
        return {
            userInfo:"is found"
        }
    } else {
        return {
            userInfo:null
        }
    }
  };


  const onRegister = async (user ) => {
    setIsLoading(true);
  
    const res =  await axios.post("/api/users/signup",user);
    
    if(res.data){
       
        return {
            userInfo:"is found"
        }
    } else {
        return {
            userInfo:null
        }
    }
    
  };

  const onLogout = () => {
     localStorage.clear();
     setUser(null)
  };

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        isLoading,
        error,
        onLogin,
        onRegister,
        onLogout,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};