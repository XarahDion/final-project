import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import Form from "./Form";
import Travels from "./Travels";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// handles the state and fetches for the user profile page
const Profile = () => {
    const { user, isAuthenticated } = useAuth0();
    const [travelState, setTravelState] = useState(); // used to fetch travels in child component Travels on every state change
    const [formData, setFormData] = useState();
    const [updateErr, setUpdateErr] = useState(false);
    const [updateId, setUpdateId] = useState();
    const [postErr, setPostErr] = useState();
    const navigate = useNavigate(); //declare navigate as a function

    const handleUpdate = (e, formData) => { // modify existing travel
        e.preventDefault();
        // fetch on username (from Auth0 hook) and _id (set in fetch in handlePopulate in child component Travels)
        fetch(`/update-travel/${user.name}/${formData._id}`, { 
            method: "PATCH",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ // sends the data to the BE in key/value pairs
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
                setUpdateErr(true);
            } else {
                // toggle between setting travelState to city and _id to be able to update the same travel more than once in a row
                if (travelState === formData._id) {
                    setTravelState(formData.city);
                } else {
                    setTravelState(formData._id);
                }
                // on success, clear the form to view placeholders and clear updateId state to disable modify button
                setFormData("");
                setUpdateId("");
            }
        })
    }

    const handleRemove = (e, travel) => { // delete existing travel 
        e.preventDefault();
        e.stopPropagation();
        // fetch on username (from Auth0 hook) and _id (set in fetch in map method in child component Travels)
        fetch(`/delete-travel/${user.name}/${travel._id}`, {
            method: "DELETE"
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.status >= 300) {
                navigate("/error");
            } else {
                setTravelState(travel._id); // set travelState to refresh Travels component from useEffect hook
            }
        })
    }

    const handleSubmit = (e, formData) => { // add new travel to username db collection
        e.preventDefault();
        fetch('/travels', {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ // sends the data to the BE in key/value pairs
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
                setPostErr(data.message); // if the operation fails, set a state to notify user
            }
            else {
                setTravelState(data.data.insertedId); // set travelState to refresh Travels component from useEffect hook
                setFormData(""); // clear the Form
                setPostErr(null); // clear the post error message
            }
        })
        .catch((error) => {
            navigate("/error");
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
                    {/* the child components are passed the required states and functions*/}
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