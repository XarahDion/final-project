import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { FiGlobe } from "react-icons/fi";
import UserMenu from "./UserMenu";
import { useNavigate } from "react-router-dom";
import { UserContext } from '../hooks/UserContext';

const Header = () =>{
    const [years, setYears] = useState([]); // initialize a state for years' array
    const { user, isAuthenticated, isLoading } = useAuth0(); // import variables from useAuth0 hook
    const navigate = useNavigate(); //declare navigate as a function
    const { setFrench } = useContext(UserContext); 

    const handleClick = (e) => { // sets french as the language for about page
        setFrench(true);
        navigate("/about")
    }

    useEffect ( () => {
        if (user) // if user is logged in fetch years' array from username db collection
        fetch(`${process.env.REACT_APP_BACKEND_URL}/get-years/${user.name}`)
        .then(results => results.json())
        .then ( data => {
            if(data.status >= 300) {
                throw new Error(data.message);
            }
            else {
                setYears(data.data);
            }
        })
        .catch((error) => {
            navigate("/error");
        })
    }, [user])

    useEffect ( () => {
        if (!user) // if user is not logged in fetch years' array from concerts db collection
        fetch(`${process.env.REACT_APP_BACKEND_URL}/get-years`)
        .then(results => results.json())
        .then ( data => {
            if(data.status >= 300) {
                throw new Error(data.message);
            }
            else {
                setYears(data.data);
            }
        })
        .catch((error) => {
            navigate("/error");
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
                <About onClick={handleClick}>
                    <Span>À propos</Span>
                </About>
                <About onClick={() => {window.location.href = '/about';}}>
                    <Span>About</Span>
                </About>
            </Div>
            <UserMenu user={user} // pass down Auth0 hook variables and parent state to child component
                isAuthenticated={isAuthenticated}
                isLoading={isLoading}
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
    margin-right: 8px;
    display: flex;
    align-items: center;
    font-size: 12px;
    color: white;
    background-color: black;
    &:hover{
        cursor: pointer;
    }
`
const About = styled.button`
    padding: 0px;
    font-weight: 600;
    height: 28px;
    width: 60px;
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
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    width: 100vw ;
    box-sizing: border-box;
`

export default Header;