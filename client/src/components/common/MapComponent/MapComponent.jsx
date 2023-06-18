import * as React from "react";
import L from 'leaflet'
import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import {useState} from "react";
L.Icon.Default.imagePath = "https://unpkg.com/leaflet@1.5.0/dist/images/";

const MapComponent = (props) => {
    let [map, setMap] = useState({
        x: 58.271508,
        y: 58.033283,
        zoom: 12
    })
    let center = [map.x, map.y];
    return (
        <div className={props.className}>
            <MapContainer zoom={map.zoom} center={center} minZoom={props.big ? 4 : 12} maxZoom={props.big ? 8 : 14}>
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    /*url="http://my-own-maps.ru/kusye/{z}/{x}/{y}.png"*/
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <Marker position={center}>
                    <Popup>Какой то крутой текст!!!</Popup>
                </Marker>
            </MapContainer>
        </div>
    );
}
export default MapComponent
