import React, {useEffect, useState} from 'react';
import {MapContainer, Marker, TileLayer, Tooltip} from "react-leaflet";
import {useQuery} from "@apollo/client";
import GET_ALL_ROUTES from "../../graphql/getAllRoutes.js";
import {NavLink} from "react-router-dom";
import LocationMarker from "../common/LocationMarker/LocationMarker";
import L from "leaflet";

function BigMap(props) {
    L.Icon.Default.imagePath = "https://unpkg.com/leaflet@1.5.0/dist/images/";
    const [position, setPosition] = useState({coords: [51.505, -0.09], accuracy: 1000})
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const { latitude, longitude, accuracy } = pos.coords
                setPosition({coords: [latitude, longitude], accuracy})
            },
            (error) => console.log(error)
        )
    }, [])
    const [routes, setRoutes] = useState([])
    const {loading, data} = useQuery(GET_ALL_ROUTES)
    useEffect(() => {
        if (!loading) {
            setRoutes(data.routes)
        }
    },[loading,data])
    if (loading) {
        return <div className="PointList">
            <div className="Point">Загрузка...</div>
        </div>
    }
    let center = [58.271508, 58.033283];

    return (
        <div className={"BigMap Map"}>
            <MapContainer zoom={7} center={center} minZoom={4} maxZoom={16/* 12 14*/}>
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    /*url="http://my-own-maps.ru/kusye/{z}/{x}/{y}.png"*/
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {routes.map(route => (
                    <Marker key={route.id} position={[route.x, route.y]}>
                        <Tooltip className="markerTooltip" direction={"top"}>
                            <div>{route.name}</div>
                            <div><NavLink to={`${route.id}/`}>Перейти к маршруту</NavLink></div>
                        </Tooltip>
                    </Marker>
                ))}
                <LocationMarker position={position}/>
            </MapContainer>
        </div>
    );
}

export default BigMap;
