import React, {useEffect, useRef, useState} from 'react';
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import {NavLink, useParams} from "react-router-dom";
import {useQuery} from "@apollo/client";
import GET_ROUTE from "../../graphql/getRoute.js";
import GET_ALL_POINTS from "../../graphql/getAllPoints.js";
import style from './RouteMap.module.scss'
import RouteDescription from "../RouteDescription/RouteDescription";
import GET_ALL_ROUTES from "../../graphql/getAllRoutes.js";

const RouteMap = (props) => {
    const {id} = useParams()
    const [points, setPoints] = useState([])
    const {loading: routeLoading, data: routeData, error: routeError} = useQuery(GET_ROUTE, {
        variables: {id: Number(id)}
    })
    const {loading: pointsLoading, data: pointsData, error: pointsError} = useQuery(GET_ALL_POINTS, {
        variables: {routeId: Number(id)}
    })
    const {loading: routesLoading, data: routesData, error: routesError} = useQuery(GET_ALL_ROUTES)
    useEffect(() => {
        console.log("data: ",pointsData,routeData,routesData)

    }, [routeData])
    useEffect(() => {
        console.log("errors: " ,pointsError,routeError, routesError)

    }, [pointsError,routeError, routesError])

    useEffect(() => {
        if (!pointsLoading) {
            setPoints(pointsData.getAllPoints)
        }
    }, [pointsLoading])
    useEffect(() => {
        console.log(points)
    }, [points])
    if (pointsLoading) {
        return <div className="PointList">
            <div className="Point">Загрузка...</div>
        </div>
    }
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
                    {points?.map(point => (
                        <Marker position={[point.x, point.y]}>
                            <Popup className={style.popup}>
                                <div><strong>{point.name}</strong></div>
                                <div><strong>Тип: </strong>{point.type}</div>
                                <div>Нажмите, чтобы узнать подробности</div>
                                <div><img className={style.popup__pointImage} src={point.photo_url}
                                          alt={`Изображение места №"${point.id}"`}/></div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>


            <div className={"MapDescription"}>{routeLoading ? <div className={"toCenter"}>Загрузка...</div> :
                <RouteDescription route={routeData.getRoute}/>}</div>



        </div>
    );
}

export default RouteMap;
