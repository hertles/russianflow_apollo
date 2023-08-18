import React, {useEffect, useLayoutEffect, useState} from 'react';
import style from './RouteMap.module.scss'
import {FeatureGroup, MapContainer, Marker, Polyline, TileLayer, Tooltip} from "react-leaflet";
import {useParams, useSearchParams} from "react-router-dom";
import {useQuery, useReactiveVar} from "@apollo/client";
import GET_ROUTE from "../../graphql/getRoute.js";
import {createMarkerIcon} from "../../utils/createMarkerIcon";
import newMarkerIcon from '../../assets/images/new-marker.png'
import classNames from "classnames";
import {newPathVar, newPathVarInitial, newPointVar, newPointVarInitial, pathsVar, pointsVar} from "../../store";
import {NewMarker} from "../../components/common/NewMarker/NewMarker";
import L from 'leaflet'
import LocationMarker from "../../components/LocationMarker/LocationMarker";
import MapDescription from "../../components/MapDescription/MapDescription";
import "leaflet-draw/dist/leaflet.draw.css"
import {EditControl} from "react-leaflet-draw";
import drawLocales from 'leaflet-draw-locales'
import {calculatePolylineDistance} from "../../utils/calculatePolylineDistance";

drawLocales('ru')
L.Icon.Default.mergeOptions({
    iconRetinaUrl: newMarkerIcon,
    iconUrl: newMarkerIcon,
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
    iconSize: new L.Point(31, 57),
    iconAnchor: [15.5, 57],
    shadowSize: new L.Point(48, 56)
})

