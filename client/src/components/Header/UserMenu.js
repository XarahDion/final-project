import { Link, useLocation } from "react-router-dom";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import avatar from "../../assets/avatar.jpg";
import styled from "styled-components";
import Dropdown from "./Dropdown";

const UserMenu = ({user, isAuthenticated, isLoading, years, handleYears}) => {

    return (
        <>
        {isLoading? <Greet></Greet>
        :<>
        <Dropdown user={user}
            isAuthenticated={isAuthenticated}
            isLoading={isLoading}
            years={years}
            handleYears={handleYears} />
        
        <Div>
        {isAuthenticated ? 
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
        :<>
        <Profile to="/concerts">
            <Greet>
                All Concerts
                <Img async="on" src={avatar} alt="Xarah" />
            </Greet>
        </Profile>
        <LoginButton />
        </>
        }
        </Div>
        </>}
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
    width: 170px;
    display: flex;
    align-items: center;
    font-size: 12px;
    color: white;
    background-color: black;
    &:hover{
        cursor: pointer;
    }
`

export default UserMenu;