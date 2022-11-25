import {useEffect, useState} from "react";

const usePersistedState = (defaultValue, key) => {
    
    const [state, setState] = useState(() =>{

        const storedValue = window.localStorage.getItem(key)
        return storedValue !== null ? JSON.parse(storedValue) : defaultValue
    })

    useEffect(() => {
        window.localStorage.setItem( key, JSON.stringify(state) )
    }, [state])

    return [state, setState];

}
export default usePersistedState;