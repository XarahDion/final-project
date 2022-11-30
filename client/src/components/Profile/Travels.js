import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import { useEffect, useState } from "react";
import logo from "../../assets/loadingIcon.gif";
import { useNavigate } from "react-router-dom";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const Travels = ({ travelState, handleRemove, setFormData, formData }) => {
    const [error, setError] = useState(false);
    const { user } = useAuth0();
    const [travels, setTravels] = useState();
    const navigate = useNavigate();

    const handlePopulate = (e, travel) => {
        e.preventDefault();
        e.stopPropagation();
        fetch(`/get-travel/${user.name}/${travel._id}`)
        .then(results => results.json())
        .then ( data => {
            if(data.status >= 300) {
                throw new Error(data.message);
            }
            else {
                setFormData(data.data);
                console.log(data.data)
            }
        })
        .catch((error) => {
            setError(true);
        })
        }

    const handleClick = (e, travel) => {
        e.preventDefault();
        e.stopPropagation();
        navigate(`/cities/${travel.city}/${travel.country}`)
    }

    useEffect ( () => {
        if (user) {
        fetch(`/get-travels/${user.name}`)
        .then(results => results.json())
        .then ( data => {
            if(data.status >= 300) {
                throw new Error(data.message);
            }
            else {
                setTravels(data.data);
            }
        })
        .catch((error) => {
            setError(true);
        })
        }
    }, [ user, travelState, formData])

    return (
        <Main>
            {travels?
                <Container>
                <Name>Travel Collection</Name>
                {Object.values(travels).map((travel) => {
                    return (
                        <Tippy content={<Span>Go to {travel.city}, {travel.country} page</Span>}>
                        <TravelDiv key={travel._id} onClick={(e) => handleClick(e, travel)}>
                            <Div>{travel.date}</Div>
                            <Div>{travel.venue}</Div>
                                <CityDiv > {travel.city} </CityDiv>
                            <Div>{travel.country}</Div>
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
            : <Logo src={logo} alt="loading" />}
        </Main>
    )
}

const Span = styled.span`
    font-size: 11px;
    font-family: var(--font-body);
`

const BtnDiv = styled.div`
    display: flex;
    justify-content: space-between;
    width: 70px;
`
const Btn = styled.button`
    padding: 0px 5px;
    border-radius: 5px;
    font-size: 11px;
    font-weight: 200;
    align-self: center;
    height: 20px;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
    &:hover{
        cursor: pointer;
        background-color: white;
    }
`
const Div= styled.div`
    display: flex;
    justify-content: flex-start;
    width: 150px;
`

const CityDiv= styled.div`
    display: flex;
    justify-content: flex-start;
    width: 150px;
`
const Name = styled.div`
    font-weight: 600;
    font-size: 12px;
    margin-bottom: 10px;
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
    margin: 34px 0px;
`

const Container = styled.div`
    width: 700px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
    border-radius: 5px;
    padding: 24px;
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
    }
`
export default Travels