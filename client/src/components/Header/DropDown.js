import { Link, useLocation } from "react-router-dom";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import avatar from "../../assets/avatar.jpg";
import styled from "styled-components";

const DropDown = ({user, years, handleYears}) => {

    return (
        <>
        <Container>
        {useLocation().pathname === "/" ?
        <label>
            {user ? `${user.name}'s Travels :` : "Xarah Dion's Concerts :"}
            <Select onChange={handleYears}>
            <option value="">Select a year...</option>
            {!years ? <h1>Loading...</h1>
            : years.map ((year) => {
                return  (
                    <option value={year}>{year}</option>
                )
            })}
            </Select>
        </label>
        : <></>}
    </Container>
    <Div>
        {user ? 
        <>
        <Profile to="/profile">
            <Greet>
                {user.name}'s Profile
                {user?.picture && 
                <Img async="on" src={user.picture} alt={user?.name} />
                }
            </Greet>
        </Profile>
        <LogoutButton />
        </>
        :
        <>
        <Profile to="/profile">
            <Greet>
                Xarah Dion's Profile
                <Img async="on" src={avatar} alt="Xarah" />
            </Greet>
        </Profile>
        <LoginButton />
        </>}
    </Div>
    </>
    )
};

const Profile = styled(Link)`
    cursor: pointer;
`
const Img = styled.img`
    border-radius: 50%;
    height: 20px;
    margin-left: 5px;
`
const Div = styled.div`
    display: flex;
    align-items: center;
`
const Greet = styled.button`
    font-weight: 600;
    height: 28px;
    width: 200px;
    display: flex;
    align-items: center;
    border-radius: 5px;
    font-size: 12px;
    color: white;
    background-color: black;
    &:hover{
        cursor: pointer;
    }
`
const Select = styled.select`
    margin-left: 5px;
    border-radius: 3px;
`
const Container = styled.div`
    display: flex;
    flex-direction: column;
    font-weight: 200;
`

export default DropDown;