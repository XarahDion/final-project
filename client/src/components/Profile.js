import {useAuth0} from "@auth0/auth0-react";
import styled from "styled-components";

const Profile = () => {
    const { user, isAuthenticated } = useAuth0();

    return (
        isAuthenticated && (
            <>
            <Span>{JSON.stringify(user)}</Span>
            <Img src={user.picture} />
            </>
        )
    )
};

const Img = styled.img`
    border-radius: 50px;
`
const Span = styled.span`
`

export default Profile;