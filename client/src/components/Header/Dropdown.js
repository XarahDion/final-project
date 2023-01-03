import { useLocation } from "react-router-dom";
import { useContext } from "react";
import styled from "styled-components";
import { UserContext } from '../hooks/UserContext';

const Dropdown = ({user, isAuthenticated, years}) => {
    const { handleYears } = useContext(UserContext); 

    return (
        <Container>
        {useLocation().pathname === "/" ? // show dropdown only on home page
        <Div>
        <label>
            {isAuthenticated ? `${user.name}'s Travels :` : "Xarah Dion's Concerts :"} 
        </label>
            <Select onChange={handleYears}> 
            <option value="">Select a year...</option>
            {!years ? <h1>Loading...</h1>
            : years.map ((year) => {
                return  (
                    <option key={year} value={year}>{year}</option>
                )
            })}
            </Select>
        </Div>
        :<></>}
        </Container>
    )
};

const Div = styled.div`
    display: flex;
    align-items: center;
`
const Select = styled.select`
    margin-left: 5px;
    border-radius: 3px;
    @media (max-width: 844px) {
        font-size: 11px;
        margin: 0px;
    }
`
const Container = styled.div`
    display: flex;
    flex-direction: column;
    font-weight: 200;
    position: fixed;
    left: 50%;
    transform: translate(-50%, 0%);
    @media (max-width: 844px) {
        position: relative;
        transform: translate(0%, 0%);
        left: 0;
    }
`

export default Dropdown;