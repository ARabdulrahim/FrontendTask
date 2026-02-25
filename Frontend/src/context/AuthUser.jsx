import { useEffect } from "react";
import { useNavigate } from "react-router-dom"

const AuthUser=(WrapperComponent)=>{
  const AuthComponent=(props)=>{
    const navigate=useNavigate();

    const isAuthenticate=()=>{
        if(localStorage.getItem("token")){
            return true;
        }
        return false;
    }
    useEffect(()=>{
        if(!isAuthenticate()){
            navigate("/login");
        }
    },[]);

    return <WrapperComponent {...props}/>
  }
  return AuthComponent;
}

export default AuthUser;