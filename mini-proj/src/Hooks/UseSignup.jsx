import { UseAuth } from "./UseAuth";
import { useState } from "react";
export const useSignup = () =>
{
const [error,setError] = useState(null)
const [isLoading,setisLoading] = useState(null)
const {dispatch} = UseAuth()
const signup = async(Name,Email,password) =>
{
    setisLoading(true)
    setError(null) 
    const response = await fetch('http://localhost:4000/user/signup',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({Name,Email,password})
    }) 
    const json = await response.json()
    if(!response.ok)
    {
        setisLoading(false)
        setError(json)
    }
    if(response.ok)
    {
        localStorage.setItem('User',JSON.stringify(json))
        dispatch({type:'LOGIN',payload:json})
        setisLoading(false)
    }
}
   return {signup,error,isLoading }
}
