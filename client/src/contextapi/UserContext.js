import { createContext, useState } from "react"
export const UserContext = createContext({});

// provider:

export const UserContextProvider=({children})=>{
    const [userInfo , setUserInfo] = useState({})
    return (
        <>
            <UserContext.Provider value={{userInfo,setUserInfo}}>
                    {children}
            </UserContext.Provider>
        </>
    )
}
