import { useRef, useEffect, useState, useContext } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { UserContext } from './UserContext';
mapboxgl.accessToken = 'pk.eyJ1IjoieGFyYWgiLCJhIjoiY2xhdHp2MDYwMDFuMzNvcHI5Mm9naTM4dCJ9.COQGEwQjZcwIphfpGORnbQ'


const Home = () =>{
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [coords, setCoords] = useState([-71.254028, 46.829853]);
    const [zoom, setZoom] = useState(4);
    const { travels } = useContext(UserContext)

    useEffect(() => {
        if (travels) {
        setCoords(travels[6].coordinates)
        Object.values(travels).forEach((travel) => {
            new mapboxgl.Marker({
                color: "black",
                scale: 0.75
            })
            .setLngLat(travel.coordinates)
            .addTo(map.current)
        })}
    })

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: coords,
            zoom: zoom
        });
    });

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