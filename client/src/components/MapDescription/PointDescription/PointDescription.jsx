import React, {useEffect, useState} from 'react';
import style from './PointDescription.module.scss'
import {useMutation, useQuery} from "@apollo/client";
import GET_POINT from "../../../graphql/getPoint";
import {useSearchParams} from "react-router-dom";
import Button from "../../common/Button/Button";
import {DELETE_POINT} from "../../../graphql/deletePoint";
import {pointsVar} from "../../../store";

const PointDescription = () => {
    const [search, setSearch] = useSearchParams()
    const pointId = search.get('point')
    const [point, setPoint] = useState({})
    const {data, loading} = useQuery(GET_POINT, {variables: {id: pointId}})
    const [deletePoint] = useMutation(DELETE_POINT)

    const deleteCurrentPoint = async () => {
        await deletePoint({
            variables: {
                id: pointId
            }
        })
        setSearch({})
        pointsVar([...pointsVar().filter(point=>point.id!==pointId)])
    }

    useEffect(() => {
        if (data && !loading) {
            setPoint(data.point)
        }
    }, [data, loading, pointId])
    if (loading) {
        return <div className={"toCenter"}>Загрузка...</div>
    }
    if (point?.name) {
        return (
            <div className={style.pointDescription}>
                <div className={style.name}>{point.name}</div>
                {point.croppedImage && <img alt={"Изображение места"} className={style.image} src={point.croppedImage.url}/>}
                <div className={style.info}>
                    <div><strong>Тип точки: </strong>{point.category.name}</div>
                    <div><strong>Описание: </strong>{point.desc}</div>
                    <div><strong>Связь: </strong>{point.network}</div>
                    <div><strong>x: </strong>{point.x}</div>
                    <div><strong>y: </strong>{point.y}</div>
                </div>
                <div className={style.buttons}>
                    <Button onClick={deleteCurrentPoint} type={"button"} title={"Удалить точку"}/>
                </div>
            </div>
        );
    }
    return (
        <div className={"toCenter"}>Точка на карте не существует</div>
    );

}

export default PointDescription;
