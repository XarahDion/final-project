import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from '../hooks/UserContext';
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import {useAuth0} from "@auth0/auth0-react";
import logo from "../../assets/loadingIcon.gif";
import { FiGlobe } from "react-icons/fi";

const Header = () =>{
    const [years, setYears] = useState([]);
    const { handleYears } = useContext(UserContext)
    const { user, isAuthenticated } = useAuth0();

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

    return (
        <Wrapper>
            <Div>
                <Greet onClick={() => {window.location.href = '/';}}>
                    <FiGlobe /> 
                    <Span>Earth Trotter</Span>
                </Greet>
            </Div>
            <Container>
                {useLocation().pathname === "/" ?
                <label>
                    {user? `${user.name} Travels :` : "Xarah Dion Concerts :"}
                    <Select onChange={handleYears}>
                    <option value="">Select a year...</option>
                    {!years
                    ? <h1>Loading...</h1>
                    : years.map ((year) => {
                        return  (
                            <>
                            <option value={year}>{year}</option>
                            </>
                        )
                    })
                    }
                    </Select>
                </label>
                :<></>}
            </Container>
            <Div>
                {isAuthenticated ? 
                <>
                <Profile async="on" to="/profile">
                    <Greet>
                        {user.name}
                        {user?.picture && 
                        <Img src={user.picture} alt={user?.name} />
                        }
                    </Greet>
                </Profile>
                <LogoutButton />
                </>
                :<></>}
                {/* // : <Logo src={logo} alt="loading" />} */}
                <LoginButton />
            </Div>
        </Wrapper>
    )
};

const Profile = styled(Link)`
    cursor: pointer;
`

const Logo = styled.img`
    width: 40px;
    height: 40px;
`;

const Img = styled.img`
    border-radius: 50%;
    height: 20px;
    margin-left: 5px;
`

const Div = styled.div`
    display:flex;
    align-items: center;
    gap: 8px;
`

const Greet = styled.button`
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 8px;
    border-radius: 5px;
    font-size: 12px;
    color: white;
    background-color: black;
    &:hover{
        cursor: pointer;
        transition: 0.25s;
    }
`

const Select = styled.select`
    padding: 1px;
    margin-left: 5px;
    border-radius: 5px;
`
const Container = styled.div`
    display: flex;
    flex-direction: column;
`
const Span = styled.p`
    margin-left: 6px;
`

const Wrapper = styled.div`
    font-size: 12px;
    font-weight: 600;
    padding: 4px 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: black;
`

export default Header;