import React, {useEffect, useState} from 'react';
import MapComponent from "../common/MapComponent/MapComponent";
import L from 'leaflet'
import {Circle, CircleMarker, MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import {useQuery} from "@apollo/client";
import GET_ALL_ROUTES from "../../graphql/getAllRoutes.js";
import {NavLink} from "react-router-dom";
import userIcon from '../../assets/images/user.svg'
function BigMap(props) {
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
    const iconPerson = new L.Icon({
        iconUrl: userIcon,
        iconRetinaUrl: userIcon,
        iconSize: new L.Point(30, 45),
        popupAnchor: [0,-25]
    });

    const [routes, setRoutes] = useState([])
    const {loading, data} = useQuery(GET_ALL_ROUTES)
    useEffect(() => {

        if (!loading) {
            setRoutes(data.getAllRoutes)
            console.log(data.getAllRoutes)
        }
    })
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
                    <Marker position={[route.x, route.y]}>
                        <Popup>
                            <div>{route.name}</div>
                            <div><NavLink to={`${route.id}/`}>Перейти к маршруту</NavLink></div>
                        </Popup>
                    </Marker>
                ))}
                <Marker position={position.coords} radius={10} color="red" icon={iconPerson}>
                    <Popup>
                        <div><strong>Это вы</strong></div>
                        <div><strong>Ваши координаты: </strong></div>
                        <div><strong>x: </strong> {position.coords[0]}</div>
                        <div><strong>y: </strong> {position.coords[1]}</div>
                        <div><strong>Точность определения: </strong> {position.accuracy} метров</div>
                    </Popup>
                </Marker>
                <Circle center={position.coords} radius={(position.accuracy)}>
                    <Popup>
                        <div><strong>Точность определения: </strong> {position.accuracy} метров</div>
                    </Popup>
                </Circle>
            </MapContainer>
        </div>
    );
}

export default BigMap;
