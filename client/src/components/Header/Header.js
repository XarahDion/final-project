import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import { UserContext } from '../hooks/UserContext';
import {useAuth0} from "@auth0/auth0-react";
import { FiGlobe } from "react-icons/fi";
import UserMenu from "./UserMenu";

const Header = () =>{
    const [years, setYears] = useState([]);
    const { handleYears } = useContext(UserContext)
    const { user, isAuthenticated, isLoading } = useAuth0();

    useEffect ( () => {
        if (user)
        fetch(`/get-years/${user.name}`)
        .then(results => results.json())
        .then ( data => {
            if(data.status === 400 || data.status === 500) {
                throw new Error(data.message);
            }
            else {
                setYears(data.data);
            }
        })
        .catch((error) => {
            console.log("error");
        })
    }, [user])

    useEffect ( () => {
        if (!user)
        fetch('/get-years')
        .then(results => results.json())
        .then ( data => {
            if(data.status === 400 || data.status === 500) {
                throw new Error(data.message);
            }
            else {
                setYears(data.data);
            }
        })
        .catch((error) => {
            console.log("error");
        })
    }, [])

    return (
        <Wrapper>
            <Div>
                <Greet onClick={() => {window.location.href = '/';}}>
                    <FiGlobe /> 
                    <Span>Earth Trotter</Span>
                    <FiGlobe /> 
                </Greet>
                <Greet onClick={() => {window.location.href = '/about';}}>
                    <Span>About</Span>
                </Greet>
            </Div>
            <UserMenu user={user}
                isAuthenticated={isAuthenticated}
                isLoading={isLoading}
                handleYears={handleYears}
                years={years} />
        </Wrapper>
    )
};

const Div = styled.div`
    display: flex;
    align-items: center;
`
const Greet = styled.button`
    font-weight: 600;
    height: 28px;
    width: 120px;
    display: flex;
    align-items: center;
    font-size: 12px;
    color: white;
    background-color: black;
    &:hover{
        cursor: pointer;
    }
`
const Span = styled.p`
    margin: 0px 6px;
    color: white;
    font-size: 12px;
`
const Wrapper = styled.div`
    font-size: 12px;
    font-weight: 600;
    padding: 4px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: black;
`

export default Header;