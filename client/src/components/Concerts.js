import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import { useEffect, useState } from "react";
import logo from "../assets/loadingIcon.gif";
import { useNavigate } from "react-router-dom";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const Concerts = () => {
    const [error, setError] = useState(false);
    const [concerts, setConcerts] = useState();
    const navigate = useNavigate();
    
    const handleClick = (e, concert) => {
        e.preventDefault();
        e.stopPropagation();
        navigate(`/cities/${concert.city}/${concert.country}`)
    }

    useEffect ( () => {
        fetch(`/concerts`)
        .then(results => results.json())
        .then ( data => {
            if(data.status >= 300) {
                throw new Error(data.message);
            }
            else {
                setConcerts(data.data);
            }
        })
        .catch((error) => {
            setError(true);
        })
    }, [])

    return (
        <Main>
            {concerts?
                <Container>
                <Name>Concert Collection</Name>
                {Object.values(concerts).map((concert) => {
                    return (
                        <Tippy key={concert._id} content={<Span>Go to {concert.city}, {concert.country}</Span>}>
                        <TravelDiv onClick={(e) => handleClick(e, concert)}>
                            <Div>{concert.date}</Div>
                            <Div>{concert.venue}</Div>
                            <Div >{concert.city}, {concert.country}</Div>
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

const Div= styled.div`
    display: flex;
    justify-content: flex-start;
    width: 160px;
`
const Name = styled.div`
    font-weight: 600;
    font-size: 13px;
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
    margin: 24px 0px;
`
const Container = styled.div`
    width: 500px;
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
        transition: 0.5s;
    }
`
export default Concerts;