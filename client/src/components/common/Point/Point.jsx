import React, {useEffect, useState} from 'react';
import style from './Point.module.css'
import {useParams} from "react-router-dom";
import {useQuery} from "@apollo/client";
import {GET_POINT} from "../../../graphql/getPoint";
import MapComponent from "../MapComponent/MapComponent";


function Point(props) {
    const {id} = useParams()
    const [point, setPoint] = useState({})
    const {data, error, loading} = useQuery(GET_POINT, {
        variables: {id: Number(id)}
    })
    useEffect(() => {

        if (!loading) {
            setPoint(data.getPoint)
            console.log("Запрос данных точки " + data.getPoint.id + " с сервера")
        }
    })
    if (loading) {
        return <div className={style.Point}>Загрузка...</div>
    }
    return (
        <div className={style.Point}><img className={style.image} src={point.photo_url}/>
            <div className={style.name}>{point.name}</div>
            <div className={style.descr}>{point.descr}</div>
            <div className={style.image}><MapComponent/></div>
            <div className={style.type}>{point.type}</div>
            <div className={style.cord}>x: {point.x}</div>
            <div className={style.cord}>y: {point.y}</div>
        </div>
    );
}

export default Point;