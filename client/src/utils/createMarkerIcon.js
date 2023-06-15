import shadow from "../assets/images/shadow.png"
import L from "leaflet";
import {pointTypes} from "./pointTitles";
export const createMarkerIcon = (pointType, active) => {
    const pointTypeName = pointTypes[pointType] ? pointTypes[pointType] : 'unknown'
    return new L.Icon({
        iconUrl: `http://localhost:5000/marker/${pointTypeName}/${active}/.svg`,
        iconRetinaUrl: `http://localhost:5000/marker/${pointTypeName}/${active}/.svg`,
        shadowUrl: shadow,
        iconSize: new L.Point(31, 57),
        iconAnchor: [15.5, 57]
    });
}
