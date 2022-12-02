import { useLocation } from "react-router-dom";
import styled from "styled-components";

const Dropdown = ({user, isAuthenticated, years, handleYears}) => {

    return (
        <Container>
        {useLocation().pathname === "/" ?
        <label>
            {isAuthenticated ? `${user.name}'s Travels :` : "Xarah Dion's Concerts :"}
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