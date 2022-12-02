import {useAuth0} from "@auth0/auth0-react";
import { FiLogIn } from "react-icons/fi";
import styled from "styled-components";

const LoginButton = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();

    return (
        !isAuthenticated && (
            <Login onClick={() => loginWithRedirect()}>
                <Span>Sign In </Span>
                <FiLogIn/>
            </Login>
        )
    )
};

const Span = styled.p`
    font-weight: 600;
`

const Login= styled.button`
    height: 28px;
    width: 80px;
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

export default LoginButton