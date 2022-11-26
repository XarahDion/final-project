import { useEffect, useState, createContext } from "react";

export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(false);
    const [travels, setTravels] = useState();
    const [selectedYear, setSelectedYear] = useState();

    const handleChange = (e) => {
      setSelectedYear(e.target.value);
    }
    console.log(selectedYear)

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
                console.log("travels in context", travels)
            }
        })
        .catch((error) => {
            setError(true);
        })
        }
    }, [selectedYear])
    
    return (
    <UserContext.Provider value={{ travels, handleChange }}>
        {children}
    </UserContext.Provider>
    );
};

export default UserProvider;