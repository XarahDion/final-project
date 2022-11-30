import { useState, useEffect } from 'react';
import styled from "styled-components";
import { useParams } from "react-router-dom";
import logo from "../assets/loadingIcon.gif";

const City = () => {
    const [selectedCity, setSelectedCity] = useState(null);
    const {city, country} = useParams();
    const newarr = []

    if (selectedCity) {
        selectedCity.included.forEach((item) => {
            if (item.type === "known_for") {
                newarr.push(item.attributes.name)
            }
        })
    }

    useEffect ( () => {
        const handleCities = async () => {
            try {
            let res = await fetch(`/cities/${city}`)
            let data = await res.json()
            if (data.status === 400 || data.status === 500) {
                throw new Error(data.message);
            }
            if (data.data.included.length === 0 ) {
                res = await fetch(`/cities/${country}`)
                data = await res.json()
            }
            if (!data.data.data[0].relationships.featured_photo.data) {
                res = await fetch(`/cities/${country}`)
                data = await res.json()
            }
            if (data.data.data.length === 0) {
                res = await fetch(`/cities/${country}`)
                data = await res.json()
            }
            setSelectedCity(data.data)
            } catch (err) {
                console.log(err)
            }
        }
        handleCities()
    }, [])
    console.log(selectedCity)
    return (
        <Div>
        {selectedCity ?
        <>
            <Banner async="on" src={selectedCity.included[0].attributes.image.full} alt={city} /> 
            <Title>{city}, {country}</Title>
            <Container>
                {newarr.length !== 0 ?
                <KnownDiv>
                    <Span>Known for :</Span>
                    <KnownFor>
                    {newarr.map((item) => {
                        return (
                            <Span>• {item}</Span>
                        )
                    })}
                    </KnownFor>
                </KnownDiv>
                : <></>
                }
            </Container>
        </>
        : <Logo src={logo} alt="loading" />}
        </Div>
    )
}

const KnownDiv = styled.div`
    margin: 24px 10px;
`
const Span = styled.span`
    line-height: 20px;
`
const Container = styled.div`
    font-family: var(--font-body);
    font-weight: bold;
    position: absolute;
    top: 50%;
    left: 24px;
    transform: translate(0%, -50%);
    background: rgba(204, 204, 204, 0.7);
    width: 200px;
    border-radius: 6px;
    text-align: center;
`
const KnownFor = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 12px;
`
const Logo = styled.img`
    width: 50px;
    height: 50px;
`;

const Div = styled.div`
    position: fixed;
`
const Title = styled.div`
    font-family: var(--font-body);
    font-size: 16px;
    font-weight: 600;
    font-family: var(--font-body);
    font-weight: bold;
    position: absolute;
    top: 24px;
    left: 24px;
    background: rgba(204, 204, 204, 0.7);
    width: 200px;
    padding: 10px 0px;
    border-radius: 6px;
    text-align: center;
`
const Banner = styled.img`
    width: 100vw;
    height: 100vh;
    object-fit: cover;
`

export default City;