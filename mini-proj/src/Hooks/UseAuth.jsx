import { UserAuth } from '../Context/UserAuth'
import { useContext } from 'react'


export const UseAuth = () =>
{
    const context = useContext(UserAuth)
    if(!context)
    {
        throw Error("Error in HodAuthContext")
    }
    return context
}