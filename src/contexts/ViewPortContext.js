const { createContext, useState } = require("react");

export const ViewPortContext =  createContext()

export const ViewPortContextProvider = (props) =>{
    const [viewport,setviewport ] = useState({
        latitude: 0,
        longitude: 0,
        width:'100vw',
        height:'100vh',
        zoom : 10,
    })

    return (
        <ViewPortContext.Provider value={[viewport,setviewport ]}>
            {props.children}
        </ViewPortContext.Provider>
    )
}