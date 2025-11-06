import { createContext,useReducer,useEffect } from "react";
export const UserAuth = createContext()

const authreducer = (state,action) =>
{
    switch(action.type)
    {
        case 'LOGIN':
            return {User:action.payload}
        case 'LOGOUT':
           return  {User:null}   
        default:
            return state
    }
}
export const UserAuthProvider = ({children}) =>
{
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('User'))
        if(user)
        {
            dispatch({type:'LOGIN',payload:user})
        }
    },[])
   const [state,dispatch] = useReducer(authreducer,{
    User:null
   })
   return(
    <UserAuth.Provider value={{...state,dispatch}}>
        {children}
    </UserAuth.Provider>
   )
}