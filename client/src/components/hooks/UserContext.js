import { useEffect, useState, createContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
    const [error, setError] = useState(false);
    const [concerts, setConcerts] = useState();
    const [selectedYear, setSelectedYear] = useState();
    const [travels, setTravels] = useState();
    const { user } = useAuth0();

    const handleYears = (e) => { // sets the value for selectedYear
        setSelectedYear(e.target.value);
    }

    useEffect ( () => {
        if (selectedYear && !user) { // if user is not logged in and selectedYear is set, fetch concerts by year
        fetch(`/concerts/${selectedYear}`)
        .then(results => results.json())
        .then ( data => {
            if(data.status >= 300) {
                throw new Error(data.message);
            }
            else {
                setConcerts(data.data); // sets the state for concerts
            }
        })
        .catch((error) => {
            setError(true);
        })
        }
    }, [selectedYear]); // fetch again when year changes

    useEffect ( () => {
        if (selectedYear && user) { // if user is logged in and selectedYear is set, fetch user travels by year
        fetch(`/travels/${user.name}/${selectedYear}`)
        .then(results => results.json())
        .then ( data => {
            if(data.status >= 300) {
                throw new Error(data.message);
            }
            else {
                setTravels(data.data); // sets the state for travels
            } 
        })
        .catch((error) => {
            setError(true);
        })
        }
    }, [selectedYear, user]); // fetch again when year changes
    
    return (
    <UserContext.Provider value={{ concerts, handleYears, selectedYear, travels }}>
        {children}
    </UserContext.Provider>
    );
};

export default UserProvider;