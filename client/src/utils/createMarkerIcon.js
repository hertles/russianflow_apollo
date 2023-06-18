import shadow from "../assets/images/shadow.png"
import L from "leaflet";
export const createMarkerIcon = (imageSrc) => {
    return new L.Icon({
        iconUrl: imageSrc,
        iconRetinaUrl: imageSrc,
        shadowUrl: shadow,
        iconSize: new L.Point(31, 57),
        iconAnchor: [15.5, 57],
        shadowSize: new L.Point(48, 56)
    });
}
