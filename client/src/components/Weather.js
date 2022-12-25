import styled from "styled-components";
import { useEffect, useState } from "react";
import logoAnimation from "../assets/loadingIcon.gif";

const Weather = ({lat, lon}) => {
    const [weatherData, setWeatherData] = useState(null);
    const [logo, setLogo] = useState(null);

    useEffect (() => {
        if (lat && lon) {
            fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.REACT_APP_WEATHER_KEY}`)
            .then(results => results.json())
            .then ( data => {
                if(data.status >= 300) {
                    throw new Error(data.message);
                }
                else {
                    setWeatherData(data);
                    setLogo(data.current.weather[0].icon);
                    console.log(data)
                }
            })
            .catch((error) => {
            console.log('error', error.message);
        });
        } 
    }, [lat, lon])

    return (
    <>
        <Title>Current Weather</Title>
        <Details>
        {weatherData && logo?
        <>
        <ImgDiv>
            <Img loading="lazy" decoding="async" src={`https://openweathermap.org/img/wn/${logo}@2x.png`}/>
            <Temp>{Math.round(weatherData.current.temp)}°C </Temp>
        </ImgDiv>
        <Container>
        <Left>
            <Div>DAILY HIGH <p>{Math.round(weatherData.daily[0].temp.max)} °C </p></Div>
            <Div>DAILY LOW <p>{Math.round(weatherData.daily[0].temp.min)} °C </p></Div>
        </Left>
        <Right>
            <Div>WIND SPEED <p>{Math.round((weatherData.current.wind_speed)*3.6)} km/h</p></Div>
            <Div>HUMIDITY <p>{weatherData.daily[0].humidity} %</p></Div>
        </Right>
        </Container>
        </>
        :<Logo src={logoAnimation} alt="loading" />}
        </Details>
    </>
        )
};

const Title = styled.div`
    background-color: rgba(35, 55, 75, 0.9);
    color: #fff;
    padding: 6px 12px;
    font-family: monospace;
    z-index: 1;
    position: absolute;
    top: 24px;
    right: 24px;
    border-radius: 4px;
    text-align: center;
    width: 285px;
`
const Container = styled.div`
    display: flex;
    margin-top: 12px;
`
const Left = styled.div`
    display: flex;
    flex-direction: column;
`
const Right = styled.div`
    display: flex;
    flex-direction: column;
`
const Div = styled.div`
    font-size: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 50px;
    padding: 10px;
    margin: 0px 10px 10px 10px;
`
const Logo = styled.img`
    width: 50px;
    height: 50px;
    margin: 24px;
`
const Temp = styled.div`
    font-size: 26px;
`
const ImgDiv = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const Img = styled.img`
`
const Details = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgba(35, 55, 75, 0.9);
    color: #fff;
    padding: 12px 12px;
    font-family: monospace;
    z-index: 1;
    position: absolute;
    top: 20%;
    right: 24px;
    border-radius: 4px;
    width: 285px;
    text-align: center;
`
export default Weather;