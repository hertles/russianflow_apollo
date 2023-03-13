import React, {useEffect, useState} from 'react';
import style from './Main.module.css'
import {useParams} from "react-router-dom";
import {useQuery} from "@apollo/client";
import GET_POINT from "../../graphql/getPoint.js";
import MapComponent from "../common/MapComponent/MapComponent";


function Main(props) {

    return (
        <div className={style.Main}>
        </div>
    );
}

export default Main;
