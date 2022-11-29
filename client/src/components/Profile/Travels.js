import {useAuth0} from "@auth0/auth0-react";
import styled from "styled-components";
import { useEffect, useState} from "react";
import logo from "../../assets/loadingIcon.gif";
import { useNavigate } from "react-router-dom";

const Travels = () => {
    const [error, setError] = useState(false);
    const { user, isAuthenticated } = useAuth0();
    const [travels, setTravels] = useState();
    const navigate = useNavigate();

    const handleClick = (e, travel) => {
        e.preventDefault();
        navigate(`/cities/${travel.city}/${travel.country}`)
    }
    
    useEffect ( () => {
        if (user) {
        fetch(`/get-travels/${user.name}`)
        .then(results => results.json())
        .then ( data => {
            if(data.status === 400 || data.status === 500) {
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
    }, [ user])

    return (
        <Main>
            {travels?
                <Container>
                <Name>{user.name} Travel Collection</Name>
                {Object.values(travels).map((travel) => {
                    return (
                        <TravelDiv onClick={(e) => handleClick(e, travel)} key={travel._id}>
                            <Div>{travel.date}</Div>
                            <Div>{travel.venue}</Div>
                            <Div>{travel.city}</Div>
                            <Div>{travel.country}</Div>
                        </TravelDiv>
                    )
                })
                }
                </Container>
            : <Logo src={logo} alt="loading" />}
        </Main>
    )
}

const Div= styled.div`
    display: flex;
    justify-content: flex-start;
    /* border: 1px solid red; */
    width: 150px;
`
const Name = styled.div`
    font-weight: 600;
    font-size: 12px;
    margin-bottom: 20px;
`

const Logo = styled.img`
    width: 40px;
    height: 40px;
`;

const Main = styled.div`
    display: flex;
    width: 100vw;
    justify-content: center;
    align-items: center;
    font-family: var(--font-body);
    margin-top: 34px;
`
const Container = styled.div`
    width: 700px;
    display: flex;
    flex-direction: column;
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
    }
`
export default Travels