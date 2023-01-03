import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import { useEffect, useState } from "react";
import logo from "../../assets/loadingIcon.gif";
import { useNavigate } from "react-router-dom";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const Travels = ({ travelState, handleRemove, setFormData, setUpdateId, setUpdateErr }) => {
    const [error, setError] = useState(false);
    const { user } = useAuth0();
    const [travels, setTravels] = useState();
    const navigate = useNavigate();

    const handlePopulate = (e, travel) => { // fired by the modify button 
        e.preventDefault(); //prevent default behavior
        e.stopPropagation(); // this will stop the parent component's event from firing. 
        // fetch on username (from Auth0 hook) and _id (set in fetch in map method in child component Travels)
        fetch(`${process.env.REACT_APP_BACKEND_URL}/get-travel/${user.name}/${travel._id}`)
        .then(results => results.json())
        .then ( data => {
            if(data.status >= 300) {
                throw new Error(data.message);
            }
            else {
                setFormData(data.data); // populates the form with the data received from the BE
                setUpdateErr(false); 
                setUpdateId(travel._id);
            }
        })
        .catch((error) => {
            setError(true);
            navigate("/error"); // send user to error page if fetch error happens
        })
        }

    const handleClick = (e, travel) => {
        e.preventDefault();
        // navigate to dedicated city page by querying on city and country (RoadGoat API uses country as fallback option)
        navigate(`/cities/${travel.city}/${travel.country}`); 
    }

    useEffect ( () => {
        if (user) { // wait for the user to be set
        fetch(`${process.env.REACT_APP_BACKEND_URL}/get-travels/${user.name}`) // fetch on username
        .then(results => results.json())
        .then ( data => {
            if(data.status >= 300) {
                throw new Error(data.message);
            }
            else {
                setTravels(data.data); // set the travels array
            }
        })
        .catch((error) => {
            setError(true);
            navigate("/error"); // send user to error page if fetch error happens
        })
        }
    }, [ user, travelState]); // fire the useEffect everytime the travelState changes to display the up to date travels

    return (
        <Main>
            {travels? // wait for travels state to be set
                <Container>
                <Name>Travel Collection</Name>
                {/* if there are no travels in username collection, invite user to add travel */}
                {travels.length === 0 ? <Err>Please add travel to collection.</Err> : <></>}
                {Object.values(travels).map((travel) => {
                    return (
                        <Tippy  key={travel._id} content={<Span>Go to {travel.city}, {travel.country}</Span>}>
                        <TravelDiv onClick={(e) => handleClick(e, travel)}>
                            <Div>{travel.date}</Div>
                            <Div>{travel.venue}</Div>
                            <Div >{travel.city}, {travel.country}</Div>
                            <BtnDiv>
                                <Tippy content={<Span>Modify Travel</Span>}>
                                    <Btn onClick={(e) => handlePopulate(e, travel)}> Modify </Btn>
                                </Tippy>
                                <Tippy content={<Span>Delete Travel</Span>}>
                                    <Btn onClick={(e) => handleRemove(e, travel)}> X </Btn>
                                </Tippy>
                            </BtnDiv>
                        </TravelDiv>
                        </Tippy>
                    )
                })}
                </Container>
            // display loading state while we wait for travels
            : <Logo src={logo} alt="loading" />} 
        </Main>
    )
}

const Err = styled.div`
    color: red ;
    height: 10px;
    font-size: 10px;
`
const Span = styled.span`
    font-size: 11px;
    font-family: var(--font-body);
`
const BtnDiv = styled.div`
    display: flex;
    justify-content: space-between;
    width: 80px;
    @media (max-width: 844px) {
        justify-content: flex-end;
        gap: 5px;
        margin-right: 2px;
    }
`
const Btn = styled.button`
    padding: 0px 6px;
    border-radius: 5px;
    font-size: 11px;
    font-weight: 200;
    color: black;
    background-color: white;
    align-self: center;
    height: 20px;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
    &:hover{
        cursor: pointer;
        background-color: white;
        transition: 0.5s;
    }
    @media (max-width: 844px) {
        font-size: 10px;
        padding: 4px;
        height: 16px;
    }
`
const Div= styled.div`
    display: flex;
    justify-content: flex-start;
    width: 150px;
    @media (max-width: 844px) {
        width: 80px;
        padding: 5px;
    }
`
const Name = styled.div`
    font-weight: 600;
    font-size: 13px;
    margin-bottom: 10px;
    @media (max-width: 844px) {
        font-size: 11px;
        margin-bottom: 5px;
    }
`
const Logo = styled.img`
    width: 40px;
    height: 40px;
`
const Main = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: var(--font-body);
    margin: 24px 0px;
    @media (max-width: 844px) {
        margin: 2px;
    }
`
const Container = styled.div`
    width: 700px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
    border-radius: 5px;
    padding: 24px;
    @media (max-width: 844px) {
        width: auto;
        padding: 12px;
        align-items: center;
        margin-bottom: 10px;
    }
`
const TravelDiv= styled.div`
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
    border-radius: 5px;
    &:hover {
        cursor: pointer;
        background-color: #F0F0F0;
        transition: 0.5s;
    }
    @media (max-width: 844px) {
        width: 300px;
        padding: 4px;
        font-size: 10px;
    }
`
export default Travels