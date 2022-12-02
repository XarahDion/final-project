import { useRef, useEffect, useState, useContext } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { UserContext } from './hooks/UserContext';
import styled from "styled-components";
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN

const Home = () => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [coords, setCoords] = useState([]);
    const [userCoords, setUserCoords] = useState([-73.5674, 45.5019]);
    const [zoom, setZoom] = useState(9);
    const [pitch, setPitch] = useState(25);
    const { concerts, travels, selectedYear } = useContext(UserContext);

    useEffect (() =>{
        navigator.geolocation.getCurrentPosition((position) => {
            setUserCoords([position.coords.longitude.toFixed(4), position.coords.latitude.toFixed(4)])
        })
    },[])

    useEffect(() => {
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/xarah/clb2a8jp2000314mkyrl23ksw',
            center: userCoords,
            zoom: zoom,
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
        .setLngLat(userCoords)
        .addTo(map.current)
        map.current.addControl(
            new mapboxgl.GeolocateControl({
            positionOptions: {
            enableHighAccuracy: true
            },
            // When active the map will receive updates to the device's location as it changes.
            trackUserLocation: true,
            // Draw an arrow next to the location dot to indicate which direction the device is heading.
            showUserHeading: true
            })
            );
        // .setPopup(new mapboxgl.Popup({
        //     closeButton: false,
        //     offset: 26
        // })
        // .setHTML(`<form action=/cities/Montreal/Canada >
        //             <button class="popup" type="submit">Montreal</button>
        //         </form>`)
        // )
    }, [selectedYear, userCoords]);

    useEffect(() => {
        if (concerts) {
            setCoords([9.1829, 48.7758])
            map.current.flyTo({
                center: [9.1829, 48.7758],
                duration: 12000, // Animate over 12 seconds
                essential: true,
                zoom: 3.5,
                pitch: 0,
            })
        Object.values(concerts).map((travel) => {
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
                        <button class="popup" type="submit">Go to ${travel.city}</button>
                    </form>`)
            )
        })
        }
    }, [concerts])

    useEffect(() => {
        if (travels) {
            setCoords(travels[0].coordinates)
            map.current.flyTo({
                center: travels[0].coordinates,
                duration: 12000, // Animate over 12 seconds
                essential: true,
                zoom: 3.5,
                pitch: 0,
            })
        Object.values(travels).map((travel) => {
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
                        <button class="popup" type="submit">Go to ${travel.city}</button>
                    </form>`)
            )
        })
        }
    }, [travels])

    return (
        <Div>
            {travels?
            <div className="sidebar">
                Longitude: {coords[0]} | Latitude: {coords[1]} | Zoom: {zoom}
            </div>
            :
            <div className="sidebar">
                Longitude: {userCoords[0]} | Latitude: {userCoords[1]} | Zoom: {zoom}
            </div>
}
            <div ref={mapContainer} className="map-container" />
        </Div>
    )
}

const Div = styled.div`
    position: fixed;
`
export default Home;