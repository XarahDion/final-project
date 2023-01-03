import {useAuth0} from "@auth0/auth0-react";
import { FiLogIn } from "react-icons/fi";
import styled from "styled-components";

const LoginButton = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();

    return (
        !isAuthenticated && (
            <Login onClick={() => loginWithRedirect()}>
                <Span>Login</Span>
                <FiLogIn/>
            </Login>
        )
    )
};

const Span = styled.div`
    font-weight: 600;
    margin-right: 2px;
`

const Login= styled.button`
    height: 28px;
    width: 74px;
    justify-content: center;
    padding: 0px 8px;
    border-radius: 5px;
    background-color: black;
    &:hover{
        cursor: pointer;
        transition: 0.25s;
    }
    @media (max-width: 844px) {
        width: 50px;
        padding: 0px;
    }
`

export default LoginButton