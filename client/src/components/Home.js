import { useRef, useEffect, useState, useContext } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { UserContext } from './hooks/UserContext';
import styled from "styled-components";
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN

const Home = () => {
    const mapContainer = useRef(null); // returns as object called current
    const map = useRef(null); 
    const [coords, setCoords] = useState([]); // state for displaying coords
    const [userCoords, setUserCoords] = useState([-73.5674, 45.5019]); // state for geolocating user
    const [zoom, setZoom] = useState(9);
    const [pitch, setPitch] = useState(25);
    const { concerts, travels, selectedYear } = useContext(UserContext);

    useEffect (() => { // geolocate user, if not, use default state
        navigator.geolocation.getCurrentPosition((position) => {
            setUserCoords([position.coords.longitude.toFixed(4), position.coords.latitude.toFixed(4)])
        })
    },[])

    useEffect(() => {
        map.current = new mapboxgl.Map({ // render map from mapboxgl
            container: mapContainer.current,
            style: 'mapbox://styles/xarah/clb2a8jp2000314mkyrl23ksw',
            center: userCoords,
            zoom: zoom,
            pitch: pitch
        });
        const nav = new mapboxgl.NavigationControl({ // add navigation control to map
            visualizePitch: true,
        });
        map.current.addControl(nav, 'top-right');
        new mapboxgl.Marker({
            color: "black",
            scale: 0.75
        })
        .setLngLat(userCoords)
        .addTo(map.current)
        map.current.addControl( // add geolocation control
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
    }, [selectedYear, userCoords]); // render on each selectedYear and userCoords changes

    useEffect(() => { // when user is not logged in, after clicking a year in the dropdown menu, the concerts will be fetched
        if (concerts) {
            // setCoords to display the center of map being flown to
            setCoords([9.1829, 48.7758]); // display the coords for map center
            map.current.flyTo({ // fly to location
                center: [9.1829, 48.7758], // centers the map on Stuttgart, Germany
                duration: 12000, // Animate over 12 seconds
                essential: true,
                zoom: 3.5,
                pitch: 0,
            })
        Object.values(concerts).map((travel) => { // display a marker for each city visited
            if (travel.city !== "Montreal")
            return new mapboxgl.Marker({
                color: "black",
                scale: 0.75
            })
            .setLngLat(travel.coordinates)
            .addTo(map.current)
            .setPopup(new mapboxgl.Popup({ // add popup to each marker
                closeButton: false,
                offset: 26
            })
            // clicking on popup will take user to city page
            .setHTML(`<form action=/cities/${travel.city}/${travel.country} > 
                        <button class="popup" type="submit">Go to ${travel.city}</button>
                    </form>`)
            )
        })
        }
    }, [concerts]); // render everytime concerts changes

    useEffect(() => { // when user is logged in, after clicking a year in the dropdown menu, the user travels will be fetched
        if (travels) {
            // setCoords to display the center of map being flown to
            setCoords([(travels[0].coordinates[0].toFixed(4)), (travels[0].coordinates[1].toFixed(4))]);
            map.current.flyTo({ // fly to location
                center: travels[0].coordinates, // centers the map on user's first travel
                duration: 12000, // Animate over 12 seconds
                essential: true,
                zoom: 3.5,
                pitch: 0,
            })
        Object.values(travels).map((travel) => { // display a marker for each city visited
            return new mapboxgl.Marker({
                color: "black",
                scale: 0.75
            })
            .setLngLat(travel.coordinates)
            .addTo(map.current)
            .setPopup(new mapboxgl.Popup({ // add popup to each marker
                closeButton: false,
                offset: 26
            })
            // clicking on popup will take user to city page
            .setHTML(`<form action=/cities/${travel.city}/${travel.country} >
                        <button class="popup" type="submit">Go to ${travel.city}</button>
                    </form>`)
            )
        })
        }
    }, [travels]); // render everytime travels changes

    return (
        <Div>
            {travels ? // if user is not logged in, display coords on travels change
            <div className="sidebar">
                Longitude: {coords[0]} | Latitude: {coords[1]} | Zoom: {zoom}
            </div>
            : // display usercoords by default
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