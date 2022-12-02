import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import Form from "./Form";
import Travels from "./Travels";
import { useState } from "react";

const Profile = () => {
    const { user, isAuthenticated } = useAuth0();
    const [travelState, setTravelState] = useState();
    const [formData, setFormData] = useState();
    const [updateErr, setUpdateErr] = useState(false);
    const [updateId, setUpdateId] = useState();
    const [postErr, setPostErr] = useState();

    const handleUpdate = (e, formData) => {
        e.preventDefault();
        fetch(`/update-travel/${user.name}/${formData._id}`, {
            method: "PATCH",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ /// sends the data to the BE in key/value pairs
                date: formData.date,
                venue: formData.venue,
                city: formData.city,
                country: formData.country,
            })
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.status >= 300) {
                setPostErr(data.message)
            } else if (data.data.modifiedCount === 0) {
                setUpdateErr(true)
            } else {
                setTravelState(formData._id)
                setFormData("")
                setUpdateId("")
            }
        })
    }

    const handleRemove = (e, travel) => {
        e.preventDefault();
        e.stopPropagation();
        fetch(`/delete-travel/${user.name}/${travel._id}`, {
            method: "DELETE"
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.status >= 300) {
                console.log(data.message)
            } else {
                setTravelState(travel._id)
            }
        })
    }

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
            if (data.status >= 300) {
                setPostErr(data.message);
            }
            else {
                setTravelState(data.data.insertedId);
                setFormData("");
                setPostErr(null);
            }
        })
        .catch((error) => {
            window.alert(error);
        })
    }

    return (
        isAuthenticated && (  
            <Main> 
                <Div>
                    <ImgDiv>
                        <Img async="on" src={user.picture} />
                        <Name>{user.name}'s Profile</Name>
                    </ImgDiv>
                    {/* the Form component is passed the handleSubmit function */}
                    <Form handleSubmit={handleSubmit}
                        formData={formData}
                        setFormData={setFormData}
                        handleUpdate={handleUpdate}
                        updateErr={updateErr}
                        updateId={updateId}
                        postErr={postErr}
                        setPostErr={setPostErr} />
                </Div>
                <Travels travelState={travelState}
                        handleRemove={handleRemove}
                        handleUpdate={handleUpdate}
                        setFormData={setFormData}
                        formData={formData}
                        setUpdateErr={setUpdateErr}
                        setUpdateId={setUpdateId} />
            </Main> 
        )
    )
};

const Main =styled.div`
    overflow-x: hidden;
    
`
const Img = styled.img`
    border-radius: 5px;
    height: 150px;
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
    margin-top: 26px;
`
const ImgDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
    border-radius: 5px;
    padding: 24px;
    height: 185px;
    width: 169px;
`

export default Profile;