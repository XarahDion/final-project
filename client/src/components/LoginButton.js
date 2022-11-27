import {useAuth0} from "@auth0/auth0-react";
import { CiUser } from "react-icons/ci";
import styled from "styled-components";

const LoginButton = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();

    return (
        !isAuthenticated && (
            <Login onClick={() => loginWithRedirect()}>
                <Span>Sign In </Span>
                <CiUser/>
            </Login>
        )
    )
};

const Span = styled.p`
    margin-right: 8px;
`

const Login= styled.button`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 12px;
    border-radius: 5px;
    font-size: 14px;
    &:hover{
        cursor: pointer;
    }
`

export default LoginButton