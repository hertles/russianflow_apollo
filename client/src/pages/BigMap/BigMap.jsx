import React, {useEffect, useState} from 'react';
import {MapContainer, Marker, TileLayer, Tooltip} from "react-leaflet";
import {useQuery} from "@apollo/client";
import GET_ALL_ROUTES from "../../graphql/getAllRoutes.js";
import LocationMarker from "../../components/LocationMarker/LocationMarker";
import { useNavigate  } from 'react-router-dom';
import LocationMapButton from "../../components/LocationMapButton/LocationMapButton";

const BigMap = () => {
    const navigate = useNavigate()
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
            <MapContainer zoom={5} center={center} minZoom={4} maxZoom={16/* 12 14*/}>
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    /*url="http://my-own-maps.ru/kusye/{z}/{x}/{y}.png"*/
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {routes.map(route => (
                    <Marker key={route.id} position={[route.x, route.y]} eventHandlers={{
                        click: () => {
                            navigate(route.id)
                        },
                    }}>
                        <Tooltip className="markerTooltip" offset={[-14,-14]} direction={"top"}>
                            <div>{route.name}</div>
                            <div><strong>Перейти к маршруту</strong></div>
                        </Tooltip>
                    </Marker>
                ))}
                <LocationMarker/>
            </MapContainer>
            <div className={"controlPanel"}>
                <LocationMapButton/>
            </div>
        </div>
    );
}

export default BigMap;
