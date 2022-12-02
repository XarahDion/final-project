import { useState, useEffect } from 'react';
import styled from "styled-components";
import { useParams } from "react-router-dom";
import logo from "../assets/loadingIcon.gif";
import { useNavigate } from "react-router-dom";

const City = () => {
    const [selectedCity, setSelectedCity] = useState(null);
    const {city, country} = useParams();
    const [lon, setLon] = useState();
    const [lat, setLat] = useState();
    const newarr = []
    const navigate = useNavigate();

    if (selectedCity) {
        selectedCity.included.forEach((item) => {
            if (item.type === "known_for") {
                newarr.push(item.attributes.name)
            }
        });
    }

    useEffect(() => {
        if (selectedCity){
            if (selectedCity.data[0].attributes.bounding_box === null) {
                setLon(selectedCity.data[0].attributes.longitude)
                setLat(selectedCity.data[0].attributes.latitude)
            } else {
                setLon((selectedCity.data[0].attributes.bounding_box.sw_lon + selectedCity.data[0].attributes.bounding_box.ne_lon)/2)
                setLat((selectedCity.data[0].attributes.bounding_box.sw_lat + selectedCity.data[0].attributes.bounding_box.ne_lat)/2)
            }
        }
    }, [selectedCity])
    

    useEffect ( () => {
        const handleCities = async () => {
            try {
            let res = await fetch(`/cities/${city}`)
            let data = await res.json()
            if (data.status >= 300) {
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
                navigate("/error")
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
            {newarr.length !== 0 ?
            <Container>
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
            
            </Container>
            : <></>}
            <div className="sidebar">
                Longitude: {lon} | Latitude: {lat}
            </div>
        </>
        : <Logo src={logo} alt="loading" />}
        </Div>
    )
}

const KnownDiv = styled.div`
    margin: 4px 10px;
`
const Span = styled.span`
    line-height: 20px;
`
const Container = styled.div`
    background-color: rgba(35, 55, 75, 0.9);
    color: #fff;
    padding: 6px 12px;
    font-family: monospace;
    z-index: 1;
    position: absolute;
    top: 25vh;
    left: 0;
    margin-left: 24px;
    border-radius: 4px;
    width: 200px;
`
const KnownFor = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 40px;
`
const Logo = styled.img`
    width: 50px;
    height: 50px;
    margin: 24px;
`
const Div = styled.div`
    position: fixed;
`
const Title = styled.div`
    background-color: rgba(35, 55, 75, 0.9);
    color: #fff;
    padding: 6px 12px;
    font-family: monospace;
    z-index: 1;
    position: absolute;
    top: 4vh;
    left: 0;
    margin: 12px 24px;
    border-radius: 4px;
    text-align: center;
    width: 200px;
`
const Banner = styled.img`
    width: 100vw;
    height: 100vh;
    object-fit: cover;
`

export default City;