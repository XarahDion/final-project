import { useEffect, useState, createContext } from "react";
import {useAuth0} from "@auth0/auth0-react";
import usePersistedState from "./usePersistedState";

export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
    const [error, setError] = useState(false);
    const [concerts, setConcerts] = useState();
    const [selectedYear, setSelectedYear] = useState();
    const [travels, setTravels] = useState();
    const { user } = useAuth0();

    const handleYears = (e) => {
        setSelectedYear(e.target.value);
    }

    useEffect ( () => {
        if (selectedYear && !user) {
        fetch(`/concerts/${selectedYear}`)
        .then(results => results.json())
        .then ( data => {
            if(data.status === 400 || data.status === 500) {
                throw new Error(data.message);
            }
            else {
                setConcerts(data.data);
            }
        })
        .catch((error) => {
            setError(true);
        })
        }
    }, [selectedYear])

    useEffect ( () => {
        if (selectedYear && user) {
        fetch(`/travels/${user.name}/${selectedYear}`)
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
    }, [selectedYear, user])
    
    return (
    <UserContext.Provider value={{ concerts, handleYears, selectedYear, travels }}>
        {children}
    </UserContext.Provider>
    );
};

export default UserProvider;