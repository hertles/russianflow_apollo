import React, {useEffect, useState} from 'react';
import MapComponent from "../common/MapComponent/MapComponent";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import {useQuery} from "@apollo/client";
import GET_ALL_ROUTES from "../../graphql/getAllRoutes.js";
import {NavLink} from "react-router-dom";

function BigMap(props) {
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
            <MapContainer zoom={7} center={center} minZoom={4} maxZoom={8/* 12 14*/}>
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    /*url="http://my-own-maps.ru/kusye/{z}/{x}/{y}.png"*/
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {routes.map(route => (
                    <Marker position={[route.x, route.y]}>
                        <Popup>
                            <div>{route.name}</div>
                            <div><NavLink to={route.id}>Перейти к маршруту</NavLink></div>
                        </Popup>
                    </Marker>
                ))}

            </MapContainer>
        </div>
    );
}

export default BigMap;
