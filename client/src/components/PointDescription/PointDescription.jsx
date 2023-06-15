import React, {useEffect, useState} from 'react';
import style from './PointDescription.module.css'
import {useApolloClient, useQuery} from "@apollo/client";
import GET_POINT from "../../graphql/getPoint";
import {useParams, useSearchParams} from "react-router-dom";

const PointDescription = () => {
    const [search] = useSearchParams()
    const pointId = search.get('point')
    const [point, setPoint] = useState({})
    const {data, loading} = useQuery(GET_POINT, {variables: {id: pointId}})

    useEffect(() => {
        if (!loading) {
            setPoint(data.getPoint)
        }
    }, [loading,pointId])
    if (loading) {
        return <div className={"toCenter"}>Загрузка...</div>
    }
    if (point) {
        return (
            <div>
                <div className={style.Name}>{point.name}</div>
                <div><img className={style.image} src={point.photo_url} alt="Фото точки на карте"/></div>
                <div><strong>Тип точки: </strong>{point.type}</div>
                <div><strong>Описание: </strong>{point.desc}</div>
                <div><strong>Связь: </strong>{point.network}</div>
                <div><strong>x: </strong>{point.x}</div>
                <div><strong>y: </strong>{point.y}</div>
            </div>
        );
    }
    return (
        <div className={"toCenter"}>Точка на карте не существует</div>
    );

}

export default PointDescription;
