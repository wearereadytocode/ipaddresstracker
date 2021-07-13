const { createContext, useState } = require("react");

export const DetailsContext =  createContext()

export const DetailsContextProvider = (props) =>{
    const [details, setdetails] = useState({
        ip:"Loading..",
        location:"Loading..",
        city:"Loading..",
        postalcode:"Loading.."
    })

    return (
        <DetailsContext.Provider value={[details, setdetails]}>
            {props.children}
        </DetailsContext.Provider>
    )
}