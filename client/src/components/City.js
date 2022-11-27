import { useState, useEffect } from 'react';
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import logo from "../assets/loadingIcon.gif";

const City = () => {
    const [selectedCity, setSelectedCity] = useState(null);
    const {city, country} = useParams();

    console.log(selectedCity)

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

    return (
        <Div>
        {selectedCity ?
        <>
        <Banner src={selectedCity.included[0].attributes.image.full} alt={city} /> 
        <Title>{city}, {country}</Title>
        </>
        : <Logo src={logo} alt="loading" />}
        </Div>
    )
}

const Logo = styled.img`
    width: 50px;
    height: 50px;
`;

const Div = styled.div`

`
const Title = styled.div`
    font-family: var(--font-body);
    margin: 24px;
    font-size: 20px;
    font-weight: 600;
`
const Banner = styled.img`
    width: 100vw;
    height: 300px;
    object-fit: cover;
`

export default City;