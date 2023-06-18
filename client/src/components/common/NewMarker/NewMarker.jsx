import {useReactiveVar} from "@apollo/client";
import {newPointVar} from "../../../store";
import {Marker, Tooltip, useMapEvents} from "react-leaflet";
import React from "react";
import {createMarkerIcon} from "../../../utils/createMarkerIcon";

export const NewMarker = () => {
    const newPoint = useReactiveVar(newPointVar)
    const locationIsSet = newPoint.lat * newPoint.lng !== 0
    const map = useMapEvents({
        click(e) {
            newPointVar({...newPointVar(), ...e.latlng})
            map.flyTo(e.latlng, map.getZoom())
        },
    })
    locationIsSet && map.flyTo({lng: newPoint.lng, lat: newPoint.lat})
    return !locationIsSet ? null : (
        <Marker
            key={-1}
            position={[newPoint.lat,newPoint.lng]}
            icon={createMarkerIcon(newPoint.category.activeImage.url)}
        >
            <Tooltip className={"tooltip"} direction="top" offset={[0, -57]}>
                <div><strong>{newPoint.name}</strong></div>
                <div><strong>Тип: </strong>{newPoint.category.name}</div>
                <div><strong>Ваша новая точка на карте</strong></div>
            </Tooltip>
        </Marker>
    )
}
