import React, {useEffect, useState} from 'react';
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import {NavLink} from "react-router-dom";

function RouteMap(props) {
    let center = [58.271508, 58.033283];
    return (
        <div className={"RouteMap Map"}>

            <MapContainer zoom={7} center={center} minZoom={12} maxZoom={14}>
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="http://localhost:5000/src/images/{z}/{x}/{y}"
                />
                {/* <Marker>
                        <Popup></Popup>
                    </Marker>*/}

            </MapContainer>
        </div>
    );
}

export default RouteMap;