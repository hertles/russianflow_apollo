import React, {useEffect, useRef, useState} from 'react';
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import {NavLink, useParams} from "react-router-dom";
import {useQuery} from "@apollo/client";
import {GET_ROUTE} from "../../graphql/getRoute";
import {GET_ALL_POINTS} from "../../graphql/getAllPoints";
import style from './RouteMap.module.css'
import RouteDescription from "../RouteDescription/RouteDescription";

const RouteMap = (props) => {
    const {id} = useParams()
    const [points, setPoints] = useState([])
    const {loading: routeLoading, data: routeData, error} = useQuery(GET_ROUTE, {
        variables: {id: Number(id)}
    })
    // const {loading: pointsLoading, data: pointsData} = useQuery(GET_ALL_POINTS)
/*    useEffect(() => {
        if (!pointsLoading) {
            setPoints(pointsData.getAllPoints)
        }
    })
    if (pointsLoading) {
        return <div className="PointList">
            <div className="Point">Загрузка...</div>
        </div>
    })*/
    useEffect(()=>{
        error && alert(error)
    },[error])
    const center = [58.271508, 58.033283];
    return (
        <div className={"RouteMapPage"}>
            <div className={"Map"}>

                <MapContainer zoom={7} center={center} minZoom={12} maxZoom={14}>
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url={`http://localhost:5000/src/images/maps/${id}/{z}/{x}/{y}`}
                    />
                    {/* <Marker>
                        <Popup></Popup>
                    </Marker>*/}

                </MapContainer>
            </div>
            <div className={style.Description}>{routeLoading ? <div className={"toCenter"}>Загрузка...</div> : <RouteDescription route={routeData}/>}</div>

        </div>
    );
}

export default RouteMap;
