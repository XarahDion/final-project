import { useState, useEffect } from 'react';
import styled from "styled-components";
import { useParams } from "react-router-dom";
import logo from "../assets/loadingIcon.gif";
import { useNavigate } from "react-router-dom";
import { FiActivity } from "react-icons/fi";
import Weather from './Weather';

// component displaying a city's picture, coordinates and "known for" tags retrieved from the RoadGoat API
const City = () => {
    const [selectedCity, setSelectedCity] = useState(null); // declare selectedCity state
    const { city, country } = useParams(); // use city + country as params from Travels (in list) or Home (in popup) components
    const [lon, setLon] = useState(); // declare longitude and latitude states
    const [lat, setLat] = useState();
    const newarr = []; // declare newarr which will contain "known_for" tags if they exists for selected city in RoadGoat data
    const navigate = useNavigate();

    if (selectedCity) { 
        selectedCity.included.forEach((item) => {
            if (item.type === "known_for") { // if "known_for" values exits, push in newarr
                newarr.push(item.attributes.name)
            }
        });
    }

    useEffect(() => { // manipulate the data received from RoadGoat to display the coordinates of selectedCity
        if (selectedCity) {
            if (selectedCity.data[0].attributes.bounding_box === null) { 
                setLon(selectedCity.data[0].attributes.longitude);
                setLat(selectedCity.data[0].attributes.latitude);
            } else { // if the coords come in bounding_box values, calculate the average betwen sw and ne values
                setLon(((selectedCity.data[0].attributes.bounding_box.sw_lon
                            +
                        selectedCity.data[0].attributes.bounding_box.ne_lon)
                        /2).toFixed(4));
                setLat(((selectedCity.data[0].attributes.bounding_box.sw_lat
                            +
                        selectedCity.data[0].attributes.bounding_box.ne_lat)
                        /2).toFixed(4));
            }
        }
    }, [selectedCity]); // fire everytime the selectedCity changes
    

    useEffect ( () => {
        const handleCities = async () => { // handle selectedCity data
            try {
            let res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/cities/${city}`) // first try fetching on city only
            let data = await res.json()
            if (data.status >= 300) {
                throw new Error(data.message);
            }
            if (data.data.included.length === 0 ) { // if the city doesn't include a photo, fetch on country
                res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/cities/${country}`)
                data = await res.json()
            }
            if (!data.data.data[0].relationships.featured_photo.data) { // another place to check for included photo
                res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/cities/${country}`)
                data = await res.json()
            }
            if (data.data.data.length === 0) { // if the city doesn't exist in RoadGoat API db, fetch on country
                res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/cities/${country}`)
                data = await res.json()
            }
            setSelectedCity(data.data);
            } catch (err) {
                // if there is a status >= 300 or if data returned is empty or in any other form, navigate to error page
                navigate("/error"); 
            }
        }
        handleCities();
    }, [])

    return (
        <Div>
        {selectedCity ? // wait for selectedCity
        <>
        {/* display the city or country picture */}
            <Banner src={selectedCity.included[0].attributes.image.full} alt={city} /> 
            <Title>{city}, {country}</Title>
            {newarr.length !== 0 ? // display the "known for" tags if they exist
            <Container>
                <FiDiv>
                    <FiActivity /><Span>Known For</Span><FiActivity />
                </FiDiv>
                <KnownFor>
                {newarr.map((item) => { // map on newarr in which we have pushed the "known for" tags
                    return (
                        <Span key={item}>{item}</Span>
                    )
                })}
                </KnownFor>
            </Container>
            : <></>}
            <Weather lat={lat} lon={lon} />
            <div className="sidebar"> 
            {/* display the longitude and latitude */}
                Longitude: {lon} | Latitude: {lat}
            </div>
        </>
        // show a loading state while waiting for selectedCity
        : <Logo src={logo} alt="loading" />}
        </Div>
    )
}

const FiDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`
const Span = styled.span`
    line-height: 20px;
    padding: 0px 8px;
    @media (max-width: 844px) {
        font-size: 10px;
    }
`
const Container = styled.div`
    background-color: rgba(35, 55, 75, 0.9);
    color: #fff;
    padding: 12px 12px;
    font-family: monospace;
    z-index: 1;
    position: absolute;
    top: 20%;
    left: 24px;
    border-radius: 4px;
    width: 285px;
    text-align: center;
    @media (max-width: 844px) {
        flex-direction: column;
        display: flex;
        top: 13%;
        left: 50%;
        transform: translate(-50%, 0%);
    }
`
const KnownFor = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 8px;
`
const Logo = styled.img`
    width: 50px;
    height: 50px;
    position: absolute;
    top: 50px;
    left: 50%;
    transform: translate(50%, 0%);
`
const Div = styled.div`
    position: fixed;
    top: 36px;
    @media (max-width: 844px) {
        position: static;
    }
`
const Title = styled.div`
    background-color: rgba(35, 55, 75, 0.9);
    color: #fff;
    padding: 6px 12px;
    font-family: monospace;
    z-index: 1;
    position: absolute;
    top: 24px;
    left: 24px;
    border-radius: 4px;
    text-align: center;
    width: 285px;
    @media (max-width: 844px) {
        top: 46px;
        left: 50%;
        transform: translate(-50%, 0%);
        font-size: 12px;
    }
`
const Banner = styled.img`
    width: 100vw;
    height: 100vh;
    object-fit: cover;
`

export default City;