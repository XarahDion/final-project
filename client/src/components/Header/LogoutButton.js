import {useAuth0} from "@auth0/auth0-react";
import { FiLogOut } from "react-icons/fi";
import styled from "styled-components";

const LogoutButton = () => {
    const { logout, isAuthenticated } = useAuth0();

    return (
        isAuthenticated && (
            <Logout onClick={() => logout()}>
                <Span>Logout</Span>
                <FiLogOut/>
            </Logout>
        )
    )
};

const Span = styled.div`
    font-weight: 600;
    margin-right: 2px;
`

const Logout= styled.button`
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
export default LogoutButton