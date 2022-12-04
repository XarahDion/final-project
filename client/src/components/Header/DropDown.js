import { useLocation } from "react-router-dom";
import { useContext } from "react";
import styled from "styled-components";
import { UserContext } from '../hooks/UserContext';

const Dropdown = ({user, isAuthenticated, years}) => {
    const { handleYears } = useContext(UserContext); 

    return (
        <Container>
        {useLocation().pathname === "/" ? // show dropdown only on home page
        <label>
            {/* dropdown conditionally rendered with user authentication */}
            {isAuthenticated ? `${user.name}'s Travels :` : "Xarah Dion's Concerts :"} 
            {/* dropdown is passed the handleYears function from the UserContext */}
            <Select onChange={handleYears}> 
            <option value="">Select a year...</option>
            {!years ? <h1>Loading...</h1>
            : years.map ((year) => {
                return  (
                    <option key={year} value={year}>{year}</option>
                )
            })}
            </Select>
        </label>
        :<></>}
        </Container>
    )
};

const Select = styled.select`
    margin-left: 5px;
    border-radius: 3px;
`
const Container = styled.div`
    display: flex;
    flex-direction: column;
    font-weight: 200;
    position: fixed;
    left: 50%;
    transform: translate(-50%, 0%);
`

export default Dropdown;