import {useAuth0} from "@auth0/auth0-react";
import styled from "styled-components";

const Profile = () => {
    const { user, isAuthenticated } = useAuth0();

    return (
        isAuthenticated && (
            <>
                <Span>{JSON.stringify(user)}</Span>
                <img src={user.picture} />
            </>
        )
    )
};


const Span = styled.span`

`

export default Profile;