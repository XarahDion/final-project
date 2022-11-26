import { useState, useEffect } from 'react';
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";

const City = () => {
    const [selectedCity, setSelectedCity] = useState(null);
    const {city, country} = useParams();

    useEffect ( () => {
        const handleCities = async () => {
            try {
            let res = await fetch(`/cities/${city}`)
            let data = await res.json()
            if (data.status === 400 || data.status === 500) {
                throw new Error(data.message);
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
        <>
        {selectedCity ? <Banner src={selectedCity.included[0].attributes.image.full} /> : <></>}
        </>
    )
}

const Banner = styled.img`
    width: 100vw;
    height: 300px;
    object-fit: cover;
`

export default City;