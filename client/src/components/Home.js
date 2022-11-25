import { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import Places from '../assets/geojson';
mapboxgl.accessToken = 'pk.eyJ1IjoieGFyYWgiLCJhIjoiY2xhdHp2MDYwMDFuMzNvcHI5Mm9naTM4dCJ9.COQGEwQjZcwIphfpGORnbQ'


const Home = () =>{
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-71.254028);
    const [lat, setLat] = useState(46.829853);
    const [zoom, setZoom] = useState(4);

    useEffect(() => {
      if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom: zoom
        });
        Places.features.forEach((marker) => {
            new mapboxgl.Marker({
                color: "black",
            })
            .setLngLat(marker.geometry.coordinates)
            .addTo(map.current)
        })
    });
    
    return (
        <>
        <div className="sidebar">
            Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
        <div ref={mapContainer} className="map-container" />
        </>
    )
}

export default Home;