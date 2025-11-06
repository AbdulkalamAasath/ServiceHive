import { UseAuth } from "./UseAuth"
export const useLogout = () =>
{
 const {dispatch} = UseAuth() 
 const logout =() =>
 {
 localStorage.removeItem('User')
 dispatch({type:'LOGOUT'})
}
return({logout})
}
