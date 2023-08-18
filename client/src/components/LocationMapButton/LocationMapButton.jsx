import React from 'react';
import {isNavigateVar} from "../../store";
import userIcon from "../../assets/images/user.svg";

const LocationMapButton = () => {
    const navigate = () => {
        if (isNavigateVar()){
            //TODO: map.flyTo(location) при уже определённом местоположении
            // при том, что объект map здесь недоступен
        }
        else {
            isNavigateVar(true)
        }
    }

    return (
        <div className={"controlButton"} onClick={navigate}>
            <img src={userIcon} alt=""/>
        </div>
    );
}

export default LocationMapButton;
