import { useEffect, useState, createContext } from "react";

export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [status, setStatus] = useState("loading");
    const [error, setError] = useState(false);
    const [travels, setTravels] = useState();
    
    useEffect ( () => {
        if (!user) {
        fetch('/api/concerts/2016')
        .then(results => results.json())
        .then ( data => {
            if(data.status === 400 || data.status === 500) {
                throw new Error(data.message);
            }
            else {
                setTravels(data.data);
            }
        })
        .catch((error) => {
            setError(true);
        })
        }
    }, [])
    
    return (
    <UserContext.Provider value={{ travels }}>
        {children}
    </UserContext.Provider>
    );
};

export default UserProvider;