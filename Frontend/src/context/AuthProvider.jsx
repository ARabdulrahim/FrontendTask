import axios from "axios";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export const baseaurl="http://localhost:3030";
export const authContext=createContext();

export const UseAuthContext=()=>{
    return useContext(authContext);
}


function AuthProvider({children}) {
    const[token, setToken]=useState();
    const[tasks, setTasks]=useState([]);
    const[profile, seTProfile]=useState([]);
   

    const navigate=useNavigate();

    //handle Signup
    const handleSignup=async(formData)=>{
        try{
            let resp=await axios.post(`${baseaurl}/auth/register`,{
                name: formData.name,
                email:  formData.email,
                password: formData.password
            })
            toast.success(resp.data.message, {position: "top-center", autoClose: 2000, theme: "dark", });
            navigate("/login");
        }catch(err){
            toast.error(err.response.data.message, {position: "top-center", autoClose: 2000, theme: "dark", });
        }
    };

    //handle Login
    const handleLogin=async(formData)=>{
        try{
            let resp=await axios.post(`${baseaurl}/auth/login`,{
                email:  formData.email,
                password: formData.password
            })
            localStorage.setItem("token", JSON.stringify(resp.data.token));
            toast.success(resp.data.message, {position: "top-center", autoClose: 2000, theme: "dark", });
            navigate("/dashboard");
        }catch(err){
            toast.error(err.response.data.message, {position: "top-center", autoClose: 2000, theme: "dark", });
        }
    };

    //handle logout
    const handleLogout=()=>{
        localStorage.clear();
        navigate("/login");
    };

    //handle get profile
    const handleGetProfile=async()=>{
        try{
            let resp=await axios.get(`${baseaurl}/user`,  {headers: {Authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`}});
            console.log(resp)
            seTProfile(resp.data.user);
        }catch(err){
            toast.error(err.response.data.message, {position: "top-center", autoClose: 2000, theme: "dark", });
        }
    };
    //handle new task create
    const handleCreateTask=async(formData)=>{
        try{
            let resp=await axios.post(`${baseaurl}/task/new`, formData, {headers: {Authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`}});
            toast.success(resp.data.message, {position: "top-center", autoClose: 2000, theme: "dark", });
            navigate("/dashboard");
        }catch(err){
            toast.error(err.response.data.message, {position: "top-center", autoClose: 2000, theme: "dark", });
        }
    };

    //fetch all task
    const handleFetchAllTask=async()=>{
        try{
            const resp=await axios.get(`${baseaurl}/task`,{headers: {Authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`}});
            setTasks(resp.data.tasks);
        }catch(err){
            toast.error(err.response.data.message, {position: "top-center", autoClose: 2000, theme: "dark", });
        }
    };

    //fetch unique task 
    const handleFetchTaskDetail=async(id)=>{
        try{
            const resp=await axios.get(`${baseaurl}/task/${id}`, {headers: {Authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`}});
            toast.success(resp.data.message, {position: "top-center", autoClose: 2000, theme: "dark", });
            setUniqueTask(resp.data.data);
        }catch(err){
            toast.error(err.response.data.message, {position: "top-center", autoClose: 2000, theme: "dark", });
        }
    };

    //handle update task
    const handleUpdateTask=async(formData, id)=>{
        try{
           const resp=await axios.put(`${baseaurl}/task/${id}`, formData, {headers: {Authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`}});
           toast.success(resp.data.message, {position: "top-center", autoClose: 2000, theme: "dark", });
        }catch(err){
           toast.error(err.response.data.message, {position: "top-center", autoClose: 2000, theme: "dark", });
        }
    };

    //handle delete account
    const handleDeleteTask=async(id)=>{
        try{
           const resp=await axios.delete(`${baseaurl}/task/${id}`, {headers: {Authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`}} );
           toast.success(resp.data.message, {position: "top-center", autoClose: 2000, theme: "dark", });
        }catch(err){
            toast.error(err.response.data.message, {position: "top-center", autoClose: 2000, theme: "dark", });
        }
    };

    const data={token, tasks, profile,  handleSignup, handleLogin, handleLogout, handleGetProfile, handleCreateTask, handleFetchAllTask, handleFetchTaskDetail, handleUpdateTask, handleDeleteTask};
    
  return (
    <authContext.Provider value={data}>
        {children}
    </authContext.Provider>
  )
}

export default AuthProvider;