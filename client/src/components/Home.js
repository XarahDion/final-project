import { useRef, useEffect, useState, useContext } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { UserContext } from './UserContext';
import { useNavigate } from "react-router-dom";
mapboxgl.accessToken = "pk.eyJ1IjoieGFyYWgiLCJhIjoiY2xhdHp2MDYwMDFuMzNvcHI5Mm9naTM4dCJ9.COQGEwQjZcwIphfpGORnbQ"

const Home = ({selectedYear}) =>{
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [coords, setCoords] = useState([9.1829, 48.7758]);
    const [zoom, setZoom] = useState(4);
    const { travels } = useContext(UserContext)
    const navigate = useNavigate();

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: coords,
            zoom: zoom
        });
        const nav = new mapboxgl.NavigationControl({
            visualizePitch: true,
        });
        map.current.addControl(nav, 'top-right');
    });

    useEffect(() => {
        if (travels) {
            console.log("travels in home", travels)
        Object.values(travels).forEach((travel) => {
            new mapboxgl.Marker({
                color: "black",
                scale: 0.75
            })
            .setLngLat(travel.coordinates)
            .addTo(map.current)
            .setPopup(new mapboxgl.Popup({ className: "popup", closeButton: false, offset: 26 })
                .setHTML(`<form action=/cities/${travel.city}/${travel.country} >
                            <button id=${travel.city} type="submit">${travel.city}</button>
                        </form>`)
                )
        })
        }
    }, [travels])

    return (
        <>
        <div className="sidebar">
            Longitude: {coords[0]} | Latitude: {coords[1]} | Zoom: {zoom}
        </div>
        <div ref={mapContainer} className="map-container" />
        </>
    )
}

export default Home;