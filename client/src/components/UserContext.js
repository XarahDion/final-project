import { useEffect, useState, createContext } from "react";
import {useAuth0} from "@auth0/auth0-react";
import usePersistedState from "../hooks/usePersistedState";

export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
    const [error, setError] = useState(false);
    const [travels, setTravels] = useState();
    const [selectedYear, setSelectedYear] = usePersistedState(null, "selectedYear");
    const { user, isAuthenticated } = useAuth0();

    // console.log("user in context", user)

    const handleChange = (e) => {
        setSelectedYear(e.target.value);
    }

    useEffect ( () => {
        if (selectedYear) {
        fetch(`/concerts/${selectedYear}`)
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
    }, [selectedYear])
    
    return (
    <UserContext.Provider value={{ travels, handleChange, selectedYear }}>
        {children}
    </UserContext.Provider>
    );
};

export default UserProvider;