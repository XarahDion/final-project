import { useRef, useEffect, useState, useContext } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { UserContext } from './UserContext';
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN

const Home = () =>{
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [coords, setCoords] = useState([9.1829, 48.7758]);
    const [zoom, setZoom] = useState(7);
    const [bearing, setBearing] = useState(0);
    const [pitch, setPitch] = useState(65);
    const { travels, selectedYear } = useContext(UserContext)

    useEffect(() => {
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [-73.5698065, 45.5031824],
            zoom: zoom,
            bearing: bearing,
            pitch: pitch
        });
        const nav = new mapboxgl.NavigationControl({
            visualizePitch: true,
        });
        map.current.addControl(nav, 'top-right');
        new mapboxgl.Marker({
            color: "black",
            scale: 0.75
        })
        .setLngLat([-73.5698065, 45.5031824])
        .addTo(map.current)
        .setPopup(new mapboxgl.Popup({
            closeButton: false,
            offset: 26
        })
        .setHTML(`<form action=/cities/Montreal/Canada >
                    <button id=Montreal type="submit">Montreal</button>
                </form>`)
        )
    }, [selectedYear]);

    useEffect(() => {
        if (travels) {
            map.current.flyTo({
                center: travels[1].coordinates,
                duration: 12000, // Animate over 12 seconds
                essential: true,
                zoom: 3.5,
                pitch: 0,
            })
        Object.values(travels).map((travel) => {
            if (travel.city !== "Montreal")
            return new mapboxgl.Marker({
                color: "black",
                scale: 0.75
            })
            .setLngLat(travel.coordinates)
            .addTo(map.current)
            .setPopup(new mapboxgl.Popup({
                closeButton: false,
                offset: 26
            })
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