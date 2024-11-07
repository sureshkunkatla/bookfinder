import { createContext, useContext, useState } from "react";

const LoaderContext = createContext();


const LoaderProvider = ({children}) => {
    const [loading, setLoading] = useState(false);

    const startLoading = () => setLoading(true);
    const stopLoading = () => setLoading(false);

    return(
        <LoaderContext.Provider value={{ loading, startLoading, stopLoading}}>
            {children}
        </LoaderContext.Provider>
    )
}

export default LoaderProvider

export const useLoader = () => useContext(LoaderContext)