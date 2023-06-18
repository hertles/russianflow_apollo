import React, {useEffect, useLayoutEffect, useState} from 'react';
import style from './RouteMap.module.scss'
import {MapContainer, Marker, Popup, TileLayer, Tooltip, useMapEvents} from "react-leaflet";
import {useParams, useSearchParams} from "react-router-dom";
import {useQuery, useReactiveVar} from "@apollo/client";
import GET_ROUTE from "../../graphql/getRoute.js";
import RouteDescription from "../RouteDescription/RouteDescription";
import PointDescription from "../PointDescription/PointDescription";
import {createMarkerIcon} from "../../utils/createMarkerIcon";
import info from '../../assets/images/info.svg'
import newMarker from '../../assets/images/new marker.png'
import classNames from "classnames";
import NewPointForm from "../NewPointForm/NewPointForm";
import {newPointVar, newPointVarInitial, pointsVar} from "../../store";
import {NewMarker} from "../common/NewMarker/NewMarker";

const RouteMap = (props) => {
    const {id} = useParams()
    const [search, setSearch] = useSearchParams()
    const [pointId, setPointId] = useState(search.get('point')) // выбранная точка на карте

    useEffect(() => {
        if (search.get('point') !== null) {
            setPointId(search.get('point'))
            setAddingPointMode(false)
        }
    }, [search])

    const points = useReactiveVar(pointsVar)
    const [center, setCenter] = useState([])
    const [addingPointMode, setAddingPointMode] = useState(false)

    const {loading: routeLoading, data: routeData} = useQuery(GET_ROUTE, {
        variables: {id: id}
    })

    const newPointLocation = useReactiveVar(newPointVar)

    useEffect(() => {
        if (!routeLoading) {
            pointsVar(routeData.route.points)
            if (routeData.route.id !== newPointVar().routeId) {
                newPointVar(newPointVarInitial)
            }
        }
    }, [routeLoading, routeData])
    useLayoutEffect(() => {
        if (!routeLoading) {
            if (!routeLoading && points.length > 0 && pointId !== null) {
                const {x, y} = points.find(point => point.id === pointId)
                setCenter([x, y])
            }
            if (!routeLoading && pointId === null) {
                const {x, y} = routeData.route
                setCenter([x, y])
            }
        }
    }, [pointId, routeLoading, routeData, points])

    const removeSearchParams = () => {
        search.delete('point')
        setSearch(search.toString())
    }

    const showRouteInfo = () => {
        removeSearchParams()
        if (addingPointMode)
            setAddingPointMode(false)
    }

    const switchAddingMode = () => {
        removeSearchParams()
        setAddingPointMode(!addingPointMode)
    }

    if (center.length < 2 || routeLoading) {
        return <div className="PointList">
            <div className="Point">Загрузка...</div>
        </div>
    }

    return (
        <div className={style.RouteMap}>
            <div className={classNames(style.Map, {"MapCrossPointer": addingPointMode})}>

                <MapContainer zoom={7} center={center} minZoom={12} maxZoom={14}>
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url={`http://localhost:2020/api/maps/${id}/{z}/{x}/{y}.png`}
                    />
                    {points.map(point => {
                        const markerIcon = point.id === pointId ? createMarkerIcon(point.category.activeImage.url) : createMarkerIcon(point.category.image.url)
                        return (
                            <Marker
                                key={point.id}
                                position={[point.x, point.y]}
                                eventHandlers={{
                                    click: (e) => {
                                        setSearch({point: point.id})
                                    },
                                }}
                                icon={markerIcon}
                            >
                                <Tooltip className={"markerTooltip"} direction="top" offset={[0, -57]}>
                                    <div><strong>{point.name}</strong></div>
                                    <div><strong>Тип: </strong>{point.category.name}</div>
                                    <div>Нажмите, чтобы узнать подробности</div>
                                </Tooltip>
                            </Marker>
                        )
                    })}

                    {addingPointMode && <NewMarker/>}
                </MapContainer>

                <div className={style.controlPanel}>
                    <div className={classNames(style.controlButton, {[style.controlButton__active]: addingPointMode})}
                         onClick={switchAddingMode}>
                        <img src={newMarker} alt=""/>
                    </div>
                    <div className={style.controlButton} onClick={showRouteInfo}>
                        <img src={info} alt=""/>
                    </div>
                </div>
            </div>

            <div className={style.MapDescription}>
                {addingPointMode ? <NewPointForm location={newPointLocation}/> : <div>
                    {pointId !== null
                        ? <PointDescription/>
                        : <RouteDescription route={routeData.route}/>
                    }</div>
                }

            </div>

        </div>
    )
}

export default RouteMap;
