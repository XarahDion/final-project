import styled from "styled-components";
import { useEffect, useState } from "react";
import logo from "../assets/loadingIcon.gif";
import { useNavigate } from "react-router-dom";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import Pagination from "./Pagination";

const Concerts = () => {
    const [error, setError] = useState(false);
    const [concerts, setConcerts] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [concertsPerPage] = useState(12);
    const indexOfLastConcert = currentPage * concertsPerPage;
    const indexOfFirstConcert = indexOfLastConcert - concertsPerPage;
    const navigate = useNavigate();
    
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleClick = (e, concert) => {
        e.preventDefault();
        e.stopPropagation();
        navigate(`/cities/${concert.city}/${concert.country}`)
    };

    useEffect ( () => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/concerts`)
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
            navigate("/error"); // send user to error page if fetch error happens
        })
    }, []);

    return (
        <Main>
            {concerts?
                <Container>
                <Name>Xarah Dion Concert Collection</Name>
                {Object.values(concerts.slice(indexOfFirstConcert, indexOfLastConcert)).map((concert) => {
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
                <Pagination
                    concertsPerPage={concertsPerPage}
                    totalConcerts={concerts.length}
                    paginate={paginate} />
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
    @media (max-width: 844px) {
        width: 110px;
        font-size: 10px;
    }
`
const Name = styled.div`
    font-weight: 600;
    font-size: 13px;
    margin-bottom: 6px;
    @media (max-width: 844px) {
        font-size: 11px;
    }
`
const Logo = styled.img`
    width: 40px;
    height: 40px;
    margin: 24px;
`
const Main = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: var(--font-body);
    position: absolute;
    top: 36px;
    left: 50%;
    transform: translate(-50%, -0%);
`
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
    border-radius: 5px;
    padding: 24px 36px;
    margin-top: 24px;
    background-color: white;
    @media (max-width: 844px) {
        box-shadow: none;
        padding: 0;
        gap: 10px;
        margin: 12px 0px 0px 0px;
    }
`
const TravelDiv= styled.div`
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 24px;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
    border-radius: 5px;
    &:hover {
        cursor: pointer;
        background-color: #F0F0F0;
        transition: 0.5s;
    }
    @media (max-width: 844px) {
        padding: 10px;
        font-size: 11px;
    }
`
export default Concerts;