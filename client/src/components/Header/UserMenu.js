import { Link } from "react-router-dom";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import avatar from "../../assets/avatar.jpg";
import styled from "styled-components";
import Dropdown from "./Dropdown";

const UserMenu = ({user, isAuthenticated, isLoading, years}) => {

    return (
        <>
        {isLoading? <Greet></Greet> // if loading, do not display the optional dropdown and buttons
        :<>
        <Dropdown user={user} // pass down props to child component
            isAuthenticated={isAuthenticated}
            isLoading={isLoading}
            years={years} />
        <Div>
        {isAuthenticated ? // if user is authenticated display profile and log out button
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
        {/* if user is not authenticated display all concerts and log in button */}
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
    justify-content: center;
    gap: 8px;
`
const Greet = styled.button`
    font-weight: 600;
    height: 28px;
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