import {useAuth0} from "@auth0/auth0-react";
import styled from "styled-components";
import Form from "./Form";
import Travels from "./Travels";

const Profile = () => {
    const { user, isAuthenticated } = useAuth0();

    const handleSubmit = (e, formData) => {
        e.preventDefault();
        fetch('/travels', {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ /// sends the data to the BE in key/value pairs
                username: user.name,
                date: formData.date,
                venue: formData.venue,
                city: formData.city,
                country: formData.country
            })
        })
        .then(res => res.json())
        .then((data) => {
            if(data.status >= 300) {
                window.alert(data.message);
            }
            else {
                console.log(data.data)
            }
        })
        .catch((error) => {
            window.alert(error);
        })
        }

    return (
        isAuthenticated && (  
            <> 
            <Div>
                <ImgDiv>
                    <Img src={user.picture} />
                    <Name>{user.name}</Name>
                </ImgDiv>
                {/* the Form component is passed the handleSubmit function */}
                <Form handleSubmit={handleSubmit} />
            </Div>
            <Travels />
            </> 
        )
    )
};

const Img = styled.img`
    border-radius: 5px;
    height: 150px;
`
const Logo = styled.img`
    width: 50px;
    height: 50px;
`

const Name = styled.div`
    font-weight: 600;
    margin-top: 12px;
    margin-bottom: -8px;
    font-size: 12px;
`
const Div = styled.div`
    display: flex;
    width: 100vw;
    justify-content: center;
    align-items: center;
    font-family: var(--font-body);
    margin-top: 24px;
`
const ImgDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
    border-radius: 5px;
    padding: 24px;
    height: 169px;
    width: 169px;
`

export default Profile;