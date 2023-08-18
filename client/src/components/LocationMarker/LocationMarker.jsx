import React, {useEffect, useState} from 'react';
import {Circle, Marker, Popup} from "react-leaflet";
import userIcon from '../../assets/images/user.svg'
import L from "leaflet";
import {isNavigateVar} from "../../store";
import {useReactiveVar} from "@apollo/client";

function LocationMarker() {
    // TODO: setInterval для обновления местоположения

    const isNavigate = useReactiveVar(isNavigateVar)

    const [position, setPosition] = useState({coords: [51.505, -0.09], accuracy: 1000})

    useEffect(() => {
        if (isNavigate) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const {latitude, longitude, accuracy} = pos.coords
                    setPosition({coords: [latitude, longitude], accuracy})
                },
                (error) => console.log(error)
            )
        }
    }, [isNavigate])

    const iconPerson = new L.Icon({
        iconUrl: userIcon,
        iconRetinaUrl: userIcon,
        iconSize: new L.Point(30, 45),
        popupAnchor: [0, -25]
    });
    if (isNavigate) {
        return (
            <>
                <Marker position={position.coords} radius={10} color="red" icon={iconPerson}>
                    <Popup>
                        <div><strong>Это вы</strong></div>
                        <div><strong>Ваши координаты: </strong></div>
                        <div><strong>x: </strong> {position.coords[0]}</div>
                        <div><strong>y: </strong> {position.coords[1]}</div>
                        <div><strong>Точность определения: </strong> {position.accuracy} метров</div>
                    </Popup>
                </Marker>
                <Circle center={position.coords} radius={(position.accuracy)}>
                    <Popup>
                        <div><strong>Точность определения: </strong> {position.accuracy} метров</div>
                    </Popup>
                </Circle>
            </>
        );
    }
    return null
}

export default LocationMarker;
