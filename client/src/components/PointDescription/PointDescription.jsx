import React, {useEffect, useState} from 'react';
import style from './PointDescription.module.scss'
import {useQuery} from "@apollo/client";
import GET_POINT from "../../graphql/getPoint";
import {useSearchParams} from "react-router-dom";
import Button from "../common/Button/Button";

const PointDescription = () => {
    const [search] = useSearchParams()
    const pointId = search.get('point')
    const [point, setPoint] = useState({})
    const {data, loading} = useQuery(GET_POINT, {variables: {id: pointId}})

    useEffect(() => {
        if (!loading) {
            setPoint(data.point)
        }
    }, [loading, pointId])
    if (loading) {
        return <div className={"toCenter"}>Загрузка...</div>
    }
    console.log(point)
    if (point.name) {
        return (
            <div className={style.pointDescription}>
                <div className={style.name}>{point.name}</div>
                {point.croppedImage && <img className={style.image} src={point.croppedImage.url}/>}
                <div className={style.info}>
                    <div><strong>Тип точки: </strong>{point.category.name}</div>
                    <div><strong>Описание: </strong>{point.desc}</div>
                    <div><strong>Связь: </strong>{point.network}</div>
                    <div><strong>x: </strong>{point.x}</div>
                    <div><strong>y: </strong>{point.y}</div>
                </div>
                <div className={style.buttons}>
                    <Button type={"button"} title={"Удалить точку"}/>
                </div>
            </div>
        );
    }
    return (
        <div className={"toCenter"}>Точка на карте не существует</div>
    );

}

export default PointDescription;