const RouteMap = () => {
    const {id} = useParams()
    const [search, setSearch] = useSearchParams()
    const [pointId, setPointId] = useState(search.get('point')) // выбранная точка на карте
    const [pathId, setPathId] = useState(search.get('path')) // выбранная точка на карте
    const [addingMode, setAddingMode] = useState(search.get('adding'))
    const [map, setMap] = useState(null);

    const creationHandler = e => {
        map?.target.removeLayer(e.layer);
        switch (e.layerType) {
            case "marker":
                switchAddingMode("point")
                newPointVar({...newPointVarInitial, ...e.layer.getLatLng()})
                break
            case "polyline":
                switchAddingMode("path")
                const latLngs = e.layer.editing.latlngs[0]
                newPathVar({
                    ...newPathVarInitial,
                    nodes: latLngs.map(
                        node => ({y: node.lng, x: node.lat})
                    ),
                    distance: calculatePolylineDistance(latLngs),
                })
                break
            default:
                break
        }
    }

    useEffect(() => {
        search.delete('adding')
    })

    useEffect(() => {
        setPointId(search.get('point'))
        setPathId(search.get('path'))
        setAddingMode(search.get('adding'))
        if (search.get('point') !== null && search.get('path') !== null) {
            search.delete('adding')
        }
    }, [search])

    const points = useReactiveVar(pointsVar)
    const paths = useReactiveVar(pathsVar)
    const [center, setCenter] = useState([])

    const addingPointMode = addingMode === "point"
    const addingPathMode = addingMode === "path"
    const removeSearchParams = () => {
        setSearch({})
    }
    const switchAddingMode = (adding) => {
        if (search.get("adding") !== adding) {
            setSearch({adding})
        } else {
            removeSearchParams()
        }
    }

    const {loading: routeLoading, data: routeData} = useQuery(GET_ROUTE, {
        variables: {id: id}
    })

    const newPoint = useReactiveVar(newPointVar)
    const newPath = useReactiveVar(newPathVar)

    useEffect(() => {
        if (!routeLoading) {
            pointsVar(routeData.route.points)
            console.log(routeData.route.paths)
            pathsVar(routeData.route.paths)
            if (routeData.route.id !== newPointVar().routeId) {
                newPointVar(newPointVarInitial)
            }
        }
    }, [routeLoading, routeData])
    useLayoutEffect(() => {
        if (!routeLoading) {
            if (points.find(point => point.id === pointId)) {
                const {x, y} = points.find(point => point.id === pointId)
                setCenter([x, y])
            } else {
                const {x, y} = routeData.route
                setCenter([x, y])
            }
        }
    }, [pointId, routeLoading, routeData, points])

    if (center.length < 2 || routeLoading) {
        return <div className="PointList">
            <div className="Point">Загрузка...</div>
        </div>
    }

    return (
        <div className={style.RouteMap}>
            <div className={classNames(style.Map, {"MapCrossPointer": addingPointMode})}>

                <MapContainer
                    zoom={7}
                    center={center}
                    minZoom={12}
                    maxZoom={14}
                    whenReady={setMap}
                    /*                    maxBounds={[[58.18304972831826,  57.996762018688045],[58.31669080476626,58.460213556777674]]}
                                        maxBoundsViscosity={0.9}
                                        bounds={[L.latLng(89.99346179538875, 180),L.latLng(-89.98155760646617, -180)]}*/
                >
                    <FeatureGroup>
                        <EditControl
                            position="bottomleft"
                            onDrawStart={removeSearchParams}
                            onCreated={creationHandler}
                            edit={{remove: false, edit: false}}
                            draw={{
                                marker: true,
                                polyline: true,
                                polygon: false,
                                rectangle: false,
                                circle: false,
                                circlemarker: false,

                            }}
                        />
                    </FeatureGroup>
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url={`https://tile.openstreetmap.org/{z}/{x}/{y}.png`}
                    />
                    {points.map(point => {
                        const markerIcon = point.id === pointId ? createMarkerIcon(point.category.activeImage.url) : createMarkerIcon(point.category.image.url)
                        return (
                            <Marker
                                key={point.id}
                                position={[point.x, point.y]}
                                eventHandlers={{
                                    click: () => {
                                        setSearch({point: point.id})
                                    },
                                }}
                                icon={markerIcon}
                            >
                                <Tooltip className={"markerTooltip"} direction="top" offset={[2, -57]}>
                                    <div><strong>{point.name}</strong></div>
                                    <div><strong>Тип: </strong>{point.category.name}</div>
                                    <div>Нажмите, чтобы узнать подробности</div>
                                </Tooltip>
                            </Marker>
                        )
                    })}
                    {
                        paths.map(path => {
                            return <Polyline
                                pathOptions={{
                                    color: path.id === search.get('path') ? 'red' : 'blue',
                                    weight: path.id === search.get('path') ? '6' : '4',
                                }}
                                eventHandlers={{
                                    click: () => {
                                        setSearch({path: path.id})
                                    },
                                }}
                                positions={path.nodes.map(node => {
                                    return {lat: node.x, lng: node.y}
                                })}>
                                <Tooltip className={"markerTooltip"} sticky direction={"top"}>
                                    <div>{path.desc}</div>
                                </Tooltip>
                            </Polyline>
                        })
                    }
                    {
                        addingPathMode && <Polyline
                            pathOptions={{
                                color: 'red',
                                width: "35px"
                            }}
                            positions={newPath.nodes.map(node => {
                                return {lat: node.x, lng: node.y}
                            })}>
                            <Tooltip className={"markerTooltip"} sticky direction={"top"}>
                                <div>Новый путь</div>
                            </Tooltip>
                        </Polyline>
                    }
                    {addingPointMode && <NewMarker newPoint={newPoint}/>}
                    <LocationMarker/>
                </MapContainer>
            </div>
            <div className={style.MapDescription}>
                <MapDescription
                    addingPointMode={addingPointMode}
                    addingPathMode={addingPathMode}
                    newPoint={newPoint}
                    newPath={newPath}
                    pointId={pointId}
                    pathId={pathId}
                    route={routeData.route}
                />
            </div>

        </div>
    )
}

export default RouteMap;
